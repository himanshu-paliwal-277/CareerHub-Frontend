// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const protectedPaths = ["/companies", "/applications", "/", "/dashboard"];
  const pathname = request.nextUrl.pathname;

  if (protectedPaths.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/companies", "/applications", "/", "/dashboard"], // protected routes
};
