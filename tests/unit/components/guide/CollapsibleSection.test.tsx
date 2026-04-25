import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import CollapsibleSection from '@/components/guide/CollapsibleSection'

describe('CollapsibleSection', () => {
  it('opens and closes on click', () => {
    render(
      <CollapsibleSection id="intro" heading="Introduction" defaultOpen={false}>
        <p>Section content</p>
      </CollapsibleSection>,
    )

    const button = screen.getByRole('button', { name: /introduction/i })
    const content = screen.getByTestId('collapsible-content')

    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(content).toHaveAttribute('hidden')

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(content).not.toHaveAttribute('hidden')

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(content).toHaveAttribute('hidden')
  })
})
