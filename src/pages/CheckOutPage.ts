import { Page } from "@playwright/test";

export class CheckoutPage {
    constructor(private page: Page) {}

    async completeCheckout(shippingAddress: string) {
      // Fill in the shipping address
      await this.page.fill('input[placeholder="Enter your Shipping Address"]', shippingAddress);

      // Click on "Complete Checkout"
      await this.page.click('text=Complete Checkout');
      // Wait for the order confirmation page
      await this.page.waitForSelector('text=Order', { timeout: 10000 });
    }
  }