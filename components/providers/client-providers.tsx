"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { usePathname } from "next/navigation";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/forgot-password") ||
    pathname?.startsWith("/reset-password");

  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme={isAuthPage ? "light" : "system"}
        enableSystem={!isAuthPage}
        suppressHydrationWarning
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
