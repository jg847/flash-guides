import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GuideClientShell from '@/components/guide/GuideClientShell'

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

vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}))

beforeEach(() => {
  vi.clearAllMocks()
  vi.unstubAllGlobals()
})

describe('GuideClientShell', () => {
  it('opens chat and prefills the selected quote from highlight note', async () => {
    const user = userEvent.setup()

    render(
      <GuideClientShell guideId="guide-1" guideSlug="react-basics" isAuthenticated>
        <div data-testid="guide-copy">Important study text</div>
      </GuideClientShell>,
    )

    const content = screen.getByTestId('guide-copy')
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
    await user.click(screen.getByRole('button', { name: 'Ask about this' }))

    await waitFor(() => expect(screen.getByTestId('follow-up-chat')).toBeInTheDocument())
    expect(screen.getByPlaceholderText('Ask a follow-up question…')).toHaveValue(
      '> Important study text\n\n',
    )
  })
})
