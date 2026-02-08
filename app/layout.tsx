import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nexus - Team Collaboration & Productivity SaaS",
  description:
    "Nexus is a modern SaaS platform for team collaboration. Streamline workflows, boost productivity, and transform how your team works together. Try free today.",
  keywords: [
    "SaaS",
    "team collaboration",
    "project management",
    "productivity",
    "workflow automation",
    "team productivity",
    "collaboration tools",
    "Nexus",
  ].join(", "),
  authors: [{ name: "FrontendGeek" }],
  creator: "FrontGeek",
  metadataBase: new URL("https://nexus.example.com"),
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexus.example.com",
    siteName: "Nexus",
    title: "Nexus - Team Collaboration & Productivity SaaS",
    description:
      "Modern team collaboration platform with real-time sync, enterprise security, and seamless integrations. Boost productivity by 40%+",
    images: [
      {
        url: "https://nexus.example.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexus Team Collaboration Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus - Team Collaboration & Productivity SaaS",
    description:
      "Modern team collaboration platform. Transform how your team works. Try free today.",
    creator: "@OlayeyeMuideen",
    images: ["https://nexus.example.com/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nexus",
  },
  formatDetection: {
    telephone: false,
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
        className={`${inter.variable} ${playfair.variable} font-sans bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
