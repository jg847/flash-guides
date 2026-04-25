import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { verifyPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/db/client'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { deleteStoredObjectByUrl, deleteStoredObjectsByPrefix } from '@/lib/storage/minio'

const deleteAccountSchema = z.object({
  password: z.string().min(1),
})

export async function POST(req: Request) {
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

    const parsed = deleteAccountSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionUserId },
      select: {
        id: true,
        password: true,
        image: true,
      },
    })

    if (!user || !user.password) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'USER_NOT_FOUND',
        message: 'User not found',
      })
    }

    const isValid = await verifyPassword(parsed.data.password, user.password)
    if (!isValid) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'INCORRECT_PASSWORD',
        message: 'Incorrect password',
      })
    }

    const avatarUrl = user.image
    await prisma.user.delete({ where: { id: sessionUserId } })

    await Promise.all([
      deleteStoredObjectByUrl(avatarUrl),
      deleteStoredObjectsByPrefix(`exports/${sessionUserId}/`),
    ]).catch(() => {
      // Best-effort cleanup of external objects after the DB delete succeeds.
    })

    const response = NextResponse.json({ message: 'Account deleted' })
    response.cookies.set('authjs.session-token', '', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })
    response.cookies.set('authjs.callback-url', '', {
      path: '/',
      maxAge: 0,
    })

    return response
  } catch (error) {
    return handleApiError(error, req)
  }
}
