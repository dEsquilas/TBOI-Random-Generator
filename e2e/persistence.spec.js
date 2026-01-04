import { test, expect } from '@playwright/test'
import { clickRandomize } from './helpers.js'

test.describe('LocalStorage persistence', () => {
  test('should persist preset selection after reload', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()

    await page.click('button:has-text("Rebirth")')
    await page.waitForTimeout(300)

    await page.reload()
    await page.waitForTimeout(500)

    await clickRandomize(page)
    const mainText = await page.locator('main').textContent()

    expect(mainText.includes('Tainted')).toBe(false)
  })

  test('should persist display mode after reload', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()

    const simpleAMode = page.locator('text=Simple A').first()
    if (await simpleAMode.isVisible()) {
      await simpleAMode.click()
      await page.waitForTimeout(300)

      await page.reload()
      await page.waitForTimeout(500)

      const storage = await page.evaluate(() => localStorage.getItem('tboi-randomizer'))
      if (storage) {
        const data = JSON.parse(storage)
        expect(data.chromaStyle).toBe('simpleA')
      }
    }
  })
})
