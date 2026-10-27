'use client';
import { useEffect } from 'react';
import { rememberViewed } from './RecentlyViewed';
import { cacheProduct } from '@/lib/productCache';
import type { Product } from '@/lib/types';

export default function TrackView({ product }: { product: Product }) {
  useEffect(() => {
    rememberViewed({ id: product.id, title: product.title, thumbnail: product.thumbnail });
    cacheProduct(product).catch(() => {});
  }, [product]);
  return null;
}
