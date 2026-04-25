'use client'

import { useState } from 'react'

interface CollapsibleSectionProps {
  id: string
  heading: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export default function CollapsibleSection({
  id,
  heading,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section
      id={id}
      className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      data-testid="collapsible-section"
    >
      <h2>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={`${id}-content`}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-lg font-semibold text-zinc-900 dark:text-zinc-100"
        >
          <span>{heading}</span>
          <span
            className={[
              'text-sm text-zinc-500 transition-transform dark:text-zinc-400',
              open ? 'rotate-180' : 'rotate-0',
            ].join(' ')}
          >
            ▾
          </span>
        </button>
      </h2>
      <div
        id={`${id}-content`}
        hidden={!open}
        className="px-5 pb-5 text-zinc-700 dark:text-zinc-300"
        data-testid="collapsible-content"
      >
        {children}
      </div>
    </section>
  )
}
