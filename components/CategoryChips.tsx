'use client';
import type { Category } from '@/lib/types';

type Props = { categories: Category[]; active: string | null; onSelect: (slug: string | null) => void };

export default function CategoryChips({ categories, active, onSelect }: Props) {
  const chip = 'cursor-pointer whitespace-nowrap rounded-full px-3 py-1 text-sm';
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <div tabIndex={3} className={`${chip} ${active === null ? 'bg-stone-900 text-white' : 'bg-white'}`} onClick={() => onSelect(null)}>
        All
      </div>
      {categories.slice(0, 12).map((c) => (
        <div key={c.slug} className={`${chip} ${active === c.slug ? 'bg-stone-900 text-white' : 'bg-white'}`} onClick={() => onSelect(c.slug)}>
          {c.name}
        </div>
      ))}
    </div>
  );
}
