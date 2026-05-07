import type { GuideSection, QuizItem, NormalizedInput } from '@/types/generation'
import type { IStudyModeStrategy } from '@/lib/study-modes/types'
import type { ClaudeClient } from '@/lib/ai/claude'
import { STUDY_MODE_INSTRUCTIONS } from '@/lib/ai/prompts/index'

/**
 * BaseGuideGenerator — Template Method pattern.
 * Subclasses override `planSections`, and optionally `buildQuizzes`.
 * `enrichWithMedia` is a no-op by default.
 */
export abstract class BaseGuideGenerator implements IStudyModeStrategy {
  constructor(readonly client: ClaudeClient) {}

  abstract planSections(
    input: NormalizedInput,
  ): Promise<{ title: string; sections: GuideSection[] }>

  async enrichWithMedia(sections: GuideSection[]): Promise<GuideSection[]> {
    // Default: no enrichment; subclasses may override
    return sections
  }

  async buildQuizzes(_sections: GuideSection[]): Promise<QuizItem[]> {
    // Default: no quizzes; ExamPrep overrides
    return []
  }

  /**
   * Parse a plain text response from Claude that contains title + sections.
   * Expected format:
   *   TITLE: <title>
   *   ## <Heading 1>
   *   <body>
   *   ## <Heading 2>
   *   <body>
   */
  protected parsePlan(raw: string): { title: string; sections: GuideSection[] } {
    const lines = raw.split('\n')
    let title = 'Study Guide'
    const sections: GuideSection[] = []
    let currentHeading = ''
    const bodyLines: string[] = []

    for (const line of lines) {
      const titleMatch = /^TITLE:\s*(.+)/.exec(line)
      if (titleMatch) {
        title = titleMatch[1]?.trim() ?? title
        continue
      }

      const headingMatch = /^#{1,3}\s+(.+)/.exec(line)
      if (headingMatch) {
        if (currentHeading) {
          sections.push({ heading: currentHeading, body: bodyLines.join('\n').trim() })
          bodyLines.length = 0
        }
        currentHeading = headingMatch[1]?.trim() ?? ''
        continue
      }

      if (currentHeading) bodyLines.push(line)
    }

    if (currentHeading) {
      sections.push({ heading: currentHeading, body: bodyLines.join('\n').trim() })
    }

    return { title, sections }
  }

  /**
   * Build the planning prompt for a given study mode instruction set.
   */
  protected buildPlanPrompt(
    input: NormalizedInput,
    modeKey: keyof typeof STUDY_MODE_INSTRUCTIONS,
  ): string {
    const fileSpecificRequirements =
      input.type === 'FILE'
        ? `
- This source came from an uploaded file. Ground the guide only in the extracted document text below.
- Do not infer the topic from the filename, file extension, or generic knowledge about PDFs/documents.
- If the extracted text is thin or noisy, stay conservative and summarize only what is actually present.`
        : ''

    return `${STUDY_MODE_INSTRUCTIONS[modeKey]}

Requirements:
- Use all relevant information from the source material below; do not collapse specific facts into vague summaries.
- Prefer thorough coverage over brevity when the source contains meaningful detail.
- Include concrete examples, comparisons, edge cases, and explanations where the material supports them.
- Make each section substantive enough that a student could study from it directly.
${fileSpecificRequirements}

Plan a study guide about the following topic/content. Output:
1. First line: "TITLE: <guide title>"
2. Then each section as "## <heading>" followed by a paragraph body.

Topic/Content:
${input.text.slice(0, 16000)}`
  }
}
