'use client';
import { formatPrice, useCurrency } from '@/lib/store';

export default function Price({ usd, discount }: { usd: number; discount: number }) {
  const { currency, rates } = useCurrency();
  const sale = usd * (1 - discount / 100);
  return (
    <p className="mt-4 flex items-baseline gap-2">
      <span className="text-3xl font-bold">{formatPrice(sale, currency, rates)}</span>
      <span className="text-stone-400 line-through">{formatPrice(usd, currency, rates)}</span>
      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">−{Math.round(discount)}%</span>
    </p>
  );
}
