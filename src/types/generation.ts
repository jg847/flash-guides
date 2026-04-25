export type InputType = 'TOPIC' | 'TEXT' | 'URL'
export type StudyModeType = 'OVERVIEW' | 'DEEP_DIVE' | 'EXAM_PREP' | 'ELI5'

export interface GenerationRequest {
  inputType: InputType
  inputValue: string
  studyMode: StudyModeType
}

export interface GuideSection {
  heading: string
  body: string
}

export interface QuizItem {
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export interface FlashcardItem {
  front: string
  back: string
}

export interface NormalizedInput {
  type: InputType
  text: string
  originalValue: string
}

export interface GeneratedGuide {
  title: string
  slug: string
  studyMode: StudyModeType
  inputType: InputType
  inputValue: string
  content: string
  isWatermark: boolean
  userId: string | null
}

// SSE event types sent over the stream
export type SSEEvent =
  | { type: 'step'; step: 'fetching' | 'planning' | 'writing' | 'done' }
  | { type: 'token'; text: string }
  | { type: 'done'; guideSlug: string }
  | { type: 'error'; message: string }
