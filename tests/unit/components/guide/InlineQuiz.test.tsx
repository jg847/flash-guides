import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import InlineQuiz from '@/components/guide/InlineQuiz'

describe('InlineQuiz', () => {
  it('shows correct feedback on the right answer', () => {
    render(
      <InlineQuiz
        question="What is JSX?"
        options={['HTML', 'JavaScript XML', 'CSS']}
        correct={1}
        explanation="JSX stands for JavaScript XML."
      />,
    )

    fireEvent.click(screen.getByLabelText('JavaScript XML'))
    fireEvent.click(screen.getByRole('button', { name: 'Check' }))

    const feedback = screen.getByTestId('quiz-feedback')
    expect(feedback).toHaveTextContent('Correct')
    expect(feedback).toHaveTextContent('JSX stands for JavaScript XML.')
  })

  it('shows incorrect feedback on the wrong answer', () => {
    render(
      <InlineQuiz
        question="What is JSX?"
        options={['HTML', 'JavaScript XML', 'CSS']}
        correct={1}
        explanation="JSX stands for JavaScript XML."
      />,
    )

    fireEvent.click(screen.getByLabelText('HTML'))
    fireEvent.click(screen.getByRole('button', { name: 'Check' }))

    const feedback = screen.getByTestId('quiz-feedback')
    expect(feedback).toHaveTextContent('Incorrect')
  })
})
