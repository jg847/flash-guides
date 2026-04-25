import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { userRepository } from '@/lib/db/repositories/users'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
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

    const parsed = updatePasswordSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const result = await userRepository.updatePassword(
      sessionUserId,
      parsed.data.currentPassword,
      parsed.data.newPassword,
    )

    if (result === 'incorrect-current') {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'CURRENT_PASSWORD_INCORRECT',
        message: 'Current password incorrect',
      })
    }

    if (result === 'not-found') {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'USER_NOT_FOUND',
        message: 'User not found',
      })
    }

    return NextResponse.json({ message: 'Password updated' })
  } catch (error) {
    return handleApiError(error, req)
  }
}
