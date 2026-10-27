'use client';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/store';

export default function CartBadge({ className }: { className?: string }) {
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.quantity, 0));
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || count === 0) return null;
  return <span className={className}>{count}</span>;
}
