import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { extractIp, getQuotaStatus, GUEST_DAILY_LIMIT } from '@/lib/guest/quota'

export async function GET(req: Request) {
  // Registered users have unlimited generation — return max quota
  const session = await auth()
  if (session?.user?.id) {
    return NextResponse.json({
      used: 0,
      limit: GUEST_DAILY_LIMIT,
      resetsAt: null,
    })
  }

  const ip = extractIp(req)
  const status = await getQuotaStatus(ip)

  return NextResponse.json({
    used: status.used,
    limit: status.limit,
    resetsAt: status.resetsAt.toISOString(),
  })
}
