'use client'

import { useRef } from 'react'
import FollowUpChat from './FollowUpChat'
import HighlightNote from './HighlightNote'

interface GuideClientShellProps {
  guideId: string
  guideSlug: string
  isAuthenticated: boolean
  isReadOnly?: boolean
  children: React.ReactNode
}

export default function GuideClientShell({
  guideId,
  guideSlug,
  isAuthenticated,
  isReadOnly = false,
  children,
}: GuideClientShellProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="space-y-8">
      <div ref={contentRef} className="relative">
        {children}
        {!isReadOnly ? (
          <HighlightNote
            contentRef={contentRef}
            guideId={guideId}
            isAuthenticated={isAuthenticated}
          />
        ) : null}
      </div>
      {!isReadOnly ? (
        <FollowUpChat guideSlug={guideSlug} isAuthenticated={isAuthenticated} />
      ) : null}
    </div>
  )
}
