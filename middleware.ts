import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 1. Get all cookies and find any that start with 'sb-'
  // Supabase stores the auth session in a cookie with the project ID
  const allCookies = request.cookies.getAll();
  const hasSession = allCookies.some(cookie => cookie.name.startsWith('sb-'));

  // 2. Define your protected paths
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  // 3. Logic: If trying to access dashboard without a session, redirect to login
  if (isDashboardRoute && !hasSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 4. If logged in and trying to access the login page, redirect to dashboard
  if (request.nextUrl.pathname === '/' && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Ensure middleware only runs on necessary paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};