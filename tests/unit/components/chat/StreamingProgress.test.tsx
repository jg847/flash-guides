import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import StreamingProgress from '@/components/chat/StreamingProgress'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('StreamingProgress', () => {
  it('renders all step labels', () => {
    render(<StreamingProgress step={null} tokenPreview="" />)
    expect(screen.getByTestId('step-fetching')).toBeDefined()
    expect(screen.getByTestId('step-planning')).toBeDefined()
    expect(screen.getByTestId('step-writing')).toBeDefined()
    expect(screen.getByTestId('step-done')).toBeDefined()
  })

  it('marks fetching step as active', () => {
    render(<StreamingProgress step="fetching" tokenPreview="" />)
    const step = screen.getByTestId('step-fetching')
    expect(step.textContent).toContain('Fetching')
  })

  it('marks planning step as active', () => {
    render(<StreamingProgress step="planning" tokenPreview="" />)
    const step = screen.getByTestId('step-planning')
    expect(step.textContent).toContain('Planning')
  })

  it('marks planning as complete and writing as active', () => {
    render(<StreamingProgress step="writing" tokenPreview="" />)
    const indicators = ['step-fetching', 'step-planning'].map(
      (id) => screen.getByTestId(id).querySelector('span')?.textContent,
    )
    expect(indicators).toEqual(['✓', '✓'])
  })

  it('marks all steps complete when done', () => {
    render(<StreamingProgress step="done" tokenPreview="" />)
    const indicators = ['step-fetching', 'step-planning', 'step-writing'].map(
      (id) => screen.getByTestId(id).querySelector('span')?.textContent,
    )
    expect(indicators).toEqual(['✓', '✓', '✓'])
  })

  it('renders token preview when provided', () => {
    render(<StreamingProgress step="writing" tokenPreview="# Hello World" />)
    expect(screen.getByTestId('token-preview').textContent).toBe('# Hello World')
  })

  it('does not render token preview when empty', () => {
    render(<StreamingProgress step="writing" tokenPreview="" />)
    expect(screen.queryByTestId('token-preview')).toBeNull()
  })
})
