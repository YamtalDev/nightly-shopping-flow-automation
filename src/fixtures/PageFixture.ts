import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrdersPage } from '../pages/OrdersPage';
import { environment } from '../config/environment';

/**
 * Extends the base test with login and additional page objects for a logged-in state.
 */
const test = base.extend<{
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  ordersPage: OrdersPage;
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
  cartPage: async ({ page, productPage }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page, cartPage }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  ordersPage: async ({ page, checkoutPage }, use) => {
    const ordersPage = new OrdersPage(page);
    await use(ordersPage);
  },
});

export default test;
