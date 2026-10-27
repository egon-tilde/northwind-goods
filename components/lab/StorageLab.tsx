'use client';
import { useEffect, useState } from 'react';
import { PRODUCT_CACHE } from '@/lib/storageKeys';

const FAKE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkVtaWx5IEpvaG5zb24iLCJyb2xlIjoiYWRtaW4ifQ.c2lnbmF0dXJlLWZvci10ZXN0aW5nLW9ubHk';

export default function StorageLab() {
  const [step, setStep] = useState<string>('shipping');
  const [cacheCount, setCacheCount] = useState(0);

  useEffect(() => {
    setStep(sessionStorage.getItem('checkout-step') ?? 'shipping');
    caches.open(PRODUCT_CACHE).then((c) => c.keys()).then((k) => setCacheCount(k.length));
  }, []);

  function seed() {
    localStorage.setItem('payment_settings', JSON.stringify({ provider: 'stripe', apiKey: 'sk_test_51NorthwindDemoKey', lastFour: '4242', saveCard: true }));
    localStorage.setItem('refresh_token', FAKE_JWT);
    sessionStorage.setItem('checkout-step', 'payment');
    sessionStorage.setItem('ab-test', JSON.stringify({ variant: 'B', experiment: 'free-shipping-banner' }));
    setStep('payment');
  }

  async function warmCache() {
    const cache = await caches.open(PRODUCT_CACHE);
    await cache.add('https://dummyjson.com/products/categories');
    await cache.put('/offline/banner.json', new Response(JSON.stringify({ text: 'Back online soon' }), { headers: { 'Content-Type': 'application/json' } }));
    setCacheCount((await cache.keys()).length);
  }

  function nextStep() {
    const order = ['shipping', 'payment', 'review'];
    const next = order[(order.indexOf(step) + 1) % order.length];
    sessionStorage.setItem('checkout-step', next);
    setStep(next);
  }

  return (
    <section className="rounded-2xl bg-white p-6">
      <h2 className="text-xl font-semibold">Storage playground</h2>
      <p className="mt-1 text-sm text-stone-500">
        Checkout step: <strong>{step}</strong> · cached responses: <strong>{cacheCount}</strong>
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <button className="rounded-full border px-3 py-1" onClick={seed}>
          Seed secrets (API key, JWT)
        </button>
        <button className="rounded-full border px-3 py-1" onClick={nextStep}>
          Next checkout step
        </button>
        <button className="rounded-full border px-3 py-1" onClick={warmCache}>
          Fill Cache Storage
        </button>
        <button className="rounded-full border px-3 py-1" onClick={() => localStorage.removeItem('payment_settings')}>
          Remove payment_settings
        </button>
      </div>
    </section>
  );
}
