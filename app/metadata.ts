import type { Metadata } from "next";

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
