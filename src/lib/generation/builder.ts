import type { FlashcardItem, GuideSection, QuizItem } from '@/types/generation'

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
  private readonly flashcards: FlashcardItem[] = []

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

  addFlashcard(card: FlashcardItem): this {
    this.flashcards.push(card)
    return this
  }

  addFlashcards(cards: FlashcardItem[]): this {
    this.flashcards.push(...cards)
    return this
  }

  private serializeString(value: string): string {
    return JSON.stringify(value)
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

    if (this.flashcards.length > 0) {
      parts.push('## Flashcards\n')
      parts.push(`<Flashcards cards={${JSON.stringify(this.flashcards)}} />`)
      parts.push('')
    }

    // Quiz section (Exam Prep mode)
    if (this.quizItems.length > 0) {
      parts.push('## Practice Questions\n')
      this.quizItems.forEach((item, index) => {
        const explanation =
          item.explanation ?? `Review the material and revisit question ${index + 1}.`
        parts.push(
          `<Quiz question={${this.serializeString(item.question)}} options={${JSON.stringify(item.options)}} correct={${item.correctIndex}} explanation={${this.serializeString(explanation)}} />`,
        )
        parts.push('')
      })
    }

    return parts.join('\n').trimEnd()
  }
}
