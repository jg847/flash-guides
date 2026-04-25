import { randomUUID } from 'node:crypto'
import { NextResponse, type NextRequest } from 'next/server'

export const REQUEST_ID_HEADER = 'x-request-id'

export function getOrCreateRequestId(request: Request | NextRequest): string {
  const existingRequestId = request.headers.get(REQUEST_ID_HEADER)?.trim()
  return existingRequestId || randomUUID()
}

export function withRequestId<T extends Response>(response: T, requestId: string): T {
  response.headers.set(REQUEST_ID_HEADER, requestId)
  return response
}

export function createRequestIdPassthroughResponse(
  request: NextRequest,
  requestId = getOrCreateRequestId(request),
) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(REQUEST_ID_HEADER, requestId)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set(REQUEST_ID_HEADER, requestId)

  return response
}
