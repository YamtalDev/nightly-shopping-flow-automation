import { expect, Page } from "playwright/test";

export class CartPage {
    constructor(private page: Page) {}

    async verifyProductInCart(productName: string) {
      // Verify that the product is listed in the cart
      await expect(this.page.locator(`text=${productName}`)).toBeVisible();
    }

    async proceedToCheckout() {
      // Click on "Proceed to Checkout"
      await this.page.click('text=Proceed to Checkout');
    }
  }
