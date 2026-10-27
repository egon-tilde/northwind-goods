'use client';
import { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';
import { useCart } from '@/lib/store';
import { t } from '@/lib/i18n';
import type { Category } from '@/lib/types';

const SALE_LENGTH = 60 * 60 * 2;

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

export default function HomeShop({ categories }: { categories: Category[] }) {
  const [secondsLeft, setSecondsLeft] = useState(SALE_LENGTH);
  const add = useCart((s) => s.add);

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : SALE_LENGTH)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="shop" className="mt-10">
      <div className="mb-4 flex items-center justify-between rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white">
        <span>{t('home.flashSale', { time: formatTime(secondsLeft) })}</span>
        <span>Up to 20% off</span>
      </div>
      <ProductGrid categories={categories} onAddToCart={(p) => add(p)} saleActive={secondsLeft > 0} />
    </section>
  );
}
