import { expect, Page } from "playwright/test";

export class OrdersPage {
    constructor(private page: Page) {}

    async verifyOrderDetails(productNames: string[]) {
      // Verify that the order confirmation contains the specified products
      for (const productName of productNames) {
        await expect(this.page.locator(`text=${productName}`)).toBeVisible();
      }
    }
  }
