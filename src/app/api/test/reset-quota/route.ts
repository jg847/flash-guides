import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { GUEST_DAILY_LIMIT } from '@/lib/guest/quota'

function isPlaywrightTestEnabled(): boolean {
  return process.env['NODE_ENV'] === 'test' || process.env['PLAYWRIGHT_TEST'] === '1'
}

/**
 * Test-only endpoint to reset the guest quota for a given IP.
 * Only available when NODE_ENV=test to prevent misuse in production.
 */
export async function POST(req: Request) {
  try {
    if (!isPlaywrightTestEnabled()) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'NOT_FOUND',
        message: 'Not found',
      })
    }

    let body: { ip?: string; used?: number }
    try {
      body = (await req.json()) as { ip?: string; used?: number }
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    if (!body.ip) {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'IP_REQUIRED',
        message: 'ip required',
      })
    }

    if (
      body.used !== undefined &&
      (!Number.isInteger(body.used) || body.used < 0 || body.used > GUEST_DAILY_LIMIT)
    ) {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_USED_COUNT',
        message: `used must be an integer between 0 and ${GUEST_DAILY_LIMIT}`,
      })
    }

    if (!body.used) {
      await prisma.guestQuota.deleteMany({ where: { ip: body.ip } })
      return NextResponse.json({ ok: true, used: 0 })
    }

    const resetAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

    await prisma.guestQuota.upsert({
      where: { ip: body.ip },
      create: {
        ip: body.ip,
        count: body.used,
        resetAt,
      },
      update: {
        count: body.used,
        resetAt,
      },
    })

    return NextResponse.json({ ok: true, used: body.used })
  } catch (error) {
    return handleApiError(error, req)
  }
}
