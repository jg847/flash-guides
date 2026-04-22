import type { GuideSection, QuizItem, NormalizedInput } from '@/types/generation'
import type { ClaudeClient } from '@/lib/ai/claude'

/**
 * Contract every study-mode strategy must satisfy.
 */
export interface IStudyModeStrategy {
  /**
   * Produce a guide title and ordered section list for the given input.
   */
  planSections(input: NormalizedInput): Promise<{ title: string; sections: GuideSection[] }>

  /**
   * Optionally enrich sections with additional content (images, web search).
   * Default implementation is a no-op.
   */
  enrichWithMedia(sections: GuideSection[]): Promise<GuideSection[]>

  /**
   * Build quiz items from the sections (only relevant for EXAM_PREP).
   * Other modes return an empty array.
   */
  buildQuizzes(sections: GuideSection[]): Promise<QuizItem[]>

  /** The Vercel AI SDK claude client to use for generation. */
  readonly client: ClaudeClient
}
