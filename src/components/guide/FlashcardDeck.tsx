'use client'

import { useState } from 'react'
import FlashcardCard from './FlashcardCard'
import type { FlashcardItem } from '@/types/generation'

interface FlashcardDeckProps {
  cards: FlashcardItem[]
}

export default function FlashcardDeck({ cards }: FlashcardDeckProps) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (cards.length === 0) {
    return null
  }

  const current = cards[index]!

  function move(offset: number) {
    setIndex((currentIndex) => (currentIndex + offset + cards.length) % cards.length)
    setFlipped(false)
  }

  return (
    <div
      className="space-y-4 rounded-3xl border border-zinc-300 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-black"
      data-testid="flashcard-deck"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
            Flashcards
          </p>
          <p className="text-sm text-zinc-700 dark:text-zinc-200">
            Card {index + 1} of {cards.length}
          </p>
        </div>
      </div>

      <FlashcardCard
        front={current.front}
        back={current.back}
        flipped={flipped}
        onFlip={() => setFlipped((value) => !value)}
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => move(-1)}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => setFlipped((value) => !value)}
          className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
        >
          Flip
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
        >
          Next
        </button>
      </div>
    </div>
  )
}
