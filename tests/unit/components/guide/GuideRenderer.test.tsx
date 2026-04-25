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

vi.mock('next-mdx-remote/rsc', () => ({
  MDXRemote: ({ source }: { source: string }) => <div data-testid="mdx-remote">{source}</div>,
}))

vi.mock('@/components/ThemeToggle', () => ({
  default: () => <button type="button">Theme</button>,
}))

import GuideRenderer from '@/components/guide/GuideRenderer'

describe('GuideRenderer', () => {
  it('renders TOC entries from markdown headings', async () => {
    const jsx = await GuideRenderer({
      guide: {
        id: 'g1',
        slug: 'react-basics',
        title: 'React Basics',
        studyMode: 'OVERVIEW',
        inputType: 'TOPIC',
        inputValue: 'React',
        content:
          '# React Basics\n\nIntro paragraph.\n\n## Components\nReact components are reusable.\n\n## Hooks\nHooks manage state.',
      },
      isAuthenticated: false,
    })

    render(jsx as React.ReactElement)

    expect(screen.getByTestId('guide-toc')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Components' })).toHaveAttribute('href', '#components')
    expect(screen.getByRole('link', { name: 'Hooks' })).toHaveAttribute('href', '#hooks')
  })
})
