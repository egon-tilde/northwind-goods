import Link from 'next/link';
import styles from './Header.module.css';
import CurrencySwitcher from '../CurrencySwitcher';
import CartBadge from '../CartBadge';
import SearchBox from '../SearchBox';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Northwind Goods
        </Link>
        <SearchBox />
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Shop
          </Link>
          <Link href="/account" className={styles.navLink}>
            Account
          </Link>
          <Link href="/lab" className={styles.navLink}>
            Test lab
          </Link>
          <Link href="/cart" className={styles.navLink}>
            Cart
            <CartBadge className={styles.cartBadge} />
          </Link>
        </nav>
        <CurrencySwitcher />
      </div>
    </header>
  );
}
