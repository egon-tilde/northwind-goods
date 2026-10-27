export const CART_KEY = 'nw-cart';

export const STORAGE_KEYS = {
  currency: 'nw:currency',
  wishlist: 'nw:wishlist',
  token: 'auth_token',
  user: 'nw:user',
  recentlyViewed: 'recently-viewed',
  reviewDraft: (productId: number | string) => `review-draft:${productId}`,
} as const;

export const PRODUCT_CACHE = 'nw-products-v1';
