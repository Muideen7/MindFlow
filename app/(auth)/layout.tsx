import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login | Nexus",
  description: "Sign in to your Nexus account",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
