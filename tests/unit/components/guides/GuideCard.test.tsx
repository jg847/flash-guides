import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

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

import GuideCard from '@/components/guides/GuideCard'

const baseProps = {
  id: 'guide-1',
  slug: 'intro-to-react',
  title: 'Introduction to React',
  studyMode: 'OVERVIEW' as const,
  content: 'React is a JavaScript library for building user interfaces.',
  createdAt: new Date('2026-04-01'),
}

describe('GuideCard', () => {
  it('renders the guide title', () => {
    render(<GuideCard {...baseProps} />)
    expect(screen.getByText('Introduction to React')).toBeInTheDocument()
  })

  it('links to the guide page via slug', () => {
    render(<GuideCard {...baseProps} />)
    const link = screen.getByTestId('guide-card')
    expect(link).toHaveAttribute('href', '/guide/intro-to-react')
  })

  it('renders the OVERVIEW badge', () => {
    render(<GuideCard {...baseProps} />)
    expect(screen.getByText('Overview')).toBeInTheDocument()
  })

  it('renders the DEEP_DIVE badge', () => {
    render(<GuideCard {...baseProps} studyMode="DEEP_DIVE" />)
    expect(screen.getByText('Deep Dive')).toBeInTheDocument()
  })

  it('renders the EXAM_PREP badge', () => {
    render(<GuideCard {...baseProps} studyMode="EXAM_PREP" />)
    expect(screen.getByText('Exam Prep')).toBeInTheDocument()
  })

  it('renders the ELI5 badge', () => {
    render(<GuideCard {...baseProps} studyMode="ELI5" />)
    expect(screen.getByText('ELI5')).toBeInTheDocument()
  })

  it('renders a content preview', () => {
    render(<GuideCard {...baseProps} />)
    expect(screen.getByText(/React is a JavaScript library/i)).toBeInTheDocument()
  })

  it('strips markdown syntax from the content preview', () => {
    render(<GuideCard {...baseProps} content="## Heading\n**bold** text and `code` here" />)
    const preview = screen.getByText(/bold text and code here/i)
    expect(preview).toBeInTheDocument()
  })
})
