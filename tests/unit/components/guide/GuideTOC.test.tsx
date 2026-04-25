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

import GuideTOC from '@/components/guide/GuideTOC'

describe('GuideTOC', () => {
  it('renders TOC links from guide headings', () => {
    render(
      <GuideTOC
        items={[
          { id: 'intro', title: 'Introduction' },
          { id: 'section-1', title: 'Section One' },
          { id: 'section-2', title: 'Section Two' },
        ]}
      />,
    )

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
    expect(links[0]).toHaveAttribute('href', '#intro')
    expect(links[1]).toHaveAttribute('href', '#section-1')
    expect(links[2]).toHaveAttribute('href', '#section-2')
  })

  it('renders nothing when there are no TOC items', () => {
    const { container } = render(<GuideTOC items={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
})
