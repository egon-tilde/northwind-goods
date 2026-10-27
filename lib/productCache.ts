import { PRODUCT_CACHE } from './storageKeys';
import type { Product } from './types';

export async function cacheProduct(product: Product) {
  if (typeof caches === 'undefined') return;
  const cache = await caches.open(PRODUCT_CACHE);
  await cache.put(
    `/offline/products/${product.id}`,
    new Response(JSON.stringify(product), { headers: { 'Content-Type': 'application/json' } })
  );
}

export async function cachedProduct(id: number): Promise<Product | null> {
  if (typeof caches === 'undefined') return null;
  const hit = await caches.match(`/offline/products/${id}`);
  return hit ? hit.json() : null;
}
