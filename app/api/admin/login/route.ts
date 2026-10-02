import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionSecret = process.env.ADMIN_SESSION_SECRET;

    if (!adminPassword || !sessionSecret) {
      return NextResponse.json(
        { error: 'Admin configuration missing on server.' },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid password.' },
        { status: 401 }
      );
    }

    // Generate a simple session token using Web Crypto API
    const timestamp = Date.now().toString();
    const encoder = new TextEncoder();
    const keyData = encoder.encode(sessionSecret);
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const messageData = encoder.encode(timestamp);
    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    
    // Convert ArrayBuffer to Hex String
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const token = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Combine timestamp and token
    const sessionValue = `${timestamp}.${token}`;

    const cookieStore = await cookies();
    cookieStore.set('admin_session', sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred during login.' },
      { status: 500 }
    );
  }
}

