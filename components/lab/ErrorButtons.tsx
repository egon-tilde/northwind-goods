'use client';
import { useState } from 'react';
import { DUMMY } from '@/lib/api';

export default function ErrorButtons() {
  const [log, setLog] = useState<string[]>([]);
  const push = (line: string) => setLog((l) => [`${new Date().toLocaleTimeString()} ${line}`, ...l].slice(0, 6));

  async function server500() {
    const res = await fetch(`${DUMMY}/http/500/Inventory service exploded`);
    push(`GET /http/500 → ${res.status}`);
  }

  async function notFound() {
    const res = await fetch(`${DUMMY}/products/99999`);
    push(`GET /products/99999 → ${res.status}`);
  }

  async function badLogin() {
    const res = await fetch(`${DUMMY}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'emilys', password: 'wrong-password-123' }),
    });
    push(`POST /auth/login → ${res.status}`);
  }

  async function networkError() {
    try {
      await fetch('http://localhost:1/does-not-exist');
    } catch (err) {
      push(`network error: ${(err as Error).message}`);
    }
  }

  async function slowRequest() {
    const res = await fetch(`${DUMMY}/products/1?delay=3000`);
    push(`slow GET /products/1 → ${res.status}`);
  }

  const buttons: [string, () => void][] = [
    ['Server 500', server500],
    ['404 product', notFound],
    ['Wrong password (400)', badLogin],
    ['Network error', networkError],
    ['Slow request (3s)', slowRequest],
    ['console.error', () => console.error('Checkout failed: payment provider returned', { code: 'card_declined', orderId: 4821 })],
    [
      'Uncaught error',
      () =>
        setTimeout(() => {
          throw new Error('Cannot read properties of undefined (reading "shippingAddress")');
        }),
    ],
    ['Unhandled rejection', () => Promise.reject(new Error('Inventory sync timed out after 5000ms'))],
    [
      'Broken image',
      () => {
        const img = new Image();
        img.src = 'https://cdn.dummyjson.com/product-images/nope/missing.webp';
        document.body.appendChild(img);
      },
    ],
  ];

  return (
    <section className="rounded-2xl bg-white p-6">
      <h2 className="text-xl font-semibold">Failures for the Report</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {buttons.map(([label, fn]) => (
          <button key={label} onClick={fn} className="rounded-full border border-stone-300 px-3 py-1.5 text-sm hover:bg-stone-50">
            {label}
          </button>
        ))}
      </div>
      <ul className="mt-4 space-y-1 font-mono text-xs text-stone-500">
        {log.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </section>
  );
}
