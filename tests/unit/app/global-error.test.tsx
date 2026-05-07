import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import GlobalError from '@/app/global-error'

describe('GlobalError', () => {
  it('renders the fallback UI and shows the error digest', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const retry = vi.fn()
    const error = Object.assign(new Error('boom'), { digest: 'digest-123' })

    render(<GlobalError error={error} unstable_retry={retry} />)

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    expect(screen.getByText(/digest-123/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /try again/i }))
    expect(retry).toHaveBeenCalledTimes(1)

    consoleError.mockRestore()
  })
})
