"use client"

import { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./AuthProvider";
import { SocketContextProvider } from "@/shared/lib/socket";

export const AppProviders = ({children}: { children: ReactNode }) => {
  const apiUrl = process.env.API_URL;

  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <SocketContextProvider apiUrl={apiUrl || ""}>
            { children }
          </SocketContextProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}