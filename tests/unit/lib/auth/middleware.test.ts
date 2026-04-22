import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import {
  isProtectedRoute,
  buildLoginRedirect,
  authorizedCallback,
  type AuthorizedParams,
} from '@/lib/auth/middleware'

// ─── isProtectedRoute ────────────────────────────────────────────────────────

describe('isProtectedRoute', () => {
  it.each([
    ['/dashboard', true],
    ['/dashboard/guides', true],
    ['/account', true],
    ['/account/settings', true],
    ['/api/guides', true],
    ['/api/guides/123', true],
  ])('returns true for protected path %s', (path, expected) => {
    expect(isProtectedRoute(path)).toBe(expected)
  })

  it.each([
    ['/', false],
    ['/login', false],
    ['/guide/some-slug', false],
    ['/gallery', false],
    ['/api/health', false],
    ['/api/auth/session', false],
  ])('returns false for public path %s', (path, expected) => {
    expect(isProtectedRoute(path)).toBe(expected)
  })
})

// ─── buildLoginRedirect ───────────────────────────────────────────────────────

describe('buildLoginRedirect', () => {
  it('redirects to /login with callbackUrl query param', () => {
    const req = new NextRequest('http://localhost:3000/dashboard/guides')
    const response = buildLoginRedirect(req)

    expect(response.status).toBe(307)
    const location = response.headers.get('location') ?? ''
    expect(location).toContain('/login')
    expect(location).toContain('callbackUrl=%2Fdashboard%2Fguides')
  })

  it('preserves query string in callbackUrl', () => {
    const req = new NextRequest('http://localhost:3000/dashboard?tab=favorites')
    const response = buildLoginRedirect(req)

    const location = response.headers.get('location') ?? ''
    expect(location).toContain('callbackUrl=')
    expect(decodeURIComponent(location)).toContain('/dashboard?tab=favorites')
  })
})

// ─── authorizedCallback ───────────────────────────────────────────────────────

function makeAuthParams(pathname: string, userId?: string): AuthorizedParams {
  const request = new NextRequest(`http://localhost:3000${pathname}`)
  const auth = userId
    ? {
        user: { id: userId, email: 'test@example.com', name: null, image: null },
        expires: new Date(Date.now() + 3600_000).toISOString(),
      }
    : null
  return { request, auth }
}

describe('authorizedCallback', () => {
  it('allows unauthenticated access to public routes', () => {
    const result = authorizedCallback(makeAuthParams('/'))
    expect(result).toBe(true)
  })

  it('allows unauthenticated access to /login', () => {
    const result = authorizedCallback(makeAuthParams('/login'))
    expect(result).toBe(true)
  })

  it('allows unauthenticated access to /guide/slug', () => {
    const result = authorizedCallback(makeAuthParams('/guide/my-guide'))
    expect(result).toBe(true)
  })

  it('allows authenticated access to /dashboard', () => {
    const result = authorizedCallback(makeAuthParams('/dashboard', 'user-123'))
    expect(result).toBe(true)
  })

  it('redirects unauthenticated request to /dashboard to login', () => {
    const result = authorizedCallback(makeAuthParams('/dashboard'))
    expect(result).not.toBe(true)
    // authorizedCallback returns a NextResponse redirect
    const response = result as Response
    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toContain('/login')
  })

  it('redirects unauthenticated request to /account to login', () => {
    const result = authorizedCallback(makeAuthParams('/account'))
    const response = result as Response
    expect(response.status).toBe(307)
  })

  it('redirects unauthenticated request to /api/guides to login', () => {
    const result = authorizedCallback(makeAuthParams('/api/guides'))
    const response = result as Response
    expect(response.status).toBe(307)
  })
})
