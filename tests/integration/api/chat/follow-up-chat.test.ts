import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/db/client', () => ({
  prisma: {
    guide: {
      findUnique: vi.fn(),
    },
  },
}))

vi.mock('@/lib/ai/claude', () => ({
  claudeClient: {
    streamChat: vi.fn(),
    getAnthropicSdk: vi.fn(),
    generate: vi.fn(),
  },
}))

import { auth } from '@/lib/auth'
import { claudeClient } from '@/lib/ai/claude'
import { prisma } from '@/lib/db/client'
import { POST } from '@/app/api/chat/[guideSlug]/route'
import { resetUserWindowRateLimitStoreForTests } from '@/lib/rate-limit/user-window'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockFindUnique = (prisma.guide as unknown as { findUnique: ReturnType<typeof vi.fn> })
  .findUnique
const mockStreamChat = claudeClient.streamChat as ReturnType<typeof vi.fn>
const mockGetAnthropicSdk = claudeClient.getAnthropicSdk as ReturnType<typeof vi.fn>
const mockGenerate = claudeClient.generate as ReturnType<typeof vi.fn>
let mockAnthropicMessagesStream: ReturnType<typeof vi.fn>

function makeAnthropicStream(options?: {
  text?: string[]
  toolUse?: {
    name: string
    input: Record<string, unknown>
  }
}) {
  const events = (options?.text ?? []).map((text) => ({
    type: 'content_block_delta',
    delta: { type: 'text_delta', text },
  }))

  return {
    async *[Symbol.asyncIterator]() {
      for (const event of events) {
        yield event
      }
    },
    async finalMessage() {
      return {
        content: options?.toolUse
          ? [
              {
                type: 'tool_use',
                name: options.toolUse.name,
                input: options.toolUse.input,
              },
            ]
          : [],
      }
    },
  }
}

function makeRequest(body: unknown) {
  return new Request('http://localhost:3000/api/chat/react-basics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function makeTextStream(chunks: string[]): ReadableStream<string> {
  return new ReadableStream<string>({
    start(controller) {
      chunks.forEach((chunk) => controller.enqueue(chunk))
      controller.close()
    },
  })
}

async function readSSEResponse(res: Response) {
  const text = await res.text()
  return text
    .split('\n\n')
    .map((part) => part.trim())
    .filter((part) => part.startsWith('data: '))
    .map(
      (part) =>
        JSON.parse(part.slice(6)) as {
          type: string
          text?: string
          message?: string
          suggestions?: string[]
        },
    )
}

beforeEach(() => {
  vi.clearAllMocks()
  resetUserWindowRateLimitStoreForTests()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockFindUnique.mockResolvedValue({
    title: 'React Basics',
    content: '# React Basics\n\n## Components\nComponents are reusable.',
    isPublic: true,
    userId: 'owner-1',
  })
  mockStreamChat.mockResolvedValue(makeTextStream(['First ', 'second']))
  mockGenerate.mockResolvedValue(
    '["What should I study next?","Can you quiz me on this?","What is the common mistake here?"]',
  )
  mockAnthropicMessagesStream = vi
    .fn()
    .mockReturnValue(makeAnthropicStream({ text: ['First ', 'second'] }))
  mockGetAnthropicSdk.mockReturnValue({
    messages: {
      stream: mockAnthropicMessagesStream,
    },
  })
})

describe('POST /api/chat/[guideSlug]', () => {
  it('requires authentication', async () => {
    mockAuth.mockResolvedValueOnce(null)

    const res = await POST(
      makeRequest({ messages: [{ role: 'user', content: 'Explain hooks' }] }),
      {
        params: Promise.resolve({ guideSlug: 'react-basics' }),
      },
    )

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
  })

  it('returns requestId-aware validation errors', async () => {
    const res = await POST(makeRequest({ messages: [] }), {
      params: Promise.resolve({ guideSlug: 'react-basics' }),
    })

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string; issues: unknown[] }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.message).toBe('Validation failed')
    expect(body.error.requestId).toBeTruthy()
    expect(Array.isArray(body.error.issues)).toBe(true)
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
  })

  it('returns requestId-aware guide not found errors', async () => {
    mockFindUnique.mockResolvedValueOnce(null)

    const res = await POST(
      makeRequest({ messages: [{ role: 'user', content: 'Explain hooks' }] }),
      {
        params: Promise.resolve({ guideSlug: 'missing-guide' }),
      },
    )

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('GUIDE_NOT_FOUND')
    expect(body.error.message).toBe('Guide not found')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
  })

  it("rejects when the last message isn't from the user", async () => {
    const res = await POST(
      makeRequest({
        messages: [
          { role: 'user', content: 'Explain hooks' },
          { role: 'assistant', content: 'Hooks help reuse logic.' },
        ],
      }),
      {
        params: Promise.resolve({ guideSlug: 'react-basics' }),
      },
    )

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; issues: Array<{ message: string }> }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.issues[0]?.message).toMatch(/last chat message/i)
  })

  it('streams Claude response with guide context', async () => {
    const messageHistory = [
      { role: 'user', content: 'Explain components' },
      { role: 'assistant', content: 'Components are reusable UI pieces.' },
      { role: 'user', content: 'Explain hooks' },
    ]

    const res = await POST(makeRequest({ messages: messageHistory }), {
      params: Promise.resolve({ guideSlug: 'react-basics' }),
    })

    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('text/event-stream')

    const events = await readSSEResponse(res)
    expect(events).toEqual([
      { type: 'token', text: 'First ' },
      { type: 'token', text: 'second' },
      {
        type: 'suggestions',
        suggestions: [
          'What should I study next?',
          'Can you quiz me on this?',
          'What is the common mistake here?',
        ],
      },
      { type: 'done' },
    ])
    expect(mockAnthropicMessagesStream).toHaveBeenCalledWith(
      expect.objectContaining({
        system: expect.stringContaining('Guide title: React Basics'),
        messages: messageHistory,
      }),
    )
  })

  it('keeps the first user turn plus the last 19 turns when history exceeds 20', async () => {
    const messageHistory = Array.from({ length: 25 }, (_, index) => ({
      role: (index % 2 === 0 ? 'user' : 'assistant') as 'user' | 'assistant',
      content: `message-${index}`,
    }))

    const res = await POST(makeRequest({ messages: messageHistory }), {
      params: Promise.resolve({ guideSlug: 'react-basics' }),
    })

    expect(res.status).toBe(200)
    expect(mockAnthropicMessagesStream).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: [messageHistory[0], ...messageHistory.slice(-19)],
      }),
    )
  })

  it('emits proposal events when Claude calls the proposal tool', async () => {
    mockGenerate.mockResolvedValueOnce('[]')
    mockGetAnthropicSdk.mockReturnValueOnce({
      messages: {
        stream: vi.fn().mockReturnValue(
          makeAnthropicStream({
            toolUse: {
              name: 'propose_section_edit',
              input: {
                op: 'append_section',
                heading: 'Hooks',
                body_markdown: 'Hook body',
                rationale: 'Adds the requested section.',
              },
            },
          }),
        ),
      },
    })

    const res = await POST(makeRequest({ messages: [{ role: 'user', content: 'Add hooks' }] }), {
      params: Promise.resolve({ guideSlug: 'react-basics' }),
    })

    const events = await readSSEResponse(res)
    expect(events[0]).toMatchObject({
      type: 'proposal',
      op: 'append_section',
      heading: 'Hooks',
      body_markdown: 'Hook body',
      rationale: 'Adds the requested section.',
    })
    expect(events[1]).toEqual({ type: 'done' })
  })

  it('falls back to no suggestions when the model returns malformed JSON', async () => {
    mockGenerate.mockResolvedValueOnce('not json')

    const res = await POST(
      makeRequest({ messages: [{ role: 'user', content: 'Explain hooks' }] }),
      {
        params: Promise.resolve({ guideSlug: 'react-basics' }),
      },
    )

    const events = await readSSEResponse(res)
    expect(events).toEqual([
      { type: 'token', text: 'First ' },
      { type: 'token', text: 'second' },
      { type: 'done' },
    ])
  })

  it('returns 429 after 30 chat requests in a minute', async () => {
    let finalResponse: Response | null = null

    for (let index = 0; index < 31; index += 1) {
      finalResponse = await POST(
        makeRequest({ messages: [{ role: 'user', content: `Explain hooks ${index}` }] }),
        {
          params: Promise.resolve({ guideSlug: 'react-basics' }),
        },
      )
    }

    expect(finalResponse?.status).toBe(429)
    const body = (await finalResponse?.json()) as { error: { code: string } }
    expect(body.error.code).toBe('RATE_LIMIT_EXCEEDED')
  })
})
