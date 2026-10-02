import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateAdminSession } from './lib/admin-auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (excluding login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const isValid = await validateAdminSession(request);
    
    if (!isValid) {
      // Redirect to login if unauthenticated
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect /api/admin routes (excluding login)
  if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/login') {
    const isValid = await validateAdminSession(request);
    
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
