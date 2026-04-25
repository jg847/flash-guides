'use client'

import Link from 'next/link'
import type { FolderItem, GuideListItem } from '@/lib/db/repositories/types'

const STUDY_MODE_LABELS: Record<GuideListItem['studyMode'], string> = {
  OVERVIEW: 'Overview',
  DEEP_DIVE: 'Deep Dive',
  EXAM_PREP: 'Exam Prep',
  ELI5: 'ELI5',
}

const STUDY_MODE_STYLES: Record<GuideListItem['studyMode'], string> = {
  OVERVIEW: 'bg-sky-100 text-sky-700',
  DEEP_DIVE: 'bg-amber-100 text-amber-800',
  EXAM_PREP: 'bg-rose-100 text-rose-700',
  ELI5: 'bg-emerald-100 text-emerald-700',
}

function formatRelativeDate(date: Date | string): string {
  const value = typeof date === 'string' ? new Date(date) : date
  const diffMs = Date.now() - value.getTime()
  const dayMs = 1000 * 60 * 60 * 24
  const days = Math.max(0, Math.floor(diffMs / dayMs))

  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`

  return value.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface DashboardGuideCardProps {
  guide: GuideListItem
  folders: FolderItem[]
  onToggleFavorite: (guide: GuideListItem) => void
  onDelete: (guide: GuideListItem) => void
  onMoveFolder: (guide: GuideListItem, folderId: string | null) => void
  onSaveTags: (guide: GuideListItem, tags: string[]) => void
  pendingGuideId?: string | null
  compact?: boolean
}

export default function GuideCard({
  guide,
  folders,
  onToggleFavorite,
  onDelete,
  onMoveFolder,
  onSaveTags,
  pendingGuideId,
  compact = false,
}: DashboardGuideCardProps) {
  const isPending = pendingGuideId === guide.id
  const tagValue = guide.tags.map((tag) => tag.name).join(', ')

  return (
    <article
      data-testid="dashboard-guide-card"
      className={[
        'rounded-3xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md',
        compact ? 'flex items-center gap-4' : 'flex flex-col gap-4',
      ].join(' ')}
    >
      <div className={compact ? 'min-w-0 flex-1' : 'space-y-3'}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STUDY_MODE_STYLES[guide.studyMode]}`}
              >
                {STUDY_MODE_LABELS[guide.studyMode]}
              </span>
              {guide.folder ? (
                <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600">
                  {guide.folder.name}
                </span>
              ) : null}
            </div>

            <Link
              href={`/guide/${guide.slug}`}
              className="block text-lg font-semibold text-stone-900 transition-colors hover:text-sky-700"
            >
              {guide.title}
            </Link>

            <p className="text-sm text-stone-500">{formatRelativeDate(guide.createdAt)}</p>
          </div>

          <button
            type="button"
            data-testid={`favorite-toggle-${guide.id}`}
            onClick={() => onToggleFavorite(guide)}
            disabled={isPending}
            className={[
              'rounded-full border px-3 py-1 text-sm font-medium transition-colors',
              guide.isFavorite
                ? 'border-amber-300 bg-amber-100 text-amber-800'
                : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300',
            ].join(' ')}
            aria-pressed={guide.isFavorite}
          >
            {guide.isFavorite ? 'Starred' : 'Star'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {guide.tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600"
            >
              #{tag.name}
            </span>
          ))}
          {guide.tags.length === 0 ? (
            <span className="rounded-full border border-dashed border-stone-200 px-2.5 py-1 text-xs text-stone-400">
              No tags yet
            </span>
          ) : null}
        </div>
      </div>

      <div className={compact ? 'w-full max-w-sm space-y-3' : 'space-y-3'}>
        <label className="block text-sm font-medium text-stone-700">
          Folder
          <select
            data-testid={`folder-select-${guide.id}`}
            className="mt-1 w-full rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700"
            value={guide.folder?.id ?? ''}
            disabled={isPending}
            onChange={(event) => onMoveFolder(guide, event.target.value || null)}
          >
            <option value="">Unfiled</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-stone-700">
          Tags
          <input
            data-testid={`tag-input-${guide.id}`}
            defaultValue={tagValue}
            placeholder="react, hooks"
            className="mt-1 w-full rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700 placeholder:text-stone-400"
            onBlur={(event) => {
              const nextTags = event.currentTarget.value
                .split(',')
                .map((value) => value.trim())
                .filter(Boolean)

              const current = guide.tags.map((tag) => tag.name)
              if (JSON.stringify(nextTags) !== JSON.stringify(current)) {
                onSaveTags(guide, nextTags)
              }
            }}
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/guide/${guide.slug}`}
            className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Open guide
          </Link>
          <button
            type="button"
            data-testid={`delete-guide-${guide.id}`}
            onClick={() => onDelete(guide)}
            disabled={isPending}
            className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-50"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
