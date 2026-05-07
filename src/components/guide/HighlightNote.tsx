'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface HighlightNoteProps {
  contentRef: React.RefObject<HTMLElement | null>
  guideId: string
  guideSlug: string
  isAuthenticated: boolean
  onAskAboutText?: (selectedText: string) => void
}

interface TooltipState {
  left: number
  top: number
  selectedText: string
}

export default function HighlightNote({
  contentRef,
  guideId,
  guideSlug,
  isAuthenticated,
  onAskAboutText,
}: HighlightNoteProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    function handleMouseUp() {
      const selection = window.getSelection()
      const selectedText = selection?.toString().trim() ?? ''

      if (!selection || selection.rangeCount === 0 || !selectedText) {
        setTooltip(null)
        setStatus('idle')
        return
      }

      const range = selection.getRangeAt(0)
      const containerNode =
        range.commonAncestorContainer.nodeType === Node.TEXT_NODE
          ? range.commonAncestorContainer.parentNode
          : range.commonAncestorContainer

      if (!(containerNode instanceof Node) || !contentRef.current?.contains(containerNode)) {
        setTooltip(null)
        setStatus('idle')
        return
      }

      const rect = range.getBoundingClientRect()
      const left = Math.min(Math.max(rect.right - 72, 12), window.innerWidth - 180)
      const top = Math.max(rect.bottom + 8, 12)

      setStatus('idle')
      setTooltip({ left, top, selectedText })
    }

    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [contentRef])

  async function handleSave() {
    if (!tooltip || !isAuthenticated) {
      return
    }

    setStatus('saving')

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guideId, selectedText: tooltip.selectedText, content: '' }),
      })

      if (!response.ok) {
        throw new Error('Unable to save note')
      }

      setStatus('saved')
      window.getSelection()?.removeAllRanges()
      window.setTimeout(() => {
        setTooltip(null)
        setStatus('idle')
      }, 1200)
    } catch {
      setStatus('error')
    }
  }

  function handleAskAboutThis() {
    if (!tooltip) {
      return
    }

    onAskAboutText?.(tooltip.selectedText)
    window.getSelection()?.removeAllRanges()
    setTooltip(null)
    setStatus('idle')
  }

  if (!tooltip) {
    return null
  }

  return (
    <div
      className="fixed z-50 max-w-xs rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
      style={{ left: tooltip.left, top: tooltip.top }}
      data-testid="highlight-note-tooltip"
      onMouseDown={(event) => event.preventDefault()}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
        Selected text
      </p>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
        {tooltip.selectedText}
      </p>

      {isAuthenticated ? (
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
            >
              {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved' : 'Save note'}
            </button>
            <button
              type="button"
              onClick={handleAskAboutThis}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100"
            >
              Ask about this
            </button>
          </div>
          {status === 'error' ? (
            <span className="text-xs text-rose-600 dark:text-rose-400">Try again</span>
          ) : null}
        </div>
      ) : (
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAskAboutThis}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100"
            >
              Ask about this
            </button>
            <Link
              href={`/register?callbackUrl=${encodeURIComponent(`/guide/${guideSlug}`)}`}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100"
            >
              Sign up
            </Link>
          </div>
          <span className="text-sm text-zinc-600 dark:text-zinc-300">Sign up to save notes</span>
        </div>
      )}
    </div>
  )
}
