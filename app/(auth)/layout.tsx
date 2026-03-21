import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login | MindFlow",
  description: "Sign in to your MindFlow account",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
