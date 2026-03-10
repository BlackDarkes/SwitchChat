"use client";

import { useLoginStore } from "@/features/auth/model/login-store";
import { useEffect, useRef } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const store = useLoginStore.getState();
    
    if (store.isAuth) return;

    store.fetchUser()
  }, []); 

  return <>{children}</>;
}