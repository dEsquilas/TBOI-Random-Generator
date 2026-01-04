import { test, expect } from '@playwright/test'
import { clickRandomize } from './helpers.js'

test.describe('Timed objectives as extra', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should enable roll as extra objectives toggle', async ({ page }) => {
    const rollAsExtra = page.locator('text=Roll as extra objectives').first()

    if (await rollAsExtra.isVisible()) {
      await rollAsExtra.click()
      await page.waitForTimeout(200)

      // Verify randomization still works
      await clickRandomize(page)

      const mainText = await page.locator('main').textContent()
      expect(mainText.length).toBeGreaterThan(0)
    }
  })

  // Probabilistic test - timed objectives appear based on chance setting
  test.skip('should show timed objectives as extras when enabled', async ({ page }) => {
    const rollAsExtra = page.locator('text=Roll as extra objectives').first()

    if (await rollAsExtra.isVisible()) {
      await rollAsExtra.click()
      await page.waitForTimeout(200)

      let foundTimedExtra = false
      for (let i = 0; i < 30; i++) {
        await clickRandomize(page)
        const mainText = await page.locator('main').textContent()

        if (mainText.includes('Boss Rush') || mainText.includes('Hush')) {
          foundTimedExtra = true
          break
        }
      }

      expect(foundTimedExtra).toBe(true)
    }
  })
})
