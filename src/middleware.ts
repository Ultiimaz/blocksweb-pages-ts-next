import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/admin/sign-in" ||
    request.nextUrl.pathname === "/admin/sign-up"
  ) {
    return NextResponse.next();
  }

  const session = request.cookies.get("session");

  if (!session) {
    return NextResponse.redirect(new URL("./sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
