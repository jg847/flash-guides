import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { getLogger, withRequestLogger } from '@/lib/logger'
import { getOrCreateRequestId, withRequestId } from '@/lib/logger/middleware'
import { applySecurityHeaders } from '@/lib/security/headers'

export async function GET(request: Request) {
  const requestId = getOrCreateRequestId(request)

  return withRequestLogger(requestId, async () => {
    const logger = getLogger()

    try {
      await prisma.$queryRaw`SELECT 1`
      logger.info({ event: 'health.check.ok' }, 'Health check succeeded')
      return withRequestId(
        applySecurityHeaders(
          NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() }),
        ),
        requestId,
      )
    } catch {
      logger.error({ event: 'health.check.error' }, 'Health check failed')
      return withRequestId(
        applySecurityHeaders(NextResponse.json({ status: 'error' }, { status: 503 })),
        requestId,
      )
    }
  })
}
