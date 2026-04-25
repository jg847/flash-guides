import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      updateMany: vi.fn(),
      update: vi.fn(),
    },
  },
}))

vi.mock('@/lib/auth/password', () => ({
  hashPassword: vi.fn().mockResolvedValue('$2b$12$mockedhashedpasswordvalue'),
  verifyPassword: vi.fn().mockResolvedValue(true),
}))

import { prisma } from '@/lib/db/client'
import { userRepository } from '@/lib/db/repositories/users'

const mockFindUnique = prisma.user.findUnique as ReturnType<typeof vi.fn>
const mockUpdateMany = prisma.user.updateMany as ReturnType<typeof vi.fn>
const mockUpdate = prisma.user.update as ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.clearAllMocks()
  mockFindUnique.mockResolvedValue({
    id: 'user-1',
    name: 'Jeanpaul',
    email: 'jp@example.com',
    image: null,
    password: '$2b$12$abcdefghijklmnopqrstuv',
    sessionVersion: 0,
    accounts: [{ provider: 'google' }],
  })
  mockUpdateMany.mockResolvedValue({ count: 1 })
  mockUpdate.mockResolvedValue({ id: 'user-1' })
})

describe('UserRepository', () => {
  it('updates profile fields', async () => {
    const result = await userRepository.updateProfile('user-1', { name: 'JP' })

    expect(mockUpdateMany).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: { name: 'JP' },
    })
    expect(result?.name).toBe('Jeanpaul')
  })

  it('returns account page user with password and provider summary', async () => {
    const result = await userRepository.getAccountPageUser('user-1')

    expect(result).toEqual({
      id: 'user-1',
      name: 'Jeanpaul',
      email: 'jp@example.com',
      image: null,
      hasPassword: true,
      sessionVersion: 0,
      providers: ['google'],
    })
  })

  it('increments session version when password is updated', async () => {
    const result = await userRepository.updatePassword('user-1', 'correct-current', 'NewPass123')

    expect(result).toBe('updated')
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: {
        password: expect.stringMatching(/^\$2[ab]\$/),
        sessionVersion: { increment: 1 },
      },
    })
  })
})
