'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { searchProducts } from '@/lib/api';
import type { Product } from '@/lib/types';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Pick<Product, 'id' | 'title' | 'thumbnail'>[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const id = setTimeout(() => {
      searchProducts(query).then((r) => {
        setResults(r.products);
        setOpen(true);
      });
    }, 300);
    return () => clearTimeout(id);
  }, [query]);

  return (
    <div className="relative hidden md:block">
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Search phones, perfume, sofas…"
        className="w-72 rounded-full border border-stone-300 bg-white px-4 py-1.5 text-sm"
      />
      {open && results.length > 0 && (
        <ul className="absolute left-0 top-10 w-80 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg">
          {results.map((p) => (
            <li key={p.id}>
              <Link href={`/products/${p.id}`} className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-stone-50">
                <img src={p.thumbnail} alt="" className="h-8 w-8 rounded object-cover" />
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
