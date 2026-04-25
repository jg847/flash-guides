'use client'

import type { FolderItem } from '@/lib/db/repositories/types'

interface FolderSidebarProps {
  folders: FolderItem[]
  activeView: 'all' | 'favorites' | 'recent'
  activeFolderId: string | null
  onSelectView: (view: 'all' | 'favorites' | 'recent') => void
  onSelectFolder: (folderId: string | null) => void
  creatingFolderName: string
  onCreatingFolderNameChange: (value: string) => void
  onCreateFolder: () => void
  onRenameFolder: (folder: FolderItem) => void
  onDeleteFolder: (folder: FolderItem) => void
}

export default function FolderSidebar({
  folders,
  activeView,
  activeFolderId,
  onSelectView,
  onSelectFolder,
  creatingFolderName,
  onCreatingFolderNameChange,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
}: FolderSidebarProps) {
  return (
    <aside className="space-y-5 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">Views</p>
        <div className="mt-3 space-y-2">
          {[
            { key: 'all', label: 'All guides' },
            { key: 'recent', label: 'Recent' },
            { key: 'favorites', label: 'Favorites' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              data-testid={`dashboard-view-${item.key}`}
              onClick={() => {
                onSelectFolder(null)
                onSelectView(item.key as 'all' | 'favorites' | 'recent')
              }}
              className={[
                'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors',
                activeView === item.key && activeFolderId === null
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100',
              ].join(' ')}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
            Folders
          </p>
        </div>
        <div className="mt-3 space-y-2">
          {folders.map((folder) => (
            <div key={folder.id} className="rounded-2xl bg-stone-50 p-2">
              <button
                type="button"
                data-testid={`folder-filter-${folder.id}`}
                onClick={() => onSelectFolder(folder.id)}
                className={[
                  'flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm font-medium transition-colors',
                  activeFolderId === folder.id
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-700',
                ].join(' ')}
              >
                <span>{folder.name}</span>
              </button>
              <div className="mt-2 flex gap-2 px-1 pb-1">
                <button
                  type="button"
                  onClick={() => onRenameFolder(folder)}
                  className="text-xs font-medium text-stone-500 hover:text-stone-900"
                >
                  Rename
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteFolder(folder)}
                  className="text-xs font-medium text-rose-600 hover:text-rose-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-3xl border border-dashed border-stone-200 bg-stone-50 p-4">
          <label className="block text-sm font-medium text-stone-700">
            New folder
            <input
              data-testid="new-folder-input"
              value={creatingFolderName}
              onChange={(event) => onCreatingFolderNameChange(event.target.value)}
              placeholder="Exam prep"
              className="mt-2 w-full rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400"
            />
          </label>
          <button
            type="button"
            data-testid="create-folder-button"
            onClick={onCreateFolder}
            className="mt-3 w-full rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Create folder
          </button>
        </div>
      </div>
    </aside>
  )
}
