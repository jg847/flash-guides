import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { reseedDatabase } from '@/lib/db/seed'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

let reseedQueue: Promise<void> = Promise.resolve()

function isPlaywrightTestEnabled(): boolean {
  return process.env['NODE_ENV'] === 'test' || process.env['PLAYWRIGHT_TEST'] === '1'
}

export async function POST(req: Request) {
  try {
    if (!isPlaywrightTestEnabled()) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'NOT_FOUND',
        message: 'Not found',
      })
    }

    const reseedTask = reseedQueue.then(async () => {
      await reseedDatabase(prisma)
    })

    reseedQueue = reseedTask.catch(() => undefined)

    await reseedTask

    return NextResponse.json({ ok: true })
  } catch (error) {
    return handleApiError(error, req)
  }
}
