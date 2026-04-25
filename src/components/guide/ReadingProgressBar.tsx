'use client'

import { useEffect, useState } from 'react'

function computeProgress(): number {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  const scrollable = scrollHeight - clientHeight

  if (scrollable <= 0) {
    return 0
  }

  return Math.min(100, Math.max(0, Math.round((scrollTop / scrollable) * 100)))
}

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => setProgress(computeProgress())

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="sticky top-0 z-40 h-1 w-full bg-zinc-200 dark:bg-zinc-800" aria-hidden="true">
      <progress
        max={100}
        value={progress}
        className="h-full w-full appearance-none [&::-webkit-progress-bar]:bg-zinc-200 [&::-webkit-progress-value]:bg-zinc-950 [&::-moz-progress-bar]:bg-zinc-950 dark:[&::-webkit-progress-bar]:bg-zinc-800 dark:[&::-webkit-progress-value]:bg-zinc-100 dark:[&::-moz-progress-bar]:bg-zinc-100"
        data-testid="reading-progress"
      />
    </div>
  )
}
