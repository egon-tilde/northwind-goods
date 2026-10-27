'use client';
import { memo, useReducer, useState } from 'react';

type Config = { theme: { accent: string; rounded: boolean }; layout: { columns: number } };

type CounterState = { count: number; history: number[] };

function reducer(state: CounterState, action: 'inc' | 'dec' | 'reset'): CounterState {
  if (action === 'reset') return { count: 0, history: [] };
  const count = state.count + (action === 'inc' ? 1 : -1);
  return { count, history: [...state.history, count].slice(-5) };
}

const PreviewTile = memo(function PreviewTile({ label, config, onPick }: { label: string; config: Config; onPick: () => void }) {
  return (
    <button
      onClick={onPick}
      className="flex h-20 items-center justify-center text-sm font-semibold text-white"
      style={{ background: config.theme.accent, borderRadius: config.theme.rounded ? 16 : 0 }}
    >
      {label}
    </button>
  );
});

export default function RenderLab() {
  const [state, dispatch] = useReducer(reducer, { count: 0, history: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<Config>({ theme: { accent: '#0f766e', rounded: true }, layout: { columns: 3 } });
  const [, forceRender] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <section className="rounded-2xl bg-white p-6">
      <h2 className="text-xl font-semibold">Renders &amp; state playground</h2>
      <p className="mt-1 text-sm text-stone-500">Open Sourcepeek on a tile below, then press the buttons.</p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <button className="rounded-full border px-3 py-1" onClick={() => dispatch('inc')}>
          count + 1 ({state.count})
        </button>
        <button className="rounded-full border px-3 py-1" onClick={() => setIsOpen((o) => !o)}>
          toggle isOpen ({String(isOpen)})
        </button>
        <button className="rounded-full border px-3 py-1" onClick={() => setConfig((c) => ({ ...c, theme: { ...c.theme, accent: c.theme.accent === '#0f766e' ? '#be123c' : '#0f766e' } }))}>
          deep change: theme.accent
        </button>
        <button className="rounded-full border px-3 py-1" onClick={() => setConfig((c) => ({ ...c }))}>
          new object, same contents
        </button>
        <button className="rounded-full border px-3 py-1" onClick={() => forceRender((n) => n + 1)}>
          parent re-render only
        </button>
        <button className="rounded-full border px-3 py-1" onClick={() => dispatch('reset')}>
          reset
        </button>
      </div>
      <div className="mt-4 grid gap-3" style={{ gridTemplateColumns: `repeat(${config.layout.columns}, minmax(0, 1fr))` }}>
        {['Alpha', 'Beta', 'Gamma'].map((label) => (
          <PreviewTile key={label} label={label} config={config} onPick={() => setPicked(label)} />
        ))}
      </div>
      {isOpen && <p className="mt-3 text-sm">Panel is open. History: {state.history.join(', ') || '—'}. Picked: {picked ?? 'none'}</p>}
    </section>
  );
}
