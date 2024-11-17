/**
 * Selectors for the Cart Page.
 */
export const CART_SELECTORS = {
  // Selector for a cart item based on product name
  cartItem: (productName: string) => `li:has-text("${productName} -")`,

  // Selector for the Proceed to Checkout button
  proceedToCheckoutButton: 'button:has-text("Proceed to Checkout")',
};
