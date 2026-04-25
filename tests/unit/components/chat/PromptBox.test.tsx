import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

// ── Mocks must precede all imports ──────────────────────────────────────────

const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

// Stub child components to keep tests focused
vi.mock('@/components/chat/StudyModeSelector', () => ({
  default: ({ onChange }: { onChange: (m: string) => void }) => (
    <button data-testid="study-mode-selector" onClick={() => onChange('EXAM_PREP')}>
      StudyModeSelector
    </button>
  ),
}))

vi.mock('@/components/chat/StreamingProgress', () => ({
  default: ({ step }: { step: string | null }) => (
    <div data-testid="streaming-progress" data-step={step ?? ''} />
  ),
}))

vi.mock('@/components/guest/QuotaExhaustedModal', () => ({
  default: ({ open }: { open: boolean }) =>
    open ? <div data-testid="quota-exhausted-modal" /> : null,
}))

import PromptBox from '@/components/chat/PromptBox'
import type { SSEEvent } from '@/types/generation'

function buildSSEBody(events: SSEEvent[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()
  const lines = events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join('')
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(lines))
      controller.close()
    },
  })
}

function mockFetch(events: SSEEvent[], status = 200) {
  const body = status === 200 ? buildSSEBody(events) : null
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      new Response(body, {
        status,
        headers: { 'Content-Type': status === 200 ? 'text/event-stream' : 'application/json' },
      }),
    ),
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.unstubAllGlobals()
})

describe('PromptBox', () => {
  it('renders with topic tab active by default', () => {
    render(<PromptBox />)
    const topicTab = screen.getByTestId('input-tab-topic')
    expect(topicTab.getAttribute('aria-selected')).toBe('true')
  })

  it('switches input tab', () => {
    render(<PromptBox />)
    fireEvent.click(screen.getByTestId('input-tab-text'))
    expect(screen.getByTestId('input-tab-text').getAttribute('aria-selected')).toBe('true')
    expect(screen.getByTestId('input-tab-topic').getAttribute('aria-selected')).toBe('false')
  })

  it('disables generate button when input is empty', () => {
    render(<PromptBox />)
    const btn = screen.getByTestId('generate-button') as HTMLButtonElement
    expect(btn.disabled).toBe(true)
  })

  it('enables generate button when input has value', () => {
    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'React hooks' } })
    const btn = screen.getByTestId('generate-button') as HTMLButtonElement
    expect(btn.disabled).toBe(false)
  })

  it('calls fetch with correct body on submit', async () => {
    mockFetch([{ type: 'done', guideSlug: 'test-slug-abc123456' }])

    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'Photosynthesis' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(vi.mocked(fetch)).toHaveBeenCalled())

    const [url, options] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit]
    expect(url).toBe('/api/generate')
    const body = JSON.parse(options.body as string)
    expect(body.inputType).toBe('TOPIC')
    expect(body.inputValue).toBe('Photosynthesis')
  })

  it('redirects to guide on done event', async () => {
    mockFetch([{ type: 'done', guideSlug: 'my-guide-abc123456' }])

    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'DNA replication' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/guide/my-guide-abc123456'))
  })

  it('shows error message on network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))

    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'DNA replication' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(screen.getByTestId('generation-error')).toBeDefined())
  })

  it('opens quota exhausted modal on QUOTA_EXCEEDED error event', async () => {
    const errEvent: SSEEvent = {
      type: 'error',
      message: JSON.stringify({
        code: 'QUOTA_EXCEEDED',
        resetsAt: '2026-04-23T00:00:00.000Z',
        signupUrl: '/register',
      }),
    }
    mockFetch([errEvent])

    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'Dark matter' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(screen.getByTestId('quota-exhausted-modal')).toBeDefined())
  })

  it('shows streaming-progress while generating', async () => {
    // Use a stream that never resolves immediately — just check it appears after click
    let resolveBody!: () => void
    const hangingBody = new ReadableStream({
      start() {
        // never enqueues, simulates in-progress
      },
      cancel() {
        resolveBody?.()
      },
    })
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(hangingBody, {
          status: 200,
          headers: { 'Content-Type': 'text/event-stream' },
        }),
      ),
    )

    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'Black holes' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(screen.getByTestId('streaming-progress')).toBeDefined())
  })

  it('shows fetching step for URL input while source content is loading', async () => {
    const hangingBody = new ReadableStream({
      start() {
        // keep request in flight
      },
    })
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(hangingBody, {
          status: 200,
          headers: { 'Content-Type': 'text/event-stream' },
        }),
      ),
    )

    render(<PromptBox />)
    fireEvent.click(screen.getByTestId('input-tab-url'))
    fireEvent.change(screen.getByTestId('prompt-input'), {
      target: { value: 'https://example.com/article' },
    })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() =>
      expect(screen.getByTestId('streaming-progress').getAttribute('data-step')).toBe('fetching'),
    )
  })
})
