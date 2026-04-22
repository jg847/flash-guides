import type { StudyModeType } from '@/types/generation'
import type { IStudyModeStrategy } from './types'
import type { ClaudeClient } from '@/lib/ai/claude'
import { OverviewStrategy } from './overview'
import { DeepDiveStrategy } from './deep-dive'
import { ExamPrepStrategy } from './exam-prep'
import { ELI5Strategy } from './eli5'

/**
 * Factory that creates the correct study-mode strategy for a given mode.
 */
export class StudyModeStrategyFactory {
  static create(mode: StudyModeType, client: ClaudeClient): IStudyModeStrategy {
    switch (mode) {
      case 'OVERVIEW':
        return new OverviewStrategy(client)
      case 'DEEP_DIVE':
        return new DeepDiveStrategy(client)
      case 'EXAM_PREP':
        return new ExamPrepStrategy(client)
      case 'ELI5':
        return new ELI5Strategy(client)
    }
  }
}
