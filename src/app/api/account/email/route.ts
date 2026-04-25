import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { createVerificationToken } from '@/lib/auth/tokens'
import { userRepository } from '@/lib/db/repositories/users'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { sendEmailChangeVerification } from '@/lib/email'

const updateEmailSchema = z.object({
  email: z.string().trim().email(),
})

export async function PATCH(req: Request) {
  try {
    const session = await auth()
    const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = updateEmailSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const result = await userRepository.beginEmailChange(sessionUserId, parsed.data.email)
    if (result === 'email-in-use') {
      return createApiErrorResponse(req, {
        status: 409,
        code: 'EMAIL_IN_USE',
        message: 'Email already in use',
      })
    }

    if (result === 'not-found') {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'USER_NOT_FOUND',
        message: 'User not found',
      })
    }

    const token = await createVerificationToken(`email-change:${sessionUserId}`)
    await sendEmailChangeVerification(parsed.data.email.trim().toLowerCase(), token)

    return NextResponse.json({ message: 'Verification email sent' })
  } catch (error) {
    return handleApiError(error, req)
  }
}
