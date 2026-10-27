import axios from 'axios';

export type Rates = { amount: number; base: string; date: string; rates: Record<string, number> };

export const ratesApi = axios.create({ baseURL: 'https://api.frankfurter.dev/v1', timeout: 8000 });

export async function getRates(base = 'USD') {
  const { data } = await ratesApi.get<Rates>('/latest', { params: { base, symbols: 'EUR,GBP,JPY,CHF' } });
  return data;
}
