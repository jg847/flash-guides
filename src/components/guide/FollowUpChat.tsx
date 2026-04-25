'use client'

import Link from 'next/link'
import { useState } from 'react'

type FollowUpChatEvent =
  | { type: 'token'; text: string }
  | { type: 'done' }
  | { type: 'error'; message: string }

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface FollowUpChatProps {
  guideSlug: string
  isAuthenticated: boolean
}

export default function FollowUpChat({ guideSlug, isAuthenticated }: FollowUpChatProps) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmed = message.trim()
    if (!trimmed || loading || !isAuthenticated) {
      return
    }

    setLoading(true)
    setError('')
    setMessage('')
    setMessages((current) => [
      ...current,
      { role: 'user', content: trimmed },
      { role: 'assistant', content: '' },
    ])

    let response: Response
    try {
      response = await fetch(`/api/chat/${guideSlug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })
    } catch {
      setLoading(false)
      setError('Network error, please try again.')
      setMessages((current) => current.slice(0, -1))
      return
    }

    if (!response.ok) {
      setLoading(false)
      setError(
        response.status === 401
          ? 'Sign in to ask follow-up questions.'
          : 'Unable to start follow-up chat.',
      )
      setMessages((current) => current.slice(0, -1))
      return
    }

    const reader = response.body?.getReader()
    if (!reader) {
      setLoading(false)
      setError('Unexpected response from server.')
      return
    }

    const decoder = new TextDecoder()
    let buffer = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }

        buffer += decoder.decode(value, { stream: true })
        const parts = buffer.split('\n\n')
        buffer = parts.pop() ?? ''

        for (const part of parts) {
          const line = part.trim()
          if (!line.startsWith('data: ')) {
            continue
          }

          let chatEvent: FollowUpChatEvent
          try {
            chatEvent = JSON.parse(line.slice(6)) as FollowUpChatEvent
          } catch {
            continue
          }

          if (chatEvent.type === 'token') {
            setMessages((current) => {
              const next = [...current]
              const last = next[next.length - 1]
              if (last?.role === 'assistant') {
                next[next.length - 1] = { ...last, content: `${last.content}${chatEvent.text}` }
              }
              return next
            })
          } else if (chatEvent.type === 'error') {
            setError(chatEvent.message)
          }
        }
      }
    } catch {
      setError('The follow-up response was interrupted.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="sticky bottom-4 rounded-[2rem] border border-zinc-200 bg-white/95 p-5 shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95"
      data-testid="follow-up-chat"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Follow-up chat
          </p>
          <h2 className="mt-1 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            Ask deeper questions about this guide.
          </h2>
        </div>
        {!isAuthenticated ? (
          <Link
            href="/login"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
          >
            Sign in
          </Link>
        ) : null}
      </div>

      {messages.length > 0 ? (
        <div className="mb-4 max-h-72 space-y-3 overflow-y-auto" data-testid="follow-up-messages">
          {messages.map((entry, index) => (
            <div
              key={`${entry.role}-${index}`}
              className={[
                'rounded-2xl px-4 py-3 text-sm leading-7',
                entry.role === 'user'
                  ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950'
                  : 'border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200',
              ].join(' ')}
            >
              {entry.content || (loading && entry.role === 'assistant' ? 'Thinking…' : '')}
            </div>
          ))}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={3}
          maxLength={2000}
          placeholder={
            isAuthenticated ? 'Ask a follow-up question…' : 'Sign in to ask follow-up questions.'
          }
          disabled={!isAuthenticated || loading}
          className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        />

        <div className="flex items-center justify-between gap-3">
          {error ? <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p> : <span />}
          <button
            type="submit"
            disabled={!isAuthenticated || !message.trim() || loading}
            className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
          >
            {loading ? 'Sending…' : 'Send'}
          </button>
        </div>
      </form>
    </section>
  )
}
