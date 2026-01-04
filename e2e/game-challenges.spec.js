import { test, expect } from '@playwright/test'
import { clickRandomize } from './helpers.js'

test.describe('Game Challenges', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should show game challenge when enabled with minimal targets', async ({ page }) => {
    test.setTimeout(60000)

    // Enable game challenges via UI click
    const gameChallengesToggle = page.locator('text=Include game challenges').first()
    if (await gameChallengesToggle.isVisible()) {
      await gameChallengesToggle.click()
      await page.waitForTimeout(200)
    }

    // Now do many rolls - game challenges have ~1/8 chance (1 out of 8 total options: 7 objectives + challenges)
    // Actually with all targets enabled, we have many more character+objective combos
    // Game challenges appear as 1 option out of (objectives + 1), so ~12.5% chance
    let foundChallenge = false
    const challengeNames = [
      'Pitch Black', 'High Brow', 'Head Trauma', 'Darkness Falls',
      'The Tank', 'Solar System', 'Suicide King', 'Demo Man',
      'Cat Got Your Tongue', 'Cursed!', 'Glass Cannon', 'Beans!',
      'Slow Roll', 'Computer Savvy', 'Waka Waka', 'The Host',
      'The Family Man', 'Purist', 'XXXXXXXXL', 'SPEED!',
      'BRAINS!', 'PRIDE DAY!', 'The Guardian', 'Backasswards',
      'Aprils Fool', 'Pokey Mans', 'Ultra Hard', 'Pong',
      'Scat Man', 'Bloody Mary', 'Baptism by Fire', 'DELETE THIS'
    ]

    // With ~12.5% chance per roll, P(none in 30 rolls) = 0.875^30 ≈ 1.7%
    for (let i = 0; i < 30; i++) {
      await clickRandomize(page)
      const mainText = await page.locator('main').textContent()

      // Game challenges display "CHALLENGE" text and the challenge name in uppercase
      if (mainText.includes('CHALLENGE') || challengeNames.some(name => mainText.toUpperCase().includes(name.toUpperCase()))) {
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
