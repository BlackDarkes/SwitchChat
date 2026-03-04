"use client";

import { ReactNode } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

interface IThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="light">
      {children}
    </NextThemeProvider>
  );
};
