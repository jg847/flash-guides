import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/client'
import { hashPassword } from '@/lib/auth/password'
import { createVerificationToken } from '@/lib/auth/tokens'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { sendVerificationEmail } from '@/lib/email'
import { validateOrigin } from '@/lib/security/csrf'
import { forbiddenCsrfResponse } from '@/lib/security/response'

const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(1).max(100).optional(),
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

    const parsed = registerSchema.safeParse(body)
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

    const { email, password, name } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return createApiErrorResponse(req, {
        status: 409,
        code: 'EMAIL_ALREADY_REGISTERED',
        message: 'Email already registered',
      })
    }

    const passwordHash = await hashPassword(password)

    await prisma.user.create({
      data: {
        email,
        name: name ?? null,
        password: passwordHash,
      },
    })

    const token = await createVerificationToken(email)
    await sendVerificationEmail(email, token)

    return NextResponse.json({ message: 'Verification email sent' }, { status: 201 })
  } catch (error) {
    return handleApiError(error, req)
  }
}
