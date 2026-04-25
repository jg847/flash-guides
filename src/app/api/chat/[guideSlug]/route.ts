import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { claudeClient } from '@/lib/ai/claude'
import { prisma } from '@/lib/db/client'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const followUpChatSchema = z.object({
  message: z.string().min(1).max(2000),
})

type FollowUpChatSSEEvent =
  | { type: 'token'; text: string }
  | { type: 'done' }
  | { type: 'error'; message: string }

function encodeSSE(event: FollowUpChatSSEEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`
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
      `Guide title: ${guide.title}`,
      'Use the guide content below as your primary context.',
      guide.content,
      'If the guide does not fully answer the question, say what is missing before inferring beyond it.',
    ].join('\n\n')

    const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>()
    const writer = writable.getWriter()
    const encoder = new TextEncoder()

    ;(async () => {
      try {
        const stream = await claudeClient.streamGenerate(parsed.data.message, guideContext)
        const reader = stream.getReader()

        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            break
          }

          await writer.write(encoder.encode(encodeSSE({ type: 'token', text: value })))
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
