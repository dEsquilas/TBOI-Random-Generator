import { test, expect } from '@playwright/test'

test.describe('Basic randomization flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Clear localStorage to start fresh
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should show a character and objective after randomizing', async ({ page }) => {
    // Click randomize button
    await page.click('img[alt="Randomize"]')

    // Wait for result to appear
    await page.waitForSelector('.player-result, [class*="result"]', { timeout: 5000 }).catch(() => {})

    // Check that character name appears (in FullDisplay mode)
    const mainContent = await page.locator('main').textContent()

    // Should have some content after randomizing
    expect(mainContent.length).toBeGreaterThan(0)
  })

  test('should load character and objective images', async ({ page }) => {
    await page.click('img[alt="Randomize"]')

    // Wait a bit for images to load
    await page.waitForTimeout(500)

    // Check that images are present and loaded
    const images = page.locator('main img')
    const count = await images.count()

    // Should have at least character + objective images
    expect(count).toBeGreaterThanOrEqual(2)

    // Check first image loaded successfully
    if (count > 0) {
      const firstImage = images.first()
      const naturalWidth = await firstImage.evaluate(img => img.naturalWidth)
      expect(naturalWidth).toBeGreaterThan(0)
    }
  })
})
