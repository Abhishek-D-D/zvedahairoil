import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/sections/Testimonials";

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 pb-20 bg-primary-bg min-h-screen relative z-10 text-muted-text">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-luxury hover:text-cream-white transition-colors mb-8"
          >
            ← Back to Ritual
          </Link>
        </div>
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
