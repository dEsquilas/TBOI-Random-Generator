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

  test('should show timed objectives as extras when enabled with 50% chance', async ({ page }) => {
    test.setTimeout(60000)

    // Set up localStorage with timedAsExtra enabled and 50% chance
    await page.evaluate(() => {
      const state = {
        timedAsExtra: true,
        timedChance: 50,
        timedEnabled: true,
        selectedTimedObjectives: ['t1', 't2']
      }
      localStorage.setItem('tboi-randomizer', JSON.stringify(state))
    })
    await page.reload()
    await page.waitForTimeout(300)

    let foundTimedExtra = false
    // With 50% chance per timed objective (2 objectives), P(at least one) ≈ 75%
    // P(none in 10 rolls) ≈ 0.25^10 ≈ 0.0001%
    for (let i = 0; i < 10; i++) {
      await clickRandomize(page)

      // Timed objectives are displayed as images with alt text
      const bossRush = page.locator('img[alt="Boss Rush"]')
      const hush = page.locator('img[alt="Hush"]')

      if (await bossRush.count() > 0 || await hush.count() > 0) {
        foundTimedExtra = true
        break
      }
    }

    expect(foundTimedExtra).toBe(true)
  })
})
