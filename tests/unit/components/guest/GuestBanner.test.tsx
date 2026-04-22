import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock auth
vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn(),
}))

// Mock getQuotaStatus
vi.mock('@/lib/guest/quota', () => ({
  getQuotaStatus: vi.fn(),
  GUEST_DAILY_LIMIT: 3,
}))

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { getQuotaStatus } from '@/lib/guest/quota'
import GuestBanner from '@/components/guest/GuestBanner'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockHeaders = headers as ReturnType<typeof vi.fn>
const mockGetQuotaStatus = getQuotaStatus as ReturnType<typeof vi.fn>

function futureReset(): Date {
  const d = new Date()
  d.setUTCHours(24, 0, 0, 0)
  return d
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue(null)
  mockHeaders.mockResolvedValue(new Headers({ 'x-forwarded-for': '1.2.3.4' }))
  mockGetQuotaStatus.mockResolvedValue({
    used: 0,
    limit: 3,
    resetsAt: futureReset(),
    allowed: true,
  })
})

describe('GuestBanner', () => {
  it('renders banner with quota count for guest user', async () => {
    mockGetQuotaStatus.mockResolvedValueOnce({
      used: 2,
      limit: 3,
      resetsAt: futureReset(),
      allowed: true,
    })

    const jsx = await GuestBanner()
    render(jsx as React.ReactElement)

    expect(screen.getByText(/2 of 3 free guides/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign up free/i })).toHaveAttribute('href', '/register')
  })

  it('renders banner with used=0 when no guides generated yet', async () => {
    const jsx = await GuestBanner()
    render(jsx as React.ReactElement)

    expect(screen.getByText(/0 of 3 free guides/i)).toBeInTheDocument()
  })

  it('returns null for authenticated users', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user-1', email: 'a@b.com' } })

    const jsx = await GuestBanner()
    expect(jsx).toBeNull()
  })

  it('shows the guest banner role', async () => {
    const jsx = await GuestBanner()
    render(jsx as React.ReactElement)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
