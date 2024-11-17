import { expect } from '@playwright/test';
import test from '../../fixtures/loginFixture';

test.describe('Invalid Email Login Test', () => {
  test('Cannot log in with invalid email format', async ({ loginPage, page }) => {
    await loginPage.checkInvalidEmailWarning('invalid-email');
    await expect(page.locator('text=Sign out')).not.toBeVisible();
  });
});