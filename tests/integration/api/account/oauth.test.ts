import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/users', () => ({
  userRepository: {
    disconnectOAuthProvider: vi.fn(),
  },
}))

import { auth } from '@/lib/auth'
import { userRepository } from '@/lib/db/repositories/users'
import { DELETE } from '@/app/api/account/oauth/[provider]/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockDisconnectOAuthProvider = userRepository.disconnectOAuthProvider as ReturnType<
  typeof vi.fn
>

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockDisconnectOAuthProvider.mockResolvedValue('disconnected')
})

describe('DELETE /api/account/oauth/[provider]', () => {
  it('disconnects a linked provider when another login method exists', async () => {
    const res = await DELETE(
      new Request('http://localhost:3000/api/account/oauth/google', { method: 'DELETE' }),
      {
        params: Promise.resolve({ provider: 'google' }),
      },
    )

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ message: 'Disconnected' })
    expect(mockDisconnectOAuthProvider).toHaveBeenCalledWith('user-1', 'google')
  })

  it('returns 400 when removing the only login method', async () => {
    mockDisconnectOAuthProvider.mockResolvedValueOnce('only-login-method')

    const res = await DELETE(
      new Request('http://localhost:3000/api/account/oauth/google', { method: 'DELETE' }),
      {
        params: Promise.resolve({ provider: 'google' }),
      },
    )

    expect(res.status).toBe(400)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('ONLY_LOGIN_METHOD')
    expect(body.error.message).toBe('Cannot remove your only login method')
    expect(body.error.requestId).toBeTruthy()
  })
})
