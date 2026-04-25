import { NextResponse } from 'next/server'
import { consumeVerificationToken } from '@/lib/auth/tokens'
import { userRepository } from '@/lib/db/repositories/users'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const APP_URL = process.env['NEXTAUTH_URL'] ?? 'http://localhost:3000'

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

    if (result === 'updated') {
      return NextResponse.redirect(new URL('/account?emailChanged=1', APP_URL))
    }

    if (result === 'email-in-use') {
      return NextResponse.redirect(new URL('/account?emailChanged=conflict', APP_URL))
    }

    return NextResponse.redirect(new URL('/account?emailChanged=invalid', APP_URL))
  } catch (error) {
    return handleApiError(error, req)
  }
}
