'use client'

import { useState } from 'react'
import type { AccountPageUser } from '@/lib/db/repositories/users'

interface ProfileSectionProps {
  user: AccountPageUser
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const [name, setName] = useState(user.name ?? '')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch('/api/account/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        throw new Error('Failed to save profile')
      }

      const body = (await response.json()) as { name: string | null }
      setName(body.name ?? '')
      setMessage('Profile updated.')
    } catch {
      setError('Unable to update your profile right now.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-stone-900">Profile</h2>
      <p className="mt-2 text-sm text-stone-500">Your public-facing identity across FlashGuides.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-stone-700">
          Display name
          <input
            data-testid="account-name-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
          />
        </label>

        <label className="block text-sm font-medium text-stone-700">
          Email
          <input
            value={user.email}
            disabled
            className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-100 px-4 py-3 text-sm text-stone-500"
          />
        </label>

        {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          data-testid="account-profile-save"
          disabled={isSaving}
          className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
        >
          {isSaving ? 'Saving...' : 'Save profile'}
        </button>
      </form>
    </section>
  )
}
