'use client'

import { useState } from 'react'

interface ShareModalProps {
  guideId: string
  onClose: () => void
}

type ExpiryOption = 'none' | '7d' | '30d'

interface ShareResponse {
  token: string
  url: string
  expiresAt: string | null
}

function normalizeShareUrl(url: string): string {
  if (typeof window === 'undefined') {
    return url
  }

  try {
    const parsed = new URL(url, window.location.origin)
    if (parsed.origin === window.location.origin) {
      return parsed.toString()
    }

    return new URL(parsed.pathname + parsed.search + parsed.hash, window.location.origin).toString()
  } catch {
    return url
  }
}

export default function ShareModal({ guideId, onClose }: ShareModalProps) {
  const [expiry, setExpiry] = useState<ExpiryOption>('none')
  const [share, setShare] = useState<ShareResponse | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleCreate() {
    setBusy(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch(`/api/guides/${guideId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expiresIn: expiry === 'none' ? null : expiry }),
      })

      const body = (await response.json()) as ShareResponse & { error?: string }
      if (!response.ok && response.status !== 409) {
        throw new Error(body.error ?? 'Unable to create share link')
      }

      setShare({
        ...body,
        url: normalizeShareUrl(body.url),
      })
      setMessage(response.status === 409 ? 'Existing share link loaded.' : 'Share link created.')
    } catch (shareError) {
      setError(shareError instanceof Error ? shareError.message : 'Unable to create share link')
    } finally {
      setBusy(false)
    }
  }

  async function handleCopy() {
    if (!share) {
      return
    }

    try {
      await navigator.clipboard.writeText(share.url)
      setMessage('Share link copied.')
      setError(null)
    } catch {
      setError('Unable to copy the share link right now.')
    }
  }

  async function handleRevoke() {
    setBusy(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch(`/api/guides/${guideId}/share`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Unable to revoke share link')
      }

      setShare(null)
      setMessage('Share link revoked.')
    } catch (revokeError) {
      setError(revokeError instanceof Error ? revokeError.message : 'Unable to revoke share link')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-xl rounded-[2rem] border border-stone-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
              Share guide
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">
              Create a public read-only link
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-stone-300 px-3 py-1.5 text-sm text-stone-700"
          >
            Close
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-stone-700">
            Link expiry
            <select
              value={expiry}
              onChange={(event) => setExpiry(event.target.value as ExpiryOption)}
              className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
            >
              <option value="none">Never expire</option>
              <option value="7d">7 days</option>
              <option value="30d">30 days</option>
            </select>
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void handleCreate()}
              disabled={busy}
              className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
            >
              {busy ? 'Working...' : share ? 'Refresh link' : 'Create link'}
            </button>

            {share ? (
              <button
                type="button"
                onClick={() => void handleRevoke()}
                disabled={busy}
                className="rounded-full border border-rose-300 px-5 py-2.5 text-sm font-medium text-rose-700 disabled:opacity-60"
              >
                Revoke link
              </button>
            ) : null}
          </div>

          {share ? (
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm font-medium text-stone-800">Public URL</p>
              <input
                readOnly
                value={share.url}
                className="mt-2 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => void handleCopy()}
                  className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700"
                >
                  Copy link
                </button>
                <span className="text-xs text-stone-500">
                  {share.expiresAt
                    ? `Expires ${new Date(share.expiresAt).toLocaleDateString()}`
                    : 'No expiry'}
                </span>
              </div>
            </div>
          ) : null}

          {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
          {error ? <p className="text-sm text-rose-700">{error}</p> : null}
        </div>
      </div>
    </div>
  )
}
