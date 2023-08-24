import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Redirecting
export function middleware(request: NextRequest) {
  // Get the path from the request
  const path = request.nextUrl.pathname;

  // Check if the path is public
  const isPublicPath = path === "/login" || path === "/signup";

  // Get the token from the cookie or set to empty string
  const token = request.cookies.get("token")?.value || "";

  // Check if the path is public and user has a token
  if (isPublicPath && token) {
    // Redirect to the home page
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Check if the path is private and user has no token
  if (!isPublicPath && !token) {
    // Redirect to the login page
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// Matching Paths
export const config = {
  matcher: ["/", "/profile", "/profile/:path*", "/login", "/signup"],
};
