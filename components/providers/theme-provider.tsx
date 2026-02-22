"use client";

import {
  ThemeProvider as NextThemesProvider,
  type Attribute,
} from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: Attribute | Attribute[];
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean; // Keep this here
  storageKey?: string;
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false, // Add this here to "catch" the prop
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute as any}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      // Pass the prop through here
      disableTransitionOnChange={disableTransitionOnChange}
      storageKey="nexus-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
