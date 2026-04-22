"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { SocketContextProvider } from "@/shared/lib/socket";
import { ThemeProvider } from "./ThemeProvider";
import { ENV } from "@/shared/config/env";
import { ModalProvider } from "./ModalProvider";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const apiUrl = ENV.api_url;

  return (
    <QueryProvider>
      <AuthProvider>
        <SocketContextProvider apiUrl={apiUrl || ""}>
          <ModalProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ModalProvider>
        </SocketContextProvider>
      </AuthProvider>
    </QueryProvider>
  );
};
