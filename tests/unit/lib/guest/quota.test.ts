import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Prisma before importing the module under test
vi.mock('@/lib/db/client', () => ({
  prisma: {
    guestQuota: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
      update: vi.fn(),
    },
    $transaction: vi.fn((fn: (tx: unknown) => unknown) =>
      fn({
        guestQuota: {
          findUnique: vi.fn(),
          upsert: vi.fn(),
          update: vi.fn(),
        },
      }),
    ),
  },
}))

import { prisma } from '@/lib/db/client'
import {
  sanitizeIp,
  extractIp,
  getQuotaStatus,
  checkAndIncrementQuota,
  GUEST_DAILY_LIMIT,
} from '@/lib/guest/quota'

// Helper to grab the tx mock from the $transaction call
type TxMock = {
  guestQuota: {
    findUnique: ReturnType<typeof vi.fn>
    upsert: ReturnType<typeof vi.fn>
    update: ReturnType<typeof vi.fn>
  }
}

const mockPrisma = prisma as unknown as {
  guestQuota: {
    findUnique: ReturnType<typeof vi.fn>
    upsert: ReturnType<typeof vi.fn>
    update: ReturnType<typeof vi.fn>
  }
  $transaction: ReturnType<typeof vi.fn>
}

function setupTransaction(txOverrides?: Partial<TxMock['guestQuota']>) {
  mockPrisma.$transaction.mockImplementation((fn: (tx: TxMock) => unknown) =>
    fn({
      guestQuota: {
        findUnique: txOverrides?.findUnique ?? vi.fn().mockResolvedValue(null),
        upsert:
          txOverrides?.upsert ??
          vi.fn().mockResolvedValue({ ip: '1.2.3.4', count: 1, resetAt: futureReset() }),
        update:
          txOverrides?.update ??
          vi.fn().mockResolvedValue({ ip: '1.2.3.4', count: 2, resetAt: futureReset() }),
      },
    }),
  )
}

function futureReset(): Date {
  const d = new Date()
  d.setUTCHours(24, 0, 0, 0)
  return d
}

function pastReset(): Date {
  return new Date(Date.now() - 1000)
}

beforeEach(() => {
  vi.clearAllMocks()
})

// ─── sanitizeIp ──────────────────────────────────────────────────────────────

describe('sanitizeIp', () => {
  it('returns the first IP from a comma-separated x-forwarded-for header', () => {
    expect(sanitizeIp('1.2.3.4, 10.0.0.1')).toBe('1.2.3.4')
  })

  it('accepts a plain IPv4 address', () => {
    expect(sanitizeIp('203.0.113.42')).toBe('203.0.113.42')
  })

  it('accepts an IPv6 address', () => {
    expect(sanitizeIp('2001:db8::1')).toBe('2001:db8::1')
  })

  it('returns "unknown" for null', () => {
    expect(sanitizeIp(null)).toBe('unknown')
  })

  it('returns "unknown" for clearly invalid input', () => {
    expect(sanitizeIp('not-an-ip!!')).toBe('unknown')
  })
})

// ─── extractIp ───────────────────────────────────────────────────────────────

describe('extractIp', () => {
  it('reads x-forwarded-for header and sanitizes', () => {
    const req = new Request('http://localhost/', {
      headers: { 'x-forwarded-for': '5.5.5.5, 10.0.0.1' },
    })
    expect(extractIp(req)).toBe('5.5.5.5')
  })

  it('returns "unknown" when no x-forwarded-for header', () => {
    const req = new Request('http://localhost/')
    expect(extractIp(req)).toBe('unknown')
  })
})

// ─── getQuotaStatus ──────────────────────────────────────────────────────────

describe('getQuotaStatus', () => {
  it('returns allowed=true with used=0 when no record exists', async () => {
    mockPrisma.guestQuota.findUnique.mockResolvedValueOnce(null)
    const status = await getQuotaStatus('1.2.3.4')
    expect(status.allowed).toBe(true)
    expect(status.used).toBe(0)
    expect(status.limit).toBe(GUEST_DAILY_LIMIT)
  })

  it('returns allowed=true when count < limit', async () => {
    mockPrisma.guestQuota.findUnique.mockResolvedValueOnce({
      ip: '1.2.3.4',
      count: 2,
      resetAt: futureReset(),
    })
    const status = await getQuotaStatus('1.2.3.4')
    expect(status.allowed).toBe(true)
    expect(status.used).toBe(2)
  })

  it('returns allowed=false when count >= limit', async () => {
    mockPrisma.guestQuota.findUnique.mockResolvedValueOnce({
      ip: '1.2.3.4',
      count: 3,
      resetAt: futureReset(),
    })
    const status = await getQuotaStatus('1.2.3.4')
    expect(status.allowed).toBe(false)
    expect(status.used).toBe(GUEST_DAILY_LIMIT)
  })

  it('treats an expired record as fresh (allowed=true, used=0)', async () => {
    mockPrisma.guestQuota.findUnique.mockResolvedValueOnce({
      ip: '1.2.3.4',
      count: 3,
      resetAt: pastReset(),
    })
    const status = await getQuotaStatus('1.2.3.4')
    expect(status.allowed).toBe(true)
    expect(status.used).toBe(0)
  })
})

// ─── checkAndIncrementQuota ──────────────────────────────────────────────────

describe('checkAndIncrementQuota', () => {
  it('creates a new record with count=1 when no record exists (allowed)', async () => {
    const upsert = vi.fn().mockResolvedValue({ ip: '1.2.3.4', count: 1, resetAt: futureReset() })
    setupTransaction({ findUnique: vi.fn().mockResolvedValue(null), upsert })

    const result = await checkAndIncrementQuota('1.2.3.4')

    expect(upsert).toHaveBeenCalled()
    expect(result.allowed).toBe(true)
    expect(result.used).toBe(1)
  })

  it('resets and allows when existing record is expired', async () => {
    const expired = { ip: '1.2.3.4', count: 3, resetAt: pastReset() }
    const upsert = vi.fn().mockResolvedValue({ ip: '1.2.3.4', count: 1, resetAt: futureReset() })
    setupTransaction({ findUnique: vi.fn().mockResolvedValue(expired), upsert })

    const result = await checkAndIncrementQuota('1.2.3.4')
    expect(result.allowed).toBe(true)
    expect(result.used).toBe(1)
    expect(upsert).toHaveBeenCalled()
  })

  it('blocks when count is already at limit', async () => {
    const atLimit = { ip: '1.2.3.4', count: 3, resetAt: futureReset() }
    setupTransaction({ findUnique: vi.fn().mockResolvedValue(atLimit) })

    const result = await checkAndIncrementQuota('1.2.3.4')
    expect(result.allowed).toBe(false)
    expect(result.used).toBe(GUEST_DAILY_LIMIT)
  })

  it('increments count and allows when below limit', async () => {
    const below = { ip: '1.2.3.4', count: 2, resetAt: futureReset() }
    const update = vi.fn().mockResolvedValue({ ip: '1.2.3.4', count: 3, resetAt: futureReset() })
    setupTransaction({ findUnique: vi.fn().mockResolvedValue(below), update })

    const result = await checkAndIncrementQuota('1.2.3.4')
    expect(update).toHaveBeenCalled()
    expect(result.allowed).toBe(true)
    expect(result.used).toBe(3)
  })
})
