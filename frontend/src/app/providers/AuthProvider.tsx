"use client";

import { useLoginStore } from "@/features/auth/model/login-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const hasRun = useRef(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const initialize = async () => {
      const store = useLoginStore.getState();

      await store.fetchUser();

      const { isAuth } = useLoginStore.getState();

      if (isAuth) {
        if (pathname !== "/login" && pathname !== "/register") {
          router.push(pathname);
        }
      } else {
        if (pathname !== '/login') {
          router.push('/login');
        }
      }
    };

    initialize();
  }, []);

  return <>{children}</>;
}
