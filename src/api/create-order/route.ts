
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { randomBytes } from 'crypto';

// Server-side price mapping to prevent client-side tampering
const planPrices: Record<string, number> = {
    'lifetime': 29,
    'payg': 19,
};

export async function POST(request: Request) {
  const { plan } = await request.json();

  if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: 'Razorpay API keys are not configured.' }, { status: 500 });
  }

  const amount = planPrices[plan];

  if (!amount) {
    return NextResponse.json({ error: 'Invalid plan selected.' }, { status: 400 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "USD",
    receipt: `receipt_order_${randomBytes(10).toString('hex')}`,
    notes: {
        plan: plan,
    }
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json({ error: 'Failed to create Razorpay order.' }, { status: 500 });
  }
}
