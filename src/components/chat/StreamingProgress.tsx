'use client'

type Step = 'planning' | 'writing' | 'done'

interface StreamingProgressProps {
  step: Step | null
  tokenPreview: string
}

const STEPS: { key: Step; label: string }[] = [
  { key: 'planning', label: 'Planning' },
  { key: 'writing', label: 'Writing' },
  { key: 'done', label: 'Done' },
]

function stepIndex(step: Step | null): number {
  if (!step) return -1
  return STEPS.findIndex((s) => s.key === step)
}

export default function StreamingProgress({ step, tokenPreview }: StreamingProgressProps) {
  const current = stepIndex(step)

  return (
    <div data-testid="streaming-progress" className="w-full space-y-4">
      {/* Step indicators */}
      <ol className="flex items-center gap-6" aria-label="Generation progress">
        {STEPS.map((s, i) => {
          const isComplete = current > i
          const isActive = current === i
          return (
            <li key={s.key} className="flex items-center gap-2" data-testid={`step-${s.key}`}>
              <span
                className={[
                  'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                  isComplete
                    ? 'bg-green-500 text-white'
                    : isActive
                      ? 'bg-indigo-600 text-white animate-pulse'
                      : 'bg-zinc-200 text-zinc-400 dark:bg-zinc-700',
                ].join(' ')}
                aria-current={isActive ? 'step' : undefined}
              >
                {isComplete ? '✓' : i + 1}
              </span>
              <span
                className={[
                  'text-sm font-medium',
                  isComplete
                    ? 'text-green-600 dark:text-green-400'
                    : isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-zinc-400',
                ].join(' ')}
              >
                {s.label}
              </span>
            </li>
          )
        })}
      </ol>

      {/* Token preview */}
      {tokenPreview && (
        <pre
          data-testid="token-preview"
          className="max-h-48 overflow-y-auto rounded-lg bg-zinc-50 p-4 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 whitespace-pre-wrap"
        >
          {tokenPreview}
        </pre>
      )}
    </div>
  )
}
