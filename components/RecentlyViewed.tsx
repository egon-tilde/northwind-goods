'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '@/lib/storageKeys';

type Viewed = { id: number; title: string; thumbnail: string };

export function rememberViewed(item: Viewed) {
  const list: Viewed[] = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.recentlyViewed) || '[]');
  const next = [item, ...list.filter((v) => v.id !== item.id)].slice(0, 6);
  sessionStorage.setItem(STORAGE_KEYS.recentlyViewed, JSON.stringify(next));
}

export default function RecentlyViewed() {
  const [items, setItems] = useState<Viewed[]>([]);

  useEffect(() => {
    setItems(JSON.parse(sessionStorage.getItem('recently-viewed') || '[]'));
  }, []);

  if (items.length === 0) return null;
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold">Recently viewed</h2>
      <div className="mt-3 flex gap-3 overflow-x-auto">
        {items.map((v) => (
          <Link key={v.id} href={`/products/${v.id}`} className="w-28 shrink-0 rounded-xl bg-white p-2 text-xs shadow-sm">
            <img src={v.thumbnail} alt={v.title} className="aspect-square w-full object-cover" />
            <span className="mt-1 line-clamp-2 block">{v.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
