import { NextResponse } from 'next/server'
import {
  createRequestIdPassthroughResponse,
  getOrCreateRequestId,
  withRequestId,
} from '@/lib/logger/middleware'
import { proxyAuth } from '@/lib/auth/proxy'
import { validateOrigin } from '@/lib/security/csrf'
import { applySecurityHeaders } from '@/lib/security/headers'
import { maybeRewriteUnavailableShare } from '@/lib/sharing/proxy'

/**
 * Next.js Proxy — delegates to Auth.js v5 `auth`.
 *
 * The `authorized` callback (src/lib/auth/middleware.ts) controls which
 * routes require a session. The matcher below ensures this runs only on
 * navigable paths and skips static assets, Next.js internals, and the
 * auth API routes themselves.
 */
export default proxyAuth(async (request) => {
  const requestId = getOrCreateRequestId(request)

  if (
    request.nextUrl.pathname.startsWith('/api/') &&
    !request.nextUrl.pathname.startsWith('/api/test/') &&
    validateOrigin(request) === false
  ) {
    return withRequestId(
      applySecurityHeaders(NextResponse.json({ error: 'Forbidden' }, { status: 403 })),
      requestId,
    )
  }

  const shareRewrite = await maybeRewriteUnavailableShare(request)
  if (shareRewrite) {
    return withRequestId(applySecurityHeaders(shareRewrite), requestId)
  }

  return applySecurityHeaders(createRequestIdPassthroughResponse(request, requestId))
})

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     *   - _next/static  (Next.js static files)
     *   - _next/image   (Next.js image optimization)
     *   - favicon.ico
     *   - api/auth      (Auth.js own endpoints — must be public)
     *   - api/health    (health check — must be public)
     *   - .*\..*       (files with extensions — public assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth|api/health|.*\\..*).+)',
  ],
}
