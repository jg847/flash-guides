'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface ForkButtonProps {
  guideId: string
}

export default function ForkButton({ guideId }: ForkButtonProps) {
  const router = useRouter()
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleFork() {
    setMessage(null)
    setError(null)

    try {
      const response = await fetch(`/api/guides/${guideId}/fork`, {
        method: 'POST',
      })

      const body = (await response.json()) as { guideSlug?: string; error?: string }
      if (!response.ok || !body.guideSlug) {
        throw new Error(body.error ?? 'Unable to fork guide')
      }

      setMessage('Guide forked to your dashboard.')
      startTransition(() => {
        router.push(`/guide/${body.guideSlug}`)
      })
    } catch (forkError) {
      setError(forkError instanceof Error ? forkError.message : 'Unable to fork guide')
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <button
        type="button"
        data-testid="fork-guide-button"
        onClick={() => void handleFork()}
        disabled={isPending}
        className="inline-flex rounded-full bg-sky-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-800 disabled:opacity-60"
      >
        {isPending ? 'Forking...' : 'Fork to my guides'}
      </button>
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="text-sm text-rose-700">{error}</p> : null}
    </div>
  )
}
