import { describe, it, expect, vi, beforeEach } from 'vitest'
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from '@/components/auth/LoginForm'

const assignLocation = vi.fn()
const fetchMock = vi.fn()

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
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      assign: assignLocation,
      href: 'http://127.0.0.1:3000/login',
      origin: 'http://127.0.0.1:3000',
    },
  })
  vi.stubGlobal('fetch', fetchMock)
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

  it('starts Google sign-in through the same-origin auth endpoints', async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ csrfToken: 'csrf-token' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ url: 'https://accounts.google.com/o/oauth2/v2/auth?state=abc' }),
      })

    render(<LoginForm />)
    fireEvent.click(screen.getByRole('button', { name: /google/i }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))

    expect(fetchMock).toHaveBeenNthCalledWith(1, '/api/auth/csrf')
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      '/api/auth/signin/google',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Auth-Return-Redirect': '1',
        }),
      }),
    )

    expect(assignLocation).toHaveBeenCalledWith(
      'https://accounts.google.com/o/oauth2/v2/auth?state=abc',
    )
  })

  it('shows an error when Google sign-in setup fails', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    })

    render(<LoginForm />)
    fireEvent.click(screen.getByRole('button', { name: /google/i }))

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/network error\. please try again\./i),
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
    await act(async () => {
      resolve!({ ok: true, error: null, url: '/dashboard' })
      await pending
    })
  })
})
