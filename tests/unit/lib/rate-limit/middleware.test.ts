import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/guest/quota', () => ({
  extractIp: vi.fn(),
}))

vi.mock('@/lib/rate-limit', () => ({
  checkGuestGenerationRateLimit: vi.fn(),
}))

import { extractIp } from '@/lib/guest/quota'
import { checkGuestGenerationRateLimit } from '@/lib/rate-limit'
import { enforceGuestGenerationRateLimit } from '@/lib/rate-limit/middleware'

const mockExtractIp = extractIp as ReturnType<typeof vi.fn>
const mockCheckGuestGenerationRateLimit = checkGuestGenerationRateLimit as ReturnType<typeof vi.fn>

describe('enforceGuestGenerationRateLimit', () => {
  it('returns null when the request is allowed', async () => {
    mockExtractIp.mockReturnValue('1.2.3.4')
    mockCheckGuestGenerationRateLimit.mockResolvedValue({
      allowed: true,
      used: 1,
      limit: 3,
      remaining: 2,
      resetsAt: new Date('2026-04-25T00:00:00.000Z'),
      retryAfter: 3600,
    })

    const response = await enforceGuestGenerationRateLimit(
      new Request('http://localhost:3000/api/generate'),
    )

    expect(response).toBeNull()
  })

  it('returns a 429 response with retry metadata when the limit is exceeded', async () => {
    mockExtractIp.mockReturnValue('1.2.3.4')
    mockCheckGuestGenerationRateLimit.mockResolvedValue({
      allowed: false,
      used: 3,
      limit: 3,
      remaining: 0,
      resetsAt: new Date('2026-04-25T00:00:00.000Z'),
      retryAfter: 1200,
    })

    const response = await enforceGuestGenerationRateLimit(
      new Request('http://localhost:3000/api/generate'),
    )

    expect(response?.status).toBe(429)
    expect(response?.headers.get('Retry-After')).toBe('1200')
    const body = (await response?.json()) as {
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
    expect(body.error.retryAfter).toBe(1200)
    expect(body.error.resetsAt).toBe('2026-04-25T00:00:00.000Z')
    expect(body.error.signupUrl).toBe('/register')
    expect(response?.headers.get('x-request-id')).toBe(body.error.requestId)
  })
})
