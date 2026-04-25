import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/errors/sentry', () => ({
  captureError: vi.fn().mockResolvedValue(undefined),
}))

import GlobalError from '@/app/global-error'
import { captureError } from '@/lib/errors/sentry'

const mockCaptureError = captureError as ReturnType<typeof vi.fn>

describe('GlobalError', () => {
  it('renders the fallback UI and captures the error digest', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const retry = vi.fn()
    const error = Object.assign(new Error('boom'), { digest: 'digest-123' })

    render(<GlobalError error={error} unstable_retry={retry} />)

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    expect(screen.getByText(/digest-123/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /try again/i }))
    expect(retry).toHaveBeenCalledTimes(1)

    await waitFor(() =>
      expect(mockCaptureError).toHaveBeenCalledWith(error, {
        source: 'global-error',
        digest: 'digest-123',
      }),
    )

    consoleError.mockRestore()
  })
})
