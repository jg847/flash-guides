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
  window.localStorage.clear()
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

  it('submits uploaded files as multipart form data', async () => {
    mockFetch([{ type: 'done', guideSlug: 'file-upload-guide' }])

    render(<PromptBox />)
    fireEvent.click(screen.getByTestId('input-tab-file'))

    const file = new File(['study notes'], 'notes.txt', { type: 'text/plain' })
    fireEvent.change(screen.getByTestId('prompt-file-input'), {
      target: { files: [file] },
    })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(vi.mocked(fetch)).toHaveBeenCalled())

    const [url, options] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit]
    expect(url).toBe('/api/generate')
    expect(options.body).toBeInstanceOf(FormData)
    expect((options.body as FormData).get('inputType')).toBe('FILE')
    expect((options.body as FormData).get('studyMode')).toBe('OVERVIEW')
    expect((options.body as FormData).get('file')).toBe(file)
  })

  it('redirects to guide on done event', async () => {
    mockFetch([{ type: 'done', guideSlug: 'my-guide-abc123456' }])

    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'DNA replication' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/guide/my-guide-abc123456'))
  })

  it('stores guest-created guide slugs for later claiming', async () => {
    mockFetch([{ type: 'done', guideSlug: 'guest-guide-abc123456', isGuestGuide: true }])

    render(<PromptBox isAuthenticated={false} />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'Cell biology' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/guide/guest-guide-abc123456'))

    expect(window.localStorage.getItem('flashguides.guest-guides')).toBe(
      JSON.stringify(['guest-guide-abc123456']),
    )
  })

  it('does not store guide slugs for authenticated generations', async () => {
    mockFetch([{ type: 'done', guideSlug: 'user-guide-abc123456', isGuestGuide: false }])

    render(<PromptBox isAuthenticated />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'Genetics' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/guide/user-guide-abc123456'))

    expect(window.localStorage.getItem('flashguides.guest-guides')).toBeNull()
  })

  it('shows error message on network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))

    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'DNA replication' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(screen.getByTestId('generation-error')).toBeDefined())
  })

  it('shows the API error message for failed file uploads', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            error: { message: 'We could not read text from that PDF. Try another file.' },
          }),
          {
            status: 422,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      ),
    )

    render(<PromptBox />)
    fireEvent.click(screen.getByTestId('input-tab-file'))
    fireEvent.change(screen.getByTestId('prompt-file-input'), {
      target: { files: [new File(['x'], 'notes.pdf', { type: 'application/pdf' })] },
    })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() =>
      expect(screen.getByTestId('generation-error')).toHaveTextContent(
        'We could not read text from that PDF. Try another file.',
      ),
    )
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

  it('stops an in-flight generation when the stop button is clicked', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((_url, options?: RequestInit) => {
        const signal = options?.signal as AbortSignal | undefined

        return new Promise<Response>((resolve, reject) => {
          signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))

          resolve(
            new Response(
              new ReadableStream({
                start() {
                  // keep the stream open until aborted
                },
              }),
              {
                status: 200,
                headers: { 'Content-Type': 'text/event-stream' },
              },
            ),
          )
        })
      }),
    )

    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'Black holes' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(screen.getByTestId('streaming-progress')).toBeDefined())

    fireEvent.click(screen.getByTestId('cancel-generation-button'))

    await waitFor(() => expect(screen.queryByTestId('streaming-progress')).not.toBeInTheDocument())
    expect(screen.queryByTestId('generation-error')).not.toBeInTheDocument()
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
