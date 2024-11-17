import test from '../../fixtures/loginFixture';
import { expect } from '@playwright/test';
import { testUsers } from '../../utils/data/testData';

test.describe('Invalid Credentials Login Test', () => {
  test('Cannot log in with invalid credentials', async ({ loginPage, page }) => {
    await loginPage.login(testUsers.invalidUser.email,testUsers.invalidUser.password);
    await loginPage.checkInvalidCredentialsError();
    await expect(page.locator('text=Sign out')).not.toBeVisible();
  });
});