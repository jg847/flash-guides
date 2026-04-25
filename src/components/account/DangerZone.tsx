'use client'

import { useState } from 'react'

interface DangerZoneProps {
  email: string
}

export default function DangerZone({ email }: DangerZoneProps) {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const canDelete = confirmEmail.trim().toLowerCase() === email.toLowerCase() && password.length > 0

  async function handleExport() {
    setIsExporting(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch('/api/account/export', {
        method: 'POST',
      })

      const body = (await response.json()) as {
        downloadUrl?: string
        expiresAt?: string
        error?: string
      }
      if (!response.ok || !body.downloadUrl || !body.expiresAt) {
        throw new Error(body.error ?? 'Unable to export data')
      }

      setDownloadUrl(body.downloadUrl)
      setExpiresAt(body.expiresAt)
      setMessage('Your export is ready to download.')
    } catch (exportError) {
      setError(exportError instanceof Error ? exportError.message : 'Unable to export data')
    } finally {
      setIsExporting(false)
    }
  }

  async function handleDelete() {
    if (!canDelete) {
      return
    }

    setIsDeleting(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch('/api/account/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const body = (await response.json()) as { message?: string; error?: string }
      if (!response.ok) {
        throw new Error(body.error ?? 'Unable to delete account')
      }

      window.location.href = '/'
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete account')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section className="rounded-[2rem] border border-rose-200 bg-[linear-gradient(180deg,#fff7f6_0%,#fff1ef_100%)] p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-rose-900">Data & Privacy</h2>
      <p className="mt-2 text-sm text-rose-700">
        Export everything you have created, or permanently delete your account. Deletion cannot be
        undone.
      </p>

      <div className="mt-6 space-y-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-stone-900">Export your data</p>
              <p className="mt-1 text-sm text-stone-500">
                Download your guides as Markdown plus a JSON export of guides and notes.
              </p>
            </div>
            <button
              type="button"
              data-testid="account-export-button"
              onClick={() => void handleExport()}
              disabled={isExporting}
              className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
            >
              {isExporting ? 'Preparing...' : 'Export my data'}
            </button>
          </div>

          {downloadUrl ? (
            <div className="mt-4 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
              <a href={downloadUrl} download className="font-medium text-sky-700 underline">
                Download your export
              </a>
              {expiresAt ? (
                <p className="mt-2 text-xs text-stone-500">
                  Available until {new Date(expiresAt).toLocaleTimeString()}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-rose-300 bg-white p-4">
          <p className="text-sm font-semibold text-rose-900">Delete account</p>
          <p className="mt-1 text-sm text-rose-700">
            Type your full account email and current password to confirm permanent deletion.
          </p>

          <div className="mt-4 space-y-4">
            <label className="block text-sm font-medium text-stone-700">
              Confirm email
              <input
                data-testid="account-delete-confirm-email"
                value={confirmEmail}
                onChange={(event) => setConfirmEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
              />
            </label>

            <label className="block text-sm font-medium text-stone-700">
              Current password
              <input
                data-testid="account-delete-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
              />
            </label>
          </div>

          <button
            type="button"
            data-testid="account-delete-button"
            onClick={() => void handleDelete()}
            disabled={!canDelete || isDeleting}
            className="mt-5 rounded-full bg-rose-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete my account'}
          </button>
        </div>

        {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="text-sm text-rose-700">{error}</p> : null}
      </div>
    </section>
  )
}
