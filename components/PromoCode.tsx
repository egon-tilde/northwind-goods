'use client';
import { useState } from 'react';
import { t } from '@/lib/i18n';

export type Promo = { code: string; percent: number; label: string };

export default function PromoCode({ onApply }: { onApply: (p: Promo | null) => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function apply() {
    setError(null);
    const res = await fetch(`/api/promo/${encodeURIComponent(code)}`);
    const body = await res.json();
    if (!res.ok) {
      console.error('Promo rejected', body);
      setError(body.message);
      onApply(null);
      return;
    }
    onApply(body);
  }

  return (
    <div className="mt-4">
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={t('cart.promoPlaceholder')}
          className="flex-1 rounded-lg border border-stone-300 px-3 py-1.5 text-sm"
        />
        <button onClick={apply} className="rounded-lg border border-stone-300 px-3 text-sm">
          Apply
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
      <p className="mt-1 text-xs text-stone-400">Try WELCOME10 or FREESHIP (or anything else for a 404)</p>
    </div>
  );
}
