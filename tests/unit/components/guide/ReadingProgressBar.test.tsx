import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import ReadingProgressBar from '@/components/guide/ReadingProgressBar'

describe('ReadingProgressBar', () => {
  it('updates on scroll', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 2000,
    })
    Object.defineProperty(document.documentElement, 'clientHeight', {
      configurable: true,
      value: 1000,
    })

    let scrollTop = 0
    Object.defineProperty(document.documentElement, 'scrollTop', {
      configurable: true,
      get: () => scrollTop,
      set: (value) => {
        scrollTop = value
      },
    })

    render(<ReadingProgressBar />)

    scrollTop = 500
    fireEvent.scroll(window)

    expect(screen.getByTestId('reading-progress')).toHaveAttribute('value', '50')
  })
})
