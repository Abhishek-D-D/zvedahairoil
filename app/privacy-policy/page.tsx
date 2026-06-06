import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <p className="text-xs text-gold-luxury font-semibold uppercase tracking-widest">
              Last Updated: May 2026
            </p>

            <div className="space-y-6 text-sm leading-relaxed">
              <p>
                At Zveda Oils, accessible from Zvedahairoil.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Zveda Oils and how we use it.
              </p>

              <h2 className="text-xl font-bold text-cream-white mt-8">Information We Collect</h2>
              <p>
                When you place an order, we collect shipping details including your full name, phone number, email address, physical shipping address, and postal code. We use this information solely to process shipments, deliver items, and send order updates.
              </p>

              <h2 className="text-xl font-bold text-cream-white mt-8">Payment Security</h2>
              <p>
                All online transactions are securely handled through the Razorpay payment gateway. Zveda Oils does not store, record, or view your credit card details, net banking passwords, or UPI credentials.
              </p>

              <h2 className="text-xl font-bold text-cream-white mt-8">Cookies and Tracking</h2>
              <p>
                We use cookies to enhance your browsing experience, analyze site performance, and remember items in your cart. You can choose to disable cookies through your individual browser options.
              </p>
            </div>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </>
  );
}
