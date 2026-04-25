import type { InputType, StudyMode } from '@/generated/prisma'

export interface GuideExportRecord {
  id: string
  slug: string
  title: string
  studyMode: StudyMode
  inputType: InputType
  inputValue: string
  content: string
  createdAt?: Date
  updatedAt?: Date
}
