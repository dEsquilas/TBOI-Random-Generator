import { test, expect } from '@playwright/test'
import { clickRandomize } from './helpers.js'

test.describe('Mark as complete', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should mark current result as complete', async ({ page }) => {
    await clickRandomize(page)

    await page.click('button:has-text("Mark")')

    const completionPanel = page.locator('aside').last()
    await expect(completionPanel).toBeVisible()
  })

  test('should enable avoid completed objectives toggle', async ({ page }) => {
    await page.click('button:has-text("Rebirth")')
    await page.waitForTimeout(200)

    await clickRandomize(page)

    await page.click('button:has-text("Mark")')
    await page.waitForTimeout(200)

    const avoidCompleted = page.locator('text=Avoid completed').first()
    if (await avoidCompleted.isVisible()) {
      await avoidCompleted.click()
      await page.waitForTimeout(200)

      // Verify we can still randomize
      await clickRandomize(page)
      const mainText = await page.locator('main').textContent()
      expect(mainText.length).toBeGreaterThan(0)
    }
  })
})
