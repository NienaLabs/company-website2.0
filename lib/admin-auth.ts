import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Validates the admin session cookie.
 * Returns true if valid, false otherwise.
 * Uses Web Crypto API for Edge runtime compatibility.
 */
export async function validateAdminSession(req?: NextRequest): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!adminPassword || !sessionSecret) {
    return false;
  }

  // Get cookie either from NextRequest (middleware/API) or cookies() (Server Component)
  let sessionCookie;
  if (req) {
    sessionCookie = req.cookies.get('admin_session')?.value;
  } else {
    const cookieStore = await cookies();
    sessionCookie = cookieStore.get('admin_session')?.value;
  }

  if (!sessionCookie) return false;

  const [timestamp, token] = sessionCookie.split('.');
  if (!timestamp || !token) return false;

  // Check if expired (24 hours)
  const age = Date.now() - parseInt(timestamp, 10);
  if (age > 24 * 60 * 60 * 1000) return false;

  try {
    // Convert secret string to key
    const encoder = new TextEncoder();
    const keyData = encoder.encode(sessionSecret);
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign', 'verify']
    );

    // Re-calculate expected token
    const messageData = encoder.encode(timestamp);
    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    
    // Convert ArrayBuffer to Hex String
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const expectedToken = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Constant time comparison string check is not strictly needed for the hex token if we just
    // use a standard equality check, but we can do a simple check.
    // For timing safe, we can just check if lengths match and chars match.
    if (token.length !== expectedToken.length) return false;
    let mismatch = 0;
    for (let i = 0; i < token.length; ++i) {
      mismatch |= (token.charCodeAt(i) ^ expectedToken.charCodeAt(i));
    }
    
    return mismatch === 0;
  } catch (error) {
    return false;
  }
}

