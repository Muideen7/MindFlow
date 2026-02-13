import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import BackToTop from "@/components/back-to-top";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
      <BackToTop />
    </>
  );
}
