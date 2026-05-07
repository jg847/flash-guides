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

  it('does not crash when quiz options are malformed', () => {
    render(
      <InlineQuiz
        question="Broken quiz"
        options={undefined as never}
        correct={1}
        explanation="Fallback explanation"
      />,
    )

    expect(screen.getByText('Broken quiz')).toBeInTheDocument()
    expect(
      screen.getByText('Quiz options could not be loaded for this question.'),
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Check' })).not.toBeInTheDocument()
  })

  it('normalizes string quiz options instead of throwing', () => {
    render(
      <InlineQuiz
        question="Pick one"
        options={'First | Second | Third' as unknown as string[]}
        correct={1}
        explanation="Second is correct"
      />,
    )

    fireEvent.click(screen.getByLabelText('Second'))
    fireEvent.click(screen.getByRole('button', { name: 'Check' }))

    expect(screen.getByTestId('quiz-feedback')).toHaveTextContent('Correct')
  })
})
