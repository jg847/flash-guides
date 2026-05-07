import type { InputType, StudyMode } from '@/generated/prisma'

export type GuideView = 'all' | 'favorites' | 'recent'

export interface GuideListParams {
  userId: string
  q?: string
  tag?: string
  folderId?: string
  view: GuideView
  page: number
  limit: number
}

export interface GuideTagSummary {
  id: string
  name: string
}

export interface GuideFolderSummary {
  id: string
  name: string
}

export interface FolderItem {
  id: string
  userId: string
  name: string
  createdAt: Date
}

export interface GuideListItem {
  id: string
  slug: string
  title: string
  studyMode: StudyMode
  inputType: InputType
  createdAt: Date
  updatedAt: Date
  isFavorite: boolean
  tags: GuideTagSummary[]
  folder: GuideFolderSummary | null
}

export interface GuideListResult {
  guides: GuideListItem[]
  total: number
  page: number
}

export interface UpdateGuideInput {
  id: string
  userId: string
  title?: string
  folderId?: string | null
  isFavorite?: boolean
  content?: string
}

export interface SetGuideTagsInput {
  guideId: string
  userId: string
  tags: string[]
}

export interface DeleteGuidesResult {
  authorized: boolean
  deleted: number
}

export interface CreateFolderInput {
  userId: string
  name: string
}

export interface UpdateFolderInput {
  id: string
  userId: string
  name: string
}

export interface DeleteFolderResult {
  deleted: boolean
}

export interface IGuideReader {
  list(params: GuideListParams): Promise<GuideListResult>
}

export interface IGuideWriter {
  update(input: UpdateGuideInput): Promise<GuideListItem | null>
  deleteManyOwned(userId: string, ids: string[]): Promise<DeleteGuidesResult>
  setTags(input: SetGuideTagsInput): Promise<GuideListItem | null>
}

export interface IFolderRepository {
  create(input: CreateFolderInput): Promise<FolderItem>
  listByUser(userId: string): Promise<FolderItem[]>
  rename(input: UpdateFolderInput): Promise<FolderItem | null>
  deleteOwned(userId: string, id: string): Promise<DeleteFolderResult>
}
