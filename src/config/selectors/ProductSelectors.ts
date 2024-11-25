/**
 * Selectors for the Product Page.
 */
export const PRODUCT_SELECTORS = {
	quantitySelect: (productId: string) =>
		`#product_id_${productId}-product-quantity-select`,
	addToCartButton: (productId: string) =>
		`li:has(#product_id_${productId}-product-quantity-select) >> button:has-text("Add to Cart")`,
	shoppingCartLink: 'a[href="/cart"]',
};
