import { NextResponse } from 'next/server';

type ServerCart = {
  id: string;
  items: { productId: number; title: string; quantity: number; unitPrice: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  updatedAt: string;
};

let cart: ServerCart = { id: 'cart_demo', items: [], subtotal: 0, shipping: 0, total: 0, updatedAt: new Date().toISOString() };

function recompute(items: ServerCart['items']): ServerCart {
  const subtotal = +items.reduce((s, i) => s + i.unitPrice * i.quantity, 0).toFixed(2);
  const shipping = subtotal === 0 || subtotal > 75 ? 0 : 6.99;
  return { ...cart, items, subtotal, shipping, total: +(subtotal + shipping).toFixed(2), updatedAt: new Date().toISOString() };
}

export async function GET() {
  return NextResponse.json(cart);
}

export async function POST(req: Request) {
  const body = (await req.json()) as { items: ServerCart['items'] };
  cart = recompute(body.items ?? []);
  return NextResponse.json(cart);
}

export async function DELETE() {
  cart = recompute([]);
  return NextResponse.json(cart);
}
