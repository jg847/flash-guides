import type { FolderItem, GuideListItem } from '@/lib/db/repositories/types'
import GuideCard from '@/components/dashboard/GuideCard'

interface GuideListProps {
  guides: GuideListItem[]
  folders: FolderItem[]
  pendingGuideId?: string | null
  onToggleFavorite: (guide: GuideListItem) => void
  onDelete: (guide: GuideListItem) => void
  onMoveFolder: (guide: GuideListItem, folderId: string | null) => void
  onSaveTags: (guide: GuideListItem, tags: string[]) => void
}

export default function GuideList(props: GuideListProps) {
  return (
    <div data-testid="dashboard-list" className="space-y-4">
      {props.guides.map((guide) => (
        <GuideCard
          key={guide.id}
          compact
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
