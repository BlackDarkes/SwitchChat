"use client";

import { useLoginStore } from "@/features/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isAuth = useLoginStore((state) => state.isAuth);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await useLoginStore.getState().fetchUser();
      } catch (error) {
        console.error("Auth init error:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const publicRoutes = ["/login", "/register"];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (!isAuth) {
      if (!isPublicRoute) {
        if (pathname === "/login") {
          router.push("/login");
        }

        if (pathname === "/register") {
          router.push("/register");
        }
      }
    } else {
      if (isPublicRoute) {
        router.push("/");
      } else if (pathname === "/") {
        router.push("/");
      }
    }
  }, [isAuth, pathname, isInitialized, router]);

  return <>{children}</>;
};
