import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the Claude client before importing strategies
vi.mock('@/lib/ai/claude', () => ({
  claudeClient: {
    generate: vi.fn(),
    streamGenerate: vi.fn(),
  },
  ClaudeClient: vi.fn(),
}))

import { claudeClient } from '@/lib/ai/claude'
import { OverviewStrategy } from '@/lib/study-modes/overview'
import { DeepDiveStrategy } from '@/lib/study-modes/deep-dive'
import { ExamPrepStrategy } from '@/lib/study-modes/exam-prep'
import { ELI5Strategy } from '@/lib/study-modes/eli5'
import { StudyModeStrategyFactory } from '@/lib/study-modes/factory'
import type { NormalizedInput } from '@/types/generation'

const mockClient = claudeClient as unknown as {
  generate: ReturnType<typeof vi.fn>
  streamGenerate: ReturnType<typeof vi.fn>
}

const sampleInput: NormalizedInput = {
  type: 'TOPIC',
  text: 'React Hooks',
  originalValue: 'React Hooks',
}

const MOCK_PLAN = `TITLE: React Hooks Guide
## Introduction
React hooks let you use state in functional components.
## useState
The useState hook manages local state.
## useEffect
The useEffect hook handles side effects.`

beforeEach(() => {
  vi.clearAllMocks()
  mockClient.generate.mockResolvedValue(MOCK_PLAN)
})

describe('OverviewStrategy', () => {
  it('calls client.generate and returns title + sections', async () => {
    const strategy = new OverviewStrategy(claudeClient)
    const result = await strategy.planSections(sampleInput)

    expect(mockClient.generate).toHaveBeenCalledOnce()
    expect(result.title).toBe('React Hooks Guide')
    expect(result.sections.length).toBeGreaterThanOrEqual(2)
  })

  it('planSections prompt contains OVERVIEW instructions', async () => {
    const strategy = new OverviewStrategy(claudeClient)
    await strategy.planSections(sampleInput)

    const prompt = mockClient.generate.mock.calls[0]?.[0] as string
    expect(prompt).toContain('overview')
  })

  it('planSections prompt tells file uploads not to infer from pdf metadata or filename', async () => {
    const strategy = new OverviewStrategy(claudeClient)
    await strategy.planSections({
      type: 'FILE',
      text: 'Chapter 1 introduces data mining tasks, classification, clustering, and association rules.',
      originalValue: '8-data-mining-overview.pdf',
    })

    const prompt = mockClient.generate.mock.calls[0]?.[0] as string
    expect(prompt).toContain('Ground the guide only in the extracted document text below')
    expect(prompt).toContain('Do not infer the topic from the filename')
  })

  it('enrichWithMedia returns sections unchanged', async () => {
    const strategy = new OverviewStrategy(claudeClient)
    const sections = [{ heading: 'H', body: 'B' }]
    const result = await strategy.enrichWithMedia(sections)
    expect(result).toEqual(sections)
  })

  it('buildQuizzes returns empty array', async () => {
    const strategy = new OverviewStrategy(claudeClient)
    const result = await strategy.buildQuizzes([{ heading: 'H', body: 'B' }])
    expect(result).toEqual([])
  })
})

describe('DeepDiveStrategy', () => {
  it('planSections prompt contains deep-dive instructions', async () => {
    const strategy = new DeepDiveStrategy(claudeClient)
    await strategy.planSections(sampleInput)
    const prompt = mockClient.generate.mock.calls[0]?.[0] as string
    expect(prompt.toLowerCase()).toContain('deep')
  })
})

describe('ExamPrepStrategy', () => {
  it('buildQuizzes parses JSON quiz items from Claude response', async () => {
    const quizJson = JSON.stringify([
      { question: 'Q1?', options: ['A', 'B', 'C', 'D'], correctIndex: 0 },
      { question: 'Q2?', options: ['A', 'B', 'C', 'D'], correctIndex: 2 },
    ])
    mockClient.generate.mockResolvedValue(quizJson)

    const strategy = new ExamPrepStrategy(claudeClient)
    const quizzes = await strategy.buildQuizzes([{ heading: 'H', body: 'B' }])

    expect(quizzes).toHaveLength(2)
    expect(quizzes[0]?.question).toBe('Q1?')
  })

  it('buildQuizzes returns empty array on malformed JSON', async () => {
    mockClient.generate.mockResolvedValue('not valid json')
    const strategy = new ExamPrepStrategy(claudeClient)
    const quizzes = await strategy.buildQuizzes([{ heading: 'H', body: 'B' }])
    expect(quizzes).toEqual([])
  })
})

describe('ELI5Strategy', () => {
  it('planSections prompt contains ELI5 / explain like instructions', async () => {
    const strategy = new ELI5Strategy(claudeClient)
    await strategy.planSections(sampleInput)
    const prompt = mockClient.generate.mock.calls[0]?.[0] as string
    expect(prompt.toLowerCase()).toContain("explain like i'm 5")
  })
})

describe('StudyModeStrategyFactory', () => {
  it.each(['OVERVIEW', 'DEEP_DIVE', 'EXAM_PREP', 'ELI5'] as const)(
    'creates a strategy for mode %s',
    (mode) => {
      const strategy = StudyModeStrategyFactory.create(mode, claudeClient)
      expect(strategy).toBeDefined()
      expect(typeof strategy.planSections).toBe('function')
    },
  )
})
