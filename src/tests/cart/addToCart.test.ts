import test from '../../fixtures/loginFixture';
import { CartPage } from '../../pages/CartPage';
import { productCombinations } from '../../utils/data/testData';

test.describe.parallel('Product Selection and Cart Verification Flow Tests', () => {
  for (const combination of productCombinations) {
    const productNames = combination.products
      .map((p) => `${p.name} (Qty: ${p.quantity})`)
      .join(' and ');

    test(`Add ${productNames} to cart and verify`, async ({ productPage, page }) => {
      const cartPage = new CartPage(page);
      await productPage.navigateToProductsPage();
      for (const product of combination.products) {
        await productPage.addProductToCart(product.id, product.quantity);
      }
      await productPage.navigateToCart();

      for (const product of combination.products) {
        await cartPage.verifyProductInCart(product.name, product.quantity);
      }
    });
  }
});
