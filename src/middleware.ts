import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/admin/sign-in" ||
    request.nextUrl.pathname === "/admin/sign-up"
  ) {
    return NextResponse.next();
  }
  console.log(request.nextUrl.pathname);

  const session = request.cookies.get("session");

  if (!session) {
    return NextResponse.redirect(new URL("./sign-in", request.url));
  }

  console.log("session: ", session.value);
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
