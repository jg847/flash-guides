'use client'

import type { StudyModeType } from '@/types/generation'

const MODES: { value: StudyModeType; label: string; description: string }[] = [
  { value: 'OVERVIEW', label: 'Overview', description: 'High-level summary' },
  { value: 'DEEP_DIVE', label: 'Deep Dive', description: 'In-depth exploration' },
  { value: 'EXAM_PREP', label: 'Exam Prep', description: 'Q&A for revision' },
  { value: 'ELI5', label: 'ELI5', description: 'Simple explanation' },
]

interface StudyModeSelectorProps {
  value: StudyModeType
  onChange: (mode: StudyModeType) => void
}

export default function StudyModeSelector({ value, onChange }: StudyModeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Study mode">
      {MODES.map((mode) => (
        <button
          key={mode.value}
          type="button"
          onClick={() => onChange(mode.value)}
          aria-pressed={value === mode.value}
          data-testid={`study-mode-${mode.value.toLowerCase()}`}
          className={[
            'rounded-full px-3 py-1 text-sm font-medium transition-colors',
            value === mode.value
              ? 'bg-indigo-600 text-white'
              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700',
          ].join(' ')}
        >
          {mode.label}
        </button>
      ))}
    </div>
  )
}
