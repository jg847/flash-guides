'use client'

import { useState } from 'react'

interface EmailSectionProps {
  email: string
  pendingEmail: string | null
  emailChangedState?: string | null
}

export default function EmailSection({
  email,
  pendingEmail,
  emailChangedState,
}: EmailSectionProps) {
  const [nextEmail, setNextEmail] = useState('')
  const [message, setMessage] = useState<string | null>(
    emailChangedState === '1' ? 'Email verified successfully.' : null,
  )
  const [error, setError] = useState<string | null>(
    emailChangedState === 'conflict'
      ? 'That email is already in use.'
      : emailChangedState === 'invalid'
        ? 'That verification link is no longer valid.'
        : null,
  )
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    setMessage(null)
    setError(null)

    const normalizedEmail = nextEmail.trim().toLowerCase()

    try {
      const response = await fetch('/api/account/email', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail }),
      })

      const body = (await response.json()) as { message?: string; error?: string }
      if (!response.ok) {
        throw new Error(body.error ?? 'Unable to change email')
      }

      setNextEmail('')
      setMessage(
        `Verification email sent to ${normalizedEmail}. Your email won't change until you verify.`,
      )
    } catch (changeError) {
      setError(changeError instanceof Error ? changeError.message : 'Unable to change email')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-stone-900">Email</h2>
      <p className="mt-2 text-sm text-stone-500">
        Your current email is used for sign-in and account verification.
      </p>

      <div className="mt-5 rounded-2xl bg-stone-50 p-4">
        <p className="text-sm font-medium text-stone-700">Current email</p>
        <p className="mt-1 text-base text-stone-900">{email}</p>
        {pendingEmail ? (
          <p className="mt-3 text-sm text-amber-700">
            Pending change: {pendingEmail}. Verify the email we sent before this takes effect.
          </p>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-stone-700">
          New email address
          <input
            data-testid="account-email-input"
            type="email"
            value={nextEmail}
            onChange={(event) => setNextEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
          />
        </label>

        {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
        >
          {isSaving ? 'Sending...' : 'Send verification email'}
        </button>
      </form>
    </section>
  )
}
