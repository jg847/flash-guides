import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/client'
import { consumeVerificationToken } from '@/lib/auth/tokens'
import { hashPassword } from '@/lib/auth/password'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { validateOrigin } from '@/lib/security/csrf'
import { forbiddenCsrfResponse } from '@/lib/security/response'

const schema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

export async function POST(req: Request) {
  if (!validateOrigin(req)) {
    return forbiddenCsrfResponse()
  }

  try {
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

    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      const fields: Record<string, string[]> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString() ?? '_'
        ;(fields[key] ??= []).push(issue.message)
      }
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { fields },
      })
    }

    const { token, password } = parsed.data

    const identifier = await consumeVerificationToken(token)
    if (!identifier) {
      return createApiErrorResponse(req, {
        status: 410,
        code: 'TOKEN_INVALID',
        message: 'Token expired or invalid',
      })
    }

    const passwordHash = await hashPassword(password)

    await prisma.user.update({
      where: { email: identifier },
      data: { password: passwordHash },
    })

    return NextResponse.json({ message: 'Password updated' }, { status: 200 })
  } catch (error) {
    return handleApiError(error, req)
  }
}
