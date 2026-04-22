import type { NormalizedInput, GuideSection } from '@/types/generation'
import { BaseGuideGenerator } from '@/lib/generation/base-generator'

export class ELI5Strategy extends BaseGuideGenerator {
  async planSections(input: NormalizedInput): Promise<{ title: string; sections: GuideSection[] }> {
    const prompt = this.buildPlanPrompt(input, 'ELI5')
    const raw = await this.client.generate(prompt)
    return this.parsePlan(raw)
  }
}
