import { Page, expect } from '@playwright/test';
import { PRODUCT_SELECTORS } from '../config/selectors/ProductSelectors';
import { clickElementWhenReady } from '../utils/actions/clickElementWhenReady';
import { environment } from '../config/environment';

/**
 * Represents the Product Page and encapsulates interactions with it.
 */
export class ProductPage {
  constructor(public page: Page) {}

  /**
   * Navigates to the products page.
   */
  async navigateToProductsPage() {
    try {
      await this.page.goto(`${environment.BASE_URL}/`, { waitUntil: 'networkidle' });
      await expect(this.page.locator('h2:has-text("Products")')).toBeVisible({ timeout: 5000 });
    } catch (error) {
      throw new Error(`Navigation to products page failed. ${error}`);
    }
  }

  /**
   * Adds a product to the cart with a specified quantity.
   * @param productId - The ID of the product to add.
   * @param quantity - The quantity to select.
   */
  async addProductToCart(productId: string, quantity: number) {
    try {
      const quantitySelect = this.page.locator(PRODUCT_SELECTORS.quantitySelect(productId));
      await expect(quantitySelect).toBeVisible({ timeout: 5000 });
      await quantitySelect.selectOption({ value: quantity.toString() });

      const addToCartButton = this.page.locator(PRODUCT_SELECTORS.addToCartButton(productId));
      await clickElementWhenReady(addToCartButton, 15000);
    } catch (error) {
      throw new Error(`Failed to add product ID "${productId}" to cart. ${error}`);
    }
  }

  /**
   * Navigates to the shopping cart page.
   */
  async navigateToCart() {
    try {
      await clickElementWhenReady(this.page.locator(PRODUCT_SELECTORS.shoppingCartLink));
      await expect(this.page.locator('h2:has-text("Shopping Cart")')).toBeVisible({ timeout: 5000 });
      await expect(this.page).toHaveURL(`${environment.BASE_URL}/cart`);
    } catch (error) {
      throw new Error(`Failed to navigate to the shopping cart. ${error}`);
    }
  }
}
