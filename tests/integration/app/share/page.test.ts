import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createElement } from 'react'

vi.mock('@/lib/auth', () => ({ auth: vi.fn() }))
vi.mock('@/lib/auth/session', async () => {
  const actual = await vi.importActual<typeof import('@/lib/auth/session')>('@/lib/auth/session')
  return {
    ...actual,
    hasAuthenticatedUser: vi.fn(),
  }
})
vi.mock('@/lib/db/repositories/share-links', () => ({
  shareLinkRepository: {
    visitByToken: vi.fn(),
  },
}))
vi.mock('@/components/guide/GuideRenderer', () => ({
  default: ({ guide, isReadOnly }: { guide: { title: string }; isReadOnly?: boolean }) =>
    createElement(
      'div',
      null,
      createElement('span', null, guide.title),
      createElement('span', null, String(isReadOnly)),
    ),
}))
vi.mock('@/components/sharing/ForkButton', () => ({
  default: () => createElement('button', null, 'Fork to my guides'),
}))

import { auth } from '@/lib/auth'
import { hasAuthenticatedUser } from '@/lib/auth/session'
import { shareLinkRepository } from '@/lib/db/repositories/share-links'
import SharedGuidePage from '@/app/share/[token]/page'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockHasAuthenticatedUser = hasAuthenticatedUser as ReturnType<typeof vi.fn>
const mockVisitByToken = shareLinkRepository.visitByToken as ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue(null)
  mockHasAuthenticatedUser.mockReturnValue(false)
})

describe('SharedGuidePage', () => {
  it('renders a read-only shared guide for active tokens', async () => {
    mockVisitByToken.mockResolvedValue({
      status: 'active',
      guide: {
        id: 'guide-1',
        userId: 'user-1',
        slug: 'react-basics',
        title: 'React Basics',
        studyMode: 'OVERVIEW',
        inputType: 'TOPIC',
        inputValue: 'React basics',
        content: '# React Basics',
        isPublic: false,
      },
    })

    render(await SharedGuidePage({ params: Promise.resolve({ token: 'token-1' }) }))

    expect(screen.getByText('Shared guide')).toBeInTheDocument()
    expect(screen.getByText('React Basics')).toBeInTheDocument()
    expect(screen.getByText('true')).toBeInTheDocument()
    expect(screen.getByText('Sign up free')).toBeInTheDocument()
  })

  it('shows the fork button for authenticated users on active shared guides', async () => {
    mockAuth.mockResolvedValueOnce({ user: { id: 'user-2' } })
    mockHasAuthenticatedUser.mockReturnValueOnce(true)
    mockVisitByToken.mockResolvedValueOnce({
      status: 'active',
      guide: {
        id: 'guide-1',
        userId: 'user-1',
        slug: 'react-basics',
        title: 'React Basics',
        studyMode: 'OVERVIEW',
        inputType: 'TOPIC',
        inputValue: 'React basics',
        content: '# React Basics',
        isPublic: false,
      },
    })

    render(await SharedGuidePage({ params: Promise.resolve({ token: 'token-1' }) }))

    expect(screen.getByText('Fork to my guides')).toBeInTheDocument()
  })

  it('renders the unavailable state for expired or revoked links', async () => {
    mockVisitByToken.mockResolvedValue({ status: 'expired' })

    render(await SharedGuidePage({ params: Promise.resolve({ token: 'token-1' }) }))

    expect(screen.getByText('This share link has expired or was revoked.')).toBeInTheDocument()
  })
})
