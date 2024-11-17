import test from '../../fixtures/loginFixture';
import { testUsers } from '../../utils/data/testData';

test.describe('Password Attempts Lockout Test', () => {
  test('"Password attempts exceeded" error after 5 failed attempts', async ({ loginPage, page }) => {
    const lockoutEmail = testUsers.lockoutUser.email;
    for (let i = 0; i < 5; i++) {
      await loginPage.login(lockoutEmail, testUsers.lockoutUser.password);
    }
    await loginPage.login(lockoutEmail, 'wrongPassword');
    await loginPage.checkPasswordAttemptsExceededError();
  });
});
