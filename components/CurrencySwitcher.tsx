'use client';
import { useEffect, useState } from 'react';
import { getRates } from '@/lib/rates';
import { useCurrency, type Currency } from '@/lib/store';

const OPTIONS: Currency[] = ['USD', 'EUR', 'GBP', 'JPY', 'CHF'];

export default function CurrencySwitcher() {
  const { currency, setCurrency, setRates } = useCurrency();
  const [rateDate, setRateDate] = useState<string | null>(null);

  useEffect(() => {
    getRates('USD')
      .then((data) => {
        setRates(data.rates);
        setRateDate(data.date);
      })
      .catch((err) => console.error('Could not load exchange rates', err));
  }, [setRates]);

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className="rounded-md border border-stone-300 bg-white px-2 py-1"
        title={rateDate ? `ECB rates from ${rateDate}` : 'Loading rates…'}
      >
        {OPTIONS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </label>
  );
}
