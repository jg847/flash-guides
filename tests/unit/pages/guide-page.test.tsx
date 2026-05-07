import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/lib/db/client', () => ({
  prisma: {
    guide: {
      findUnique: vi.fn(),
    },
  },
}))

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

const mockRedirect = vi.fn()
const mockNotFound = vi.fn()

vi.mock('next/navigation', () => ({
  redirect: (url: string) => mockRedirect(url),
  notFound: () => mockNotFound(),
}))

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('next-mdx-remote/rsc', () => ({
  MDXRemote: ({ source }: { source: string }) => <div data-testid="mdx-remote">{source}</div>,
}))

vi.mock('@/components/guide/GuideRenderer', () => ({
  default: ({
    guide,
    isClaimableGuestGuide,
  }: {
    guide: { title: string }
    isClaimableGuestGuide?: boolean
  }) => (
    <div data-testid="guide-renderer-mock" data-claimable={String(Boolean(isClaimableGuestGuide))}>
      {guide.title}
    </div>
  ),
}))

import { prisma } from '@/lib/db/client'
import { auth } from '@/lib/auth'
import GuidePage from '@/app/guide/[slug]/page'

const mockFindUnique = (prisma.guide as unknown as { findUnique: ReturnType<typeof vi.fn> })
  .findUnique
const mockAuth = auth as ReturnType<typeof vi.fn>

describe('GuidePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuth.mockResolvedValue(null)
  })

  it('renders a guide when found and accessible', async () => {
    mockFindUnique.mockResolvedValueOnce({
      id: 'g1',
      userId: null,
      isWatermark: true,
      slug: 'react-basics',
      title: 'React Basics',
      studyMode: 'OVERVIEW',
      inputType: 'TOPIC',
      inputValue: 'React',
      content: '# React Basics\n\n## Components\nReact components are reusable.',
      isPublic: true,
    })

    const jsx = await GuidePage({ params: Promise.resolve({ slug: 'react-basics' }) })
    render(jsx as React.ReactElement)

    expect(screen.getByTestId('guide-renderer-mock')).toHaveTextContent('React Basics')
    expect(screen.getByTestId('guide-renderer-mock')).toHaveAttribute('data-claimable', 'true')
  })

  it('redirects to login when a private guide is not owned by the user', async () => {
    mockFindUnique.mockResolvedValueOnce({
      id: 'g1',
      userId: 'owner-1',
      isWatermark: false,
      slug: 'react-basics',
      title: 'React Basics',
      studyMode: 'OVERVIEW',
      inputType: 'TOPIC',
      inputValue: 'React',
      content: '# React Basics',
      isPublic: false,
    })

    await GuidePage({ params: Promise.resolve({ slug: 'react-basics' }) })

    expect(mockRedirect).toHaveBeenCalledWith('/login?callbackUrl=%2Fguide%2Freact-basics')
  })

  it('allows a guest watermark guide to render so it can be claimed after login', async () => {
    mockFindUnique.mockResolvedValueOnce({
      id: 'g1',
      userId: null,
      isWatermark: true,
      slug: 'react-basics',
      title: 'React Basics',
      studyMode: 'OVERVIEW',
      inputType: 'TOPIC',
      inputValue: 'React',
      content: '# React Basics',
      isPublic: false,
    })

    const jsx = await GuidePage({ params: Promise.resolve({ slug: 'react-basics' }) })
    render(jsx as React.ReactElement)

    expect(mockRedirect).not.toHaveBeenCalled()
    expect(screen.getByTestId('guide-renderer-mock')).toHaveAttribute('data-claimable', 'true')
  })
})
