import { test, expect } from '@playwright/test'
import { clickRandomize } from './helpers.js'

test.describe('Presets', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should apply Rebirth preset and randomize valid results', async ({ page }) => {
    await page.click('button:has-text("Rebirth")')
    await page.waitForTimeout(200)

    for (let i = 0; i < 5; i++) {
      await clickRandomize(page)
      const mainText = await page.locator('main').textContent()
      expect(mainText.includes('Tainted')).toBe(false)
    }
  })

  test('should apply Afterbirth preset', async ({ page }) => {
    await page.click('button:has-text("Afterbirth"):not(:has-text("+"))')
    await page.waitForTimeout(200)

    await clickRandomize(page)
    const mainText = await page.locator('main').textContent()

    expect(mainText.includes('Bethany')).toBe(false)
    expect(mainText.includes('Jacob')).toBe(false)
  })

  test('should apply Repentance preset', async ({ page }) => {
    await page.click('button:has-text("Repentance")')
    await page.waitForTimeout(200)

    // Just verify we can randomize with Repentance preset
    await clickRandomize(page)
    const mainText = await page.locator('main').textContent()
    expect(mainText.length).toBeGreaterThan(0)
  })

})
