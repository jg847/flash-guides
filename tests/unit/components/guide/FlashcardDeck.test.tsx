import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import FlashcardDeck from '@/components/guide/FlashcardDeck'

describe('FlashcardDeck', () => {
  const cards = [
    { front: 'What is React?', back: 'A UI library' },
    { front: 'What is JSX?', back: 'Syntax extension for JavaScript' },
    { front: 'What is a hook?', back: 'A React state/lifecycle utility' },
  ]

  it('flips card on click', () => {
    render(<FlashcardDeck cards={cards} />)

    const card = screen.getByTestId('flashcard-card')
    expect(card).toHaveTextContent('What is React?')

    fireEvent.click(card)
    expect(card).toHaveTextContent('A UI library')
  })

  it('navigates forward and wraps', () => {
    render(<FlashcardDeck cards={cards} />)

    const next = screen.getByRole('button', { name: 'Next' })
    const card = screen.getByTestId('flashcard-card')

    fireEvent.click(next)
    expect(card).toHaveTextContent('What is JSX?')

    fireEvent.click(next)
    expect(card).toHaveTextContent('What is a hook?')

    fireEvent.click(next)
    expect(card).toHaveTextContent('What is React?')
  })
})
