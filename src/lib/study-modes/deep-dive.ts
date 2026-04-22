import type { NormalizedInput, GuideSection } from '@/types/generation'
import { BaseGuideGenerator } from '@/lib/generation/base-generator'

export class DeepDiveStrategy extends BaseGuideGenerator {
  async planSections(input: NormalizedInput): Promise<{ title: string; sections: GuideSection[] }> {
    const prompt = this.buildPlanPrompt(input, 'DEEP_DIVE')
    const raw = await this.client.generate(prompt)
    return this.parsePlan(raw)
  }
}
