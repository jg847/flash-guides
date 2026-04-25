'use client'

import { useState } from 'react'
import ShareModal from './ShareModal'

interface ShareButtonProps {
  guideId: string
}

export default function ShareButton({ guideId }: ShareButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        data-testid="guide-share-button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:border-stone-900 hover:text-stone-950"
      >
        Share
      </button>

      {open ? <ShareModal guideId={guideId} onClose={() => setOpen(false)} /> : null}
    </>
  )
}
