import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

/**
 * Test-only endpoint to reset the guest quota for a given IP.
 * Only available when NODE_ENV=test to prevent misuse in production.
 */
export async function POST(req: Request) {
  if (process.env['NODE_ENV'] !== 'test') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const { ip } = (await req.json()) as { ip?: string }
  if (!ip) {
    return NextResponse.json({ error: 'ip required' }, { status: 400 })
  }

  await prisma.guestQuota.deleteMany({ where: { ip } })
  return NextResponse.json({ ok: true })
}
