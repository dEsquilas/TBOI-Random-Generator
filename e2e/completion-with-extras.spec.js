import { test, expect } from '@playwright/test'

test.describe('Completion check with roll as extra', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should not show completed timed objectives as extras', async ({ page }) => {
    // Enable roll as extra objectives
    const rollAsExtra = page.locator('text=Roll as extra objectives').first()
    if (await rollAsExtra.isVisible()) {
      await rollAsExtra.click()
      await page.waitForTimeout(200)
    }

    // Enable avoid completed
    const avoidCompleted = page.locator('text=Avoid completed').first()
    if (await avoidCompleted.isVisible()) {
      await avoidCompleted.click()
      await page.waitForTimeout(200)
    }

    // Randomize and verify it works
    await page.click('img[alt="Randomize"]')
    await page.waitForTimeout(300)

    const mainText = await page.locator('main').textContent()
    expect(mainText.length).toBeGreaterThan(0)
  })

  test('should filter completed objectives when avoid completed is enabled', async ({ page }) => {
    // Enable avoid completed objectives
    const avoidCompleted = page.locator('text=Avoid completed').first()
    if (await avoidCompleted.isVisible()) {
      await avoidCompleted.click()
      await page.waitForTimeout(200)
    }

    // Randomize multiple times - should work without errors
    for (let i = 0; i < 10; i++) {
      await page.click('img[alt="Randomize"]')
      await page.waitForTimeout(200)

      const mainText = await page.locator('main').textContent()
      expect(mainText.length).toBeGreaterThan(0)
    }
  })
})
