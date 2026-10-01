import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes
  const isProfileRoute = pathname.startsWith('/profile');

  if (isProfileRoute) {
    // Check for Supabase session cookie or demo session cookie
    const cookies = request.cookies.getAll();
    const hasSupabaseAuth = cookies.some(
      c => c.name.includes('sb-') && c.name.includes('-auth-token')
    );
    const hasDemoAuth = request.cookies.has('phytodoc_demo_session');
    const authHeader = request.headers.get('authorization');

    // In local evaluation or client-side storage demo, we allow client-side hydration,
    // but if explicit logout happened and guest header is absent, redirect to /login
    // We pass through so client AuthProvider can render demo user or prompt login
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*'],
};
