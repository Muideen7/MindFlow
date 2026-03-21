import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

