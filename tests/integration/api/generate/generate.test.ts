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

vi.mock('@/lib/rate-limit', () => ({
  checkGuestGenerationRateLimit: vi.fn(),
}))

vi.mock('@/lib/generation/file-extractor', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/generation/file-extractor')>()
  return {
    ...actual,
    extractReadableFileText: vi.fn(),
  }
})

import { auth } from '@/lib/auth'
import { ReadableFileError, extractReadableFileText } from '@/lib/generation/file-extractor'
import { generationOrchestrator } from '@/lib/generation/orchestrator'
import { checkGuestGenerationRateLimit } from '@/lib/rate-limit'
import { POST } from '@/app/api/generate/route'
import type { SSEEvent } from '@/types/generation'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockExtractReadableFileText = extractReadableFileText as ReturnType<typeof vi.fn>
const mockOrchestrate = generationOrchestrator.orchestrate as ReturnType<typeof vi.fn>
const mockCheckGuestGenerationRateLimit = checkGuestGenerationRateLimit as ReturnType<typeof vi.fn>

function makeRequest(body: unknown, headers?: Record<string, string>) {
  return new Request('http://localhost:3000/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

function makeFileRequest(file: File) {
  const formData = new FormData()
  formData.set('inputType', 'FILE')
  formData.set('studyMode', 'OVERVIEW')
  formData.set('file', file)

  const req = new Request('http://localhost:3000/api/generate', {
    method: 'POST',
    body: formData,
  })

  vi.spyOn(req, 'formData').mockResolvedValue(formData)
  return req
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
  mockExtractReadableFileText.mockResolvedValue('Extracted file text')
  mockCheckGuestGenerationRateLimit.mockResolvedValue({
    allowed: true,
    used: 1,
    limit: 3,
    remaining: 2,
    resetsAt: new Date('2026-04-25T00:00:00.000Z'),
    retryAfter: 3600,
  })
})

const VALID_BODY = {
  inputType: 'TOPIC',
  inputValue: 'The French Revolution',
  studyMode: 'OVERVIEW',
} as const

describe('POST /api/generate', () => {
  it('returns structured requestId-aware validation errors for missing fields', async () => {
    const res = await POST(makeRequest({ inputType: 'TOPIC' }))

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

  it('returns 422 for invalid inputType', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, inputType: 'INVALID' }))
    expect(res.status).toBe(422)
  })

  it('returns 422 for empty inputValue', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, inputValue: '' }))
    expect(res.status).toBe(422)
  })

  it('returns structured requestId-aware invalid json errors', async () => {
    const req = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not-json',
    })
    const res = await POST(req)

    expect(res.status).toBe(400)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('INVALID_JSON')
    expect(body.error.message).toBe('Invalid JSON')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
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

  it('returns 429 with Retry-After when guest rate limit is exceeded before streaming starts', async () => {
    mockCheckGuestGenerationRateLimit.mockResolvedValueOnce({
      allowed: false,
      used: 3,
      limit: 3,
      remaining: 0,
      resetsAt: new Date('2026-04-25T00:00:00.000Z'),
      retryAfter: 1800,
    })

    const res = await POST(makeRequest(VALID_BODY, { origin: 'http://localhost:3000' }))

    expect(res.status).toBe(429)
    expect(res.headers.get('Retry-After')).toBe('1800')
    const body = (await res.json()) as {
      error: {
        code: string
        message: string
        requestId: string
        retryAfter: number
        resetsAt: string
        signupUrl: string
      }
    }
    expect(body.error.code).toBe('RATE_LIMIT_EXCEEDED')
    expect(body.error.message).toBe("You've created 3 guides today. Sign up for unlimited access!")
    expect(body.error.requestId).toBeTruthy()
    expect(body.error.retryAfter).toBe(1800)
    expect(body.error.resetsAt).toBe('2026-04-25T00:00:00.000Z')
    expect(body.error.signupUrl).toBe('/register')
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
    expect(mockOrchestrate).not.toHaveBeenCalled()
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

  it('accepts multipart file uploads and passes extracted text to the orchestrator', async () => {
    mockOrchestrate.mockReturnValue(makeEventGen([{ type: 'done', guideSlug: 'file-guide' }]))

    const file = new File(['fake pdf bytes'], 'lecture.pdf', { type: 'application/pdf' })
    const res = await POST(makeFileRequest(file))

    expect(res.status).toBe(200)
    expect(mockExtractReadableFileText).toHaveBeenCalled()
    expect(mockOrchestrate).toHaveBeenCalledWith(
      expect.objectContaining({
        request: expect.objectContaining({
          inputType: 'FILE',
          inputValue: 'Extracted file text',
          sourceName: 'lecture.pdf',
        }),
      }),
    )
  })

  it('returns a readable validation error when uploaded files cannot be parsed', async () => {
    mockExtractReadableFileText.mockRejectedValueOnce(
      new ReadableFileError('UNREADABLE_FILE', 'Uploaded PDF did not contain readable text'),
    )

    const file = new File(['fake pdf bytes'], 'lecture.pdf', { type: 'application/pdf' })
    const res = await POST(makeFileRequest(file))

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('UNREADABLE_FILE')
    expect(body.error.message).toBe('Uploaded PDF did not contain readable text')
    expect(body.error.requestId).toBeTruthy()
  })

  it('returns a file-processing error when multipart extraction fails for a non-validation reason', async () => {
    mockExtractReadableFileText.mockRejectedValueOnce(new Error('Anthropic API unavailable'))

    const file = new File(['fake pdf bytes'], 'lecture.pdf', { type: 'application/pdf' })
    const res = await POST(makeFileRequest(file))

    expect(res.status).toBe(502)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FILE_PROCESSING_FAILED')
    expect(body.error.message).toBe('We could not process that uploaded file. Please try again.')
    expect(body.error.requestId).toBeTruthy()
  })

  it('passes skipGuestQuotaCheck to the orchestrator after route-level rate limiting', async () => {
    mockOrchestrate.mockReturnValue(makeEventGen([{ type: 'done', guideSlug: 'slug-1' }]))

    await POST(makeRequest(VALID_BODY))

    expect(mockOrchestrate).toHaveBeenCalledWith(
      expect.objectContaining({ skipGuestQuotaCheck: true }),
    )
  })

  it('sanitizes the generation input before passing it to the orchestrator', async () => {
    mockOrchestrate.mockReturnValue(makeEventGen([{ type: 'done', guideSlug: 'slug-1' }]))

    await POST(
      makeRequest({
        ...VALID_BODY,
        inputValue: '  <script>alert(1)</script>The French Revolution\u0000  ',
      }),
    )

    expect(mockOrchestrate).toHaveBeenCalledWith(
      expect.objectContaining({
        request: expect.objectContaining({ inputValue: 'alert(1)The French Revolution' }),
      }),
    )
  })
})
