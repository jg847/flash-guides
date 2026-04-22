import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Mocks must precede all imports ──────────────────────────────────────────

vi.mock('@/lib/db/client', () => ({
  prisma: {
    guestQuota: {
      findUnique: vi.fn(),
    },
  },
}))

// Mock auth so we can control session state
vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

import { prisma } from '@/lib/db/client'
import { auth } from '@/lib/auth'
import { GET } from '@/app/api/guest/quota/route'

const mockPrisma = prisma as unknown as {
  guestQuota: { findUnique: ReturnType<typeof vi.fn> }
}
const mockAuth = auth as ReturnType<typeof vi.fn>

function makeRequest(headers?: Record<string, string>) {
  return new Request('http://localhost:3000/api/guest/quota', { headers })
}

function futureReset(): Date {
  const d = new Date()
  d.setUTCHours(24, 0, 0, 0)
  return d
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue(null)
})

describe('GET /api/guest/quota', () => {
  it('returns used=0, limit=3 for a guest with no existing record', async () => {
    mockPrisma.guestQuota.findUnique.mockResolvedValue(null)

    const res = await GET(makeRequest({ 'x-forwarded-for': '1.2.3.4' }))

    expect(res.status).toBe(200)
    const body = (await res.json()) as { used: number; limit: number; resetsAt: string }
    expect(body.used).toBe(0)
    expect(body.limit).toBe(3)
    expect(body.resetsAt).toBeTruthy()
  })

  it('returns current count for guest with existing quota record', async () => {
    mockPrisma.guestQuota.findUnique.mockResolvedValue({
      ip: '1.2.3.4',
      count: 2,
      resetAt: futureReset(),
    })

    const res = await GET(makeRequest({ 'x-forwarded-for': '1.2.3.4' }))

    expect(res.status).toBe(200)
    const body = (await res.json()) as { used: number; limit: number }
    expect(body.used).toBe(2)
    expect(body.limit).toBe(3)
  })

  it('returns used=0 for an authenticated (registered) user', async () => {
    mockAuth.mockResolvedValue({ user: { id: 'user-1', email: 'a@b.com' } })

    const res = await GET(makeRequest())

    expect(res.status).toBe(200)
    const body = (await res.json()) as { used: number; resetsAt: null }
    expect(body.used).toBe(0)
    expect(body.resetsAt).toBeNull()
    // Quota DB should NOT be queried for authenticated users
    expect(mockPrisma.guestQuota.findUnique).not.toHaveBeenCalled()
  })

  it('handles expired quota record and returns used=0', async () => {
    const past = new Date(Date.now() - 1000)
    mockPrisma.guestQuota.findUnique.mockResolvedValue({
      ip: '1.2.3.4',
      count: 3,
      resetAt: past,
    })

    const res = await GET(makeRequest({ 'x-forwarded-for': '1.2.3.4' }))

    expect(res.status).toBe(200)
    const body = (await res.json()) as { used: number }
    expect(body.used).toBe(0)
  })
})
