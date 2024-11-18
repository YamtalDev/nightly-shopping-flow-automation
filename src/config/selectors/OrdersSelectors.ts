/**
 * Selectors for the Orders Page.
 */
export const ORDERS_SELECTORS = {
  orderHeading: (orderId: string, shippingAddress: string) => `h2:has-text("Order ${orderId} to ${shippingAddress}")`,
  orderItem: (productName: string) => `li:has-text("${productName} -")`,
};