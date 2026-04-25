'use client'

import { useState } from 'react'

interface ExportDropdownProps {
  guideId: string
}

const exportOptions = [
  { format: 'md', label: 'Markdown', newTab: false },
  { format: 'html', label: 'Single-file HTML', newTab: false },
  { format: 'pdf', label: 'PDF', newTab: true },
] as const

export default function ExportDropdown({ guideId }: ExportDropdownProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        data-testid="guide-export-button"
        onClick={() => setOpen((current) => !current)}
        className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:border-stone-900 hover:text-stone-950"
      >
        Export
      </button>

      {open ? (
        <div
          className="absolute right-0 z-40 mt-3 w-56 rounded-2xl border border-stone-200 bg-white p-2 shadow-xl"
          data-testid="guide-export-menu"
        >
          {exportOptions.map((option) => (
            <a
              key={option.format}
              href={`/api/guides/${guideId}/export?format=${option.format}`}
              target={option.newTab ? '_blank' : undefined}
              rel={option.newTab ? 'noreferrer' : undefined}
              className="block rounded-xl px-4 py-3 text-sm text-stone-700 transition-colors hover:bg-stone-50"
            >
              {option.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  )
}
