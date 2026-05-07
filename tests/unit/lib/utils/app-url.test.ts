import { describe, expect, it, vi } from 'vitest'

describe('getAppUrl', () => {
  it('uses NEXT_PUBLIC_APP_URL when available', async () => {
    vi.resetModules()
    vi.stubEnv('NEXT_PUBLIC_APP_URL', 'https://flashguides.example.com')
    vi.stubEnv('NEXTAUTH_URL', '')
    vi.stubEnv('AUTH_URL', '')
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', '')
    vi.stubEnv('VERCEL_URL', '')

    const { getAppUrl } = await import('@/lib/utils/app-url')

    expect(getAppUrl()).toBe('https://flashguides.example.com')
  })

  it('uses Vercel host values when auth urls are not set', async () => {
    vi.resetModules()
    vi.stubEnv('NEXT_PUBLIC_APP_URL', '')
    vi.stubEnv('NEXTAUTH_URL', '')
    vi.stubEnv('AUTH_URL', '')
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', 'flash-guides.vercel.app')
    vi.stubEnv('VERCEL_URL', '')

    const { getAppUrl } = await import('@/lib/utils/app-url')

    expect(getAppUrl()).toBe('https://flash-guides.vercel.app')
  })

  it('falls back to localhost when no deployment url is configured', async () => {
    vi.resetModules()
    vi.stubEnv('NEXT_PUBLIC_APP_URL', '')
    vi.stubEnv('NEXTAUTH_URL', '')
    vi.stubEnv('AUTH_URL', '')
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', '')
    vi.stubEnv('VERCEL_URL', '')

    const { getAppUrl } = await import('@/lib/utils/app-url')

    expect(getAppUrl()).toBe('http://localhost:3000')
  })
})
