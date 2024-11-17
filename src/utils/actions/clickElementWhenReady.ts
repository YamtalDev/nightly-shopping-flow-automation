import { Locator, expect } from '@playwright/test';

/**
 * @brief Clicks an element when it's visible, enabled, and stable.
 * @param locator Playwright Locator for the element.
 * @param timeout Maximum time to wait in milliseconds.
 */
export async function clickElementWhenReady(locator: Locator, timeout = 8000) {
  try {
    await expect(locator).toBeVisible({ timeout });
    await expect(locator).toBeEnabled({ timeout });
    await locator.click();
  } catch (error) {
    throw new Error(`Failed to click element: ${locator} within ${timeout}ms. Error: ${error}`);
  }
}