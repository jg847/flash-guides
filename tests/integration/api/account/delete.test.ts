import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/auth/password', () => ({
  verifyPassword: vi.fn(),
}))

vi.mock('@/lib/db/client', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      delete: vi.fn(),
    },
  },
}))

vi.mock('@/lib/storage/minio', () => ({
  deleteStoredObjectByUrl: vi.fn(),
  deleteStoredObjectsByPrefix: vi.fn(),
}))

import { auth } from '@/lib/auth'
import { verifyPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/db/client'
import { POST } from '@/app/api/account/delete/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockVerifyPassword = verifyPassword as ReturnType<typeof vi.fn>
const mockFindUnique = prisma.user.findUnique as ReturnType<typeof vi.fn>
const mockDelete = prisma.user.delete as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
  return new Request('http://localhost:3000/api/account/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockFindUnique.mockResolvedValue({
    id: 'user-1',
    password: 'hashed-password',
    image: 'http://localhost:9000/flashguides/avatars/user-1/avatar.jpg',
  })
  mockDelete.mockResolvedValue({ id: 'user-1' })
  mockVerifyPassword.mockResolvedValue(true)
  process.env['NEXTAUTH_SECRET'] = 'test-secret'
})

describe('POST /api/account/delete', () => {
  it('deletes the authenticated user account with the correct password', async () => {
    const res = await POST(makeRequest({ password: 'Passw0rd!123' }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ message: 'Account deleted' })
    expect(mockDelete).toHaveBeenCalledWith({ where: { id: 'user-1' } })
  })

  it('returns 401 for an incorrect password', async () => {
    mockVerifyPassword.mockResolvedValueOnce(false)

    const res = await POST(makeRequest({ password: 'wrong' }))

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('INCORRECT_PASSWORD')
    expect(body.error.message).toBe('Incorrect password')
    expect(body.error.requestId).toBeTruthy()
    expect(mockDelete).not.toHaveBeenCalled()
  })
})
