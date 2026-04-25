'use client'

import { useState } from 'react'

interface ConnectedAccountsSectionProps {
  providers: string[]
}

function formatProvider(provider: string): string {
  if (provider === 'google') {
    return 'Google'
  }

  return provider.charAt(0).toUpperCase() + provider.slice(1)
}

export default function ConnectedAccountsSection({ providers }: ConnectedAccountsSectionProps) {
  const [connectedProviders, setConnectedProviders] = useState(providers)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pendingProvider, setPendingProvider] = useState<string | null>(null)

  async function disconnectProvider(provider: string) {
    setPendingProvider(provider)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch(`/api/account/oauth/${provider}`, {
        method: 'DELETE',
      })

      const body = (await response.json()) as { message?: string; error?: string }
      if (!response.ok) {
        throw new Error(body.error ?? 'Unable to disconnect provider')
      }

      setConnectedProviders((current) => current.filter((entry) => entry !== provider))
      setMessage(`${formatProvider(provider)} disconnected.`)
    } catch (disconnectError) {
      setError(
        disconnectError instanceof Error
          ? disconnectError.message
          : 'Unable to disconnect provider',
      )
    } finally {
      setPendingProvider(null)
    }
  }

  return (
    <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-stone-900">Connected accounts</h2>
      <p className="mt-2 text-sm text-stone-500">
        Review the identity providers you can use to sign in.
      </p>

      <div className="mt-6 space-y-3">
        {connectedProviders.length === 0 ? (
          <p className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-500">
            No OAuth providers connected.
          </p>
        ) : (
          connectedProviders.map((provider) => (
            <div
              key={provider}
              className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3"
            >
              <span className="text-sm font-medium text-stone-800">{formatProvider(provider)}</span>
              <button
                type="button"
                onClick={() => void disconnectProvider(provider)}
                disabled={pendingProvider === provider}
                className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-white disabled:opacity-60"
              >
                {pendingProvider === provider ? 'Disconnecting...' : 'Disconnect'}
              </button>
            </div>
          ))
        )}
      </div>

      {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-rose-700">{error}</p> : null}
    </section>
  )
}
