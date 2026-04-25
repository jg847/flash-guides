import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import DangerZone from '@/components/account/DangerZone'

describe('DangerZone', () => {
  it('keeps delete disabled until the confirmation email matches exactly', () => {
    render(<DangerZone email="user@example.com" />)

    const button = screen.getByTestId('account-delete-button') as HTMLButtonElement
    expect(button.disabled).toBe(true)

    fireEvent.change(screen.getByTestId('account-delete-confirm-email'), {
      target: { value: 'user@exampl' },
    })
    fireEvent.change(screen.getByTestId('account-delete-password'), {
      target: { value: 'Passw0rd!123' },
    })
    expect(button.disabled).toBe(true)

    fireEvent.change(screen.getByTestId('account-delete-confirm-email'), {
      target: { value: 'user@example.com' },
    })
    expect(button.disabled).toBe(false)
  })
})
