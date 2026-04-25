import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/db/client', () => ({
  prisma: {
    user: {
      update: vi
        .fn()
        .mockResolvedValue({ id: 'user-1', email: 'user@example.com', emailVerified: new Date() }),
    },
  },
}))

vi.mock('@/lib/auth/tokens', () => ({
  consumeVerificationToken: vi.fn(),
}))

import { prisma } from '@/lib/db/client'
import { consumeVerificationToken } from '@/lib/auth/tokens'
import { GET } from '@/app/api/auth/verify-email/route'

const mockConsume = consumeVerificationToken as ReturnType<typeof vi.fn>
const mockUpdate = (prisma.user as unknown as { update: ReturnType<typeof vi.fn> }).update

beforeEach(() => {
  vi.clearAllMocks()
})

function makeRequest(token?: string) {
  const url = token
    ? `http://localhost:3000/api/auth/verify-email?token=${token}`
    : 'http://localhost:3000/api/auth/verify-email'
  return new Request(url)
}

describe('GET /api/auth/verify-email', () => {
  it('returns 400 when no token param is provided', async () => {
    const res = await GET(makeRequest())
    expect(res.status).toBe(400)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('MISSING_TOKEN')
    expect(body.error.message).toBe('Missing token')
    expect(body.error.requestId).toBeTruthy()
  })

  it('returns 410 when token is expired or invalid', async () => {
    mockConsume.mockResolvedValueOnce(null)

    const res = await GET(makeRequest('badtoken'))
    expect(res.status).toBe(410)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('TOKEN_INVALID')
    expect(body.error.message).toBe('Token expired or invalid')
    expect(body.error.requestId).toBeTruthy()
  })

  it('marks emailVerified and redirects to dashboard on valid token', async () => {
    mockConsume.mockResolvedValueOnce('user@example.com')

    const res = await GET(makeRequest('validtoken'))

    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { email: 'user@example.com' },
        data: expect.objectContaining({ emailVerified: expect.any(Date) }),
      }),
    )
    // Should redirect (3xx)
    expect(res.status).toBeGreaterThanOrEqual(300)
    expect(res.status).toBeLessThan(400)
    expect(res.headers.get('location')).toContain('/dashboard')
  })
})
