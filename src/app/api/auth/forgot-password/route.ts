import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/client'
import { createPasswordResetToken } from '@/lib/auth/tokens'
import { sendPasswordResetEmail } from '@/lib/email'

const schema = z.object({ email: z.string().email() })

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 422 })
  }

  const { email } = parsed.data

  // Always return 200 — do not reveal whether the email exists (no enumeration)
  const user = await prisma.user.findUnique({ where: { email } })

  if (user) {
    const token = await createPasswordResetToken(email)
    await sendPasswordResetEmail(email, token)
  }

  return NextResponse.json(
    { message: 'If that email exists, a reset link has been sent' },
    { status: 200 },
  )
}
