import { expect, test } from '@playwright/test'
import { SEEDED_GUIDE_SLUG, SEEDED_USER_EMAIL, SEEDED_USER_PASSWORD } from '@/lib/db/seed'
import { reseed } from '../guide/test-helpers'

test.describe('Sharing and export', () => {
  test.describe.configure({ mode: 'serial' })

  test.beforeEach(async ({ page }) => {
    await reseed(page)
  })

  test('T-21: owner can export, share, fork, and revoke a guide link', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill(SEEDED_USER_EMAIL)
    await page.getByLabel('Password').fill(SEEDED_USER_PASSWORD)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(page).toHaveURL(/\/dashboard/)

    await page.goto(`/guide/${SEEDED_GUIDE_SLUG}`)

    const downloadPromise = page.waitForEvent('download')
    await page.getByTestId('guide-export-button').click()
    await page.getByRole('link', { name: 'Markdown' }).click()

    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe(`${SEEDED_GUIDE_SLUG}.md`)

    await page.getByTestId('guide-share-button').click()
    await page.getByRole('button', { name: 'Create link' }).click()
    await expect(page.getByText('Share link created.')).toBeVisible()

    const sharedUrlInput = page.locator('input[readonly]').first()
    const sharedUrl = await sharedUrlInput.inputValue()
    expect(sharedUrl.startsWith('http://127.0.0.1:3000/share/')).toBe(true)

    await page.goto(sharedUrl)
    await expect(page.getByText('Shared guide')).toBeVisible()
    await expect(page.getByTestId('fork-guide-button')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'React Basics' })).toBeVisible()
    await expect(
      page.getByText('React components are reusable building blocks for interface composition.'),
    ).toBeVisible()

    await page.getByTestId('fork-guide-button').click()
    await expect(page).toHaveURL(/\/guide\//)
    await expect(page).not.toHaveURL(new RegExp(`${SEEDED_GUIDE_SLUG}$`))
    await expect(page.getByRole('heading', { name: '[Fork] React Basics' })).toBeVisible()

    await page.goto(`/guide/${SEEDED_GUIDE_SLUG}`)
    await page.getByTestId('guide-share-button').click()
    await page.getByRole('button', { name: 'Create link' }).click()
    await expect(page.getByText('Existing share link loaded.')).toBeVisible()
    await page.getByRole('button', { name: 'Revoke link' }).click()
    await expect(page.getByText('Share link revoked.')).toBeVisible()

    await page.goto(sharedUrl)
    await expect(
      page.getByRole('heading', { name: 'This share link has expired or was revoked.' }),
    ).toBeVisible()
  })
})
