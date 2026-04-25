import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import DashboardSearch from '@/components/dashboard/DashboardSearch'

describe('DashboardSearch', () => {
  it('renders the current search value', () => {
    render(
      <DashboardSearch
        value="react"
        onChange={vi.fn()}
        viewMode="grid"
        onViewModeChange={vi.fn()}
      />,
    )

    expect(screen.getByTestId('dashboard-search')).toHaveValue('react')
  })

  it('notifies when the search query changes', () => {
    const onChange = vi.fn()

    render(
      <DashboardSearch value="" onChange={onChange} viewMode="grid" onViewModeChange={vi.fn()} />,
    )

    fireEvent.change(screen.getByTestId('dashboard-search'), { target: { value: 'hooks' } })
    expect(onChange).toHaveBeenCalledWith('hooks')
  })

  it('switches from grid to list view', () => {
    const onViewModeChange = vi.fn()

    render(
      <DashboardSearch
        value=""
        onChange={vi.fn()}
        viewMode="grid"
        onViewModeChange={onViewModeChange}
      />,
    )

    fireEvent.click(screen.getByTestId('dashboard-list-toggle'))
    expect(onViewModeChange).toHaveBeenCalledWith('list')
  })
})
