// app/layout.tsx
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/providers/client-providers";
import FloatingCTA from "@/components/ui/floating-cta";
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
    default: "MindFlow | Intelligent Task Manager",
    template: "%s | MindFlow",
  },
  description:
    "Bring your team's chaos to clarity. An intelligent AI-powered task manager that prioritizes, organizes, and automates your workflow.",
  keywords: [
    "SaaS",
    "Project Management",
    "Task Tracking",
    "AI Tasks",
    "Team Collaboration",
  ],
  authors: [{ name: "MindFlow Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mindflow.vercel.app",
    title: "MindFlow | Intelligent Task Manager",
    description:
      "Bring your team's chaos to clarity.",
    siteName: "MindFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "MindFlow",
    description: "Intelligent AI-powered task manager.",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
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
        <ClientProviders>
          {children}
          <FloatingCTA />
        </ClientProviders>
      </body>
    </html>
  );
}
