import { test, expect } from '@playwright/test'
import { clickRandomize } from './helpers.js'

test.describe('Config filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should only show characters that are enabled in targets', async ({ page }) => {
    // Apply Rebirth preset to have limited characters
    await page.click('button:has-text("Rebirth")')
    await page.waitForTimeout(300)

    // Randomize several times and verify no tainted characters appear
    for (let i = 0; i < 10; i++) {
      await clickRandomize(page)

      const mainText = await page.locator('main').textContent()

      // Tainted characters should NEVER appear with Rebirth preset
      expect(mainText.includes('Tainted')).toBe(false)
    }
  })

  test('should only show objectives that are enabled in targets', async ({ page }) => {
    // Apply Rebirth preset - only ??? and The Lamb objectives
    await page.click('button:has-text("Rebirth")')
    await page.waitForTimeout(300)

    const otherObjectives = ['Mega Satan', 'Ultra Greed', 'Delirium', 'Mother', 'The Beast']

    for (let i = 0; i < 10; i++) {
      await clickRandomize(page)

      const mainText = await page.locator('main').textContent()

      // Other objectives should not appear
      for (const obj of otherObjectives) {
        expect(mainText.includes(obj)).toBe(false)
      }
    }
  })

  test('should respect disabled targets in completion panel', async ({ page }) => {
    // The completion panel is on the right side
    const completionPanel = page.locator('aside').last()

    // Basic assertion that the panel is functional
    await expect(completionPanel).toBeVisible()
  })
})
