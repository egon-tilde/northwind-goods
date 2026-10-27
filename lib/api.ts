import type { Category, Product, ProductList, AuthUser } from './types';

export const DUMMY = 'https://dummyjson.com';

export async function getProducts(params: { category?: string | null; sortBy?: string; order?: string; limit?: number; skip?: number }): Promise<ProductList> {
  const base = params.category ? `${DUMMY}/products/category/${params.category}` : `${DUMMY}/products`;
  const qs = new URLSearchParams({
    limit: String(params.limit ?? 12),
    skip: String(params.skip ?? 0),
    sortBy: params.sortBy ?? 'title',
    order: params.order ?? 'asc',
    select: 'title,price,discountPercentage,rating,stock,thumbnail,category,brand',
  });
  const res = await fetch(`${base}?${qs}`);
  if (!res.ok) throw new Error(`Products failed: ${res.status}`);
  return (await res.json()) as ProductList;
}

export async function getProduct(id: string | number): Promise<Product> {
  const res = await fetch(`${DUMMY}/products/${id}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Product ${id} not found`);
  return res.json() as Promise<Product>;
}

export async function searchProducts(q: string): Promise<ProductList> {
  const res = await fetch(`${DUMMY}/products/search?q=${encodeURIComponent(q)}&limit=6`);
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${DUMMY}/products/categories`);
  return res.json();
}

export async function addCartRemote(userId: number, products: { id: number; quantity: number }[]) {
  const res = await fetch(`${DUMMY}/carts/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, products }),
  });
  return res.json() as Promise<{ id: number; total: number; discountedTotal: number; totalProducts: number; totalQuantity: number }>;
}

export async function login(username: string, password: string): Promise<AuthUser> {
  const res = await fetch(`${DUMMY}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: 30 }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Login failed (${res.status})`);
  }
  return res.json();
}

export async function subscribeNewsletter(email: string) {
  const res = await fetch(`${DUMMY}/users/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, firstName: email.split('@')[0], newsletter: true }),
  });
  return res.json();
}
