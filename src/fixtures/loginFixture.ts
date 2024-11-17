import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type LoginFixtures = {
  loginPage: LoginPage;
};

const test = base.extend<LoginFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await use(loginPage);
  },
});

export default test;