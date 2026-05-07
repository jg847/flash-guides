import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/guest/quota', () => ({
  checkAndIncrementQuota: vi.fn(),
}))

import { checkAndIncrementQuota } from '@/lib/guest/quota'
import { checkGuestGenerationRateLimit, getRetryAfterSeconds } from '@/lib/rate-limit'

const mockCheckAndIncrementQuota = checkAndIncrementQuota as ReturnType<typeof vi.fn>

describe('getRetryAfterSeconds', () => {
  it('returns the remaining whole seconds until the reset window', () => {
    const now = new Date('2026-04-24T10:00:00.000Z')
    const resetAt = new Date('2026-04-24T10:00:30.100Z')

    expect(getRetryAfterSeconds(resetAt, now)).toBe(31)
  })
})

describe('checkGuestGenerationRateLimit', () => {
  it('maps quota storage into rate-limit metadata', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-24T23:59:30.000Z'))

    mockCheckAndIncrementQuota.mockResolvedValue({
      allowed: false,
      used: 3,
      limit: 3,
      resetsAt: new Date('2026-04-25T00:00:00.000Z'),
    })

    const result = await checkGuestGenerationRateLimit('1.2.3.4')

    expect(result.allowed).toBe(false)
    expect(result.used).toBe(3)
    expect(result.limit).toBe(3)
    expect(result.remaining).toBe(0)
    expect(result.retryAfter).toBeGreaterThan(0)

    vi.useRealTimers()
  })
})
