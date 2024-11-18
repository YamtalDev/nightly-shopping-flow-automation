import { Page, expect } from '@playwright/test';
import { environment } from '../config/environment';
import { CART_SELECTORS } from '../config/selectors/CartSelectors';
import { clickElementWhenReady } from '../utils/actions/clickElementWhenReady';

/**
 * @brief Represents the Cart Page and encapsulates interactions with it.
 */
export class CartPage {
  constructor(public page: Page) {}

  /**
   * @method Verifies that a product with a specified quantity is present in the cart.
   * @param productName - The name of the product to verify.
   * @param quantity - The expected quantity.
   * @throws Will throw an error if the product with the specified quantity is not found.
   */
  async verifyProductInCart(
    productName: string,
    quantity: number
  ): Promise<void> {
    try {
      const cartItem = this.page.locator(CART_SELECTORS.cartItem(productName));
      await expect(cartItem).toBeVisible({ timeout: 5000 });

      const textContent = await cartItem.textContent();
      if (!textContent?.includes(`Quantity: ${quantity}`)) {
        throw new Error(
          `Expected quantity ${quantity} for "${productName}", but found different quantity.`
        );
      }
    } catch (error) {
      throw new Error(
        `Product "${productName}" with quantity ${quantity} not found in the cart. ${error}`
      );
    }
  }

  /**
   * @method Removes a product from the cart.
   * @param productName - The name of the product to remove.
   * @throws Will throw an error if the product cannot be removed.
   */
  async removeProductFromCart(productName: string): Promise<void> {
    try {
      const cartItem = this.page.locator(CART_SELECTORS.cartItem(productName));
      const removeButtonSelector = `li:has-text("${productName} -") >> button:has-text("Remove")`;
      const removeButton = this.page.locator(removeButtonSelector);
      await clickElementWhenReady(removeButton);
	  await expect(cartItem).toBeHidden({ timeout: 5000 });
    } catch (error) {
      throw new Error(
        `Failed to remove product "${productName}" from the cart. ${error}`
      );
    }
  }

  /**
   * @method Verifies that a product is not present in the cart.
   * @param productName - The name of the product to verify.
   * @throws Will throw an error if the product is still present in the cart.
   */
  async verifyProductNotInCart(productName: string): Promise<void> {
    try {
      const cartItem = this.page.locator(CART_SELECTORS.cartItem(productName));
      await expect(cartItem).toHaveCount(0, { timeout: 5000 });
    } catch (error) {
      throw new Error(
        `Product "${productName}" is still present in the cart. ${error}`
      );
    }
  }

  /**
   * @method Proceeds to the checkout page.
   * @throws Will throw an error if proceeding to checkout fails.
   */
  async proceedToCheckout(): Promise<void> {
    try {
      await clickElementWhenReady(
        this.page.locator(CART_SELECTORS.proceedToCheckoutButton)
      );
      await expect(this.page).toHaveURL(`${environment.BASE_URL}/checkout`);
    } catch (error) {
      throw new Error(`Failed to proceed to checkout. ${error}`);
    }
  }
}
