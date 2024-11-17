import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * @brief Extends the base test with the loginPage fixture.
 */
const test = base.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await use(loginPage);
  },
});

export default test;