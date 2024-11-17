import { test, expect } from '@playwright/test';
import { credentials } from '../../utils/credentials';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Valid Login Test', () => {
  test('Log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.EMAIL, credentials.PASSWORD);
    await loginPage.verifySuccessfulLogin();
    await expect(page).toHaveURL(credentials.BASE_URL);
    await expect(page.locator('text=Sign out')).toBeVisible();
  });
});
