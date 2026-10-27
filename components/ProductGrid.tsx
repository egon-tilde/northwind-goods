'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CategoryChips from './CategoryChips';
import FilterBar from './FilterBar';
import ProductCard from './ProductCard';
import { getProducts } from '@/lib/api';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import type { Category, Filters, Product } from '@/lib/types';

type Props = {
  categories: Category[];
  onAddToCart: (p: Product) => void;
  saleActive: boolean;
};

const DEFAULT_FILTERS: Filters = { category: null, sort: { by: 'title', order: 'asc' }, range: { min: 0, max: 2000 } };

export default function ProductGrid({ categories, onAddToCart, saleActive }: Props) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [wishlist, setWishlist] = useLocalStorage<number[]>(STORAGE_KEYS.wishlist, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProducts({ category: filters.category, sortBy: filters.sort.by, order: filters.sort.order, limit: 12, skip: page * 12 })
      .then((data) => {
        if (!cancelled) setProducts(data.products);
      })
      .catch((err) => console.error(err))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [filters.category, filters.sort.by, filters.sort.order, page]);

  const visible = useMemo(() => products.filter((p) => p.price <= filters.range.max), [products, filters.range.max]);

  const toggleWish = useCallback(
    (id: number) => setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setWishlist]
  );

  return (
    <div>
      <CategoryChips
        categories={categories}
        active={filters.category}
        onSelect={(category) => {
          setPage(0);
          setFilters({ ...filters, category });
        }}
      />
      <FilterBar filters={filters} onChange={setFilters} resultCount={visible.length} />
      {loading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-stone-200" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {visible.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              discount={saleActive ? p.discountPercentage : 0}
              wished={wishlist.includes(p.id)}
              onToggleWish={toggleWish}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
      <div className="mt-6 flex justify-center gap-3">
        <button disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="rounded-full border px-4 py-1.5 text-sm disabled:opacity-40">
          Previous
        </button>
        <button onClick={() => setPage((p) => p + 1)} className="rounded-full border px-4 py-1.5 text-sm">
          Next
        </button>
      </div>
    </div>
  );
}
