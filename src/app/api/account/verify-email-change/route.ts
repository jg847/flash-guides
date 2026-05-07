import { NextResponse } from 'next/server'
import { consumeVerificationToken } from '@/lib/auth/tokens'
import { userRepository } from '@/lib/db/repositories/users'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { getAppUrl } from '@/lib/utils/app-url'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'MISSING_TOKEN',
        message: 'Missing token',
      })
    }

    const identifier = await consumeVerificationToken(token)
    if (!identifier || !identifier.startsWith('email-change:')) {
      return createApiErrorResponse(req, {
        status: 410,
        code: 'TOKEN_INVALID',
        message: 'Token expired or invalid',
      })
    }

    const userId = identifier.slice('email-change:'.length)
    const result = await userRepository.confirmEmailChange(userId)
    const appUrl = getAppUrl()

    if (result === 'updated') {
      return NextResponse.redirect(new URL('/account?emailChanged=1', appUrl))
    }

    if (result === 'email-in-use') {
      return NextResponse.redirect(new URL('/account?emailChanged=conflict', appUrl))
    }

    return NextResponse.redirect(new URL('/account?emailChanged=invalid', appUrl))
  } catch (error) {
    return handleApiError(error, req)
  }
}
