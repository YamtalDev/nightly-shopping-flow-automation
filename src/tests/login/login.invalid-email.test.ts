import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Invalid Email Login Test', () => {
  test('Cannot log in with invalid email format', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.checkInvalidEmailWarning('invalid-email');
    await expect(page.locator('text=Sign out')).not.toBeVisible();
  });
});