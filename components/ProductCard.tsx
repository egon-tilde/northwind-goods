'use client';
import Link from 'next/link';
import { memo } from 'react';
import { formatPrice, useCurrency } from '@/lib/store';
import { t } from '@/lib/i18n';
import type { Product } from '@/lib/types';

type Props = {
  product: Product;
  discount: number;
  wished: boolean;
  onToggleWish: (id: number) => void;
  onAddToCart: (p: Product) => void;
};

function ProductCard({ product, discount, wished, onToggleWish, onAddToCart }: Props) {
  const { currency, rates } = useCurrency();
  const finalPrice = product.price * (1 - discount / 100);

  return (
    <article className="group relative flex flex-col rounded-2xl bg-white p-3 shadow-sm transition hover:shadow-md">
      <button
        onClick={() => onToggleWish(product.id)}
        className={`absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1.5 ${wished ? 'text-rose-600' : 'text-stone-400'}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 000-7.8z" />
        </svg>
      </button>
      <Link href={`/products/${product.id}`}>
        <img src={product.thumbnail} className="aspect-square w-full rounded-xl object-cover" />
        <h3 className="mt-2 line-clamp-1 text-sm font-medium">{product.title}</h3>
      </Link>
      <p className="text-xs text-stone-400">{product.brand ?? product.category}</p>
      <div className="mt-auto flex items-end justify-between pt-3">
        <div>
          <span className="font-semibold">{formatPrice(finalPrice, currency, rates)}</span>
          {discount > 0 && <span className="ml-1 text-xs text-stone-400 line-through">{formatPrice(product.price, currency, rates)}</span>}
        </div>
        <span className="text-xs text-amber-600">★ {product.rating.toFixed(1)}</span>
      </div>
      <button
        onClick={() => onAddToCart(product)}
        disabled={product.stock === 0}
        className="mt-3 rounded-full bg-teal-700 py-1.5 text-sm font-medium text-white disabled:bg-stone-300"
      >
        {product.stock === 0 ? t('product.outOfStock') : t('product.addToCart')}
      </button>
    </article>
  );
}

export default memo(ProductCard);
