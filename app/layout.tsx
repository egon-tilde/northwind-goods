import type { Metadata } from 'next';
import Sourcepeek from 'sourcepeek/react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Northwind Goods',
  description: 'Shop everyday goods.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <Footer />
        <Sourcepeek />
      </body>
    </html>
  );
}
