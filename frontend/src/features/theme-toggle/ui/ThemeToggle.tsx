"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

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
