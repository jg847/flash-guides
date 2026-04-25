import { describe, it, expect } from 'vitest'
import { GuideBuilder } from '@/lib/generation/builder'

describe('GuideBuilder', () => {
  it('builds a minimal MDX string with a title', () => {
    const mdx = new GuideBuilder().setTitle('My Guide').build()
    expect(mdx).toContain('# My Guide')
  })

  it('includes section headings and body text', () => {
    const mdx = new GuideBuilder()
      .setTitle('React Basics')
      .addSection({ heading: 'Introduction', body: 'React is a library.' })
      .addSection({ heading: 'Components', body: 'Components are reusable.' })
      .build()

    expect(mdx).toContain('## Introduction')
    expect(mdx).toContain('React is a library.')
    expect(mdx).toContain('## Components')
    expect(mdx).toContain('Components are reusable.')
  })

  it('does not include quiz section when no quizzes added', () => {
    const mdx = new GuideBuilder().setTitle('Guide').build()
    expect(mdx).not.toContain('Practice Questions')
  })

  it('includes Quiz MDX components when quiz items added', () => {
    const mdx = new GuideBuilder()
      .setTitle('Exam Guide')
      .addQuiz({
        question: 'What is JSX?',
        options: ['HTML', 'JavaScript XML', 'JSON', 'None'],
        correctIndex: 1,
      })
      .build()

    expect(mdx).toContain('## Practice Questions')
    expect(mdx).toContain('<Quiz question={"What is JSX?"}')
    expect(mdx).toContain('options={[')
    expect(mdx).toContain('correct={1}')
  })

  it('supports fluent chaining', () => {
    const builder = new GuideBuilder()
    const result = builder.setTitle('T').addSection({ heading: 'H', body: 'B' })
    expect(result).toBe(builder)
  })

  it('includes flashcards MDX when flashcards are added', () => {
    const mdx = new GuideBuilder()
      .setTitle('G')
      .addFlashcards([
        { front: 'Front one', back: 'Back one' },
        { front: 'Front two', back: 'Back two' },
      ])
      .build()

    expect(mdx).toContain('## Flashcards')
    expect(mdx).toContain('<Flashcards cards={')
    expect(mdx).toContain('Front one')
    expect(mdx).toContain('Back two')
  })
})
