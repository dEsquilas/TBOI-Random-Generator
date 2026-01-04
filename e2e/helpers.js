/**
 * Wait for the randomize button to be enabled and click it
 */
export async function clickRandomize(page) {
  const button = page.locator('img[alt="Randomize"]')

  // Wait for button to be enabled (parent button not disabled)
  try {
    await page.waitForFunction(() => {
      const img = document.querySelector('img[alt="Randomize"]')
      if (!img) return false
      const btn = img.closest('button')
      return btn && !btn.disabled
    }, { timeout: 3000 })
  } catch {
    // If timeout, try clicking anyway
  }

  await button.click()

  // Wait for animation to complete
  await page.waitForTimeout(400)

  // Wait for button to be enabled again (animation done)
  try {
    await page.waitForFunction(() => {
      const img = document.querySelector('img[alt="Randomize"]')
      if (!img) return false
      const btn = img.closest('button')
      return btn && !btn.disabled
    }, { timeout: 3000 })
  } catch {
    // Continue even if timeout
  }
}

/**
 * Wait for randomization to complete
 */
export async function waitForResult(page) {
  await page.waitForFunction(() => {
    const img = document.querySelector('img[alt="Randomize"]')
    if (!img) return false
    const button = img.closest('button')
    return button && !button.disabled
  }, { timeout: 10000 })
}
