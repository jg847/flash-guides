'use client'

import { useState, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'

interface FieldErrors {
  password?: string[]
  token?: string[]
}

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setFieldErrors({})
    setLoading(true)

    const form = e.currentTarget
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const body = (await res.json()) as {
        message?: string
        error?: string
        fields?: FieldErrors
      }

      if (res.ok) {
        setSuccess(true)
        return
      }

      if (res.status === 410) {
        setError('This reset link has expired or is invalid. Please request a new one.')
        return
      }

      if (res.status === 422 && body.fields) {
        setFieldErrors(body.fields)
      } else {
        setError(body.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div role="alert" className="rounded-md bg-red-50 p-4 text-red-800 text-sm">
        Missing reset token.{' '}
        <a href="/forgot-password" className="underline">
          Request a new link.
        </a>
      </div>
    )
  }

  if (success) {
    return (
      <div role="status" className="rounded-md bg-green-50 p-4 text-green-800 text-sm">
        Password updated.{' '}
        <a href="/login" className="underline font-medium">
          Sign in with your new password.
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {error && (
        <div role="alert" className="rounded-md bg-red-50 p-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          New password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          aria-describedby={fieldErrors.password ? 'password-error' : undefined}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        {fieldErrors.password && (
          <p id="password-error" className="mt-1 text-xs text-red-600">
            {fieldErrors.password[0]}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          At least 8 characters, one uppercase letter, one number.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span
            aria-label="Loading"
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          />
        ) : (
          'Reset password'
        )}
      </button>
    </form>
  )
}
