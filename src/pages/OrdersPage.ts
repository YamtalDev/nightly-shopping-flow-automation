import { Page, expect } from '@playwright/test';
import { ORDERS_SELECTORS } from '../config/selectors/OrdersSelectors';
import { environment } from '../config/environment';

/**
 * Represents the Orders Page and encapsulates interactions with it.
 */
export class OrdersPage {
  constructor(public page: Page) {}

  /**
   * Navigates to the Orders page.
   */
  async navigateToOrdersPage() {
    try {
      await this.page.goto(`${environment.BASE_URL}/orders`, { waitUntil: 'networkidle' });

      // Verify the URL
      await expect(this.page).toHaveURL(`${environment.BASE_URL}/orders`);

      // Check that at least one order heading is visible
      const orderHeadings = this.page.locator('h2:has-text("Order")');
      const count = await orderHeadings.count();
      if (count === 0) {
        throw new Error('No orders found on the Orders page.');
      }

      // Optionally, log the number of orders found for debugging
      console.log(`Found ${count} orders on the Orders page.`);
    } catch (error) {
      throw new Error(`Navigation to orders page failed. ${error}`);
    }
  }

  /**
   * Verifies that an order exists with the specified details.
   * @param orderId - The order ID to look for.
   * @param shippingAddress - The shipping address used in the order.
   * @param products - An array of products expected in the order.
   */
  async verifyOrderExists(
    orderId: string,
    shippingAddress: string,
    products: { name: string; quantity: number }[]
  ) {
    try {
      const orderHeadingSelector = ORDERS_SELECTORS.orderHeading(orderId, shippingAddress);
      const orderHeading = this.page.locator(orderHeadingSelector);
      await expect(orderHeading).toBeVisible({ timeout: 5000 });

      for (const product of products) {
        const orderItemSelector = `h2:has-text("Order ${orderId} to ${shippingAddress}") + ul > li:has-text("${product.name} -")`;
        const orderItem = this.page.locator(orderItemSelector);
        await expect(orderItem).toBeVisible({ timeout: 5000 });

        const textContent = await orderItem.textContent();
        if (!textContent?.includes(`Quantity: ${product.quantity}`)) {
          throw new Error(`Expected quantity ${product.quantity} for "${product.name}", but found different quantity.`);
        }
      }
    } catch (error) {
      throw new Error(`Order "${orderId}" verification failed. ${error}`);
    }
  }
}
