import type { GuideSection, QuizItem } from '@/types/generation'

/**
 * GuideBuilder — fluent Builder pattern for assembling MDX study guide content.
 *
 * Usage:
 *   const mdx = new GuideBuilder()
 *     .setTitle('My Guide')
 *     .addSection({ heading: 'Intro', body: '...' })
 *     .addQuiz({ question: '...', options: ['A','B'], correctIndex: 0 })
 *     .build()
 */
export class GuideBuilder {
  private title = ''
  private readonly sections: GuideSection[] = []
  private readonly quizItems: QuizItem[] = []

  setTitle(title: string): this {
    this.title = title
    return this
  }

  addSection(section: GuideSection): this {
    this.sections.push(section)
    return this
  }

  addQuiz(item: QuizItem): this {
    this.quizItems.push(item)
    return this
  }

  /**
   * Assemble the full MDX string from all components.
   */
  build(): string {
    const parts: string[] = []

    // Title
    parts.push(`# ${this.title}\n`)

    // Sections
    for (const section of this.sections) {
      parts.push(`## ${section.heading}\n`)
      parts.push(section.body)
      parts.push('')
    }

    // Quiz section (Exam Prep mode)
    if (this.quizItems.length > 0) {
      parts.push('## Practice Questions\n')
      this.quizItems.forEach((item, index) => {
        parts.push(`**Q${index + 1}:** ${item.question}\n`)
        item.options.forEach((opt, i) => {
          const letter = String.fromCharCode(65 + i) // A, B, C, D
          parts.push(`- ${letter}) ${opt}`)
        })
        const correctLetter = String.fromCharCode(65 + (item.correctIndex ?? 0))
        parts.push(`\n**Answer:** ${correctLetter}\n`)
      })
    }

    return parts.join('\n').trimEnd()
  }
}
