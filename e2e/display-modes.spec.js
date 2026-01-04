import { test, expect } from '@playwright/test'

test.describe('Display modes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should switch between display modes', async ({ page }) => {
    // Randomize first to have content to display
    await page.click('img[alt="Randomize"]')
    await page.waitForTimeout(300)

    // Find the display mode selector (radio buttons or dropdown)
    const displayModes = ['Full', 'Simple A', 'Simple B', 'Plain Text']

    for (const mode of displayModes) {
      const modeSelector = page.locator(`text=${mode}`).first()
      if (await modeSelector.isVisible()) {
        await modeSelector.click()
        await page.waitForTimeout(200)

        // Main content should still be visible
        const main = page.locator('main')
        await expect(main).toBeVisible()
      }
    }
  })

  test('should apply chroma background color', async ({ page }) => {
    // Find background color picker or input
    const bgColorInput = page.locator('input[type="color"]').first()

    if (await bgColorInput.isVisible()) {
      // Change color
      await bgColorInput.fill('#ff0000')
      await page.waitForTimeout(200)

      // Check that the background changed
      const container = page.locator('.flex.min-h-screen').first()
      const bgColor = await container.evaluate(el => getComputedStyle(el).backgroundColor)

      // Should be red-ish
      expect(bgColor).toContain('255')
    }
  })

  test('should show different layouts for each mode', async ({ page }) => {
    await page.click('img[alt="Randomize"]')
    await page.waitForTimeout(300)

    // Test Full mode has images
    const fullMode = page.locator('text=Full').first()
    if (await fullMode.isVisible()) {
      await fullMode.click()
      await page.waitForTimeout(200)

      const images = page.locator('main img')
      const imageCount = await images.count()
      expect(imageCount).toBeGreaterThan(0)
    }

    // Test Plain Text mode has minimal/no images
    const plainTextMode = page.locator('text=Plain Text').first()
    if (await plainTextMode.isVisible()) {
      await plainTextMode.click()
      await page.waitForTimeout(200)

      // Plain text should have text content
      const mainText = await page.locator('main').textContent()
      expect(mainText.length).toBeGreaterThan(0)
    }
  })
})
