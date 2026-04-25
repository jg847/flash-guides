'use client'

interface DashboardSearchProps {
  value: string
  onChange: (value: string) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (value: 'grid' | 'list') => void
}

export default function DashboardSearch({
  value,
  onChange,
  viewMode,
  onViewModeChange,
}: DashboardSearchProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <label className="flex-1 text-sm font-medium text-stone-700">
        Search guides
        <input
          data-testid="dashboard-search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by title, content, or tag"
          className="mt-1 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400"
        />
      </label>

      <div className="flex items-center gap-2 rounded-full bg-stone-100 p-1">
        <button
          type="button"
          data-testid="dashboard-grid-toggle"
          onClick={() => onViewModeChange('grid')}
          className={[
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            viewMode === 'grid' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500',
          ].join(' ')}
          aria-pressed={viewMode === 'grid'}
        >
          Grid
        </button>
        <button
          type="button"
          data-testid="dashboard-list-toggle"
          onClick={() => onViewModeChange('list')}
          className={[
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            viewMode === 'list' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500',
          ].join(' ')}
          aria-pressed={viewMode === 'list'}
        >
          List
        </button>
      </div>
    </div>
  )
}
