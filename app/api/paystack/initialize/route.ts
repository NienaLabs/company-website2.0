import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, amount, courseId, firstName, lastName, phone } = body;

    if (!email || !amount) {
      return NextResponse.json({ error: 'Email and amount are required' }, { status: 400 });
    }

    // Amount should be in kobo (multiply by 100)
    const amountInKobo = Math.round(amount * 100);

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    
    if (!secretKey) {
      console.error('PAYSTACK_SECRET_KEY is not set');
      return NextResponse.json({ error: 'Payment gateway configuration error' }, { status: 500 });
    }

    // Determine the base URL for the callback
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const callbackUrl = `${protocol}://${host}/bootcamp/checkout/verify`;

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amountInKobo,
        callback_url: callbackUrl,
        metadata: {
          courseId,
          firstName,
          lastName,
          phone,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Paystack initialization error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to initialize transaction' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
