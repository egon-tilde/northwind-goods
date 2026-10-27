'use client';
import { useState } from 'react';
import { useCart } from '@/lib/store';
import { t } from '@/lib/i18n';
import type { Product } from '@/lib/types';

export default function AddToCart({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const add = useCart((s) => s.add);
  const lines = useCart((s) => s.lines);

  async function handleAdd() {
    setAdding(true);
    add(product, quantity);
    const items = [...lines.filter((l) => l.id !== product.id), { ...product, quantity: (lines.find((l) => l.id === product.id)?.quantity ?? 0) + quantity }].map((l) => ({
      productId: l.id,
      title: l.title,
      quantity: l.quantity,
      unitPrice: l.price,
    }));
    const res = await fetch('/api/cart', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items }) });
    const cart = await res.json();
    setMessage(`Added! Cart total is now $${cart.total}`);
    setAdding(false);
  }

  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="flex items-center rounded-full border border-stone-300 bg-white">
        <button aria-label="Decrease quantity" className="px-3 py-2" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
          −
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button aria-label="Increase quantity" className="px-3 py-2" onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}>
          +
        </button>
      </div>
      <button onClick={handleAdd} disabled={adding || product.stock === 0} className="rounded-full bg-teal-700 px-6 py-2.5 font-semibold text-white disabled:opacity-50">
        {adding ? 'Adding…' : t('product.addToCart')}
      </button>
      {message && <span className="text-sm text-teal-700">{message}</span>}
    </div>
  );
}
