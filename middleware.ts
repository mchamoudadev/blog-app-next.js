import { NextRequest, NextResponse } from "next/server";

// Define route groups
const AUTH_ROUTES = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Only handle auth routes
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
  if (!isAuthRoute) return NextResponse.next();
  
  // Get tokens
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const hasValidTokens = Boolean(accessToken || refreshToken);

  // If on auth routes and has tokens, redirect to dashboard
  if (hasValidTokens) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Only run middleware on auth routes
export const config = {
  matcher: [
    '/login',
    '/register',
  ],
};