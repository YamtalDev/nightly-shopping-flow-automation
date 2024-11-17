import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { environment } from '../config/environment';

/**
 * Extends the base test with login and additional page objects for a logged-in state.
 */
const test = base.extend<{
  loginPage: LoginPage;
  productPage: ProductPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await use(loginPage);
  },
  productPage: async ({ page, loginPage }, use) => {
    await loginPage.login(environment.EMAIL, environment.PASSWORD);
    await loginPage.verifySuccessfulLogin();

    const productPage = new ProductPage(page);
    await use(productPage);
  },
});

export default test;
