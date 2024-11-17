import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe.serial('Invalid Credentials Login Test', () => {
  test('Cannot log in with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    const uniqueEmail = `${Date.now()}@example.com`;
    await loginPage.login(uniqueEmail, 'wrongPassword');
    await loginPage.checkInvalidCredentialsError();
    await expect(page.locator('text=Sign out')).not.toBeVisible();
  });
});
