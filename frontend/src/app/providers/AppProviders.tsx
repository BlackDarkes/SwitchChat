"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { SocketContextProvider } from "@/shared/lib/socket";
import { ThemeProvider } from "./ThemeProvider";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const apiUrl = process.env.API_URL;

  return (
    <QueryProvider>
      <AuthProvider>
        <SocketContextProvider apiUrl={apiUrl || ""}>
          <ThemeProvider>{children}</ThemeProvider>
        </SocketContextProvider>
      </AuthProvider>
    </QueryProvider>
  );
};
