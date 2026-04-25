import type { FolderItem, GuideListItem } from '@/lib/db/repositories/types'
import GuideCard from '@/components/dashboard/GuideCard'

interface GuideGridProps {
  guides: GuideListItem[]
  folders: FolderItem[]
  pendingGuideId?: string | null
  onToggleFavorite: (guide: GuideListItem) => void
  onDelete: (guide: GuideListItem) => void
  onMoveFolder: (guide: GuideListItem, folderId: string | null) => void
  onSaveTags: (guide: GuideListItem, tags: string[]) => void
}

export default function GuideGrid(props: GuideGridProps) {
  return (
    <div data-testid="dashboard-grid" className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {props.guides.map((guide) => (
        <GuideCard
          key={guide.id}
          guide={guide}
          folders={props.folders}
          pendingGuideId={props.pendingGuideId}
          onToggleFavorite={props.onToggleFavorite}
          onDelete={props.onDelete}
          onMoveFolder={props.onMoveFolder}
          onSaveTags={props.onSaveTags}
        />
      ))}
    </div>
  )
}
