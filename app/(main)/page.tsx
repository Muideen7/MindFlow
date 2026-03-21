import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Pricing from "@/components/sections/testimonials";
import BentoGrid from "@/components/sections/bento-grid";
import Contact from "@/components/sections/cta";
import DownloadApp from "@/components/sections/download-app";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <BentoGrid />
      <Pricing />
      <DownloadApp />
      <Contact />
    </>
  );
}
