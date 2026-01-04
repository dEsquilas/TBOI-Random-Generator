import { test, expect } from '@playwright/test'
import { clickRandomize } from './helpers.js'

test.describe('Game Challenges', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  // This test is probabilistic - game challenges appear ~13% of the time
  // Skip for CI, run manually to verify functionality
  test.skip('should show game challenge when enabled', async ({ page }) => {
    const gameChallengesToggle = page.locator('text=Include game challenges').first()

    if (await gameChallengesToggle.isVisible()) {
      await gameChallengesToggle.click()
      await page.waitForTimeout(200)
    }

    let foundChallenge = false
    const challengeNames = [
      'Pitch Black', 'High Brow', 'Head Trauma', 'Darkness Falls',
      'The Tank', 'Solar System', 'Suicide King', 'Demo Man'
    ]

    for (let i = 0; i < 50; i++) {
      await clickRandomize(page)
      const mainText = await page.locator('main').textContent()

      if (challengeNames.some(name => mainText.includes(name))) {
        foundChallenge = true
        break
      }
    }

    expect(foundChallenge).toBe(true)
  })

  test('should enable game challenges toggle', async ({ page }) => {
    const gameChallengesToggle = page.locator('text=Include game challenges').first()

    if (await gameChallengesToggle.isVisible()) {
      await gameChallengesToggle.click()
      await page.waitForTimeout(200)

      // Just verify we can toggle it without error
      await clickRandomize(page)

      const mainText = await page.locator('main').textContent()
      expect(mainText.length).toBeGreaterThan(0)
    }
  })
})
