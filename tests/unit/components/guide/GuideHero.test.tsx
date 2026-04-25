import { describe, expect, it, vi } from 'vitest'
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

vi.mock('@/components/ThemeToggle', () => ({
  default: () => <button type="button">Theme</button>,
}))

import GuideHero from '@/components/guide/GuideHero'

describe('GuideHero', () => {
  it('renders the title and source metadata', () => {
    render(
      <GuideHero
        title="Biology Basics"
        studyMode="OVERVIEW"
        inputType="TOPIC"
        inputValue="Biology"
      />,
    )

    expect(screen.getByRole('heading', { name: 'Biology Basics' })).toBeInTheDocument()
    expect(screen.getByText(/source type: TOPIC/i)).toBeInTheDocument()
  })

  it('renders an image hero when media is an image', () => {
    render(
      <GuideHero
        title="Biology Basics"
        studyMode="OVERVIEW"
        inputType="TOPIC"
        inputValue="Biology"
        media={{ type: 'image', src: 'https://example.com/hero.png', alt: 'Hero image' }}
      />,
    )

    expect(screen.getByRole('img', { name: 'Hero image' })).toHaveAttribute(
      'src',
      'https://example.com/hero.png',
    )
  })
})
