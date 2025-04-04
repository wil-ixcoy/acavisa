import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// changed
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.next();
  }

  const selectedCountryId = request.cookies.get("selectedCountryId")?.value;

  if (!selectedCountryId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [

    "/((?!api|_next/static|_next/image|favicon.ico|studio).*)",
  ],
};
