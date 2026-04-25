import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

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

    let body: { ip?: string }
    try {
      body = (await req.json()) as { ip?: string }
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

    await prisma.guestQuota.deleteMany({ where: { ip: body.ip } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return handleApiError(error, req)
  }
}
