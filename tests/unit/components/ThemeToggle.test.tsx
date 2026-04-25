import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ThemeToggle from '@/components/ThemeToggle'
import ThemeProvider from '@/components/theme/ThemeProvider'

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
    window.localStorage.clear()
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation(() => ({
        matches: false,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    )
  })

  it('updates the html dark class when toggled', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    )

    fireEvent.click(screen.getByTestId('theme-toggle'))

    await waitFor(() => expect(document.documentElement.classList.contains('dark')).toBe(true))
    expect(window.localStorage.getItem('theme')).toBe('dark')
  })
})
