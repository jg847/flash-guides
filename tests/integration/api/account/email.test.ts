import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/users', () => ({
  userRepository: {
    beginEmailChange: vi.fn(),
    confirmEmailChange: vi.fn(),
  },
}))

vi.mock('@/lib/auth/tokens', () => ({
  createVerificationToken: vi.fn(),
  consumeVerificationToken: vi.fn(),
}))

vi.mock('@/lib/email', () => ({
  sendEmailChangeVerification: vi.fn(),
}))

import { auth } from '@/lib/auth'
import { createVerificationToken, consumeVerificationToken } from '@/lib/auth/tokens'
import { userRepository } from '@/lib/db/repositories/users'
import { sendEmailChangeVerification } from '@/lib/email'
import { PATCH } from '@/app/api/account/email/route'
import { GET } from '@/app/api/account/verify-email-change/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockBeginEmailChange = userRepository.beginEmailChange as ReturnType<typeof vi.fn>
const mockConfirmEmailChange = userRepository.confirmEmailChange as ReturnType<typeof vi.fn>
const mockCreateVerificationToken = createVerificationToken as ReturnType<typeof vi.fn>
const mockConsumeVerificationToken = consumeVerificationToken as ReturnType<typeof vi.fn>
const mockSendEmailChangeVerification = sendEmailChangeVerification as ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockBeginEmailChange.mockResolvedValue('updated')
  mockConfirmEmailChange.mockResolvedValue('updated')
  mockCreateVerificationToken.mockResolvedValue('email-change-token')
  mockConsumeVerificationToken.mockResolvedValue('email-change:user-1')
  mockSendEmailChangeVerification.mockResolvedValue(undefined)
  process.env['NEXTAUTH_URL'] = 'http://localhost:3000'
})

function makePatchRequest(body: unknown) {
  return new Request('http://localhost:3000/api/account/email', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('account email routes', () => {
  it('sends a verification email for a valid pending email change', async () => {
    const res = await PATCH(makePatchRequest({ email: 'new@example.com' }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ message: 'Verification email sent' })
    expect(mockBeginEmailChange).toHaveBeenCalledWith('user-1', 'new@example.com')
    expect(mockCreateVerificationToken).toHaveBeenCalledWith('email-change:user-1')
    expect(mockSendEmailChangeVerification).toHaveBeenCalledWith(
      'new@example.com',
      'email-change-token',
    )
  })

  it('returns 409 when the target email is already taken', async () => {
    mockBeginEmailChange.mockResolvedValueOnce('email-in-use')

    const res = await PATCH(makePatchRequest({ email: 'taken@example.com' }))

    expect(res.status).toBe(409)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('EMAIL_IN_USE')
    expect(body.error.message).toBe('Email already in use')
    expect(body.error.requestId).toBeTruthy()
    expect(mockCreateVerificationToken).not.toHaveBeenCalled()
  })

  it('returns requestId-aware missing token errors for verify-email-change', async () => {
    const res = await GET(new Request('http://localhost:3000/api/account/verify-email-change'))

    expect(res.status).toBe(400)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('MISSING_TOKEN')
    expect(body.error.message).toBe('Missing token')
    expect(body.error.requestId).toBeTruthy()
  })

  it('verifies the email-change token and redirects back to account', async () => {
    const res = await GET(
      new Request('http://localhost:3000/api/account/verify-email-change?token=valid-token'),
    )

    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe('http://localhost:3000/account?emailChanged=1')
    expect(mockConsumeVerificationToken).toHaveBeenCalledWith('valid-token')
    expect(mockConfirmEmailChange).toHaveBeenCalledWith('user-1')
  })
})
