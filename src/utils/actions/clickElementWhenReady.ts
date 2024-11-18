import { Locator, expect } from '@playwright/test';

/**
 * @brief Clicks an element when it's visible, enabled, and stable.
 * @param locator Playwright Locator for the element.
 * @param timeout Maximum time to wait in milliseconds.
 */
export async function clickElementWhenReady(locator: Locator, timeout = 8000) {
	await expect(locator).toBeVisible({ timeout });
	await expect(locator).toBeEnabled({ timeout });
	await locator.scrollIntoViewIfNeeded();
	try {
	  await locator.click({ timeout });
	} catch (error) {
	  error = `Failed to click element: ${locator}. ${error}`;
	  throw error;
	}
  }