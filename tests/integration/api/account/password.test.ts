import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/users', () => ({
  userRepository: {
    updatePassword: vi.fn(),
  },
}))

import { auth } from '@/lib/auth'
import { userRepository } from '@/lib/db/repositories/users'
import { PATCH } from '@/app/api/account/password/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockUpdatePassword = userRepository.updatePassword as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
  return new Request('http://localhost:3000/api/account/password', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockUpdatePassword.mockResolvedValue('updated')
})

describe('PATCH /api/account/password', () => {
  it('updates password when the current password is correct', async () => {
    const res = await PATCH(
      makeRequest({ currentPassword: 'Current123', newPassword: 'NewPass123' }),
    )

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ message: 'Password updated' })
    expect(mockUpdatePassword).toHaveBeenCalledWith('user-1', 'Current123', 'NewPass123')
  })

  it('returns 401 when the current password is incorrect', async () => {
    mockUpdatePassword.mockResolvedValueOnce('incorrect-current')

    const res = await PATCH(makeRequest({ currentPassword: 'Wrong123', newPassword: 'NewPass123' }))

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('CURRENT_PASSWORD_INCORRECT')
    expect(body.error.message).toBe('Current password incorrect')
    expect(body.error.requestId).toBeTruthy()
  })
})
