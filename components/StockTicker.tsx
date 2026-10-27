'use client';
import { useEffect, useState } from 'react';

type SaleEvent = { productId: number; sold: number; city: string; at: number };

export default function StockTicker() {
  const [events, setEvents] = useState<SaleEvent[]>([]);

  useEffect(() => {
    const source = new EventSource('/api/stock-stream');
    source.onmessage = (msg) => {
      const event = JSON.parse(msg.data) as SaleEvent;
      setEvents((prev) => [event, ...prev].slice(0, 3));
    };
    return () => source.close();
  }, []);

  if (events.length === 0) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2 text-xs text-stone-600" aria-live="polite">
      {events.map((e) => (
        <span key={e.at} className="rounded-full bg-white px-3 py-1 shadow-sm">
          Someone in {e.city} just bought {e.sold}× product #{e.productId}
        </span>
      ))}
    </div>
  );
}
