import test from '../../fixtures/PageFixture';
import { productCombinations } from '../../utils/data/testData';

test.describe('Checkout Process Test', () => {
	test('Proceed to checkout, complete the process, and verify order placement', async ({
		productPage,
		cartPage,
		checkoutPage,
		ordersPage,
	}) => {
		const shippingAddress = '123 Main Street, Anytown';

		const productsToAdd = productCombinations[0].products; // Using the first product combination
		await productPage.navigateToProductsPage();
		for (const product of productsToAdd) {
			await productPage.addProductToCart(product.id, product.quantity);
		}

		await productPage.navigateToCart();
		await cartPage.proceedToCheckout();

		const orderId = await checkoutPage.completeCheckout(shippingAddress);

		await ordersPage.navigateToOrdersPage();
		await ordersPage.verifyOrderExists(orderId, shippingAddress, productsToAdd);
	});
});
