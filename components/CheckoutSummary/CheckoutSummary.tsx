'use client';
import { useState } from 'react';
import styles from './CheckoutSummary.module.scss';
import PromoCode, { type Promo } from '../PromoCode';
import { addCartRemote } from '@/lib/api';
import { formatPrice, useCart, useCurrency } from '@/lib/store';
import { t } from '@/lib/i18n';

export default function CheckoutSummary() {
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const { currency, rates } = useCurrency();
  const [promo, setPromo] = useState<Promo | null>(null);
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0);
  const discount = promo ? subtotal * (promo.percent / 100) : 0;
  const shipping = subtotal === 0 || subtotal > 75 || promo?.code === 'FREESHIP' ? 0 : 6.99;
  const total = subtotal - discount + shipping;
  const fmt = (n: number) => formatPrice(n, currency, rates);

  async function checkout() {
    setPlacing(true);
    const order = await addCartRemote(1, lines.map((l) => ({ id: l.id, quantity: l.quantity })));
    setOrderId(order.id);
    clear();
    setPlacing(false);
  }

  if (orderId) {
    return (
      <aside className={styles.summary}>
        <p className={styles.title}>Order #{orderId} placed 🎉</p>
        <p className={styles.row}>A confirmation is on its way.</p>
      </aside>
    );
  }

  return (
    <aside className={styles.summary}>
      <p className={styles.title}>Order summary</p>
      <div className={styles.row}>
        <span>Subtotal</span>
        <span>{fmt(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className={`${styles.row} ${styles.discount}`}>
          <span>{promo?.label}</span>
          <span>−{fmt(discount)}</span>
        </div>
      )}
      <div className={styles.row}>
        <span>Shipping</span>
        <span>{shipping === 0 ? 'Free' : fmt(shipping)}</span>
      </div>
      <div className={`${styles.row} ${styles.total}`}>
        <span>Total</span>
        <span>{fmt(total)}</span>
      </div>
      <PromoCode onApply={setPromo} />
      <button className={styles.checkout} disabled={lines.length === 0 || placing} onClick={checkout}>
        {placing ? 'Placing order…' : t('cart.checkout')}
      </button>
    </aside>
  );
}
