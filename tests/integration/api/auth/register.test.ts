import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Prisma and email modules before importing the route handler
vi.mock('@/lib/db/client', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}))

vi.mock('@/lib/auth/tokens', () => ({
  createVerificationToken: vi.fn().mockResolvedValue('mock-token-hex'),
}))

vi.mock('@/lib/email', () => ({
  sendVerificationEmail: vi.fn().mockResolvedValue(undefined),
}))

import { prisma } from '@/lib/db/client'
import { sendVerificationEmail } from '@/lib/email'
import { POST } from '@/app/api/auth/register/route'

const mockPrismaUser = prisma.user as unknown as {
  findUnique: ReturnType<typeof vi.fn>
  create: ReturnType<typeof vi.fn>
}

const mockSendEmail = sendVerificationEmail as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
  return new Request('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  mockPrismaUser.findUnique.mockResolvedValue(null)
  mockPrismaUser.create.mockResolvedValue({
    id: 'user-1',
    email: 'test@example.com',
    name: null,
    password: 'hashed',
  })
})

describe('POST /api/auth/register', () => {
  it('returns 201 and sends verification email for valid payload', async () => {
    const res = await POST(makeRequest({ email: 'new@example.com', password: 'SecurePass1' }))

    expect(res.status).toBe(201)
    const body = (await res.json()) as { message: string }
    expect(body.message).toBe('Verification email sent')
    expect(mockSendEmail).toHaveBeenCalledWith('new@example.com', 'mock-token-hex')
  })

  it('creates the user with a hashed password', async () => {
    await POST(makeRequest({ email: 'new@example.com', password: 'SecurePass1' }))

    expect(mockPrismaUser.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ email: 'new@example.com' }),
      }),
    )

    const createArg = (mockPrismaUser.create.mock.calls[0] as [{ data: { password: string } }])[0]
    expect(createArg.data.password).toMatch(/^\$2[ab]\$/)
  })

  it('returns 409 for duplicate email', async () => {
    mockPrismaUser.findUnique.mockResolvedValueOnce({
      id: 'existing',
      email: 'dupe@example.com',
    })

    const res = await POST(makeRequest({ email: 'dupe@example.com', password: 'SecurePass1' }))

    expect(res.status).toBe(409)
    const body = (await res.json()) as { error: string }
    expect(body.error).toBe('Email already registered')
    expect(mockPrismaUser.create).not.toHaveBeenCalled()
  })

  it('returns 422 for missing email', async () => {
    const res = await POST(makeRequest({ password: 'SecurePass1' }))

    expect(res.status).toBe(422)
    const body = (await res.json()) as { error: string; fields: Record<string, string[]> }
    expect(body.error).toBe('Validation failed')
    expect(body.fields).toHaveProperty('email')
  })

  it('returns 422 for weak password (no uppercase)', async () => {
    const res = await POST(makeRequest({ email: 'new@example.com', password: 'nouppercase1' }))

    expect(res.status).toBe(422)
    const body = (await res.json()) as { fields: Record<string, string[]> }
    expect(body.fields).toHaveProperty('password')
  })

  it('returns 422 for password shorter than 8 chars', async () => {
    const res = await POST(makeRequest({ email: 'new@example.com', password: 'Ab1' }))

    expect(res.status).toBe(422)
    const body = (await res.json()) as { fields: Record<string, string[]> }
    expect(body.fields?.password?.[0]).toMatch(/8 characters/)
  })

  it('returns 400 for non-JSON body', async () => {
    const res = await POST(
      new Request('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: 'not-json',
      }),
    )
    expect(res.status).toBe(400)
  })
})
