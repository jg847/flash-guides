import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/db/client', () => ({
  prisma: {
    user: {
      update: vi.fn().mockResolvedValue({ id: 'user-1', email: 'user@example.com' }),
    },
  },
}))

vi.mock('@/lib/auth/tokens', () => ({
  consumeVerificationToken: vi.fn(),
}))

import { prisma } from '@/lib/db/client'
import { consumeVerificationToken } from '@/lib/auth/tokens'
import { POST } from '@/app/api/auth/reset-password/route'

const mockConsume = consumeVerificationToken as ReturnType<typeof vi.fn>
const mockUpdate = (prisma.user as unknown as { update: ReturnType<typeof vi.fn> }).update

function makeRequest(body: unknown) {
  return new Request('http://localhost:3000/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('POST /api/auth/reset-password', () => {
  it('returns 200 and updates password for valid token', async () => {
    mockConsume.mockResolvedValueOnce('user@example.com')

    const res = await POST(makeRequest({ token: 'validtoken', password: 'NewSecure1' }))

    expect(res.status).toBe(200)
    const body = (await res.json()) as { message: string }
    expect(body.message).toBe('Password updated')
  })

  it('stores a bcrypt hash, not the plain password', async () => {
    mockConsume.mockResolvedValueOnce('user@example.com')

    await POST(makeRequest({ token: 'validtoken', password: 'NewSecure1' }))

    const updateArg = (mockUpdate.mock.calls[0] as [{ data: { password: string } }])[0]
    expect(updateArg.data.password).toMatch(/^\$2[ab]\$/)
  })

  it('returns 410 for expired or invalid token', async () => {
    mockConsume.mockResolvedValueOnce(null)

    const res = await POST(makeRequest({ token: 'expiredtoken', password: 'NewSecure1' }))

    expect(res.status).toBe(410)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('TOKEN_INVALID')
    expect(body.error.message).toBe('Token expired or invalid')
    expect(body.error.requestId).toBeTruthy()
    expect(mockUpdate).not.toHaveBeenCalled()
  })

  it('returns 422 for weak password', async () => {
    const res = await POST(makeRequest({ token: 'sometoken', password: 'weak' }))

    expect(res.status).toBe(422)
    const body = (await res.json()) as { error: { code: string; fields: Record<string, string[]> } }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.fields).toHaveProperty('password')
  })

  it('returns 422 when token field is missing', async () => {
    const res = await POST(makeRequest({ password: 'NewSecure1' }))
    expect(res.status).toBe(422)
  })

  it('returns 400 for non-JSON body', async () => {
    const res = await POST(
      new Request('http://localhost:3000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: 'bad',
      }),
    )
    expect(res.status).toBe(400)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('INVALID_JSON')
    expect(body.error.message).toBe('Invalid JSON')
    expect(body.error.requestId).toBeTruthy()
  })

  it('returns 403 for a mismatched origin header', async () => {
    const res = await POST(
      new Request('http://localhost:3000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          origin: 'https://attacker.example',
        },
        body: JSON.stringify({ token: 'validtoken', password: 'NewSecure1' }),
      }),
    )

    expect(res.status).toBe(403)
    expect(mockUpdate).not.toHaveBeenCalled()
  })
})
