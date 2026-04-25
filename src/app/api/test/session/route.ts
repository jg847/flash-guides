import { NextResponse } from 'next/server'
import { z } from 'zod'
import { encode } from 'next-auth/jwt'
import { prisma } from '@/lib/db/client'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const seedSessionSchema = z.object({
  email: z.string().email(),
})

function isPlaywrightTestEnabled(): boolean {
  return process.env['NODE_ENV'] === 'test' || process.env['PLAYWRIGHT_TEST'] === '1'
}

export async function POST(req: Request) {
  try {
    if (!isPlaywrightTestEnabled()) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'NOT_FOUND',
        message: 'Not found',
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

    const parsed = seedSessionSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
      },
    })

    if (!user) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'USER_NOT_FOUND',
        message: 'User not found',
      })
    }

    const secret = process.env['AUTH_SECRET'] ?? process.env['NEXTAUTH_SECRET']
    if (!secret) {
      return createApiErrorResponse(req, {
        status: 500,
        code: 'MISSING_AUTH_SECRET',
        message: 'Missing auth secret',
      })
    }

    const sessionToken = await encode({
      secret,
      salt: 'authjs.session-token',
      token: {
        sub: user.id,
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.image,
        sessionVersion: 0,
      },
    })

    const response = NextResponse.json({ ok: true })
    response.cookies.set('authjs.session-token', sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })

    return response
  } catch (error) {
    return handleApiError(error, req)
  }
}
