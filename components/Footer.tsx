import Link from 'next/link';
import Newsletter from './Newsletter';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h2 className="text-lg font-semibold text-white">Northwind Goods</h2>
          <p className="mt-2 text-sm">Demo store powered by DummyJSON, Frankfurter, Random User and Open-Meteo.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Help</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link href="/lab">Shipping</Link>
            </li>
            <li>
              <Link href="/lab">Returns</Link>
            </li>
            <li>
              <a href="#">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <Newsletter />
      </div>
    </footer>
  );
}
