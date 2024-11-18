import { Page, expect } from '@playwright/test';
import { environment } from '../config/environment';
import { CHECKOUT_SELECTORS } from '../config/selectors/CheckoutSelectors';
import { clickElementWhenReady } from '../utils/actions/clickElementWhenReady';

/**
 * @brief Represents the Checkout Page and encapsulates interactions with it.
 */
export class CheckoutPage {
  constructor(public page: Page) {}

  /**
   * @method Completes the checkout process by filling in the shipping address
   * and handling the confirmation dialog to capture the order ID.
   * @param shippingAddress - The shipping address to use for the order.
   * @returns The order ID generated after checkout.
   * @throws Will throw an error if checkout fails or order ID is not captured.
   */
  async completeCheckout(shippingAddress: string): Promise<string> {
    try {
      await expect(
        this.page.locator(CHECKOUT_SELECTORS.shippingAddressInput)
      ).toBeVisible({ timeout: 5000 });
      await this.page.fill(
        CHECKOUT_SELECTORS.shippingAddressInput,
        shippingAddress
      );

      const completeCheckoutButton = this.page.locator(
        CHECKOUT_SELECTORS.completeCheckoutButton
      );
      await expect(completeCheckoutButton).toBeEnabled({ timeout: 5000 });

      let orderId: string | undefined;
      this.page.once('dialog', async (dialog) => {
        const message = dialog.message();
        const match = message.match(/checkout complete: (.+)/);
        if (match) {
          orderId = match[1];
        }
        await dialog.accept();
      });

      await clickElementWhenReady(completeCheckoutButton);
      await expect(this.page).toHaveURL(`${environment.BASE_URL}/`);

      if (!orderId) {
        throw new Error(
          'Order ID not captured from checkout confirmation dialog.'
        );
      }

      return orderId;
    } catch (error) {
      throw new Error(`Failed to complete checkout. ${error}`);
    }
  }
}
