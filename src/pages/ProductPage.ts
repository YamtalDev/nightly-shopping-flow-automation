import { Page, expect } from '@playwright/test';
import { environment } from '../config/environment';
import { PRODUCT_SELECTORS } from '../config/selectors/ProductSelectors';
import { clickElementWhenReady } from '../utils/actions/clickElementWhenReady';

/**
 * @brief Represents the Product Page and encapsulates interactions with it.
 */
export class ProductPage {
  constructor(public page: Page) {}

  /**
   * @method Navigates to the products page.
   * @throws Will throw an error if navigation fails or the products page is not visible.
   */
  async navigateToProductsPage(): Promise<void> {
    try {
      await this.page.goto(`${environment.BASE_URL}/`, {
        waitUntil: 'networkidle',
      });
      await expect(this.page.locator('h2:has-text("Products")')).toBeVisible({
        timeout: 5000,
      });
    } catch (error) {
      throw new Error(`Navigation to products page failed. ${error}`);
    }
  }

  /**
   * @method Adds a product to the cart with a specified quantity.
   * @param productId - The ID of the product to add.
   * @param quantity - The quantity to select.
   * @throws Will throw an error if adding the product to the cart fails.
   */
  async addProductToCart(
    productId: string,
    quantity: number
  ): Promise<void> {
    try {
      const quantitySelect = this.page.locator(
        PRODUCT_SELECTORS.quantitySelect(productId)
      );
      await expect(quantitySelect).toBeVisible({ timeout: 5000 });
      await quantitySelect.selectOption({ value: quantity.toString() });

      const addToCartButton = this.page.locator(
        PRODUCT_SELECTORS.addToCartButton(productId)
      );
      await clickElementWhenReady(addToCartButton);
    } catch (error) {
      throw new Error(
        `Failed to add product ID "${productId}" to cart. ${error}`
      );
    }
  }

  /**
   * @method Navigates to the shopping cart page.
   * @throws Will throw an error if navigation to the shopping cart fails.
   */
  async navigateToCart(): Promise<void> {
    try {
      await this.page.click(PRODUCT_SELECTORS.shoppingCartLink);
      await expect(
        this.page.locator('h2:has-text("Shopping Cart")')
      ).toBeVisible({ timeout: 5000 });
      await expect(this.page).toHaveURL(`${environment.BASE_URL}/cart`);
    } catch (error) {
      throw new Error(`Failed to navigate to the shopping cart. ${error}`);
    }
  }
}
