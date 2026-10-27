import { NextResponse } from 'next/server';

const CODES: Record<string, { percent: number; label: string }> = {
  WELCOME10: { percent: 10, label: '10% off your first order' },
  FREESHIP: { percent: 0, label: 'Free shipping' },
};

export async function GET(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const promo = CODES[code.toUpperCase()];
  if (!promo) return NextResponse.json({ error: 'PROMO_NOT_FOUND', message: `Code "${code}" is not valid` }, { status: 404 });
  return NextResponse.json({ code: code.toUpperCase(), ...promo });
}
