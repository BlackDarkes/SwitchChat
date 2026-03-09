// libs/auth/getSession.ts
import { cookies } from "next/headers";
import { IAuthUser } from "./types";

function extractNewAccessToken(setCookieHeader: string | null): string | null {
  if (!setCookieHeader) return null;
  const cookieStrings = setCookieHeader.split(/,(?=\s*[^;=]+=[^;]+)/);
  for (const cookieStr of cookieStrings) {
    const match = cookieStr.match(/access_token=([^;\s]+)/);
    if (match?.[1]) return match[1].trim();
  }
  return null;
}

export async function getSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken && !refreshToken) return null;

  try {
    const res = await fetch(`${process.env.API_URL}/user/me`, {
      headers: {
        Cookie: accessToken ? `access_token=${accessToken}` : "",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (res.status === 401 && refreshToken) {
      const refreshRes = await fetch("http://localhost:3000/api/auth/refresh", {
        method: "POST",
        headers: { Cookie: `refresh_token=${refreshToken}` },
        cache: "no-store",
      });

      if (!refreshRes.ok) return null;

      const setCookie = refreshRes.headers.get("set-cookie");
      const newAccessToken = extractNewAccessToken(setCookie);
      if (!newAccessToken) return null;

      const retryRes = await fetch(`${process.env.API_URL}/user/me`, {
        headers: { Cookie: `access_token=${newAccessToken}`, "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (!retryRes.ok) return null;
      const data = await retryRes.json();
      return { user: data.user };
    }

    if (!res.ok) return null;
    const data = await res.json();
    return { user: data.user };
  } catch {
    return null;
  }
}