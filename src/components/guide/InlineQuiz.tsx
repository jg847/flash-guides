'use client'

import { useId, useState } from 'react'

interface InlineQuizProps {
  question: string
  options: string[]
  correct: number
  explanation: string
}

function normalizeOptions(
  options: InlineQuizProps['options'] | string | null | undefined,
): string[] {
  if (Array.isArray(options)) {
    return options.filter(
      (option): option is string => typeof option === 'string' && option.length > 0,
    )
  }

  if (typeof options === 'string') {
    return options
      .split(/\r?\n|\s*\|\s*/)
      .map((option) => option.trim())
      .filter(Boolean)
  }

  return []
}

export default function InlineQuiz({ question, options, correct, explanation }: InlineQuizProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const groupName = useId()
  const normalizedQuestion = typeof question === 'string' ? question : 'Practice question'
  const normalizedExplanation =
    typeof explanation === 'string' ? explanation : 'Review the section and try again.'
  const normalizedOptions = normalizeOptions(options)
  const normalizedCorrect =
    typeof correct === 'number' && Number.isInteger(correct) && correct >= 0 ? correct : -1

  const isCorrect = selected === normalizedCorrect

  return (
    <div
      className="rounded-3xl border border-zinc-300 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-black"
      data-testid="inline-quiz"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
        Quick Check
      </p>
      <h3 className="mt-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
        {normalizedQuestion}
      </h3>

      {normalizedOptions.length > 0 ? (
        <>
          <fieldset className="mt-5 space-y-3">
            <legend className="sr-only">Quiz options</legend>
            {normalizedOptions.map((option, index) => {
              const checked = selected === index
              return (
                <label
                  key={`${groupName}-${index}`}
                  className={[
                    'flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition-colors',
                    checked
                      ? 'border-zinc-950 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900'
                      : 'border-zinc-300 bg-white hover:border-zinc-500 dark:border-zinc-700 dark:bg-black dark:hover:border-zinc-500',
                  ].join(' ')}
                >
                  <input
                    type="radio"
                    name={groupName}
                    value={index}
                    checked={checked}
                    onChange={() => setSelected(index)}
                    className="mt-1"
                  />
                  <span className="text-sm text-zinc-800 dark:text-zinc-200">{option}</span>
                </label>
              )
            })}
          </fieldset>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={selected === null}
              className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
            >
              Check
            </button>
          </div>
        </>
      ) : (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Quiz options could not be loaded for this question.
        </div>
      )}

      {submitted && selected !== null ? (
        <div
          className={[
            'mt-5 rounded-2xl border px-4 py-3 text-sm',
            isCorrect
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-rose-200 bg-rose-50 text-rose-800',
          ].join(' ')}
          data-testid="quiz-feedback"
        >
          <p className="font-semibold">{isCorrect ? 'Correct' : 'Incorrect'}</p>
          <p className="mt-1">{normalizedExplanation}</p>
        </div>
      ) : null}
    </div>
  )
}
