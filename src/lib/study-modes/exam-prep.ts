import type { NormalizedInput, GuideSection, QuizItem } from '@/types/generation'
import { BaseGuideGenerator } from '@/lib/generation/base-generator'
import { STUDY_MODE_INSTRUCTIONS } from '@/lib/ai/prompts/index'

export class ExamPrepStrategy extends BaseGuideGenerator {
  async planSections(input: NormalizedInput): Promise<{ title: string; sections: GuideSection[] }> {
    const prompt = this.buildPlanPrompt(input, 'EXAM_PREP')
    const raw = await this.client.generate(prompt)
    return this.parsePlan(raw)
  }

  override async buildQuizzes(sections: GuideSection[]): Promise<QuizItem[]> {
    const sectionText = sections
      .map((s) => `## ${s.heading}\n${s.body}`)
      .join('\n\n')
      .slice(0, 6000)

    const prompt = `${STUDY_MODE_INSTRUCTIONS['EXAM_PREP']}

Based on the following study guide sections, generate 5 multiple-choice quiz items.
Output each as valid JSON in this exact array format (no markdown fences):
[{"question":"...","options":["A","B","C","D"],"correctIndex":0}, ...]

Sections:
${sectionText}`

    const raw = await this.client.generate(prompt)

    try {
      const jsonMatch = /\[[\s\S]*\]/.exec(raw)
      if (!jsonMatch) return []
      return JSON.parse(jsonMatch[0]) as QuizItem[]
    } catch {
      return []
    }
  }
}
