import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/users', () => ({
  userRepository: {
    updateProfile: vi.fn(),
  },
}))

import { auth } from '@/lib/auth'
import { userRepository } from '@/lib/db/repositories/users'
import { PATCH } from '@/app/api/account/profile/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockUpdateProfile = userRepository.updateProfile as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
  return new Request('http://localhost:3000/api/account/profile', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockUpdateProfile.mockResolvedValue({
    id: 'user-1',
    name: 'Jeanpaul 🚀',
    email: 'jp@example.com',
    image: null,
  })
})

describe('PATCH /api/account/profile', () => {
  it('updates the authenticated user profile', async () => {
    const res = await PATCH(makeRequest({ name: 'Jeanpaul 🚀' }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      id: 'user-1',
      name: 'Jeanpaul 🚀',
      email: 'jp@example.com',
      image: null,
    })
    expect(mockUpdateProfile).toHaveBeenCalledWith('user-1', { name: 'Jeanpaul 🚀' })
  })

  it('returns 422 for invalid payload', async () => {
    const res = await PATCH(makeRequest({ name: '' }))

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string; issues: unknown[] }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.message).toBe('Validation failed')
    expect(body.error.requestId).toBeTruthy()
    expect(Array.isArray(body.error.issues)).toBe(true)
    expect(mockUpdateProfile).not.toHaveBeenCalled()
  })

  it('returns requestId-aware auth errors', async () => {
    mockAuth.mockResolvedValueOnce(null)

    const res = await PATCH(makeRequest({ name: 'Jeanpaul' }))

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
  })
})
