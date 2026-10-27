'use client';
import { useEffect, useState } from 'react';
import { login } from '@/lib/api';
import { fetchMe, fetchOrders, type Me } from '@/lib/authClient';
import { STORAGE_KEYS } from '@/lib/storageKeys';
import { t } from '@/lib/i18n';

export default function LoginForm() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [me, setMe] = useState<Me | null>(null);
  const [orders, setOrders] = useState<{ id: number; total: number; totalProducts: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadProfile() {
    const profile = await fetchMe();
    setMe(profile);
    setOrders(await fetchOrders(profile.id));
  }

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEYS.token)) loadProfile().catch(() => localStorage.removeItem(STORAGE_KEYS.token));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await login(username, password);
      localStorage.setItem(STORAGE_KEYS.token, user.accessToken);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify({ id: user.id, username: user.username, refreshToken: user.refreshToken }));
      await loadProfile();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.user);
    setMe(null);
    setOrders([]);
  }

  if (me) {
    return (
      <div className="rounded-2xl bg-white p-6">
        <div className="flex items-center gap-4">
          <img src={me.image} alt="" className="h-16 w-16 rounded-full bg-stone-100" />
          <div>
            <p className="text-lg font-semibold">
              {me.firstName} {me.lastName}
            </p>
            <p className="text-sm text-stone-500">
              {me.email} · {me.address.city}, {me.address.country}
            </p>
          </div>
          <button onClick={logout} className="ml-auto text-sm underline">
            Sign out
          </button>
        </div>
        <h2 className="mt-6 font-semibold">Past orders</h2>
        <ul className="mt-2 text-sm">
          {orders.length === 0 && <li className="text-stone-500">No orders yet.</li>}
          {orders.map((o) => (
            <li key={o.id}>
              Order #{o.id}: {o.totalProducts} products, ${o.total}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-sm space-y-3 rounded-2xl bg-white p-6">
      <p className="text-sm text-stone-500">{t('account.hint')}</p>
      <label className="block text-sm">
        Username
        <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2" />
      </label>
      <label className="block text-sm">
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2" />
      </label>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <button disabled={loading} className="w-full rounded-full bg-teal-700 py-2 font-semibold text-white">
        {loading ? 'Signing in…' : t('account.title')}
      </button>
    </form>
  );
}
