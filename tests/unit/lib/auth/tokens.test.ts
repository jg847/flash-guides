import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Prisma before importing tokens
vi.mock('@/lib/db/client', () => ({
  prisma: {
    verificationToken: {
      deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
      create: vi.fn().mockResolvedValue({}),
      findUnique: vi.fn(),
      delete: vi.fn().mockResolvedValue({}),
    },
  },
}))

import { prisma } from '@/lib/db/client'
import {
  createVerificationToken,
  consumeVerificationToken,
  createPasswordResetToken,
} from '@/lib/auth/tokens'

const mockPrisma = prisma as unknown as {
  verificationToken: {
    deleteMany: ReturnType<typeof vi.fn>
    create: ReturnType<typeof vi.fn>
    findUnique: ReturnType<typeof vi.fn>
    delete: ReturnType<typeof vi.fn>
  }
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('createVerificationToken', () => {
  it('returns a 64-char hex string (32 bytes)', async () => {
    const token = await createVerificationToken('user@example.com')
    expect(token).toMatch(/^[0-9a-f]{64}$/)
  })

  it('deletes existing tokens for the identifier before creating', async () => {
    await createVerificationToken('user@example.com')
    expect(mockPrisma.verificationToken.deleteMany).toHaveBeenCalledWith({
      where: { identifier: 'user@example.com' },
    })
  })

  it('creates a token record with the correct identifier', async () => {
    await createVerificationToken('user@example.com')
    expect(mockPrisma.verificationToken.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ identifier: 'user@example.com' }),
      }),
    )
  })

  it('sets expiry ~24h in the future', async () => {
    const before = Date.now()
    await createVerificationToken('user@example.com')
    const after = Date.now()

    const createCall = mockPrisma.verificationToken.create.mock.calls[0] as [
      { data: { expires: Date } },
    ]
    const expires = createCall[0].data.expires.getTime()

    const expectedMin = before + 23 * 60 * 60 * 1000
    const expectedMax = after + 25 * 60 * 60 * 1000
    expect(expires).toBeGreaterThan(expectedMin)
    expect(expires).toBeLessThan(expectedMax)
  })
})

describe('createPasswordResetToken', () => {
  it('sets expiry ~1h in the future', async () => {
    const before = Date.now()
    await createPasswordResetToken('user@example.com')
    const after = Date.now()

    const createCall = mockPrisma.verificationToken.create.mock.calls[0] as [
      { data: { expires: Date } },
    ]
    const expires = createCall[0].data.expires.getTime()

    const expectedMin = before + 55 * 60 * 1000
    const expectedMax = after + 65 * 60 * 1000
    expect(expires).toBeGreaterThan(expectedMin)
    expect(expires).toBeLessThan(expectedMax)
  })
})

describe('consumeVerificationToken', () => {
  it('returns null when token not found', async () => {
    mockPrisma.verificationToken.findUnique.mockResolvedValueOnce(null)
    const result = await consumeVerificationToken('nonexistent')
    expect(result).toBeNull()
  })

  it('returns null and deletes when token is expired', async () => {
    mockPrisma.verificationToken.findUnique.mockResolvedValueOnce({
      identifier: 'user@example.com',
      token: 'expiredtoken',
      expires: new Date(Date.now() - 1000),
    })

    const result = await consumeVerificationToken('expiredtoken')
    expect(result).toBeNull()
    expect(mockPrisma.verificationToken.delete).toHaveBeenCalledWith({
      where: { token: 'expiredtoken' },
    })
  })

  it('returns the identifier and deletes the token on success', async () => {
    mockPrisma.verificationToken.findUnique.mockResolvedValueOnce({
      identifier: 'user@example.com',
      token: 'validtoken',
      expires: new Date(Date.now() + 60_000),
    })

    const result = await consumeVerificationToken('validtoken')
    expect(result).toBe('user@example.com')
    expect(mockPrisma.verificationToken.delete).toHaveBeenCalledWith({
      where: { token: 'validtoken' },
    })
  })
})
