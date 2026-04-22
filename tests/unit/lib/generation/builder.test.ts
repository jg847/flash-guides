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

  it('includes a Practice Questions section when quiz items added', () => {
    const mdx = new GuideBuilder()
      .setTitle('Exam Guide')
      .addQuiz({
        question: 'What is JSX?',
        options: ['HTML', 'JavaScript XML', 'JSON', 'None'],
        correctIndex: 1,
      })
      .build()

    expect(mdx).toContain('## Practice Questions')
    expect(mdx).toContain('What is JSX?')
    expect(mdx).toContain('**Answer:** B')
  })

  it('supports fluent chaining', () => {
    const builder = new GuideBuilder()
    const result = builder.setTitle('T').addSection({ heading: 'H', body: 'B' })
    expect(result).toBe(builder)
  })

  it('uses correct letter labels for quiz options', () => {
    const mdx = new GuideBuilder()
      .setTitle('G')
      .addQuiz({
        question: 'Q?',
        options: ['First', 'Second', 'Third', 'Fourth'],
        correctIndex: 2,
      })
      .build()

    expect(mdx).toContain('A) First')
    expect(mdx).toContain('B) Second')
    expect(mdx).toContain('C) Third')
    expect(mdx).toContain('D) Fourth')
    expect(mdx).toContain('**Answer:** C')
  })
})
