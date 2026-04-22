import type { NextAuthConfig, Session } from 'next-auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Routes that require an authenticated session.
 * /guide/:path* is intentionally public — guests can view watermarked guides.
 * Individual route handlers enforce ownership for mutations.
 */
const PROTECTED_PREFIXES = ['/dashboard', '/account', '/api/guides'] as const

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

export function buildLoginRedirect(req: NextRequest): NextResponse {
  const loginUrl = new URL('/login', req.nextUrl.origin)
  loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname + req.nextUrl.search)
  return NextResponse.redirect(loginUrl)
}

export type AuthorizedParams = {
  request: NextRequest
  auth: Session | null
}

export function authorizedCallback({ auth, request }: AuthorizedParams): boolean | NextResponse {
  if (!isProtectedRoute(request.nextUrl.pathname)) return true
  if (auth?.user) return true
  return buildLoginRedirect(request)
}

export const authorizedCallbackConfig: NonNullable<NextAuthConfig['callbacks']>['authorized'] =
  authorizedCallback
