'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import StudyModeSelector from './StudyModeSelector'
import StreamingProgress from './StreamingProgress'
import QuotaExhaustedModal from '@/components/guest/QuotaExhaustedModal'
import type { InputType, StudyModeType, SSEEvent } from '@/types/generation'

type GenState = 'idle' | 'fetching' | 'planning' | 'writing' | 'done' | 'error'

const INPUT_TABS: { value: InputType; label: string; placeholder: string }[] = [
  { value: 'TOPIC', label: 'Topic', placeholder: 'e.g. "The French Revolution"' },
  { value: 'TEXT', label: 'Text', placeholder: 'Paste your text here…' },
  { value: 'URL', label: 'URL', placeholder: 'https://…' },
]

export default function PromptBox() {
  const router = useRouter()
  const [inputType, setInputType] = useState<InputType>('TOPIC')
  const [inputValue, setInputValue] = useState('')
  const [studyMode, setStudyMode] = useState<StudyModeType>('OVERVIEW')
  const [genState, setGenState] = useState<GenState>('idle')
  const [tokenPreview, setTokenPreview] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [quotaOpen, setQuotaOpen] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const currentStep =
    genState === 'planning' || genState === 'writing' || genState === 'done'
      ? (genState as 'planning' | 'writing' | 'done')
      : null

  const isGenerating = genState === 'fetching' || genState === 'planning' || genState === 'writing'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!inputValue.trim() || isGenerating) return

    setGenState('fetching')
    setTokenPreview('')
    setErrorMsg('')

    const abort = new AbortController()
    abortRef.current = abort

    let res: Response
    try {
      res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputType, inputValue, studyMode }),
        signal: abort.signal,
      })
    } catch {
      setGenState('error')
      setErrorMsg('Network error, please try again')
      return
    }

    if (!res.ok) {
      if (res.status === 429) {
        setQuotaOpen(true)
        setGenState('idle')
        return
      }
      setGenState('error')
      setErrorMsg(`Server error (${res.status})`)
      return
    }

    const reader = res.body?.getReader()
    if (!reader) {
      setGenState('error')
      setErrorMsg('Unexpected response from server')
      return
    }

    const decoder = new TextDecoder()
    let buffer = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const parts = buffer.split('\n\n')
        buffer = parts.pop() ?? ''

        for (const part of parts) {
          const line = part.trim()
          if (!line.startsWith('data: ')) continue
          let event: SSEEvent
          try {
            event = JSON.parse(line.slice(6)) as SSEEvent
          } catch {
            continue
          }

          if (event.type === 'step') {
            if (event.step === 'planning' || event.step === 'writing') {
              setGenState(event.step)
            }
          } else if (event.type === 'token') {
            setTokenPreview((prev) => prev + event.text)
          } else if (event.type === 'done') {
            setGenState('done')
            router.push(`/guide/${event.guideSlug}`)
            return
          } else if (event.type === 'error') {
            let parsed: { code?: string } = {}
            try {
              parsed = JSON.parse(event.message) as { code?: string }
            } catch {
              // not JSON, treat as plain message
            }
            if (parsed.code === 'QUOTA_EXCEEDED') {
              setQuotaOpen(true)
              setGenState('idle')
            } else {
              setGenState('error')
              setErrorMsg(event.message)
            }
            return
          }
        }
      }
    } catch {
      if (!abort.signal.aborted) {
        setGenState('error')
        setErrorMsg('Stream interrupted, please try again')
      }
    }
  }

  const currentTab = INPUT_TABS.find((t) => t.value === inputType)

  return (
    <>
      <form
        onSubmit={handleSubmit}
        data-testid="prompt-box"
        className="w-full space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
      >
        {/* Input mode tabs */}
        <div className="flex gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800" role="tablist">
          {INPUT_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={inputType === tab.value}
              data-testid={`input-tab-${tab.value.toLowerCase()}`}
              onClick={() => {
                setInputType(tab.value)
                setInputValue('')
              }}
              className={[
                'flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                inputType === tab.value
                  ? 'bg-white shadow-sm text-zinc-900 dark:bg-zinc-700 dark:text-zinc-50'
                  : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          data-testid="prompt-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={currentTab?.placeholder ?? ''}
          rows={inputType === 'TEXT' ? 8 : 3}
          disabled={isGenerating}
          className="w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        />

        {/* Study mode selector */}
        <StudyModeSelector value={studyMode} onChange={setStudyMode} />

        {/* Submit */}
        <button
          type="submit"
          disabled={!inputValue.trim() || isGenerating}
          data-testid="generate-button"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        >
          {isGenerating ? 'Generating…' : 'Generate →'}
        </button>

        {/* Error */}
        {genState === 'error' && errorMsg && (
          <p
            role="alert"
            data-testid="generation-error"
            className="text-sm text-red-600 dark:text-red-400"
          >
            {errorMsg}
          </p>
        )}
      </form>

      {/* Streaming progress (shown while generating) */}
      {isGenerating && (
        <div className="mt-4">
          <StreamingProgress step={currentStep} tokenPreview={tokenPreview} />
        </div>
      )}

      <QuotaExhaustedModal open={quotaOpen} onClose={() => setQuotaOpen(false)} />
    </>
  )
}
