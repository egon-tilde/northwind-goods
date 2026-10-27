import type { Metadata } from 'next';
import CartView from '@/components/CartView';
import CheckoutSummary from '@/components/CheckoutSummary/CheckoutSummary';
import { t } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Review the items in your Northwind Goods cart, apply a promo code and check out in under a minute.',
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">{t('cart.title')}</h1>
      <div className="grid gap-8 md:grid-cols-[1fr_320px]">
        <CartView />
        <CheckoutSummary />
      </div>
    </div>
  );
}
