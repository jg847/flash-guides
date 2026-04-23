import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Mocks must precede all imports ──────────────────────────────────────────

vi.mock('@/lib/generation/orchestrator', () => ({
  generationOrchestrator: {
    orchestrate: vi.fn(),
  },
}))

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

import { auth } from '@/lib/auth'
import { generationOrchestrator } from '@/lib/generation/orchestrator'
import { POST } from '@/app/api/generate/route'
import type { SSEEvent } from '@/types/generation'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockOrchestrate = generationOrchestrator.orchestrate as ReturnType<typeof vi.fn>

function makeRequest(body: unknown, headers?: Record<string, string>) {
  return new Request('http://localhost:3000/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

async function* makeEventGen(events: SSEEvent[]): AsyncGenerator<SSEEvent> {
  for (const event of events) {
    yield event
  }
}

async function readSSEResponse(res: Response): Promise<SSEEvent[]> {
  const text = await res.text()
  const events: SSEEvent[] = []
  for (const line of text.split('\n\n')) {
    const trimmed = line.trim()
    if (!trimmed.startsWith('data: ')) continue
    try {
      events.push(JSON.parse(trimmed.slice(6)) as SSEEvent)
    } catch {
      // ignore malformed lines
    }
  }
  return events
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue(null)
})

const VALID_BODY = {
  inputType: 'TOPIC',
  inputValue: 'The French Revolution',
  studyMode: 'OVERVIEW',
} as const

describe('POST /api/generate', () => {
  it('returns 422 for missing fields', async () => {
    const res = await POST(makeRequest({ inputType: 'TOPIC' }))
    expect(res.status).toBe(422)
  })

  it('returns 422 for invalid inputType', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, inputType: 'INVALID' }))
    expect(res.status).toBe(422)
  })

  it('returns 422 for empty inputValue', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, inputValue: '' }))
    expect(res.status).toBe(422)
  })

  it('returns 400 for invalid JSON', async () => {
    const req = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not-json',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('streams SSE events for a valid request', async () => {
    const events: SSEEvent[] = [
      { type: 'step', step: 'planning' },
      { type: 'step', step: 'writing' },
      { type: 'token', text: '# Test' },
      { type: 'done', guideSlug: 'test-guide-abc123456' },
    ]
    mockOrchestrate.mockReturnValue(makeEventGen(events))

    const res = await POST(makeRequest(VALID_BODY))
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('text/event-stream')

    const received = await readSSEResponse(res)
    expect(received).toEqual(events)
  })

  it('encodes quota-exceeded error as SSE event', async () => {
    const quotaError: SSEEvent = {
      type: 'error',
      message: JSON.stringify({
        code: 'QUOTA_EXCEEDED',
        resetsAt: '2026-04-23T00:00:00.000Z',
        signupUrl: '/register',
      }),
    }
    mockOrchestrate.mockReturnValue(makeEventGen([quotaError]))

    const res = await POST(makeRequest(VALID_BODY))
    expect(res.status).toBe(200) // headers already sent as SSE

    const received = await readSSEResponse(res)
    expect(received).toHaveLength(1)
    expect(received[0]).toEqual(quotaError)
  })

  it('encodes AI service error as SSE event when orchestrator throws', async () => {
    mockOrchestrate.mockImplementation(async function* () {
      throw new Error('Claude timeout')
    })

    const res = await POST(makeRequest(VALID_BODY))
    expect(res.status).toBe(200)

    const received = await readSSEResponse(res)
    expect(received).toHaveLength(1)
    expect(received[0]?.type).toBe('error')
  })

  it('calls auth() and passes session to orchestrator', async () => {
    const fakeSession = { user: { id: 'user-1', email: 'a@b.com' } }
    mockAuth.mockResolvedValue(fakeSession)
    const events: SSEEvent[] = [{ type: 'done', guideSlug: 'slug-1' }]
    mockOrchestrate.mockReturnValue(makeEventGen(events))

    await POST(makeRequest(VALID_BODY))

    expect(mockOrchestrate).toHaveBeenCalledWith(expect.objectContaining({ session: fakeSession }))
  })
})
