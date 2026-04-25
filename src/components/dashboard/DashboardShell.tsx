'use client'

import { startTransition, useDeferredValue, useEffect, useRef, useState } from 'react'
import type { FolderItem, GuideListItem } from '@/lib/db/repositories/types'
import DashboardSearch from '@/components/dashboard/DashboardSearch'
import FolderSidebar from '@/components/dashboard/FolderSidebar'
import GuideGrid from '@/components/dashboard/GuideGrid'
import GuideList from '@/components/dashboard/GuideList'
import UsageSummary from '@/components/dashboard/UsageSummary'

interface DashboardShellProps {
  initialGuides: GuideListItem[]
  initialTotal: number
  initialPage: number
  initialFolders: FolderItem[]
  usageSummary: {
    totalGuides: number
    approxBytes: number
  }
}

interface GuidesResponse {
  guides: GuideListItem[]
  total: number
  page: number
}

function buildGuideQuery(params: {
  q: string
  folderId: string | null
  view: 'all' | 'favorites' | 'recent'
}) {
  const searchParams = new URLSearchParams({
    page: '1',
    limit: params.view === 'recent' ? '5' : '24',
    view: params.view,
  })

  if (params.q.trim()) {
    searchParams.set('q', params.q.trim())
  }

  if (params.folderId) {
    searchParams.set('folderId', params.folderId)
  }

  return searchParams.toString()
}

export default function DashboardShell({
  initialGuides,
  initialTotal,
  initialPage,
  initialFolders,
  usageSummary,
}: DashboardShellProps) {
  const [guides, setGuides] = useState(initialGuides)
  const [total, setTotal] = useState(initialTotal)
  const [page, setPage] = useState(initialPage)
  const [folders, setFolders] = useState(initialFolders)
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeView, setActiveView] = useState<'all' | 'favorites' | 'recent'>('all')
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null)
  const [creatingFolderName, setCreatingFolderName] = useState('')
  const [pendingGuideId, setPendingGuideId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const initialFetchSkipped = useRef(false)

  useEffect(() => {
    if (!initialFetchSkipped.current) {
      initialFetchSkipped.current = true
      return
    }

    const timeoutId = window.setTimeout(() => {
      void (async () => {
        const query = buildGuideQuery({
          q: deferredSearch,
          folderId: activeFolderId,
          view: activeView,
        })

        setIsLoading(true)
        setError(null)

        try {
          const response = await fetch(`/api/guides?${query}`)
          if (!response.ok) {
            throw new Error('Failed to load guides')
          }

          const next = (await response.json()) as GuidesResponse
          startTransition(() => {
            setGuides(next.guides)
            setTotal(next.total)
            setPage(next.page)
          })
        } catch {
          setError('Unable to load dashboard data right now.')
        } finally {
          setIsLoading(false)
        }
      })()
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [deferredSearch, activeFolderId, activeView])

  async function toggleFavorite(guide: GuideListItem) {
    setPendingGuideId(guide.id)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch(`/api/guides/${guide.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !guide.isFavorite }),
      })

      if (!response.ok) {
        throw new Error('Failed to update favorite')
      }

      const updated = (await response.json()) as GuideListItem
      setGuides((current) => current.map((item) => (item.id === updated.id ? updated : item)))
      setMessage(updated.isFavorite ? 'Guide added to favorites.' : 'Guide removed from favorites.')
    } catch {
      setError('Unable to update favorite right now.')
    } finally {
      setPendingGuideId(null)
    }
  }

  async function moveFolder(guide: GuideListItem, folderId: string | null) {
    setPendingGuideId(guide.id)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch(`/api/guides/${guide.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderId }),
      })

      if (!response.ok) {
        throw new Error('Failed to move guide')
      }

      const updated = (await response.json()) as GuideListItem
      setGuides((current) => current.map((item) => (item.id === updated.id ? updated : item)))
      setMessage('Guide folder updated.')
    } catch {
      setError('Unable to move guide right now.')
    } finally {
      setPendingGuideId(null)
    }
  }

  async function saveTags(guide: GuideListItem, tags: string[]) {
    setPendingGuideId(guide.id)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch(`/api/guides/${guide.id}/tags`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags }),
      })

      if (!response.ok) {
        throw new Error('Failed to update tags')
      }

      const body = (await response.json()) as { tags: GuideListItem['tags'] }
      setGuides((current) =>
        current.map((item) => (item.id === guide.id ? { ...item, tags: body.tags } : item)),
      )
      setMessage('Guide tags updated.')
    } catch {
      setError('Unable to update guide tags right now.')
    } finally {
      setPendingGuideId(null)
    }
  }

  async function deleteGuide(guide: GuideListItem) {
    setPendingGuideId(guide.id)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch('/api/guides', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [guide.id] }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete guide')
      }

      setGuides((current) => current.filter((item) => item.id !== guide.id))
      setTotal((current) => Math.max(0, current - 1))
      setMessage(`Deleted ${guide.title}.`)
    } catch {
      setError('Unable to delete guide right now.')
    } finally {
      setPendingGuideId(null)
    }
  }

  async function createFolder() {
    const name = creatingFolderName.trim()
    if (!name) {
      return
    }

    setMessage(null)
    setError(null)

    try {
      const response = await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        throw new Error('Failed to create folder')
      }

      const folder = (await response.json()) as FolderItem
      setFolders((current) => [...current, folder])
      setCreatingFolderName('')
      setMessage(`Created folder ${folder.name}.`)
    } catch {
      setError('Unable to create folder right now.')
    }
  }

  async function renameFolder(folder: FolderItem) {
    const nextName = window.prompt('Rename folder', folder.name)?.trim()
    if (!nextName || nextName === folder.name) {
      return
    }

    setMessage(null)
    setError(null)

    try {
      const response = await fetch(`/api/folders/${folder.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nextName }),
      })

      if (!response.ok) {
        throw new Error('Failed to rename folder')
      }

      const updated = (await response.json()) as FolderItem
      setFolders((current) => current.map((item) => (item.id === updated.id ? updated : item)))
      setGuides((current) =>
        current.map((guide) =>
          guide.folder?.id === updated.id
            ? { ...guide, folder: { id: updated.id, name: updated.name } }
            : guide,
        ),
      )
      setMessage('Folder renamed.')
    } catch {
      setError('Unable to rename folder right now.')
    }
  }

  async function deleteFolder(folder: FolderItem) {
    if (!window.confirm(`Delete folder ${folder.name}? Guides will remain saved.`)) {
      return
    }

    setMessage(null)
    setError(null)

    try {
      const response = await fetch(`/api/folders/${folder.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete folder')
      }

      setFolders((current) => current.filter((item) => item.id !== folder.id))
      setGuides((current) =>
        current.map((guide) =>
          guide.folder?.id === folder.id ? { ...guide, folder: null } : guide,
        ),
      )

      if (activeFolderId === folder.id) {
        setActiveFolderId(null)
        setActiveView('all')
      }

      setMessage('Folder deleted.')
    } catch {
      setError('Unable to delete folder right now.')
    }
  }

  const currentViewLabel = activeFolderId
    ? (folders.find((folder) => folder.id === activeFolderId)?.name ?? 'Folder')
    : activeView === 'recent'
      ? 'Recent guides'
      : activeView === 'favorites'
        ? 'Favorite guides'
        : 'All guides'

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f7efe4,transparent_28%),linear-gradient(180deg,#f9f6f1_0%,#f4f1ec_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px,minmax(0,1fr)]">
        <div className="space-y-6">
          <FolderSidebar
            folders={folders}
            activeView={activeView}
            activeFolderId={activeFolderId}
            creatingFolderName={creatingFolderName}
            onCreatingFolderNameChange={setCreatingFolderName}
            onCreateFolder={() => void createFolder()}
            onRenameFolder={(folder) => void renameFolder(folder)}
            onDeleteFolder={(folder) => void deleteFolder(folder)}
            onSelectView={(view) => {
              setActiveView(view)
              setActiveFolderId(null)
            }}
            onSelectFolder={(folderId) => {
              setActiveFolderId(folderId)
              setActiveView('all')
            }}
          />

          <UsageSummary
            totalGuides={usageSummary.totalGuides}
            approxBytes={usageSummary.approxBytes}
          />
        </div>

        <section className="space-y-6">
          <header className="rounded-[2rem] border border-stone-200 bg-white/90 p-6 shadow-sm backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-stone-400">
              Dashboard
            </p>
            <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-stone-900">
                  Your study library
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-stone-500">
                  Organize saved guides, star what matters, and filter by folder or search query.
                </p>
              </div>
              <div className="rounded-2xl bg-stone-100 px-4 py-3 text-sm text-stone-600">
                <span data-testid="dashboard-total">{total}</span> results · page {page}
              </div>
            </div>
          </header>

          <DashboardSearch
            value={search}
            onChange={setSearch}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {message ? (
            <div
              data-testid="dashboard-message"
              className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              {message}
            </div>
          ) : null}

          {error ? (
            <div
              data-testid="dashboard-error"
              className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            >
              {error}
            </div>
          ) : null}

          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-2xl font-semibold text-stone-900">{currentViewLabel}</h2>
              <p className="text-sm text-stone-500">
                {isLoading
                  ? 'Refreshing your library...'
                  : 'Debounced search and filters update results in place.'}
              </p>
            </div>
          </div>

          {guides.length === 0 ? (
            <div
              data-testid="dashboard-empty"
              className="rounded-[2rem] border border-dashed border-stone-300 bg-white/70 px-8 py-16 text-center shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-stone-900">No guides match your search</h3>
              <p className="mt-3 text-sm text-stone-500">
                Try a different query, clear your folder filter, or generate a new guide from the
                homepage.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <GuideGrid
              guides={guides}
              folders={folders}
              pendingGuideId={pendingGuideId}
              onToggleFavorite={(guide) => void toggleFavorite(guide)}
              onDelete={(guide) => void deleteGuide(guide)}
              onMoveFolder={(guide, folderId) => void moveFolder(guide, folderId)}
              onSaveTags={(guide, tags) => void saveTags(guide, tags)}
            />
          ) : (
            <GuideList
              guides={guides}
              folders={folders}
              pendingGuideId={pendingGuideId}
              onToggleFavorite={(guide) => void toggleFavorite(guide)}
              onDelete={(guide) => void deleteGuide(guide)}
              onMoveFolder={(guide, folderId) => void moveFolder(guide, folderId)}
              onSaveTags={(guide, tags) => void saveTags(guide, tags)}
            />
          )}
        </section>
      </div>
    </main>
  )
}
