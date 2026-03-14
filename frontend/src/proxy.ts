import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const normalizedPath = pathname.replace(/\/$/, "");
  
  const token = request.cookies.get("access_token")?.value;
  
  const isAuthPage = normalizedPath === "/login" || normalizedPath === "/register";

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/chats", request.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};