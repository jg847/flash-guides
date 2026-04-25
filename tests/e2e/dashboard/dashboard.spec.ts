import { expect, test } from '@playwright/test'
import { SEEDED_DASHBOARD_TITLES } from '@/lib/db/seed'
import { loginAsSeededUser, reseed } from '../guide/test-helpers'

test.describe('Dashboard', () => {
  test.describe.configure({ mode: 'serial' })

  test.beforeEach(async ({ page }) => {
    await reseed(page)
  })

  test('T-16: dashboard loads and shows saved guides', async ({ page }) => {
    await loginAsSeededUser(page)
    await page.goto('/dashboard')

    await expect(page.getByRole('heading', { name: 'Your study library' })).toBeVisible()
    await expect(page.getByTestId('dashboard-guide-card')).toHaveCount(5)
    await expect(page.getByText(SEEDED_DASHBOARD_TITLES.primary)).toBeVisible()
  })

  test('T-17: search finds a guide by title', async ({ page }) => {
    await loginAsSeededUser(page)
    await page.goto('/dashboard')

    await page.getByTestId('dashboard-search').fill('Hooks')
    await expect(page.getByText(SEEDED_DASHBOARD_TITLES.search)).toBeVisible()
    await expect(page.getByText(SEEDED_DASHBOARD_TITLES.favorite)).toHaveCount(0)
  })

  test('T-18: favorite toggle persists across reload', async ({ page }) => {
    await loginAsSeededUser(page)
    await page.goto('/dashboard')

    const favoriteToggle = page
      .getByTestId(/favorite-toggle-.*/)
      .filter({ hasText: 'Star' })
      .first()
    await favoriteToggle.click()
    await expect(page.getByTestId('dashboard-message')).toContainText('Guide added to favorites.')

    await page.reload()
    await page.getByTestId('dashboard-view-favorites').click()
    await expect(page.getByText(SEEDED_DASHBOARD_TITLES.primary)).toBeVisible()
  })

  test('T-19: delete guide removes it from the dashboard', async ({ page }) => {
    await loginAsSeededUser(page)
    await page.goto('/dashboard')

    page.once('dialog', (dialog) => dialog.accept())
    await page
      .getByTestId(/delete-guide-.*/)
      .nth(4)
      .click()

    await expect(page.getByTestId('dashboard-message')).toContainText(
      `Deleted ${SEEDED_DASHBOARD_TITLES.delete}.`,
    )
    await expect(page.getByRole('link', { name: SEEDED_DASHBOARD_TITLES.delete })).toHaveCount(0)
  })

  test('T-20: unauthenticated users are redirected to login', async ({ page }) => {
    await page.goto('/dashboard')

    await expect(page).toHaveURL(/\/login\?callbackUrl=%2Fdashboard/)
    await expect(page.getByRole('heading', { name: 'Sign in to FlashGuides' })).toBeVisible()
  })
})
