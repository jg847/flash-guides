import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/client'
import { consumeVerificationToken } from '@/lib/auth/tokens'
import { hashPassword } from '@/lib/auth/password'

const schema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    const fields: Record<string, string[]> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString() ?? '_'
      ;(fields[key] ??= []).push(issue.message)
    }
    return NextResponse.json({ error: 'Validation failed', fields }, { status: 422 })
  }

  const { token, password } = parsed.data

  const identifier = await consumeVerificationToken(token)
  if (!identifier) {
    return NextResponse.json({ error: 'Token expired or invalid' }, { status: 410 })
  }

  const passwordHash = await hashPassword(password)

  await prisma.user.update({
    where: { email: identifier },
    data: { password: passwordHash },
  })

  return NextResponse.json({ message: 'Password updated' }, { status: 200 })
}
