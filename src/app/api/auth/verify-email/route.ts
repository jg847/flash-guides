import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { consumeVerificationToken } from '@/lib/auth/tokens'
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

    if (!identifier) {
      return createApiErrorResponse(req, {
        status: 410,
        code: 'TOKEN_INVALID',
        message: 'Token expired or invalid',
      })
    }

    await prisma.user.update({
      where: { email: identifier },
      data: { emailVerified: new Date() },
    })

    return NextResponse.redirect(new URL('/dashboard?verified=1', getAppUrl()))
  } catch (error) {
    return handleApiError(error, req)
  }
}
