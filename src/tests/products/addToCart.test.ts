import test from '../../fixtures/loginFixture'; // Use the logged-in fixture
import { CartPage } from '../../pages/CartPage';
import { testProducts } from '../../utils/data/testData';

test.describe.parallel('Product Selection and Cart Verification flow tests', () => {
  // Generate all combinations of two different products
  const productPairs = testProducts.flatMap((p1, i) =>
    testProducts.slice(i + 1).map((p2) => [p1, p2])
  );

  // Define fixed quantity variations for testing
  const quantities = [
    [1, 2],
    [3, 4],
  ];

  for (const [product1, product2] of productPairs) {
    for (const [quantity1, quantity2] of quantities) {
      test(`Add ${product1.name} (Qty: ${quantity1}) and ${product2.name} (Qty: ${quantity2}) to cart and verify`, async ({
        productPage,
        page,
      }) => {
        const cartPage = new CartPage(page);

        // Navigate to products page
        await productPage.navigateToProductsPage();

        // Add first product
        await productPage.addProductToCart(product1.id, quantity1);

        // Add second product
        await productPage.addProductToCart(product2.id, quantity2);

        // Navigate to cart
        await productPage.navigateToCart();

        // Verify products in cart
        await cartPage.verifyProductInCart(product1.name, quantity1);
        await cartPage.verifyProductInCart(product2.name, quantity2);
      });
    }
  }
});
