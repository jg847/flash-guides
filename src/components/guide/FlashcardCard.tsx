'use client'

interface FlashcardCardProps {
  front: string
  back: string
  flipped: boolean
  onFlip: () => void
}

export default function FlashcardCard({ front, back, flipped, onFlip }: FlashcardCardProps) {
  return (
    <button
      type="button"
      onClick={onFlip}
      className="group relative min-h-56 w-full rounded-3xl border border-zinc-200 bg-linear-to-br from-white to-zinc-50 p-6 text-left shadow-sm transition-transform duration-300 [transform-style:preserve-3d] dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-800"
      aria-pressed={flipped}
      data-testid="flashcard-card"
    >
      <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
        {flipped ? 'Answer' : 'Prompt'}
      </span>
      <span className="block text-xl font-semibold leading-8 text-zinc-950 dark:text-zinc-50">
        {flipped ? back : front}
      </span>
      <span className="mt-6 block text-sm text-zinc-500 dark:text-zinc-400">
        Click card to flip
      </span>
    </button>
  )
}
