import { auth } from '@/lib/auth'

/**
 * Next.js Edge Middleware — delegates to Auth.js v5 `auth`.
 *
 * The `authorized` callback (src/lib/auth/middleware.ts) controls which
 * routes require a session. The matcher below ensures this runs only on
 * navigable paths and skips static assets, Next.js internals, and the
 * auth API routes themselves.
 */
export default auth

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     *   - _next/static  (Next.js static files)
     *   - _next/image   (Next.js image optimization)
     *   - favicon.ico
     *   - api/auth      (Auth.js own endpoints — must be public)
     *   - api/health    (health check — must be public)
     *   - .*\\..*       (files with extensions — public assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth|api/health|.*\\..*).+)',
  ],
}
