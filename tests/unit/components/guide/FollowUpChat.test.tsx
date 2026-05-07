import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockRefresh = vi.fn()

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
  useRouter: () => ({ refresh: mockRefresh }),
}))

import FollowUpChat from '@/components/guide/FollowUpChat'

function makeStreamResponse(events: Array<{ type: string; text?: string; message?: string }>) {
  const encoder = new TextEncoder()

  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const event of events) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
      }
      controller.close()
    },
  })
}

function getComposer() {
  return screen.getByPlaceholderText('Ask a follow-up question…') as HTMLTextAreaElement
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.unstubAllGlobals()
  window.localStorage.clear()
})

describe('FollowUpChat', () => {
  it('hydrates messages from localStorage', async () => {
    window.localStorage.setItem(
      'flashguides.chat.react-basics',
      JSON.stringify([{ kind: 'chat', role: 'assistant', content: 'Saved answer' }]),
    )

    render(<FollowUpChat guideId="guide-1" guideSlug="react-basics" isAuthenticated />)

    await userEvent.setup().click(screen.getByTestId('follow-up-chat-toggle'))

    await waitFor(() => expect(screen.getByText('Saved answer')).toBeInTheDocument())
  })

  it('starts collapsed and opens from the floating chat button', async () => {
    const user = userEvent.setup()

    render(<FollowUpChat guideId="guide-1" guideSlug="react-basics" isAuthenticated />)

    expect(screen.queryByTestId('follow-up-chat')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('follow-up-chat-toggle'))

    expect(screen.getByTestId('follow-up-chat')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ask a follow-up question…')).toBeInTheDocument()
  })

  it('shows the sign-in link when an unauthenticated user opens chat', async () => {
    const user = userEvent.setup()

    render(<FollowUpChat guideId="guide-1" guideSlug="react-basics" isAuthenticated={false} />)

    await user.click(screen.getByTestId('follow-up-chat-toggle'))

    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute(
      'href',
      '/login?callbackUrl=%2Fguide%2Freact-basics',
    )
  })

  it('sends the full visible history with the second user message', async () => {
    const user = userEvent.setup()
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(makeStreamResponse([{ type: 'token', text: 'Hooks' }, { type: 'done' }]), {
          status: 200,
          headers: { 'Content-Type': 'text/event-stream' },
        }),
      )
      .mockResolvedValueOnce(
        new Response(makeStreamResponse([{ type: 'done' }]), {
          status: 200,
          headers: { 'Content-Type': 'text/event-stream' },
        }),
      )

    vi.stubGlobal('fetch', fetchMock)

    render(<FollowUpChat guideId="guide-1" guideSlug="react-basics" isAuthenticated />)

    await user.click(screen.getByTestId('follow-up-chat-toggle'))
    await user.type(getComposer(), 'Explain hooks{enter}')

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(screen.getByText('Hooks')).toBeInTheDocument())

    await user.type(getComposer(), 'Why use them?{enter}')

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))

    const secondBody = JSON.parse(String(fetchMock.mock.calls[1]?.[1]?.body)) as {
      messages: Array<{ role: string; content: string }>
    }

    expect(secondBody.messages).toEqual([
      { role: 'user', content: 'Explain hooks' },
      { role: 'assistant', content: 'Hooks' },
      { role: 'user', content: 'Why use them?' },
    ])
  })

  it('clears the current messages when starting a new chat', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(makeStreamResponse([{ type: 'token', text: 'Hi there' }, { type: 'done' }]), {
        status: 200,
        headers: { 'Content-Type': 'text/event-stream' },
      }),
    )

    vi.stubGlobal('fetch', fetchMock)

    render(<FollowUpChat guideId="guide-1" guideSlug="react-basics" isAuthenticated />)

    await user.click(screen.getByTestId('follow-up-chat-toggle'))
    await user.type(getComposer(), 'Hello{enter}')

    await waitFor(() => expect(screen.getByText('Hi there')).toBeInTheDocument())
    await user.click(screen.getByTestId('new-chat'))

    expect(screen.queryByTestId('follow-up-messages')).not.toBeInTheDocument()
  })

  it('renders assistant markdown as rich text', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(makeStreamResponse([{ type: 'token', text: '**bold**' }, { type: 'done' }]), {
        status: 200,
        headers: { 'Content-Type': 'text/event-stream' },
      }),
    )

    vi.stubGlobal('fetch', fetchMock)

    render(<FollowUpChat guideId="guide-1" guideSlug="react-basics" isAuthenticated />)

    await user.click(screen.getByTestId('follow-up-chat-toggle'))
    await user.type(getComposer(), 'Format this{enter}')

    await waitFor(() => expect(screen.getByText('bold')).toBeInTheDocument())
    expect(screen.getByText('bold').tagName).toBe('STRONG')
  })

  it('renders a proposal card and applies it to the guide', async () => {
    const user = userEvent.setup()
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          makeStreamResponse([
            {
              type: 'proposal',
              id: 'proposal-1',
              op: 'append_section',
              heading: 'Hooks',
              body_markdown: 'Hook body',
              rationale: 'Adds the missing hooks section.',
            },
            { type: 'done' },
          ]),
          {
            status: 200,
            headers: { 'Content-Type': 'text/event-stream' },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ content: '# Updated guide' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      )

    vi.stubGlobal('fetch', fetchMock)

    render(<FollowUpChat guideId="guide-1" guideSlug="react-basics" isAuthenticated />)

    await user.click(screen.getByTestId('follow-up-chat-toggle'))
    await user.type(getComposer(), 'Add hooks{enter}')

    await waitFor(() => expect(screen.getByTestId('apply-proposal')).toBeInTheDocument())
    await user.click(screen.getByTestId('apply-proposal'))

    await waitFor(() =>
      expect(fetchMock).toHaveBeenLastCalledWith(
        '/api/guides/guide-1/content',
        expect.objectContaining({
          method: 'POST',
        }),
      ),
    )
    await waitFor(() => expect(screen.getByText(/Applied/i)).toBeInTheDocument())
    expect(mockRefresh).toHaveBeenCalled()
  })

  it('renders suggestion chips and submits a clicked suggestion', async () => {
    const user = userEvent.setup()
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          makeStreamResponse([
            { type: 'token', text: 'Start with components.' },
            {
              type: 'suggestions',
              suggestions: ['Quiz me on components', 'Show a hook example'],
            },
            { type: 'done' },
          ]),
          {
            status: 200,
            headers: { 'Content-Type': 'text/event-stream' },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(makeStreamResponse([{ type: 'done' }]), {
          status: 200,
          headers: { 'Content-Type': 'text/event-stream' },
        }),
      )

    vi.stubGlobal('fetch', fetchMock)

    render(<FollowUpChat guideId="guide-1" guideSlug="react-basics" isAuthenticated />)

    await user.click(screen.getByTestId('follow-up-chat-toggle'))
    await user.type(getComposer(), 'What next?{enter}')

    await waitFor(() => expect(screen.getByTestId('follow-up-suggestions')).toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: 'Quiz me on components' }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))
    const secondBody = JSON.parse(String(fetchMock.mock.calls[1]?.[1]?.body)) as {
      messages: Array<{ role: string; content: string }>
    }
    expect(secondBody.messages.at(-1)).toEqual({ role: 'user', content: 'Quiz me on components' })
  })
})
