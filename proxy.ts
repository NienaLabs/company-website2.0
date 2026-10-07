import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateAdminSession } from './lib/admin-auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /employees routes (excluding login)
  if (pathname.startsWith('/employees') && pathname !== '/employees/login') {
    const isValid = await validateAdminSession(request);
    
    if (!isValid) {
      // Redirect to login if unauthenticated
      const loginUrl = new URL('/employees/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect /api/employees routes (excluding login)
  if (pathname.startsWith('/api/employees') && pathname !== '/api/employees/login') {
    const isValid = await validateAdminSession(request);
    
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/employees/:path*', '/api/employees/:path*'],
};
