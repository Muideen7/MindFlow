import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nexus.vercel.app";

export const metadata: Metadata = {
  title: "Nexus - Modern Team Collaboration & Productivity Platform",
  description:
    "Nexus is a production-ready SaaS platform for team collaboration. Streamline workflows, boost productivity, and transform how your team works together. Real-time sync, enterprise security, and seamless integrations.",
  keywords: [
    "SaaS",
    "team collaboration",
    "project management",
    "productivity",
    "workflow automation",
    "team productivity",
    "collaboration tools",
    "task management",
    "team dashboard",
    "Nexus",
  ].join(", "),
  authors: [{ name: "FrontendGeek", url: "https://github.com/Muideen7" }],
  creator: "FrontendGeek",
  metadataBase: new URL(baseUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Nexus",
    title: "Nexus - Modern Team Collaboration & Productivity Platform",
    description:
      "Production-ready SaaS platform with real-time sync, enterprise security, and seamless integrations. Boost team productivity by 40%+",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Nexus Team Collaboration Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus - Team Collaboration & Productivity SaaS",
    description:
      "Modern team collaboration platform. Transform how your team works. Try free today.",
    creator: "@OlayeyeMuideen",
    images: [`${baseUrl}/og-image.png`],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nexus",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
