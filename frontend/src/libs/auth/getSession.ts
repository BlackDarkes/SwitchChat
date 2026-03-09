import { cookies } from "next/headers";
import { IAuthUser } from "./types";

export async function getSession() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("refresh_token")?.value || null;

  if (!token) return null;

  try {
    const res = await fetch(`${process.env.API_URL}/user/me`, {
      "headers": {
        Cookie: `access_token=${token}`,
        "Content-Type": "application/json",
      },
      "cache": "no-store",
    })

    if (!res.ok) {
      return null;
    }

    const user: IAuthUser = await res.json();

    console.log("user", user)

    return { user };
  } catch {
    return null;
  }
}

export async function refreshSession() {
  const cookiesStore = await cookies();

  try {
    await fetch(`${process.env.API_URL}/auth/refresh`, {
      "headers": {
        Cookie: `refresh_token=${cookiesStore.get("refresh_token")?.value}`,
        "Content-Type": "application/json",
      },
      "cache": "no-store",
    });

    return true
  } catch {
    return false;
  }
}