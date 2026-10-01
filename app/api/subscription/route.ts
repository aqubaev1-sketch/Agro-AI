import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId, planName, price } = body;

    if (!planId) {
      return NextResponse.json({ error: 'Не указан идентификатор тарифа' }, { status: 400 });
    }

    // In a production app, here you would:
    // 1. Verify user session via Supabase Auth
    // 2. Create a Stripe/YooKassa Checkout Session
    // 3. Update the user's subscription in Supabase database

    return NextResponse.json({
      success: true,
      message: `Тарифный план "${planName || planId.toUpperCase()}" успешно активирован в тестовом режиме!`,
      planId,
      price: price || 0,
      activatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  } catch (error) {
    console.error('Ошибка в /api/subscription:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера при оформлении подписки' },
      { status: 500 }
    );
  }
}
