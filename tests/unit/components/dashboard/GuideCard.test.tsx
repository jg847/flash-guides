import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

import GuideCard from '@/components/dashboard/GuideCard'

const guide = {
  id: 'cmguidetest0000000000000001',
  slug: 'react-basics',
  title: 'React Basics',
  studyMode: 'OVERVIEW' as const,
  inputType: 'TOPIC' as const,
  createdAt: new Date('2026-04-20T00:00:00.000Z'),
  updatedAt: new Date('2026-04-20T00:00:00.000Z'),
  isFavorite: false,
  folder: { id: 'cmfolder000000000000000001', name: 'Frontend' },
  tags: [{ id: 'cmtag00000000000000000001', name: 'react' }],
}

const folders = [
  { id: 'cmfolder000000000000000001', userId: 'user-1', name: 'Frontend', createdAt: new Date() },
]

describe('dashboard GuideCard', () => {
  it('renders the title, study mode, and folder', () => {
    render(
      <GuideCard
        guide={guide}
        folders={folders}
        onToggleFavorite={vi.fn()}
        onDelete={vi.fn()}
        onMoveFolder={vi.fn()}
        onSaveTags={vi.fn()}
      />,
    )

    expect(screen.getByText('React Basics')).toBeInTheDocument()
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getAllByText('Frontend')).toHaveLength(2)
  })

  it('calls onToggleFavorite when the star button is pressed', () => {
    const onToggleFavorite = vi.fn()

    render(
      <GuideCard
        guide={guide}
        folders={folders}
        onToggleFavorite={onToggleFavorite}
        onDelete={vi.fn()}
        onMoveFolder={vi.fn()}
        onSaveTags={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Star' }))
    expect(onToggleFavorite).toHaveBeenCalledWith(guide)
  })

  it('calls onMoveFolder when the folder selection changes', () => {
    const onMoveFolder = vi.fn()

    render(
      <GuideCard
        guide={guide}
        folders={[
          ...folders,
          {
            id: 'cmfolder000000000000000002',
            userId: 'user-1',
            name: 'Algorithms',
            createdAt: new Date(),
          },
        ]}
        onToggleFavorite={vi.fn()}
        onDelete={vi.fn()}
        onMoveFolder={onMoveFolder}
        onSaveTags={vi.fn()}
      />,
    )

    fireEvent.change(screen.getByTestId(`folder-select-${guide.id}`), {
      target: { value: 'cmfolder000000000000000002' },
    })

    expect(onMoveFolder).toHaveBeenCalledWith(guide, 'cmfolder000000000000000002')
  })
})
