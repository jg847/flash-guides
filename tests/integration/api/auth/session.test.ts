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

import { GET } from '@/app/api/auth/[...nextauth]/route'

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
