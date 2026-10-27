'use client';
import { useEffect } from 'react';
import ErrorButtons from '@/components/lab/ErrorButtons';
import RenderLab from '@/components/lab/RenderLab';
import StorageLab from '@/components/lab/StorageLab';

export default function LabPage() {
  useEffect(() => {
    document.title = 'Test lab · Northwind Goods';
  }, []);

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Sourcepeek test lab</h1>
      <p className="text-stone-600">Buttons that break things on purpose, so Report, Network, Storage and Renders &amp; state have something to show.</p>
      <ErrorButtons />
      <RenderLab />
      <StorageLab />
      <h1 className="text-sm text-stone-400">A second h1 (Meta tags should complain)</h1>
    </div>
  );
}
