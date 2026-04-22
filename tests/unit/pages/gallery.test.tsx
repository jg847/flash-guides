import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/lib/db/client', () => ({
  prisma: {
    guide: {
      findMany: vi.fn(),
    },
  },
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

import { prisma } from '@/lib/db/client'
import GalleryPage from '@/app/gallery/page'

const mockFindMany = (prisma.guide as unknown as { findMany: ReturnType<typeof vi.fn> }).findMany

describe('GalleryPage', () => {
  // T-17: empty state
  it('shows the empty state message when no public guides exist', async () => {
    mockFindMany.mockResolvedValueOnce([])

    const jsx = await GalleryPage()
    render(jsx as React.ReactElement)

    expect(screen.getByTestId('gallery-empty')).toBeInTheDocument()
    expect(screen.getByText(/check back soon/i)).toBeInTheDocument()
  })

  it('renders guide cards when public guides exist', async () => {
    mockFindMany.mockResolvedValueOnce([
      {
        id: 'g1',
        slug: 'test-guide',
        title: 'Test Guide',
        studyMode: 'OVERVIEW',
        content: 'Some content here.',
        createdAt: new Date('2026-04-01'),
      },
    ])

    const jsx = await GalleryPage()
    render(jsx as React.ReactElement)

    expect(screen.getByTestId('gallery-grid')).toBeInTheDocument()
    expect(screen.getByText('Test Guide')).toBeInTheDocument()
  })

  it('renders the page heading', async () => {
    mockFindMany.mockResolvedValueOnce([])

    const jsx = await GalleryPage()
    render(jsx as React.ReactElement)

    expect(screen.getByRole('heading', { name: /featured guides/i })).toBeInTheDocument()
  })
})
