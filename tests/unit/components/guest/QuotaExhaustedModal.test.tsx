import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import QuotaExhaustedModal from '@/components/guest/QuotaExhaustedModal'

// Mock next/link so href assertions work in jsdom
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

describe('QuotaExhaustedModal', () => {
  it('renders the modal when open=true', () => {
    render(<QuotaExhaustedModal open />)
    expect(screen.getByTestId('quota-exhausted-modal')).toBeInTheDocument()
  })

  it('shows the headline', () => {
    render(<QuotaExhaustedModal open />)
    expect(screen.getByRole('heading', { name: /3 free guides for today/i })).toBeInTheDocument()
  })

  it('shows "Create free account" CTA linking to /register', () => {
    render(<QuotaExhaustedModal open />)
    const cta = screen.getByRole('link', { name: /create free account/i })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '/register')
  })

  it('shows "Log in" link pointing to /login', () => {
    render(<QuotaExhaustedModal open />)
    const loginLink = screen.getByRole('link', { name: /log in/i })
    expect(loginLink).toHaveAttribute('href', '/login')
  })

  it('renders nothing when open=false', () => {
    const { container } = render(<QuotaExhaustedModal open={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<QuotaExhaustedModal open onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
