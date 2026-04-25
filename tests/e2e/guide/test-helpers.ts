import { expect, type Page } from '@playwright/test'
import { SEEDED_GUIDE_SLUG, SEEDED_USER_EMAIL } from '@/lib/db/seed'

export async function reseed(page: Page) {
  const response = await page.request.post('/api/test/seed')
  expect(response.ok()).toBe(true)
}

export async function openSeededGuide(page: Page) {
  await page.goto(`/guide/${SEEDED_GUIDE_SLUG}`)
  await expect(page.getByTestId('guide-renderer')).toBeVisible()
}

export async function loginAsSeededUser(page: Page) {
  const response = await page.request.post('/api/test/session', {
    data: { email: SEEDED_USER_EMAIL },
  })

  expect(response.ok()).toBe(true)

  await page.goto(`/guide/${SEEDED_GUIDE_SLUG}`)
  await expect(page.getByTestId('guide-renderer')).toBeVisible()
}

export async function selectTextInGuide(page: Page, text: string) {
  await page.evaluate((selectedText) => {
    const root = document.querySelector('[data-testid="guide-renderer"]')
    if (!root) {
      throw new Error('Guide renderer not found')
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    let textNode: Text | null = null

    while (walker.nextNode()) {
      const current = walker.currentNode as Text
      if (current.textContent?.includes(selectedText)) {
        textNode = current
        break
      }
    }

    if (!textNode || !textNode.textContent) {
      throw new Error(`Unable to find text: ${selectedText}`)
    }

    const startIndex = textNode.textContent.indexOf(selectedText)
    const range = document.createRange()
    range.setStart(textNode, startIndex)
    range.setEnd(textNode, startIndex + selectedText.length)

    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)

    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
  }, text)
}
