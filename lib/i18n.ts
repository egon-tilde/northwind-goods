import messages from '@/messages/en.json';

type Dict = Record<string, unknown>;

export function t(key: string, vars: Record<string, string | number> = {}): string {
  const raw = key.split('.').reduce<unknown>((node, part) => (node as Dict)?.[part], messages);
  if (typeof raw !== 'string') return key;
  return raw.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`));
}
