import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/admin/sign-in" ||
    request.nextUrl.pathname === "/admin/sign-up" ||
    request.nextUrl.pathname === "/admin/check"
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
