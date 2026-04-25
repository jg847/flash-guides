'use client'

import { useId, useState } from 'react'

interface InlineQuizProps {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export default function InlineQuiz({ question, options, correct, explanation }: InlineQuizProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const groupName = useId()

  const isCorrect = selected === correct

  return (
    <div
      className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      data-testid="inline-quiz"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
        Quick Check
      </p>
      <h3 className="mt-2 text-lg font-semibold text-zinc-950 dark:text-zinc-100">{question}</h3>

      <fieldset className="mt-5 space-y-3">
        <legend className="sr-only">Quiz options</legend>
        {options.map((option, index) => {
          const checked = selected === index
          return (
            <label
              key={`${groupName}-${index}`}
              className={[
                'flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition-colors',
                checked
                  ? 'border-zinc-950 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-800'
                  : 'border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500',
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
              <span className="text-sm text-zinc-700 dark:text-zinc-300">{option}</span>
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
          <p className="mt-1">{explanation}</p>
        </div>
      ) : null}
    </div>
  )
}
