"use client";

import { useLoginStore } from "@/features/auth/model/login-store";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const hasRun = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const initialize = async () => {
      const store = useLoginStore.getState();

      const isOk = await store.fetchUser();

      if (store.isAuth) {
        return router.push("/");
      }

      if (isOk) {
        return router.push("/");
      }

      if (store.isAuth) {
        return router.push("/");
      }
    };

    initialize();
  }, []);

  return <>{children}</>;
}
