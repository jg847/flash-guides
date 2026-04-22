import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/db/client', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}))

vi.mock('@/lib/auth/tokens', () => ({
  createPasswordResetToken: vi.fn().mockResolvedValue('mock-reset-token'),
}))

vi.mock('@/lib/email', () => ({
  sendPasswordResetEmail: vi.fn().mockResolvedValue(undefined),
}))

import { prisma } from '@/lib/db/client'
import { sendPasswordResetEmail } from '@/lib/email'
import { POST } from '@/app/api/auth/forgot-password/route'

const mockFindUnique = (prisma.user as unknown as { findUnique: ReturnType<typeof vi.fn> })
  .findUnique
const mockSendEmail = sendPasswordResetEmail as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
  return new Request('http://localhost:3000/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('POST /api/auth/forgot-password', () => {
  it('returns 200 when email exists and sends reset email', async () => {
    mockFindUnique.mockResolvedValueOnce({ id: 'user-1', email: 'user@example.com' })

    const res = await POST(makeRequest({ email: 'user@example.com' }))

    expect(res.status).toBe(200)
    const body = (await res.json()) as { message: string }
    expect(body.message).toContain('reset link has been sent')
    expect(mockSendEmail).toHaveBeenCalledWith('user@example.com', 'mock-reset-token')
  })

  it('returns 200 even when email does not exist (no enumeration)', async () => {
    mockFindUnique.mockResolvedValueOnce(null)

    const res = await POST(makeRequest({ email: 'unknown@example.com' }))

    expect(res.status).toBe(200)
    // Must NOT send an email
    expect(mockSendEmail).not.toHaveBeenCalled()
  })

  it('returns 422 for invalid email format', async () => {
    const res = await POST(makeRequest({ email: 'not-an-email' }))
    expect(res.status).toBe(422)
  })

  it('returns 400 for non-JSON body', async () => {
    const res = await POST(
      new Request('http://localhost:3000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: 'not-json',
      }),
    )
    expect(res.status).toBe(400)
  })
})
