'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useMemo, useRef, useState } from 'react'

type FollowUpChatEvent =
  | { type: 'token'; text: string }
  | { type: 'suggestions'; suggestions: string[] }
  | { type: 'done' }
  | { type: 'error'; message: string }
  | {
      type: 'proposal'
      id: string
      op: 'append_section' | 'replace_section' | 'insert_section_after'
      heading: string
      body_markdown: string
      after_heading?: string
      rationale: string
    }

interface ChatMessage {
  kind: 'chat'
  role: 'user' | 'assistant'
  content: string
  suggestions?: string[]
}

interface ProposalPayload {
  id: string
  op: 'append_section' | 'replace_section' | 'insert_section_after'
  heading: string
  body_markdown: string
  after_heading?: string
  rationale: string
}

type GuideContentRequest =
  | {
      op: 'append_section' | 'replace_section'
      heading: string
      body_markdown: string
    }
  | {
      op: 'insert_section_after'
      heading: string
      body_markdown: string
      after_heading: string
    }
  | {
      op: 'remove_section'
      heading: string
    }

interface ProposalEntry {
  kind: 'proposal'
  proposal: ProposalPayload
  applying: boolean
}

interface AppliedEntry {
  kind: 'applied'
  proposal: ProposalPayload
  undoRequest: GuideContentRequest | null
  undoing: boolean
}

interface StatusEntry {
  kind: 'status'
  content: string
}

type ThreadEntry = ChatMessage | ProposalEntry | AppliedEntry | StatusEntry

interface FollowUpChatProps {
  guideId: string
  guideSlug: string
  isAuthenticated: boolean
  isOpen?: boolean
  onOpenChange?: (nextOpen: boolean) => void
  prefillMessage?: string | null
  prefillNonce?: number
}

const CHAT_STORAGE_PREFIX = 'flashguides.chat.'

function ChatIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M7 10h10" strokeLinecap="round" />
      <path d="M7 14h6" strokeLinecap="round" />
      <path
        d="M21 11.5C21 6.80558 16.9706 3 12 3C7.02944 3 3 6.80558 3 11.5C3 13.8589 4.01707 15.9934 5.66527 17.5327C5.82653 17.6833 5.93798 17.8766 5.96192 18.0957L6.20414 20.314C6.2464 20.7008 6.6463 20.9468 7.0243 20.8143L9.43452 19.9692C9.66441 19.8886 9.91642 19.8864 10.1481 19.9611C10.751 20.1554 11.3713 20.25 12 20.25C16.9706 20.25 21 16.4444 21 11.75V11.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M20 12A8 8 0 1 1 17.66 6.34" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 4v6h-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <rect x="9" y="9" width="10" height="10" rx="2" />
      <path
        d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="h-2 w-2 animate-pulse rounded-full bg-current"
          style={{ animationDelay: `${index * 160}ms` }}
        />
      ))}
    </div>
  )
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

function getProposalTitle(proposal: ProposalPayload): string {
  const verb =
    proposal.op === 'append_section'
      ? 'append section'
      : proposal.op === 'replace_section'
        ? 'replace section'
        : 'insert section'

  return `Proposed: ${verb} ${proposal.heading}`
}

function buildUndoRequest(
  proposal: ProposalPayload,
  previousBodyMarkdown?: string | null,
): GuideContentRequest | null {
  if (proposal.op === 'replace_section') {
    if (!previousBodyMarkdown) {
      return null
    }

    return {
      op: 'replace_section',
      heading: proposal.heading,
      body_markdown: previousBodyMarkdown,
    }
  }

  return {
    op: 'remove_section',
    heading: proposal.heading,
  }
}

function getChatStorageKey(guideSlug: string): string {
  return `${CHAT_STORAGE_PREFIX}${guideSlug}`
}

function readPersistedThreadEntries(guideSlug: string): ThreadEntry[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(getChatStorageKey(guideSlug))
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      return []
    }

    return sanitizeThreadEntries(parsed as ThreadEntry[])
  } catch {
    return []
  }
}

function sanitizeThreadEntries(entries: ThreadEntry[]): ThreadEntry[] {
  return entries.filter((entry) => {
    if (entry.kind !== 'chat') {
      return true
    }

    if (entry.role === 'assistant' && entry.content.trim().length === 0) {
      return false
    }

    return entry.content.trim().length > 0
  })
}

function useOptionalRouter() {
  try {
    return useRouter()
  } catch {
    return null
  }
}

export default function FollowUpChat({
  guideId,
  guideSlug,
  isAuthenticated,
  isOpen: controlledIsOpen,
  onOpenChange,
  prefillMessage,
  prefillNonce,
}: FollowUpChatProps) {
  const router = useOptionalRouter()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ThreadEntry[]>(() =>
    readPersistedThreadEntries(guideSlug),
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isOpen = controlledIsOpen ?? internalIsOpen

  function setOpen(nextOpen: boolean) {
    if (onOpenChange) {
      onOpenChange(nextOpen)
      return
    }

    setInternalIsOpen(nextOpen)
  }

  const lastAssistantMessageLength = useMemo(() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      const entry = messages[index]
      if (entry?.kind === 'chat' && entry.role === 'assistant') {
        return entry.content.length
      }
    }

    return 0
  }, [messages])

  useEffect(() => {
    if (bottomRef.current && typeof bottomRef.current.scrollIntoView === 'function') {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [lastAssistantMessageLength])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storageKey = getChatStorageKey(guideSlug)
      const sanitizedMessages = sanitizeThreadEntries(messages)

      if (sanitizedMessages.length === 0) {
        window.localStorage.removeItem(storageKey)
        return
      }

      window.localStorage.setItem(storageKey, JSON.stringify(sanitizedMessages))
    }, 250)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [guideSlug, messages])

  useEffect(() => {
    if (prefillNonce === undefined || !prefillMessage) {
      return
    }

    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) {
        return
      }

      if (onOpenChange) {
        onOpenChange(true)
      } else {
        setInternalIsOpen(true)
      }
      setMessage(prefillMessage)
      textareaRef.current?.focus()
      const nextLength = prefillMessage.length
      textareaRef.current?.setSelectionRange(nextLength, nextLength)
    })

    return () => {
      cancelled = true
    }
  }, [onOpenChange, prefillMessage, prefillNonce])

  function resetConversation() {
    abortControllerRef.current?.abort()
    abortControllerRef.current = null
    setMessages([])
    setError('')
    setLoading(false)
    window.localStorage.removeItem(getChatStorageKey(guideSlug))
  }

  function removeEmptyAssistantPlaceholder(entries: ThreadEntry[]): ThreadEntry[] {
    if (entries.length === 0) {
      return entries
    }

    const lastEntry = entries[entries.length - 1]
    if (
      lastEntry?.kind === 'chat' &&
      lastEntry.role === 'assistant' &&
      lastEntry.content.trim().length === 0
    ) {
      return entries.slice(0, -1)
    }

    return entries
  }

  async function submitMessage(rawMessage: string) {
    const trimmed = rawMessage.trim()
    if (!trimmed || loading || !isAuthenticated) {
      return
    }

    abortControllerRef.current?.abort()
    const nextRequestMessages = [
      ...messages
        .filter(
          (entry): entry is ChatMessage => entry.kind === 'chat' && entry.content.trim().length > 0,
        )
        .map((entry) => ({ role: entry.role, content: entry.content })),
      { role: 'user' as const, content: trimmed },
    ]
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    setLoading(true)
    setError('')
    setMessage('')
    setMessages((current) => [
      ...current,
      { kind: 'chat', role: 'user', content: trimmed },
      { kind: 'chat', role: 'assistant', content: '' },
    ])

    let response: Response
    try {
      response = await fetch(`/api/chat/${guideSlug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextRequestMessages }),
        signal: abortController.signal,
      })
    } catch (fetchError) {
      setLoading(false)
      setMessages((current) =>
        current.filter((entry) => !(entry.kind === 'chat' && entry.content.trim().length === 0)),
      )
      if (!isAbortError(fetchError)) {
        setError('Network error, please try again.')
      }
      return
    }

    if (!response.ok) {
      setLoading(false)
      setError(
        response.status === 401
          ? 'Sign in to ask follow-up questions.'
          : 'Unable to start follow-up chat.',
      )
      setMessages((current) => removeEmptyAssistantPlaceholder(current))
      abortControllerRef.current = null
      return
    }

    const reader = response.body?.getReader()
    if (!reader) {
      setLoading(false)
      setError('Unexpected response from server.')
      abortControllerRef.current = null
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
              if (last?.kind === 'chat' && last.role === 'assistant') {
                next[next.length - 1] = { ...last, content: `${last.content}${chatEvent.text}` }
              }
              return next
            })
          } else if (chatEvent.type === 'suggestions') {
            setMessages((current) => {
              const next = [...current]

              for (let index = next.length - 1; index >= 0; index -= 1) {
                const entry = next[index]
                if (entry?.kind === 'chat' && entry.role === 'assistant' && entry.content.trim()) {
                  next[index] = {
                    ...entry,
                    suggestions: chatEvent.suggestions,
                  }
                  break
                }
              }

              return next
            })
          } else if (chatEvent.type === 'proposal') {
            setMessages((current) => [
              ...removeEmptyAssistantPlaceholder(current),
              {
                kind: 'proposal',
                proposal: {
                  id: chatEvent.id,
                  op: chatEvent.op,
                  heading: chatEvent.heading,
                  body_markdown: chatEvent.body_markdown,
                  after_heading: chatEvent.after_heading,
                  rationale: chatEvent.rationale,
                },
                applying: false,
              },
            ])
          } else if (chatEvent.type === 'error') {
            setError(chatEvent.message)
          }
        }
      }
    } catch (streamError) {
      if (isAbortError(streamError)) {
        setMessages((current) =>
          current.filter((entry) => !(entry.kind === 'chat' && entry.content.trim().length === 0)),
        )
      } else {
        setError('The follow-up response was interrupted.')
      }
    } finally {
      setMessages((current) => removeEmptyAssistantPlaceholder(current))
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null
      }
      setLoading(false)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await submitMessage(message)
  }

  async function applyProposal(proposal: ProposalPayload) {
    setError('')
    setMessages((current) =>
      current.map((entry) =>
        entry.kind === 'proposal' && entry.proposal.id === proposal.id
          ? { ...entry, applying: true }
          : entry,
      ),
    )

    try {
      const response = await fetch(`/api/guides/${guideId}/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          op: proposal.op,
          heading: proposal.heading,
          body_markdown: proposal.body_markdown,
          ...(proposal.after_heading ? { after_heading: proposal.after_heading } : {}),
        }),
      })

      if (!response.ok) {
        throw new Error('Unable to apply proposal')
      }

      const body = (await response.json()) as {
        content: string
        previousBodyMarkdown?: string | null
      }
      const undoRequest = buildUndoRequest(proposal, body.previousBodyMarkdown)

      setMessages((current) =>
        current.map((entry) =>
          entry.kind === 'proposal' && entry.proposal.id === proposal.id
            ? { kind: 'applied', proposal, undoRequest, undoing: false }
            : entry,
        ),
      )
      router?.refresh()
    } catch {
      setError('Unable to apply proposal to the guide.')
      setMessages((current) =>
        current.map((entry) =>
          entry.kind === 'proposal' && entry.proposal.id === proposal.id
            ? { ...entry, applying: false }
            : entry,
        ),
      )
    }
  }

  async function undoProposal(proposalId: string, undoRequest: GuideContentRequest | null) {
    if (!undoRequest) {
      return
    }

    setError('')
    setMessages((current) =>
      current.map((entry) =>
        entry.kind === 'applied' && entry.proposal.id === proposalId
          ? { ...entry, undoing: true }
          : entry,
      ),
    )

    try {
      const response = await fetch(`/api/guides/${guideId}/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(undoRequest),
      })

      if (!response.ok) {
        throw new Error('Unable to undo proposal')
      }

      setMessages((current) =>
        current.map((entry) =>
          entry.kind === 'applied' && entry.proposal.id === proposalId
            ? { kind: 'status', content: 'Change undone.' }
            : entry,
        ),
      )
      router?.refresh()
    } catch {
      setError('Unable to undo the applied change.')
      setMessages((current) =>
        current.map((entry) =>
          entry.kind === 'applied' && entry.proposal.id === proposalId
            ? { ...entry, undoing: false }
            : entry,
        ),
      )
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  async function handleCopy(content: string) {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(content)
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section
          id="follow-up-chat-panel"
          className="pointer-events-auto w-[min(28rem,calc(100vw-1.5rem))] rounded-[2rem] border border-zinc-200 bg-white/95 p-5 shadow-[0_24px_80px_rgba(24,24,27,0.18)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95 dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
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
            <div className="flex items-center gap-2">
              {!isAuthenticated ? (
                <Link
                  href={`/login?callbackUrl=${encodeURIComponent(`/guide/${guideSlug}`)}`}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
                >
                  Sign in
                </Link>
              ) : null}
              <button
                type="button"
                onClick={resetConversation}
                className="rounded-full border border-zinc-300 p-2 text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
                aria-label="Start a new chat"
                data-testid="new-chat"
              >
                <RefreshIcon />
                <span className="sr-only">New chat</span>
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
                aria-label="Close chat"
              >
                Close
              </button>
            </div>
          </div>

          {messages.length > 0 ? (
            <div
              className="mb-4 max-h-[60vh] space-y-3 overflow-y-auto pr-1"
              data-testid="follow-up-messages"
            >
              {messages.map((entry, index) => (
                <div
                  key={
                    entry.kind === 'chat'
                      ? `${entry.role}-${index}`
                      : entry.kind === 'status'
                        ? `status-${index}`
                        : entry.proposal.id
                  }
                  className={[
                    'rounded-2xl px-4 py-3 text-sm leading-7',
                    entry.kind === 'chat' && entry.role === 'user'
                      ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950'
                      : 'border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200',
                  ].join(' ')}
                >
                  {entry.kind === 'chat' && entry.role === 'assistant' ? (
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="prose prose-sm dark:prose-invert max-w-none text-inherit">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.content}</ReactMarkdown>
                        </div>
                        {entry.content ? (
                          <button
                            type="button"
                            onClick={() => void handleCopy(entry.content)}
                            className="rounded-full border border-zinc-300 p-2 text-zinc-500 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
                          >
                            <CopyIcon />
                            <span className="sr-only">Copy assistant message</span>
                          </button>
                        ) : null}
                      </div>
                      {entry.suggestions && entry.suggestions.length > 0 ? (
                        <div className="flex flex-wrap gap-2" data-testid="follow-up-suggestions">
                          {entry.suggestions.map((suggestion) => (
                            <button
                              key={suggestion}
                              type="button"
                              onClick={() => void submitMessage(suggestion)}
                              className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : entry.kind === 'chat' ? (
                    entry.content
                  ) : entry.kind === 'proposal' ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                          {getProposalTitle(entry.proposal)}
                        </p>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                          {entry.proposal.rationale}
                        </p>
                      </div>
                      <details className="rounded-2xl bg-white/70 p-3 dark:bg-black/30">
                        <summary className="cursor-pointer text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          Preview proposed content
                        </summary>
                        <div className="prose prose-sm dark:prose-invert mt-3 max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {entry.proposal.body_markdown}
                          </ReactMarkdown>
                        </div>
                      </details>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => void applyProposal(entry.proposal)}
                          disabled={entry.applying}
                          data-testid="apply-proposal"
                          className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
                        >
                          {entry.applying ? 'Applying…' : 'Apply to guide'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setMessages((current) =>
                              current.filter(
                                (candidate) =>
                                  !(
                                    candidate.kind === 'proposal' &&
                                    candidate.proposal.id === entry.proposal.id
                                  ),
                              ),
                            )
                          }
                          data-testid="dismiss-proposal"
                          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  ) : entry.kind === 'applied' ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium text-emerald-700 dark:text-emerald-300">
                        Applied ✓
                      </span>
                      {entry.undoRequest ? (
                        <button
                          type="button"
                          onClick={() => void undoProposal(entry.proposal.id, entry.undoRequest)}
                          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
                        >
                          {entry.undoing ? 'Undoing…' : 'Undo'}
                        </button>
                      ) : null}
                    </div>
                  ) : (
                    entry.content
                  )}
                </div>
              ))}
              {loading && lastAssistantMessageLength === 0 ? <TypingIndicator /> : null}
              <div ref={bottomRef} />
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              maxLength={2000}
              placeholder={
                isAuthenticated
                  ? 'Ask a follow-up question…'
                  : 'Sign in to ask follow-up questions.'
              }
              disabled={!isAuthenticated}
              className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            />

            <div className="flex items-center justify-between gap-3">
              {error ? (
                <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
              ) : (
                <span />
              )}
              {loading ? (
                <button
                  type="button"
                  onClick={() => abortControllerRef.current?.abort()}
                  data-testid="stop"
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
                >
                  Stop
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isAuthenticated || !message.trim()}
                  className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
                >
                  Send
                </button>
              )}
            </div>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen(!isOpen)}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-950 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-zinc-800 dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
        data-testid="follow-up-chat-toggle"
        aria-expanded={isOpen}
        aria-controls="follow-up-chat-panel"
      >
        <ChatIcon />
        <span>{isOpen ? 'Hide chat' : 'Chat'}</span>
      </button>
    </div>
  )
}
