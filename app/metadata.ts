import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nexus-nextjs.vercel.app";

export const metadata: Metadata = {
  title: "MindFlow - Modern Team Collaboration & Productivity Platform",
  description:
    "MindFlow is a production-ready SaaS platform for team collaboration. Streamline workflows, boost productivity, and transform how your team works together. Real-time sync, AI-powered task management, and seamless integrations.",
  keywords: [
    "SaaS",
    "team collaboration",
    "project management",
    "productivity",
    "workflow automation",
    "AI task management",
    "collaboration tools",
    "task management",
    "team dashboard",
    "MindFlow",
  ].join(", "),
  authors: [{ name: "Muideen7", url: "https://github.com/Muideen7" }],
  creator: "Muideen7",
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
    siteName: "MindFlow",
    title: "MindFlow - Modern Team Collaboration & Productivity Platform",
    description:
      "Production-ready SaaS platform with real-time sync, AI task management, and seamless integrations. Boost team productivity by 40%+",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "MindFlow Team Collaboration Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MindFlow - Team Collaboration & Productivity SaaS",
    description:
      "Modern team collaboration platform. Transform how your team works. Try free today.",
    creator: "@OlayeyeMuideen",
    images: [`${baseUrl}/og-image.png`],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MindFlow",
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
