import { expect } from '@playwright/test';
import test from '../../fixtures/loginFixture';
import { environment } from '../../config/environment';
import { testUsers } from '../../utils/data/testData';

test.describe('Valid Login Test', () => {
  test('Log in with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(testUsers.validUser.email, testUsers.validUser.password);
    await loginPage.verifySuccessfulLogin();
    await expect(page).toHaveURL(environment.BASE_URL);
    await expect(page.locator('text=Sign out')).toBeVisible();
  });
});
