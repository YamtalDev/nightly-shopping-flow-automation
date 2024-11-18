/**
 * Selectors for the Cart Page.
 */
export const CART_SELECTORS = {
	cartItem: (productName: string) => `li:has-text("${productName} -")`,
	proceedToCheckoutButton: 'button:has-text("Proceed to Checkout")',
	removeButton: (productName: string) =>
		`li:has-text("${productName} -") >> button:has-text("Remove")`,
};
