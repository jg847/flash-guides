'use client'

import { useState } from 'react'

export default function PasswordSection() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch('/api/account/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const body = (await response.json()) as { message?: string; error?: string }
      if (!response.ok) {
        throw new Error(body.error ?? 'Password update failed')
      }

      setCurrentPassword('')
      setNewPassword('')
      setMessage(body.message ?? 'Password updated')
    } catch (passwordError) {
      setError(passwordError instanceof Error ? passwordError.message : 'Password update failed')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-stone-900">Password</h2>
      <p className="mt-2 text-sm text-stone-500">
        Changing your password signs out your other active sessions.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-stone-700">
          Current password
          <input
            data-testid="account-current-password"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
          />
        </label>

        <label className="block text-sm font-medium text-stone-700">
          New password
          <input
            data-testid="account-new-password"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
          />
        </label>

        {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          data-testid="account-password-save"
          disabled={isSaving}
          className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
        >
          {isSaving ? 'Updating...' : 'Change password'}
        </button>
      </form>
    </section>
  )
}
