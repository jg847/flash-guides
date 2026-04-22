import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WatermarkOverlay from '@/components/guest/WatermarkOverlay'

describe('WatermarkOverlay', () => {
  it('renders the watermark element when isWatermark=true', () => {
    render(<WatermarkOverlay isWatermark />)
    expect(screen.getByTestId('watermark-overlay')).toBeInTheDocument()
  })

  it('contains preview text', () => {
    render(<WatermarkOverlay isWatermark />)
    expect(screen.getByText(/PREVIEW.*Sign up to save/i)).toBeInTheDocument()
  })

  it('renders nothing when isWatermark=false', () => {
    const { container } = render(<WatermarkOverlay isWatermark={false} />)
    expect(container.firstChild).toBeNull()
  })
})
