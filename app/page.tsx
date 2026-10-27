import type { Metadata } from 'next';
import HomeShop from '@/components/HomeShop';
import PromoBanner from '@/components/PromoBanner';
import StockTicker from '@/components/StockTicker';
import RecentlyViewed from '@/components/RecentlyViewed';
import { getCategories } from '@/lib/api';
import { t } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Northwind Goods — Shop',
  openGraph: { title: 'Northwind Goods', type: 'website' },
};

export default async function HomePage() {
  const categories = await getCategories().catch(() => []);
  return (
    <>
      <section className="rounded-3xl bg-teal-900 px-8 py-12 text-white">
        <h1 className="max-w-xl text-4xl font-bold tracking-tight">{t('home.title')}</h1>
        <p className="mt-3 max-w-lg text-teal-100">{t('home.subtitle', { count: categories.length || 24 })}</p>
        <a href="#shop" className="mt-6 inline-block rounded-full bg-amber-300 px-5 py-2.5 font-semibold text-stone-900">
          {t('home.cta')}
        </a>
      </section>
      <StockTicker />
      <PromoBanner />
      <RecentlyViewed />
      <HomeShop categories={categories} />
    </>
  );
}
