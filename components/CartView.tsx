'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatPrice, useCart, useCurrency } from '@/lib/store';
import { t } from '@/lib/i18n';

type ServerCart = { id: string; items: { productId: number; quantity: number }[]; total: number; updatedAt: string };

export default function CartView() {
  const { lines, setQty, remove } = useCart();
  const { currency, rates } = useCurrency();
  const [mounted, setMounted] = useState(false);
  const [serverCart, setServerCart] = useState<ServerCart | null>(null);

  useEffect(() => {
    setMounted(true);
    fetch('/api/cart')
      .then((r) => r.json())
      .then(setServerCart);
  }, []);

  if (!mounted) return null;

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center">
        <p>{t('cart.empty')}</p>
        <Link href="/" className="mt-3 inline-block text-teal-700 underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-stone-200 rounded-2xl bg-white">
        {lines.map((l) => (
          <li key={l.id} className="flex items-center gap-4 p-4">
            <img src={l.thumbnail} alt={l.title} className="h-16 w-16 rounded-lg object-cover" />
            <div className="flex-1">
              <Link href={`/products/${l.id}`} className="font-medium">
                {l.title}
              </Link>
              <p className="text-sm text-stone-500">{formatPrice(l.price, currency, rates)} each</p>
            </div>
            <input
              type="number"
              min={1}
              value={l.quantity}
              aria-label={`Quantity of ${l.title}`}
              onChange={(e) => setQty(l.id, Number(e.target.value))}
              className="w-16 rounded-md border border-stone-300 px-2 py-1"
            />
            <span className="w-24 text-right font-semibold">{formatPrice(l.price * l.quantity, currency, rates)}</span>
            <button onClick={() => remove(l.id)} className="text-stone-400 hover:text-rose-600">
              ✕
            </button>
          </li>
        ))}
      </ul>
      {serverCart && (
        <p className="mt-3 text-xs text-stone-400">
          Server cart {serverCart.id}: {serverCart.items.length} items, ${serverCart.total} (synced {new Date(serverCart.updatedAt).toLocaleTimeString()})
        </p>
      )}
    </div>
  );
}
