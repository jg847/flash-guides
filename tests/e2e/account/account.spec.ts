import { expect, test } from '@playwright/test'
import { SEEDED_USER_EMAIL, SEEDED_USER_PASSWORD } from '@/lib/db/seed'
import { loginAsSeededUser, reseed } from '../guide/test-helpers'

test.describe('Account management', () => {
  test.describe.configure({ mode: 'serial' })

  test.beforeEach(async ({ page }) => {
    await reseed(page)
  })

  test('T-15: update name via the account page', async ({ page }) => {
    await loginAsSeededUser(page)
    await page.goto('/account')

    await page.getByTestId('account-name-input').fill('Playwright User Updated')
    await page.getByTestId('account-profile-save').click()

    await expect(page.getByText('Profile updated.')).toBeVisible()
  })

  test('T-16: change password and sign in with the new password', async ({ page, context }) => {
    await loginAsSeededUser(page)
    await page.goto('/account')

    await page.getByTestId('account-current-password').fill(SEEDED_USER_PASSWORD)
    await page.getByTestId('account-new-password').fill('NewPass123')
    await page.getByTestId('account-password-save').click()
    await expect(page.getByText('Password updated')).toBeVisible()

    await context.clearCookies()
    await page.goto('/login')
    await page.getByLabel('Email').fill(SEEDED_USER_EMAIL)
    await page.getByLabel('Password').fill('NewPass123')
    await page.getByRole('button', { name: 'Sign in' }).click()

    await expect(page).toHaveURL(/\/dashboard/)
  })

  test('T-17: export data shows a download link', async ({ page }) => {
    await loginAsSeededUser(page)
    await page.goto('/account')

    await page.getByTestId('account-export-button').click()
    await expect(page.getByRole('link', { name: 'Download your export' })).toBeVisible()
  })

  test('T-18: delete account redirects back to home', async ({ page }) => {
    await loginAsSeededUser(page)
    await page.goto('/account')

    await page.getByTestId('account-delete-confirm-email').fill(SEEDED_USER_EMAIL)
    await page.getByTestId('account-delete-password').fill(SEEDED_USER_PASSWORD)
    await page.getByTestId('account-delete-button').click()

    await expect(page).toHaveURL('http://127.0.0.1:3000/')
    await expect(page.getByRole('heading', { name: 'FlashGuides' })).toBeVisible()
  })
})
