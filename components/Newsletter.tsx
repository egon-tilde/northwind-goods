'use client';
import { useState } from 'react';
import { subscribeNewsletter } from '@/lib/api';
import { t } from '@/lib/i18n';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      await subscribeNewsletter(email);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={submit}>
      <h3 className="font-semibold text-white">{t('newsletter.title')}</h3>
      <p style={{ color: '#57534e' }} className="mt-1 text-xs">
        No spam. Unsubscribe whenever you like.
      </p>
      <div className="mt-3 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-md bg-stone-800 px-3 py-2 text-sm text-white"
        />
        <button className="rounded-md bg-teal-700 px-3 py-2 text-sm text-white" disabled={status === 'sending'}>
          {t('newsletter.submit')}
        </button>
      </div>
      {status === 'done' && <p className="mt-2 text-xs text-teal-400">You are on the list.</p>}
    </form>
  );
}
