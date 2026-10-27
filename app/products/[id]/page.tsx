import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/api';
import ProductGallery from '@/components/ProductGallery';
import AddToCart from '@/components/AddToCart';
import Reviews from '@/components/Reviews';
import ReviewDraft from '@/components/ReviewDraft';
import DeliveryEstimate from '@/components/DeliveryEstimate';
import TrackView from '@/components/TrackView';
import Price from '@/components/Price';
import { t } from '@/lib/i18n';

const SITE = 'http://localhost:3000';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);
  if (!product) return { title: 'Product not found' };
  return {
    title: `${product.title} · Northwind Goods`,
    description: product.description.slice(0, 155),
    alternates: { canonical: `${SITE}/products/${product.id}` },
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 155),
      images: [product.thumbnail],
      url: `${SITE}/products/${product.id}`,
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);
  if (!product) notFound();

  return (
    <article className="grid gap-10 md:grid-cols-2">
      <TrackView product={product} />
      <ProductGallery images={product.images} title={product.title} />
      <div>
        <p className="text-sm uppercase tracking-wide text-teal-700">{product.category}</p>
        <h1 className="mt-1 text-3xl font-bold">{product.title}</h1>
        <p className="mt-1 text-sm text-stone-500">
          {product.brand ?? 'Unbranded'} · ★ {product.rating.toFixed(1)}
        </p>
        <Price usd={product.price} discount={product.discountPercentage} />
        <p className="mt-4 leading-relaxed text-stone-700">{product.description}</p>
        <p className="mt-3 text-sm">{product.stock > 0 ? t('product.inStock', { count: product.stock }) : t('product.outOfStock')}</p>
        <AddToCart product={product} />
        <DeliveryEstimate />
      </div>
      <section className="md:col-span-2">
        <h2 className="text-xl font-semibold">{t('product.reviews')}</h2>
        <Reviews productId={product.id} />
        <ReviewDraft productId={product.id} />
      </section>
    </article>
  );
}
