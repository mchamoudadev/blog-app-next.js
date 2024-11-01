import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const authPages = ["/login", "/register"];
    const isAuthPage = authPages.some(page => request.nextUrl.pathname.startsWith(page));
  
    // Check both access_token and refresh_token
    const hasTokens = request.cookies.has('access_token') || request.cookies.has('refresh_token');
  
    // Prevent redirect loops by checking the current URL
    if (isAuthPage && hasTokens) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  
    if (!isAuthPage && !hasTokens) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  
    return NextResponse.next();
}

// Add config to specify which paths to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};