"use client";

import { IAuthUser } from "@/libs/auth/types";
import { useLoginStore } from "@/features/auth/model/login-store";
import { useEffect } from "react";

export function AuthProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: IAuthUser | undefined;
}) {
  const initialize = useLoginStore((state) => state.initialize);

  useEffect(() => {
    initialize(initialData);
  }, [initialData, initialize]);

  return <>{children}</>;
}
