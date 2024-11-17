import { Page } from "playwright/test";

export class ProductPage {
    constructor(private page: Page) {}

    async addProductToCart(productName: string) {
      // Locate the product card based on its name
      const productLocator = this.page.locator(`text=${productName}`);
      const addToCartButton = productLocator.locator('button:has-text("Add to Cart")');

      // Click "Add to Cart" for the specified product
      await addToCartButton.click();
    }

    async navigateToCart() {
      // Click on "Shopping Cart" in the navigation menu
      await this.page.click('text=Shopping Cart');
      // Wait for the cart page to load
      await this.page.waitForSelector('text=Proceed to Checkout');
    }
  }
