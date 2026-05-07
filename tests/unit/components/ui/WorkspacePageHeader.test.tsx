import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockUsePathname = vi.fn()

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

import WorkspacePageHeader from '@/components/ui/WorkspacePageHeader'

describe('WorkspacePageHeader', () => {
  beforeEach(() => {
    mockUsePathname.mockReset()
  })

  it('renders both page tabs and highlights the active page', () => {
    mockUsePathname.mockReturnValue('/dashboard')

    render(
      <WorkspacePageHeader title="Your study library" description="Organize your saved guides." />,
    )

    expect(screen.getByRole('heading', { name: /your study library/i })).toBeInTheDocument()

    const dashboardTab = screen.getByRole('link', { name: /dashboard/i })
    const accountTab = screen.getByRole('link', { name: /account settings/i })

    expect(dashboardTab).toHaveAttribute('href', '/dashboard')
    expect(dashboardTab).toHaveAttribute('aria-current', 'page')
    expect(accountTab).toHaveAttribute('href', '/account')
    expect(accountTab).not.toHaveAttribute('aria-current')
  })
})
