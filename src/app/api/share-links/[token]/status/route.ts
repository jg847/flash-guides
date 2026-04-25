import { NextResponse } from 'next/server'
import { shareLinkRepository } from '@/lib/db/repositories/share-links'

export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const status = await shareLinkRepository.getStatusByToken(token)

  if (status !== 'active') {
    return NextResponse.json({ status }, { status: 410 })
  }

  return NextResponse.json({ status })
}
