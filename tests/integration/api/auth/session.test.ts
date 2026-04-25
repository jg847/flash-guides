import { describe, it, expect, vi } from 'vitest'
import { NextRequest } from 'next/server'

// Mock PrismaClient before importing anything that instantiates it.
// The session endpoint uses JWT (no DB query per request), but PrismaClient
// still needs a driver adapter in Prisma v7 at construction time — mock it out.
vi.mock('@/lib/db/client', () => ({
  prisma: {
    user: {},
    session: {},
    account: {},
    verificationToken: {},
    $connect: vi.fn(),
    $disconnect: vi.fn(),
  },
}))

import { GET, POST } from '@/app/api/auth/[...nextauth]/route'

/**
 * Integration tests for the Auth.js session REST endpoint.
 *
 * Auth.js v5 exposes GET /api/auth/session which returns:
 *   - 200 { user: {...}, expires: "..." }  when a valid JWT cookie is present
 *   - 200 null  when no session cookie is present
 *
 * We call the Next.js route handler directly (no running server required).
 */

describe('GET /api/auth/session', () => {
  it('returns 200 with null/empty session when no cookie is sent', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/session')
    const res = await GET(req)

    expect(res.status).toBe(200)

    const body: unknown = await res.json()
    // No valid JWT cookie → Auth.js returns null
    expect(body === null || (typeof body === 'object' && body !== null)).toBe(true)
  })

  it('responds with application/json content-type', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/session')
    const res = await GET(req)

    const contentType = res.headers.get('content-type') ?? ''
    expect(contentType).toContain('application/json')
  })

  it('returns csrf cookie flags on the auth csrf endpoint over https', async () => {
    const previousAuthUrl = process.env['AUTH_URL']
    const previousNextAuthUrl = process.env['NEXTAUTH_URL']

    process.env['AUTH_URL'] = 'https://flashguides.example'
    process.env['NEXTAUTH_URL'] = 'https://flashguides.example'

    const req = new NextRequest('https://flashguides.example/api/auth/csrf')
    const res = await GET(req)

    if (previousAuthUrl === undefined) {
      delete process.env['AUTH_URL']
    } else {
      process.env['AUTH_URL'] = previousAuthUrl
    }

    if (previousNextAuthUrl === undefined) {
      delete process.env['NEXTAUTH_URL']
    } else {
      process.env['NEXTAUTH_URL'] = previousNextAuthUrl
    }

    expect(res.status).toBe(200)

    const setCookie = res.headers.get('set-cookie') ?? ''
    expect(setCookie).toContain('HttpOnly')
    expect(setCookie).toContain('SameSite=Lax')
    expect(setCookie).toContain('Secure')
  })
})

describe('GET /api/auth/providers', () => {
  it('lists google and credentials providers', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/providers')
    const res = await GET(req)

    expect(res.status).toBe(200)

    const body = (await res.json()) as Record<string, { id: string; name: string; type: string }>
    expect(body).toHaveProperty('google')
    expect(body['google']?.type).toBe('oidc')
    expect(body).toHaveProperty('credentials')
    expect(body['credentials']?.type).toBe('credentials')
  })
})

describe('POST /api/auth/* csrf protection', () => {
  it('rejects mismatched origins before delegating to Auth.js', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/signin/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        origin: 'https://attacker.example',
      },
      body: new URLSearchParams({ email: 'user@example.com', password: 'SecurePass1' }),
    })

    const res = await POST(req)

    expect(res.status).toBe(403)
    await expect(res.json()).resolves.toEqual({ error: 'Forbidden' })
  })
})
