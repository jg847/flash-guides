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
  { value: 'FILE', label: 'File', placeholder: '' },
]

interface PromptBoxProps {
  isAuthenticated?: boolean
}

const GUEST_GUIDE_STORAGE_KEY = 'flashguides.guest-guides'

function persistGuestGuideSlug(slug: string) {
  try {
    const raw = window.localStorage.getItem(GUEST_GUIDE_STORAGE_KEY)
    const current = raw ? (JSON.parse(raw) as string[]) : []
    const next = Array.from(new Set([...current, slug])).slice(-20)
    window.localStorage.setItem(GUEST_GUIDE_STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore localStorage errors
  }
}

export default function PromptBox({ isAuthenticated = false }: PromptBoxProps) {
  const router = useRouter()
  const [inputType, setInputType] = useState<InputType>('TOPIC')
  const [inputValue, setInputValue] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [studyMode, setStudyMode] = useState<StudyModeType>('OVERVIEW')
  const [genState, setGenState] = useState<GenState>('idle')
  const [tokenPreview, setTokenPreview] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [quotaOpen, setQuotaOpen] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const currentStep =
    genState === 'planning' ||
    genState === 'writing' ||
    genState === 'done' ||
    (genState === 'fetching' && inputType === 'URL')
      ? (genState as 'fetching' | 'planning' | 'writing' | 'done')
      : null

  const isGenerating = genState === 'fetching' || genState === 'planning' || genState === 'writing'
  const canSubmit = inputType === 'FILE' ? Boolean(selectedFile) : Boolean(inputValue.trim())

  function cancelGeneration() {
    abortRef.current?.abort()
    abortRef.current = null
    setGenState('idle')
    setTokenPreview('')
    setErrorMsg('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || isGenerating) return

    setGenState('fetching')
    setTokenPreview('')
    setErrorMsg('')

    const abort = new AbortController()
    abortRef.current = abort

    let res: Response
    try {
      if (inputType === 'FILE' && selectedFile) {
        const formData = new FormData()
        formData.set('inputType', inputType)
        formData.set('studyMode', studyMode)
        formData.set('file', selectedFile)

        res = await fetch('/api/generate', {
          method: 'POST',
          body: formData,
          signal: abort.signal,
        })
      } else {
        res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inputType, inputValue, studyMode }),
          signal: abort.signal,
        })
      }
    } catch {
      if (abort.signal.aborted) {
        setGenState('idle')
        abortRef.current = null
        return
      }

      setGenState('error')
      setErrorMsg('Network error, please try again')
      abortRef.current = null
      return
    }

    if (!res.ok) {
      if (res.status === 429) {
        setQuotaOpen(true)
        setGenState('idle')
        abortRef.current = null
        return
      }

      let apiMessage = `Server error (${res.status})`
      try {
        const body = (await res.json()) as { error?: { message?: string } }
        if (body.error?.message) {
          apiMessage = body.error.message
        }
      } catch {
        // ignore invalid error bodies
      }

      setGenState('error')
      setErrorMsg(apiMessage)
      abortRef.current = null
      return
    }

    const reader = res.body?.getReader()
    if (!reader) {
      setGenState('error')
      setErrorMsg('Unexpected response from server')
      abortRef.current = null
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
            if (
              event.step === 'fetching' ||
              event.step === 'planning' ||
              event.step === 'writing'
            ) {
              setGenState(event.step)
            }
          } else if (event.type === 'token') {
            setTokenPreview((prev) => prev + event.text)
          } else if (event.type === 'done') {
            setGenState('done')
            if (!isAuthenticated && event.isGuestGuide) {
              persistGuestGuideSlug(event.guideSlug)
            }
            abortRef.current = null
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
            abortRef.current = null
            return
          }
        }
      }
    } catch {
      if (!abort.signal.aborted) {
        setGenState('error')
        setErrorMsg('Stream interrupted, please try again')
      } else {
        setGenState('idle')
      }
    } finally {
      abortRef.current = null
    }
  }

  const currentTab = INPUT_TABS.find((t) => t.value === inputType)

  return (
    <>
      <form
        onSubmit={handleSubmit}
        data-testid="prompt-box"
        className="w-full space-y-4 rounded-[1.6rem] border border-zinc-300 bg-white/95 p-6 shadow-sm dark:border-zinc-700 dark:bg-black/90"
      >
        {/* Input mode tabs */}
        <div className="flex gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900" role="tablist">
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
                setSelectedFile(null)
              }}
              className={[
                'flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                inputType === tab.value
                  ? 'bg-white shadow-sm text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Textarea */}
        {inputType === 'FILE' ? (
          <label className="block rounded-xl border border-dashed border-zinc-600 bg-zinc-950/70 px-4 py-5 text-sm text-zinc-200 transition-colors hover:border-zinc-400">
            <span className="block font-medium text-zinc-100">Upload a source file</span>
            <span className="mt-1 block text-zinc-400">
              PDF, text, markdown, JSON, CSV, code, and other readable files.
            </span>
            <input
              type="file"
              data-testid="prompt-file-input"
              disabled={isGenerating}
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null
                setSelectedFile(file)
                setInputValue(file?.name ?? '')
              }}
              className="mt-4 block w-full cursor-pointer text-sm text-zinc-300 file:mr-4 file:rounded-full file:border-0 file:bg-zinc-100 file:px-4 file:py-2 file:font-medium file:text-zinc-950 hover:file:bg-zinc-200 disabled:opacity-50"
            />
            {selectedFile ? (
              <span className="mt-3 block text-sm text-zinc-100">
                Selected: {selectedFile.name}
              </span>
            ) : null}
          </label>
        ) : (
          <textarea
            data-testid="prompt-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={currentTab?.placeholder ?? ''}
            rows={inputType === 'TEXT' ? 8 : 3}
            disabled={isGenerating}
            className="w-full resize-none rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-950 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-400"
          />
        )}

        {/* Study mode selector */}
        <StudyModeSelector value={studyMode} onChange={setStudyMode} />

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!canSubmit || isGenerating}
            data-testid="generate-button"
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          >
            {isGenerating ? 'Generating…' : 'Generate →'}
          </button>

          <button
            type="button"
            onClick={cancelGeneration}
            disabled={!isGenerating}
            data-testid="cancel-generation-button"
            className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
          >
            Stop
          </button>
        </div>

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
