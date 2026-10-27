import axios from 'axios';
import { STORAGE_KEYS } from './storageKeys';

export const authApi = axios.create({ baseURL: 'https://dummyjson.com' });

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.token);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export type Me = { id: number; username: string; email: string; firstName: string; lastName: string; image: string; address: { city: string; country: string } };

export async function fetchMe() {
  const { data } = await authApi.get<Me>('/auth/me');
  return data;
}

export async function fetchOrders(userId: number) {
  const { data } = await authApi.get<{ carts: { id: number; total: number; totalProducts: number }[] }>(`/carts/user/${userId}`);
  return data.carts;
}
