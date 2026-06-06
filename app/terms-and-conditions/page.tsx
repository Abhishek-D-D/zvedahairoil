import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";

export default function TermsAndConditions() {
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

          <GlassCard className="border border-gold-luxury/10 p-8 md:p-12 space-y-6" hoverEffect={false}>
            <h1 className="text-3xl md:text-4xl font-bold text-cream-white font-heading">
              Terms & Conditions
            </h1>
            <p className="text-xs text-gold-luxury font-semibold uppercase tracking-widest">
              Effective Date: May 2026
            </p>

            <div className="space-y-6 text-sm leading-relaxed">
              <p>
                Welcome to Zveda Oils. These terms and conditions outline the rules and regulations for the use of Zveda Oils' Website. By accessing this website and purchasing our products, we assume you accept these terms and conditions.
              </p>

              <h2 className="text-xl font-bold text-cream-white mt-8">Delivery Timelines</h2>
              <p>
                Orders are processed and dispatched within 24-48 working hours. Standard express shipping across India typically takes between 3 to 7 working days, depending on the recipient location. Shipping is provided free of charge for both online payments and Cash on Delivery.
              </p>

              <h2 className="text-xl font-bold text-cream-white mt-8">Returns & Cancellations</h2>
              <p>
                Due to the cosmetic and organic nature of Ayurvedic hair care oils, we do not accept returns of opened or used bottles. Orders can be cancelled prior to dispatch by contacting us via email or WhatsApp.
              </p>

              <h2 className="text-xl font-bold text-cream-white mt-8">Medical Disclaimer</h2>
              <p>
                While Zveda Hair Oil is crafted with 100% natural, safe Ayurvedic herbs, individual results may vary. It is not intended to diagnose, treat, or cure specific chronic medical scalp diseases. We recommend doing a patch test before regular use to ensure no herbal allergies occur.
              </p>
            </div>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </>
  );
}
