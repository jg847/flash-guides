import { NextResponse } from 'next/server'
import { getLogger } from '@/lib/logger'
import { getOrCreateRequestId, withRequestId } from '@/lib/logger/middleware'
import { captureError } from '@/lib/errors/sentry'
import { applySecurityHeaders } from '@/lib/security/headers'

export interface ApiErrorResponseOptions {
  status: number
  code: string
  message: string
  details?: Record<string, unknown>
  headers?: HeadersInit
}

export class ApiRouteError extends Error {
  status: number
  code: string
  details?: Record<string, unknown>
  headers?: HeadersInit

  constructor(options: ApiErrorResponseOptions) {
    super(options.message)
    this.name = 'ApiRouteError'
    this.status = options.status
    this.code = options.code
    this.details = options.details
    this.headers = options.headers
  }
}

function resolveRequestId(requestOrId: Request | string): string {
  return typeof requestOrId === 'string' ? requestOrId : getOrCreateRequestId(requestOrId)
}

export function createApiErrorResponse(
  requestOrId: Request | string,
  options: ApiErrorResponseOptions,
): Response {
  const requestId = resolveRequestId(requestOrId)

  const response = NextResponse.json(
    {
      error: {
        code: options.code,
        message: options.message,
        requestId,
        ...(options.details ?? {}),
      },
    },
    {
      status: options.status,
      headers: options.headers,
    },
  )

  return withRequestId(applySecurityHeaders(response), requestId)
}

export function handleApiError(error: unknown, requestOrId: Request | string): Response {
  if (error instanceof ApiRouteError) {
    return createApiErrorResponse(requestOrId, error)
  }

  const requestId = resolveRequestId(requestOrId)

  getLogger().error({ error, event: 'api.error.unhandled', requestId }, 'Unhandled API route error')
  void captureError(error, {
    source: 'api',
    requestId,
  })

  return createApiErrorResponse(requestId, {
    status: 500,
    code: 'INTERNAL_ERROR',
    message:
      process.env['NODE_ENV'] === 'production'
        ? 'An unexpected error occurred'
        : error instanceof Error
          ? error.message
          : 'An unexpected error occurred',
  })
}
