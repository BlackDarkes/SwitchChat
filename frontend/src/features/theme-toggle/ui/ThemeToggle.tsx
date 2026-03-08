/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLayoutEffect, useState } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useLayoutEffect(() => setIsMounted(true), []);

  if (!isMounted)
    return (
      <button
        type="button"
        className="fixed top-5 right-5"
        aria-hidden="true"
        disabled
      >
        <div className="w-6 h-6" />
      </button>
    );

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-5 right-5"
    >
      {theme === "dark" ? (
        <Sun suppressHydrationWarning />
      ) : (
        <Moon suppressHydrationWarning />
      )}
    </button>
  );
};
