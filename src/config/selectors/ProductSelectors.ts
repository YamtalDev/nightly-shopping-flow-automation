/**
 * Selectors for the Product Page.
 */
export const PRODUCT_SELECTORS = {
  // Selector for the quantity select of a product
  quantitySelect: (productId: string) => `#product_id_${productId}-product-quantity-select`,

  // Selector for the Add to Cart button within the same <li>
  addToCartButton: (productId: string) =>
    `li:has(#product_id_${productId}-product-quantity-select) >> button`, // Find button within the <li>

  // Selector for the Shopping Cart link in the navigation
  shoppingCartLink: 'a[href="/cart"]',
};
