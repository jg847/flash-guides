import { createRef } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import HighlightNote from '@/components/guide/HighlightNote'

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

function TestHarness({ isAuthenticated }: { isAuthenticated: boolean }) {
  const ref = createRef<HTMLDivElement>()

  return (
    <div>
      <div ref={ref} data-testid="guide-content">
        Important study text
      </div>
      <HighlightNote
        contentRef={ref}
        guideId="cm1234567890abcdef123456"
        guideSlug="react-basics"
        isAuthenticated={isAuthenticated}
      />
    </div>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('HighlightNote', () => {
  it('shows save note tooltip for authenticated users', async () => {
    render(<TestHarness isAuthenticated />)

    const content = screen.getByTestId('guide-content')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 201 })))
    vi.spyOn(window, 'getSelection').mockReturnValue({
      toString: () => 'Important study text',
      rangeCount: 1,
      removeAllRanges: vi.fn(),
      getRangeAt: () => ({
        commonAncestorContainer: content.firstChild as Node,
        getBoundingClientRect: () => ({
          bottom: 120,
          right: 140,
          left: 80,
          top: 100,
          width: 60,
          height: 20,
          x: 80,
          y: 100,
          toJSON: () => ({}),
        }),
      }),
    } as unknown as Selection)

    fireEvent.mouseUp(content)

    await waitFor(() => expect(screen.getByTestId('highlight-note-tooltip')).toBeInTheDocument())
    expect(screen.getByRole('button', { name: /save note/i })).toBeInTheDocument()
  })

  it('shows signup prompt for guests', async () => {
    render(<TestHarness isAuthenticated={false} />)

    const content = screen.getByTestId('guide-content')
    vi.spyOn(window, 'getSelection').mockReturnValue({
      toString: () => 'Important study text',
      rangeCount: 1,
      getRangeAt: () => ({
        commonAncestorContainer: content.firstChild as Node,
        getBoundingClientRect: () => ({
          bottom: 120,
          right: 140,
          left: 80,
          top: 100,
          width: 60,
          height: 20,
          x: 80,
          y: 100,
          toJSON: () => ({}),
        }),
      }),
    } as unknown as Selection)

    fireEvent.mouseUp(content)

    await waitFor(() => expect(screen.getByText(/sign up to save notes/i)).toBeInTheDocument())
  })
})
