import { Page, expect } from '@playwright/test';
import { CHECKOUT_SELECTORS } from '../config/selectors/CheckoutSelectors';
import { clickElementWhenReady } from '../utils/actions/clickElementWhenReady';
import { environment } from '../config/environment';

/**
 * Represents the Checkout Page and encapsulates interactions with it.
 */
export class CheckoutPage {
  constructor(public page: Page) {}

  /**
   * Completes the checkout process by filling in the shipping address
   * and handling the confirmation dialog to capture the order ID.
   * @param shippingAddress - The shipping address to use for the order.
   * @returns The order ID generated after checkout.
   */
  async completeCheckout(shippingAddress: string): Promise<string> {
    try {
      // Fill in the shipping address
      await expect(this.page.locator(CHECKOUT_SELECTORS.shippingAddressInput)).toBeVisible({ timeout: 5000 });
      await this.page.fill(CHECKOUT_SELECTORS.shippingAddressInput, shippingAddress);

      // Wait for the "Complete Checkout" button to become enabled
      const completeCheckoutButton = this.page.locator(CHECKOUT_SELECTORS.completeCheckoutButton);
      await expect(completeCheckoutButton).toBeEnabled({ timeout: 5000 });

      // Handle the confirmation dialog and capture the order ID
      let orderId: string | undefined;
      this.page.once('dialog', async (dialog) => {
        const message = dialog.message();
        const match = message.match(/checkout complete: (.+)/);
        if (match) {
          orderId = match[1];
        }
        await dialog.accept();
      });

      // Click the "Complete Checkout" button
      await clickElementWhenReady(completeCheckoutButton);

      // Wait for navigation back to the products page
      await expect(this.page).toHaveURL(`${environment.BASE_URL}/`);

      if (!orderId) {
        throw new Error('Order ID not captured from checkout confirmation dialog.');
      }

      return orderId;
    } catch (error) {
      throw new Error(`Failed to complete checkout. ${error}`);
    }
  }
}
