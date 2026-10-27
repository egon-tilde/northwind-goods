'use client';
import type { Filters } from '@/lib/types';

type Props = { filters: Filters; onChange: (next: Filters) => void; resultCount: number };

export default function FilterBar({ filters, onChange, resultCount }: Props) {
  return (
    <div className="my-4 flex flex-wrap items-center gap-4 text-sm">
      <span className="text-stone-500">{resultCount} products</span>
      <label className="flex items-center gap-2">
        Sort by
        <select
          value={`${filters.sort.by}:${filters.sort.order}`}
          onChange={(e) => {
            const [by, order] = e.target.value.split(':') as [Filters['sort']['by'], Filters['sort']['order']];
            onChange({ ...filters, sort: { by, order } });
          }}
          className="rounded-md border border-stone-300 bg-white px-2 py-1"
        >
          <option value="title:asc">Name A–Z</option>
          <option value="price:asc">Price, low to high</option>
          <option value="price:desc">Price, high to low</option>
          <option value="rating:desc">Top rated</option>
        </select>
      </label>
      <label className="flex items-center gap-2">
        Max price ${filters.range.max}
        <input
          type="range"
          min={5}
          max={2000}
          step={5}
          value={filters.range.max}
          onChange={(e) => onChange({ ...filters, range: { ...filters.range, max: Number(e.target.value) } })}
        />
      </label>
    </div>
  );
}
