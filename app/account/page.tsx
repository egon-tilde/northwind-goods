import type { Metadata } from 'next';
import LoginForm from '@/components/LoginForm';
import { t } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Your account · Northwind Goods',
  description: 'Sign in to Northwind Goods to see your orders, saved addresses and wishlist across devices.',
};

export default function AccountPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">{t('account.title')}</h1>
      <LoginForm />
    </div>
  );
}
