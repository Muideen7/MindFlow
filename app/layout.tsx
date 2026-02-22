// app/layout.tsx
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/providers/client-providers";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexus-nextjs.vercel.app"),
  title: {
    default: "Nexus | Unified Team Collaboration",
    template: "%s | Nexus",
  },
  description:
    "The all-in-one SaaS platform for elite teams to track tasks, manage complex projects, and monitor revenue growth in real-time.",
  keywords: [
    "SaaS",
    "Project Management",
    "Task Tracking",
    "Revenue Analytics",
    "Team Collaboration",
  ],
  authors: [{ name: "Nexus Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexus-nextjs.vercel.app",
    title: "Nexus | Streamline Your Team Workflow",
    description:
      "Track tasks, projects, and revenue with military-grade precision.",
    siteName: "Nexus",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus",
    description: "Unified collaboration for modern teams.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-[hsl(var(--background))] text-[hsl(var(--foreground))] antialiased transition-colors duration-300`}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
