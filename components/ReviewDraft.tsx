'use client';
import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '@/lib/storageKeys';

export default function ReviewDraft({ productId }: { productId: number }) {
  const key = STORAGE_KEYS.reviewDraft(productId);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const saved = localStorage.getItem(`review-draft:${productId}`);
    if (saved) {
      const draft = JSON.parse(saved);
      setText(draft.text);
      setRating(draft.rating);
    }
  }, [productId]);

  useEffect(() => {
    if (!text) return;
    const id = setTimeout(() => localStorage.setItem(key, JSON.stringify({ text, rating, savedAt: new Date().toISOString() })), 400);
    return () => clearTimeout(id);
  }, [key, text, rating]);

  return (
    <div className="mt-6 rounded-2xl border border-dashed border-stone-300 p-4">
      <h4 className="font-semibold">Write a review</h4>
      <div className="mt-2 flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} aria-label={`${n} stars`} onClick={() => setRating(n)} className={n <= rating ? 'text-amber-500' : 'text-stone-300'}>
            ★
          </button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What did you think? Drafts are saved automatically."
        className="mt-2 h-24 w-full rounded-lg border border-stone-300 bg-white p-2 text-sm"
      />
      <button
        onClick={() => {
          localStorage.removeItem(key);
          setText('');
        }}
        className="mt-2 text-sm text-stone-500 underline"
      >
        Discard draft
      </button>
    </div>
  );
}
