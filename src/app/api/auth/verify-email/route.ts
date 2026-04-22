import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { consumeVerificationToken } from '@/lib/auth/tokens'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  const identifier = await consumeVerificationToken(token)

  if (!identifier) {
    return NextResponse.json({ error: 'Token expired or invalid' }, { status: 410 })
  }

  await prisma.user.update({
    where: { email: identifier },
    data: { emailVerified: new Date() },
  })

  return NextResponse.redirect(
    new URL('/dashboard?verified=1', process.env['NEXTAUTH_URL'] ?? 'http://localhost:3000'),
  )
}
