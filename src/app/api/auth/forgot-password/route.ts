import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/client'
import { createPasswordResetToken } from '@/lib/auth/tokens'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { sendPasswordResetEmail } from '@/lib/email'
import { validateOrigin } from '@/lib/security/csrf'
import { forbiddenCsrfResponse } from '@/lib/security/response'

const schema = z.object({ email: z.string().email() })

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
      return createApiErrorResponse(req, {
        status: 422,
        code: 'INVALID_EMAIL_ADDRESS',
        message: 'Invalid email address',
      })
    }

    const { email } = parsed.data

    const user = await prisma.user.findUnique({ where: { email } })

    if (user) {
      const token = await createPasswordResetToken(email)
      await sendPasswordResetEmail(email, token)
    }

    return NextResponse.json(
      { message: 'If that email exists, a reset link has been sent' },
      { status: 200 },
    )
  } catch (error) {
    return handleApiError(error, req)
  }
}
