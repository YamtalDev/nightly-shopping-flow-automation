import { Page, expect } from '@playwright/test';
import { CART_SELECTORS } from '../config/selectors/CartSelectors';
import { clickElementWhenReady } from '../utils/actions/clickElementWhenReady';
import { environment } from '../config/environment';

/**
 * Represents the Cart Page and encapsulates interactions with it.
 */
export class CartPage {
  constructor(public page: Page) {}

  /**
   * Verifies that a product with a specified quantity is present in the cart.
   * @param productName - The name of the product to verify.
   * @param quantity - The expected quantity.
   */
  async verifyProductInCart(productName: string, quantity: number) {
    try {
      const cartItem = this.page.locator(CART_SELECTORS.cartItem(productName));
      await expect(cartItem).toBeVisible({ timeout: 5000 });

      const textContent = await cartItem.textContent();
      if (!textContent?.includes(`Quantity: ${quantity}`)) {
        throw new Error(`Expected quantity ${quantity} for "${productName}", but found different quantity.`);
      }
    } catch (error) {
      throw new Error(`Product "${productName}" with quantity ${quantity} not found in the cart. ${error}`);
    }
  }

  /**
   * Proceeds to the checkout page.
   */
  async proceedToCheckout() {
    try {
      await clickElementWhenReady(this.page.locator(CART_SELECTORS.proceedToCheckoutButton));
      await this.page.waitForLoadState('networkidle');
      await expect(this.page).toHaveURL(`${environment.BASE_URL}/checkout`);
    } catch (error) {
      throw new Error(`Failed to proceed to checkout. ${error}`);
    }
  }
}
