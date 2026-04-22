import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RegisterForm } from '@/components/auth/RegisterForm'

function fillForm(email = 'new@example.com', password = 'SecurePass1', name = '') {
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: email },
  })
  fireEvent.change(screen.getByLabelText(/^password/i), {
    target: { value: password },
  })
  if (name) {
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: name },
    })
  }
}

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders all required fields and submit button', () => {
    render(<RegisterForm />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('shows success message after 201 response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ message: 'Verification email sent' }),
      }),
    )

    render(<RegisterForm />)
    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/check your email/i))
  })

  it('shows server error banner on 409 duplicate email', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 409,
        json: async () => ({ error: 'Email already registered' }),
      }),
    )

    render(<RegisterForm />)
    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/email already registered/i),
    )
  })

  it('shows field-level errors on 422 response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 422,
        json: async () => ({
          error: 'Validation failed',
          fields: { password: ['Password must be at least 8 characters'] },
        }),
      }),
    )

    render(<RegisterForm />)
    fillForm('test@example.com', 'short')
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument())
  })

  it('shows network error on fetch failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new Error('Network error')))

    render(<RegisterForm />)
    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/network error/i))
  })

  it('disables submit button while loading', async () => {
    let resolve: (v: unknown) => void
    const pending = new Promise((r) => {
      resolve = r
    })
    vi.stubGlobal('fetch', vi.fn().mockReturnValueOnce(pending))

    render(<RegisterForm />)
    fillForm()
    const btn = screen.getByRole('button', { name: /create account/i })
    fireEvent.click(btn)

    await waitFor(() => expect(btn).toBeDisabled())
    resolve!({ ok: true, status: 201, json: async () => ({ message: 'ok' }) })
  })
})
