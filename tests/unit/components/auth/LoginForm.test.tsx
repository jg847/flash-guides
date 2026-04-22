import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from '@/components/auth/LoginForm'

// Mock next-auth/react
const mockSignIn = vi.fn()
vi.mock('next-auth/react', () => ({
  signIn: (...args: unknown[]) => mockSignIn(...args),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: (key: string) => (key === 'callbackUrl' ? '/dashboard' : null),
  }),
}))

function fillForm(email = 'user@example.com', password = 'SecurePass1') {
  fireEvent.change(screen.getByLabelText(/^email/i), {
    target: { value: email },
  })
  fireEvent.change(screen.getByLabelText(/^password/i), {
    target: { value: password },
  })
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('LoginForm', () => {
  it('renders email field, password field, sign in button, and Google button', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument()
  })

  it('shows forgot password link', () => {
    render(<LoginForm />)
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument()
  })

  it('calls signIn with credentials on form submit', async () => {
    mockSignIn.mockResolvedValueOnce({ ok: true, error: null, url: '/dashboard' })

    render(<LoginForm />)
    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() =>
      expect(mockSignIn).toHaveBeenCalledWith(
        'credentials',
        expect.objectContaining({ email: 'user@example.com', redirect: false }),
      ),
    )
  })

  it('shows generic error on invalid credentials', async () => {
    mockSignIn.mockResolvedValueOnce({ ok: false, error: 'CredentialsSignin', url: null })

    render(<LoginForm />)
    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/invalid email or password/i),
    )
  })

  it('shows email-not-verified error when signIn returns EmailNotVerified', async () => {
    mockSignIn.mockResolvedValueOnce({ ok: false, error: 'EmailNotVerified', url: null })

    render(<LoginForm />)
    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/verify your email/i))
  })

  it('calls signIn with google provider when Google button is clicked', async () => {
    mockSignIn.mockResolvedValueOnce({})

    render(<LoginForm />)
    fireEvent.click(screen.getByRole('button', { name: /google/i }))

    await waitFor(() =>
      expect(mockSignIn).toHaveBeenCalledWith(
        'google',
        expect.objectContaining({ callbackUrl: '/dashboard' }),
      ),
    )
  })

  it('disables submit button while loading', async () => {
    let resolve: (v: unknown) => void
    const pending = new Promise((r) => {
      resolve = r
    })
    mockSignIn.mockReturnValueOnce(pending)

    render(<LoginForm />)
    fillForm()
    const btn = screen.getByRole('button', { name: /sign in/i })
    fireEvent.click(btn)

    await waitFor(() => expect(btn).toBeDisabled())
    resolve!({ ok: true, error: null, url: '/dashboard' })
  })
})
