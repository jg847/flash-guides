'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import FollowUpChat from './FollowUpChat'
import HighlightNote from './HighlightNote'

interface GuideClientShellProps {
  guideId: string
  guideSlug: string
  isAuthenticated: boolean
  isClaimableGuestGuide?: boolean
  isReadOnly?: boolean
  children: React.ReactNode
}

const GUEST_GUIDE_STORAGE_KEY = 'flashguides.guest-guides'

function consumeGuestGuideSlug(slug: string): boolean {
  try {
    const raw = window.localStorage.getItem(GUEST_GUIDE_STORAGE_KEY)
    const current = raw ? (JSON.parse(raw) as string[]) : []
    if (!current.includes(slug)) {
      return false
    }

    const next = current.filter((entry) => entry !== slug)
    window.localStorage.setItem(GUEST_GUIDE_STORAGE_KEY, JSON.stringify(next))
    return true
  } catch {
    return false
  }
}

export default function GuideClientShell({
  guideId,
  guideSlug,
  isAuthenticated,
  isClaimableGuestGuide = false,
  isReadOnly = false,
  children,
}: GuideClientShellProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [claimStatus, setClaimStatus] = useState<'idle' | 'claiming' | 'claimed' | 'error'>('idle')
  const [chatIsOpen, setChatIsOpen] = useState(false)
  const [chatPrefill, setChatPrefill] = useState<string | null>(null)
  const [chatPrefillNonce, setChatPrefillNonce] = useState(0)
  const hasStartedClaimRef = useRef(false)

  function handleAskAboutText(selectedText: string) {
    setChatPrefill(`> ${selectedText}\n\n`)
    setChatPrefillNonce((current) => current + 1)
    setChatIsOpen(true)
  }

  useEffect(() => {
    if (!isAuthenticated || !isClaimableGuestGuide || hasStartedClaimRef.current) {
      return
    }

    if (!consumeGuestGuideSlug(guideSlug)) {
      return
    }

    hasStartedClaimRef.current = true
    let cancelled = false
    queueMicrotask(() => {
      if (!cancelled) {
        setClaimStatus('claiming')
      }
    })

    void fetch(`/api/guides/claim/${guideSlug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (cancelled) {
          return
        }

        setClaimStatus(response.ok ? 'claimed' : 'error')
      })
      .catch(() => {
        if (!cancelled) {
          setClaimStatus('error')
        }
      })

    return () => {
      cancelled = true
    }
  }, [guideSlug, isAuthenticated, isClaimableGuestGuide])

  return (
    <div className="space-y-8">
      {isClaimableGuestGuide ? (
        <section className="rounded-2xl border border-zinc-300 bg-white p-4 text-sm text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-black dark:text-zinc-200">
          {isAuthenticated ? (
            <p>
              {claimStatus === 'claimed'
                ? 'This guide has been saved to your profile.'
                : claimStatus === 'claiming'
                  ? 'Saving this guide to your profile…'
                  : claimStatus === 'error'
                    ? 'We could not save this guide automatically. Please try generating it again from your account.'
                    : 'This guest guide is ready to be saved to your profile.'}
            </p>
          ) : (
            <p>
              Want to keep this guide?{' '}
              <Link
                href={`/login?callbackUrl=${encodeURIComponent(`/guide/${guideSlug}`)}`}
                className="font-semibold text-zinc-950 underline underline-offset-4 dark:text-zinc-100"
              >
                Log in to save it to your profile.
              </Link>
            </p>
          )}
        </section>
      ) : null}
      <div ref={contentRef} className="relative">
        {children}
        {!isReadOnly ? (
          <HighlightNote
            contentRef={contentRef}
            guideId={guideId}
            guideSlug={guideSlug}
            isAuthenticated={isAuthenticated}
            onAskAboutText={handleAskAboutText}
          />
        ) : null}
      </div>
      {!isReadOnly ? (
        <FollowUpChat
          guideId={guideId}
          guideSlug={guideSlug}
          isAuthenticated={isAuthenticated}
          isOpen={chatIsOpen}
          onOpenChange={setChatIsOpen}
          prefillMessage={chatPrefill}
          prefillNonce={chatPrefillNonce}
        />
      ) : null}
    </div>
  )
}
