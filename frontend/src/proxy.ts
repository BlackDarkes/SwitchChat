import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const normalizedPath = pathname.replace(/\/$/, "");

  const token = request.cookies.get("access_token")?.value;

  const isAuthPage =
    normalizedPath === "/login" || normalizedPath === "/register";

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    const refreshRes = await fetch(`${process.env.API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!refreshRes.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const response = NextResponse.next();
    refreshRes.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        response.headers.append("set-cookie", value);
      }
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
