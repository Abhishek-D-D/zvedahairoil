import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import TrustStrip from "@/sections/TrustStrip";
import HairProblems from "@/sections/HairProblems";
import LazyLandingSections from "@/components/landing/LazyLandingSections";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Above-the-fold — eager */}
        <Hero />
        <TrustStrip />
        <HairProblems />

        {/* Below-the-fold — code-split via next/dynamic (SSR preserved for SEO) */}
        <LazyLandingSections />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
