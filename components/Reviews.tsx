'use client';
import useSWR from 'swr';
import type { Reviewer } from '@/lib/types';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const QUOTES = ['Exactly as described, arrived in two days.', 'Good value, packaging could be better.', 'Bought a second one for my sister.', 'Solid. Would buy again.'];

export default function Reviews({ productId }: { productId: number }) {
  const { data, error, isLoading } = useSWR<{ results: Reviewer[] }>(`https://randomuser.me/api/?results=3&seed=product-${productId}&inc=name,location,picture,login`, fetcher);

  if (error) return <p className="mt-3 text-sm text-rose-600">Reviews could not be loaded.</p>;
  if (isLoading || !data) return <p className="mt-3 text-sm text-stone-500">Loading reviews…</p>;

  return (
    <ul className="mt-4 grid gap-4 md:grid-cols-3">
      {data.results.map((r, i) => (
        <li key={r.login.uuid} className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img src={r.picture.thumbnail} alt={`${r.name.first} ${r.name.last}`} className="h-10 w-10 rounded-full" />
            <div>
              <p className="text-sm font-semibold">
                {r.name.first} {r.name.last.charAt(0)}.
              </p>
              <p className="text-xs text-stone-500">
                {r.location.city}, {r.location.country}
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-stone-700">“{QUOTES[(productId + i) % QUOTES.length]}”</p>
        </li>
      ))}
    </ul>
  );
}
