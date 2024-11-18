import test from '../../fixtures/PageFixture';

test.describe('Remove Product from Cart Test', () => {
	test('Remove a product from the cart and verify it is removed', async ({
		productPage,
		cartPage,
	}) => {
		const productToAdd = { id: '1', name: 'Product 1', quantity: 2 };

		await productPage.navigateToProductsPage();
		await productPage.addProductToCart(productToAdd.id, productToAdd.quantity);
		await productPage.navigateToCart();

		await cartPage.verifyProductInCart(
			productToAdd.name,
			productToAdd.quantity
		);
		await cartPage.removeProductFromCart(productToAdd.name);
		await cartPage.verifyProductNotInCart(productToAdd.name);
	});
});
