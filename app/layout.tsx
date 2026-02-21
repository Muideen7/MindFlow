import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/providers/client-providers";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"],
});

// NOW YOU CAN ADD YOUR LOGO METADATA HERE
export const metadata: Metadata = {
  metadataBase: new URL("https://nexus-nextjs.vercel.app"),
  title: "Nexus",
  openGraph: {
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
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
        className={`${inter.variable} ${playfair.variable} font-sans bg-light-bg dark:bg-dark-bg transition-colors duration-300`}
      >
        <ClientProviders>
          <main>{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
