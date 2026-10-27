'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartLine, Product } from './types';
import { STORAGE_KEYS } from './storageKeys';

type CartState = {
  lines: CartLine[];
  add: (p: Pick<Product, 'id' | 'title' | 'price' | 'thumbnail'>, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (p, qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.id === p.id);
          if (existing) return { lines: s.lines.map((l) => (l.id === p.id ? { ...l, quantity: l.quantity + qty } : l)) };
          return { lines: [...s.lines, { id: p.id, title: p.title, price: p.price, thumbnail: p.thumbnail, quantity: qty }] };
        }),
      setQty: (id, qty) => set((s) => ({ lines: s.lines.map((l) => (l.id === id ? { ...l, quantity: Math.max(1, qty) } : l)) })),
      remove: (id) => set((s) => ({ lines: s.lines.filter((l) => l.id !== id) })),
      clear: () => set({ lines: [] }),
    }),
    { name: 'nw-cart' }
  )
);

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CHF';

type CurrencyState = { currency: Currency; rates: Record<string, number>; setCurrency: (c: Currency) => void; setRates: (r: Record<string, number>) => void };

export const useCurrency = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: 'USD',
      rates: { USD: 1 },
      setCurrency: (currency) => set({ currency }),
      setRates: (rates) => set({ rates: { USD: 1, ...rates } }),
    }),
    { name: STORAGE_KEYS.currency }
  )
);

export function formatPrice(usd: number, currency: Currency, rates: Record<string, number>) {
  const value = usd * (rates[currency] ?? 1);
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}
