import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe.serial('Password Attempts Lockout Test', () => {
  test('"Password attempts exceeded" error after 5 failed attempts', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    const lockoutEmail = `lockout@example.com`; // Fixed email for this test
    for (let i = 0; i < 5; i++) {
      await loginPage.login(lockoutEmail, 'wrongPassword');
    }
    await loginPage.login(lockoutEmail, 'wrongPassword');
    await loginPage.checkPasswordAttemptsExceededError();
  });
});
