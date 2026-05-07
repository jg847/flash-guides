import { z } from 'zod'
import type { Tool } from '@anthropic-ai/sdk/resources/messages/messages'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { claudeClient } from '@/lib/ai/claude'
import { prisma } from '@/lib/db/client'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { checkUserWindowRateLimit } from '@/lib/rate-limit/user-window'

const followUpChatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1).max(8000),
      }),
    )
    .min(1)
    .max(40),
})

type FollowUpChatMessage = z.infer<typeof followUpChatSchema>['messages'][number]

type FollowUpChatSSEEvent =
  | { type: 'token'; text: string }
  | { type: 'suggestions'; suggestions: string[] }
  | { type: 'done' }
  | { type: 'error'; message: string }
  | {
      type: 'proposal'
      id: string
      op: 'append_section' | 'replace_section' | 'insert_section_after'
      heading: string
      body_markdown: string
      after_heading?: string
      rationale: string
    }

const proposalToolSchema = z.object({
  op: z.enum(['append_section', 'replace_section', 'insert_section_after']),
  heading: z.string().trim().min(1).max(200),
  body_markdown: z.string().trim().min(1).max(20000),
  after_heading: z.string().trim().min(1).max(200).optional(),
  rationale: z.string().trim().min(1).max(500),
})

const followUpChatTools: Tool[] = [
  {
    name: 'propose_section_edit',
    description:
      'Propose adding, replacing, or inserting a section in the guide. Does not apply the change — the user must approve.',
    input_schema: {
      type: 'object',
      properties: {
        op: {
          type: 'string',
          enum: ['append_section', 'replace_section', 'insert_section_after'],
        },
        heading: { type: 'string' },
        body_markdown: { type: 'string' },
        after_heading: { type: 'string' },
        rationale: {
          type: 'string',
          description: 'One short sentence shown to the user.',
        },
      },
      required: ['op', 'heading', 'body_markdown', 'rationale'],
    },
  },
]

function isPlaywrightTestEnabled(): boolean {
  return process.env['PLAYWRIGHT_TEST'] === '1'
}

function encodeSSE(event: FollowUpChatSSEEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`
}

function normalizeMessages(messages: FollowUpChatMessage[]): FollowUpChatMessage[] {
  const withoutEmptyAssistantPlaceholders = messages.filter(
    (message) => !(message.role === 'assistant' && message.content.trim().length === 0),
  )

  if (withoutEmptyAssistantPlaceholders.length <= 20) {
    return withoutEmptyAssistantPlaceholders
  }

  const firstUserIndex = withoutEmptyAssistantPlaceholders.findIndex(
    (message) => message.role === 'user',
  )

  if (firstUserIndex === -1) {
    return withoutEmptyAssistantPlaceholders.slice(-20)
  }

  const firstUserMessage = withoutEmptyAssistantPlaceholders[firstUserIndex]
  if (!firstUserMessage) {
    return withoutEmptyAssistantPlaceholders.slice(-20)
  }

  const remainingMessages = withoutEmptyAssistantPlaceholders.slice(firstUserIndex + 1).slice(-19)

  return [firstUserMessage, ...remainingMessages]
}

async function buildSummaryNote(messages: FollowUpChatMessage[]): Promise<string | null> {
  const withoutEmptyAssistantPlaceholders = messages.filter(
    (message) => !(message.role === 'assistant' && message.content.trim().length === 0),
  )

  if (withoutEmptyAssistantPlaceholders.length <= 20) {
    return null
  }

  const firstUserIndex = withoutEmptyAssistantPlaceholders.findIndex(
    (message) => message.role === 'user',
  )

  const afterFirstUserMessages =
    firstUserIndex === -1
      ? withoutEmptyAssistantPlaceholders
      : withoutEmptyAssistantPlaceholders.slice(firstUserIndex + 1)
  const droppedMessages =
    firstUserIndex === -1
      ? withoutEmptyAssistantPlaceholders.slice(0, -20)
      : afterFirstUserMessages.slice(0, Math.max(0, afterFirstUserMessages.length - 19))

  if (droppedMessages.length === 0) {
    return null
  }

  const transcript = droppedMessages
    .map((message) => `${message.role === 'user' ? 'User' : 'Assistant'}: ${message.content}`)
    .join('\n')

  const summary = await claudeClient.generate(
    `Summarize these earlier dropped follow-up chat turns in one short paragraph for context retention. Return plain text only.\n\n${transcript}`,
    undefined,
    200,
  )

  const trimmedSummary = summary.trim()
  return trimmedSummary.length > 0 ? trimmedSummary : null
}

function parseSuggestedFollowUps(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .filter((entry): entry is string => typeof entry === 'string')
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0)
      .slice(0, 3)
  } catch {
    return []
  }
}

async function generateSuggestedFollowUps(
  assistantText: string,
  messages: FollowUpChatMessage[],
  guideContext: string,
): Promise<string[]> {
  const transcript = [...messages, { role: 'assistant' as const, content: assistantText }]
    .map((message) => `${message.role === 'user' ? 'User' : 'Assistant'}: ${message.content}`)
    .join('\n')

  const raw = await claudeClient.generate(
    `Based on this guide follow-up conversation, return exactly 3 short follow-up questions as a JSON array of strings. Return JSON only.\n\n${transcript}`,
    guideContext,
    200,
  )

  return parseSuggestedFollowUps(raw)
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ guideSlug: string }> },
): Promise<Response> {
  try {
    const session = await auth()
    const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    const rateLimit = checkUserWindowRateLimit('chat', sessionUserId, 30, 60_000)
    if (!rateLimit.allowed) {
      return createApiErrorResponse(req, {
        status: 429,
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many follow-up chat requests. Please wait a minute and try again.',
        details: {
          retryAfter: rateLimit.retryAfter,
          resetsAt: rateLimit.resetsAt.toISOString(),
        },
        headers: {
          'Retry-After': String(rateLimit.retryAfter),
        },
      })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = followUpChatSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const normalizedMessages = normalizeMessages(parsed.data.messages)
    const summaryNote = await buildSummaryNote(parsed.data.messages)
    const lastMessage = normalizedMessages[normalizedMessages.length - 1]

    if (lastMessage?.role !== 'user') {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: {
          issues: [
            {
              code: 'custom',
              message: 'The last chat message must be from the user',
              path: ['messages'],
            },
          ],
        },
      })
    }

    const { guideSlug } = await params
    const guide = await prisma.guide.findUnique({
      where: { slug: guideSlug },
      select: {
        title: true,
        content: true,
        isPublic: true,
        userId: true,
      },
    })

    if (!guide) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'GUIDE_NOT_FOUND',
        message: 'Guide not found',
      })
    }

    if (!guide.isPublic && guide.userId !== sessionUserId) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    const guideContext = [
      'You are answering follow-up questions about an existing FlashGuides study guide.',
      'If the user asks to add, edit, insert, or remove a section or part of the guide, call propose_section_edit instead of writing the section inline.',
      summaryNote ? `Earlier chat summary: ${summaryNote}` : null,
      `Guide title: ${guide.title}`,
      'Use the guide content below as your primary context.',
      guide.content,
      'If the guide does not fully answer the question, say what is missing before inferring beyond it.',
    ]
      .filter((entry): entry is string => Boolean(entry))
      .join('\n\n')

    const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>()
    const writer = writable.getWriter()
    const encoder = new TextEncoder()

    ;(async () => {
      try {
        let assistantText = ''

        if (isPlaywrightTestEnabled()) {
          const stream = await claudeClient.streamChat(normalizedMessages, guideContext)
          const reader = stream.getReader()

          while (true) {
            const { done, value } = await reader.read()
            if (done) {
              break
            }

            assistantText += value

            await writer.write(encoder.encode(encodeSSE({ type: 'token', text: value })))
          }
        } else {
          const stream = claudeClient.getAnthropicSdk().messages.stream({
            model: 'claude-sonnet-4-5',
            system: guideContext,
            messages: normalizedMessages,
            tools: [...followUpChatTools],
            max_tokens: 4096,
          })

          for await (const event of stream) {
            if (event.type !== 'content_block_delta' || event.delta.type !== 'text_delta') {
              continue
            }

            assistantText += event.delta.text

            await writer.write(encoder.encode(encodeSSE({ type: 'token', text: event.delta.text })))
          }

          const finalMessage = await stream.finalMessage()
          for (const block of finalMessage.content) {
            if (block.type !== 'tool_use' || block.name !== 'propose_section_edit') {
              continue
            }

            const parsedTool = proposalToolSchema.safeParse(block.input)
            if (!parsedTool.success) {
              continue
            }

            await writer.write(
              encoder.encode(
                encodeSSE({
                  type: 'proposal',
                  id: crypto.randomUUID(),
                  ...parsedTool.data,
                }),
              ),
            )
          }
        }

        if (assistantText.trim().length > 0) {
          const suggestions = await generateSuggestedFollowUps(
            assistantText,
            normalizedMessages,
            guideContext,
          )

          if (suggestions.length > 0) {
            await writer.write(encoder.encode(encodeSSE({ type: 'suggestions', suggestions })))
          }
        }

        await writer.write(encoder.encode(encodeSSE({ type: 'done' })))
      } catch {
        try {
          await writer.write(
            encoder.encode(
              encodeSSE({ type: 'error', message: 'AI service unavailable, please try again.' }),
            ),
          )
        } catch {
          // writer closed
        }
      } finally {
        await writer.close().catch(() => {
          // ignore close errors
        })
      }
    })()

    return new Response(readable, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    return handleApiError(error, req)
  }
}
