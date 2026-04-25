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
    streamGenerate: vi.fn(),
  },
}))

import { auth } from '@/lib/auth'
import { claudeClient } from '@/lib/ai/claude'
import { prisma } from '@/lib/db/client'
import { POST } from '@/app/api/chat/[guideSlug]/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockFindUnique = (prisma.guide as unknown as { findUnique: ReturnType<typeof vi.fn> })
  .findUnique
const mockStreamGenerate = claudeClient.streamGenerate as ReturnType<typeof vi.fn>

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
    .map((part) => JSON.parse(part.slice(6)) as { type: string; text?: string; message?: string })
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockFindUnique.mockResolvedValue({
    title: 'React Basics',
    content: '# React Basics\n\n## Components\nComponents are reusable.',
    isPublic: true,
    userId: 'owner-1',
  })
  mockStreamGenerate.mockResolvedValue(makeTextStream(['First ', 'second']))
})

describe('POST /api/chat/[guideSlug]', () => {
  it('requires authentication', async () => {
    mockAuth.mockResolvedValueOnce(null)

    const res = await POST(makeRequest({ message: 'Explain hooks' }), {
      params: Promise.resolve({ guideSlug: 'react-basics' }),
    })

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
    const res = await POST(makeRequest({ message: '' }), {
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

    const res = await POST(makeRequest({ message: 'Explain hooks' }), {
      params: Promise.resolve({ guideSlug: 'missing-guide' }),
    })

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('GUIDE_NOT_FOUND')
    expect(body.error.message).toBe('Guide not found')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
  })

  it('streams Claude response with guide context', async () => {
    const res = await POST(makeRequest({ message: 'Explain hooks' }), {
      params: Promise.resolve({ guideSlug: 'react-basics' }),
    })

    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('text/event-stream')

    const events = await readSSEResponse(res)
    expect(events).toEqual([
      { type: 'token', text: 'First ' },
      { type: 'token', text: 'second' },
      { type: 'done' },
    ])
    expect(mockStreamGenerate).toHaveBeenCalledWith(
      'Explain hooks',
      expect.stringContaining('Guide title: React Basics'),
    )
  })
})
