import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const authPages = ["/login", "/register"];
    const isAuthPage = authPages.some(page => request.nextUrl.pathname.startsWith(page));
  
    // Check if tokens exist and have actual values
    const accessToken = request.cookies.get('access_token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;
    const hasValidTokens = Boolean(accessToken || refreshToken);
  
    // Prevent redirect loops by checking the current URL
    if (isAuthPage && hasValidTokens) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  
    if (!isAuthPage && !hasValidTokens) {
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