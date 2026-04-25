import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { userRepository } from '@/lib/db/repositories/users'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

export async function DELETE(req: Request, { params }: { params: Promise<{ provider: string }> }) {
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

    const { provider } = await params
    const result = await userRepository.disconnectOAuthProvider(sessionUserId, provider)

    if (result === 'only-login-method') {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'ONLY_LOGIN_METHOD',
        message: 'Cannot remove your only login method',
      })
    }

    if (result === 'not-found') {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'PROVIDER_NOT_FOUND',
        message: 'Provider not found',
      })
    }

    return NextResponse.json({ message: 'Disconnected' })
  } catch (error) {
    return handleApiError(error, req)
  }
}
