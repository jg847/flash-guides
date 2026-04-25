import { expect, test } from '@playwright/test'
import { loginAsSeededUser, openSeededGuide, reseed, selectTextInGuide } from './test-helpers'

test.describe('Guide renderer', () => {
  test.describe.configure({ mode: 'serial' })

  test.beforeEach(async ({ page }) => {
    await reseed(page)
  })

  test('T-16: guide page renders TOC and content', async ({ page }) => {
    await openSeededGuide(page)
    await expect(page.getByTestId('guide-renderer')).toBeVisible()
    await expect(page.getByTestId('guide-toc')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Components' })).toBeVisible()
  })

  test('T-20: dark mode toggle persists across reload', async ({ page }) => {
    await openSeededGuide(page)
    const toggle = page.getByTestId('theme-toggle')
    await expect(toggle).toBeVisible()
    await toggle.click()
    await expect(page.locator('html')).toHaveClass(/dark/)

    await page.reload()
    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('T-21: authenticated user can save a highlight note', async ({ page }) => {
    await loginAsSeededUser(page)
    await selectTextInGuide(page, 'React components are reusable building blocks')

    const tooltip = page.getByTestId('highlight-note-tooltip')
    await expect(tooltip).toBeVisible()

    await page.getByRole('button', { name: 'Save note' }).click()
    await expect(page.getByRole('button', { name: 'Saved' })).toBeVisible()
  })

  test('T-22: authenticated user can send a follow-up question', async ({ page }) => {
    await loginAsSeededUser(page)

    await page.getByPlaceholder('Ask a follow-up question…').fill('What are hooks used for?')
    await page.getByRole('button', { name: 'Send' }).click()

    await expect(page.getByTestId('follow-up-messages')).toContainText('What are hooks used for?')
    await expect(page.getByTestId('follow-up-messages')).toContainText(
      'Stubbed response for: What are hooks used for?',
    )
  })
})
