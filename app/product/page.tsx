"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import GlassCard from "@/components/GlassCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { useAuthContext } from "@/providers/AuthProvider";
import { Star, Shield, Truck, RefreshCw, Plus, Minus, ArrowRight, Check, Sparkles } from "lucide-react";

// ─── Structured data: Product (Phase 10) ──────────────────────────────────────
const productJsonLd = {
  "@context": "https://schema.org",
  "@type":    "Product",
  name:       "Zveda Hair Oil — 200ml",
  description:
    "Premium Ayurvedic hair oil handcrafted through the traditional Taila Paka Vidhi ritual. Stops hair fall, strengthens roots, promotes thick natural growth with 20+ botanicals like Jatamansi, Vetiver, Brahmi, and Amla — slow-cooked in copper vessels for 12 hours.",
  image: [
    "https://zvedaoils.com/img/ert-v2.png",
    "https://zvedaoils.com/img/zvedaoils2-v2.png",
    "https://zvedaoils.com/img/zveda33-v2.png",
  ],
  brand: {
    "@type": "Brand",
    name:    "Zveda Oils",
  },
  category: "Hair Care / Ayurvedic Oil",
  offers: {
    "@type":         "Offer",
    url:             "https://zvedaoils.com/checkout",
    priceCurrency:   "INR",
    price:           "499",
    availability:    "https://schema.org/InStock",
    itemCondition:   "https://schema.org/NewCondition",
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" },
      shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "INR" },
    },
  },
  aggregateRating: {
    "@type":     "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1200",
    bestRating:  "5",
    worstRating: "1",
  },
};

export default function ProductPage() {
  const { user } = useAuthContext();
  const checkoutHref = user ? "/checkout" : "/login?redirect=/checkout";
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"usage" | "ingredients" | "benefits">("benefits");

  const images = [
    "/img/ert-v2.png",
    "/img/zvedaoils2-v2.png",
    "/img/zveda33-v2.png",
  ];

  const handleQtyChange = (val: number) => {
    const nextVal = quantity + val;
    if (nextVal >= 1) setQuantity(nextVal);
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <Navbar />
      <main className="flex-grow pt-28 pb-20 bg-primary-bg min-h-screen relative z-10 text-muted-text">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-luxury hover:text-cream-white transition-colors mb-8"
            >
              ← Back to Ritual
            </Link>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Gallery Column (lg: 6) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="lg:col-span-6 space-y-6"
            >
              {/* Main Image View */}
              <div className="relative aspect-[4/5] w-full rounded-2xl border border-gold-luxury/10 overflow-hidden bg-herbal-deep/20 flex items-center justify-center p-8">
                <Image
                  src={images[selectedImage]}
                  alt="Zveda Hair Oil Bottle Gallery"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6 hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="gold">Best Seller</Badge>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-[4/5] rounded-xl overflow-hidden bg-herbal-deep/10 border p-2 transition-all duration-300 ${
                      selectedImage === idx ? "border-gold-luxury bg-herbal-deep/30" : "border-gold-luxury/10 hover:border-gold-luxury/30"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Zveda Thumbnail ${idx + 1}`}
                      fill
                      sizes="150px"
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Config & Buy Panel Column (lg: 6) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="lg:col-span-6 space-y-8"
            >
              {/* Product Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-gold-luxury">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-text font-semibold uppercase tracking-wider">
                    4.9 rating (42 reviews) | 500+ Bottles Handcrafted & Sold
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-cream-white">
                  Zveda Ayurvedic Hair Oil
                </h1>
                <p className="text-sm uppercase tracking-widest text-gold-luxury font-semibold">
                  200ml Premium Bottle
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-4 pt-2">
                  <span className="text-3xl font-bold text-cream-white">₹499</span>
                  <span className="text-lg text-muted-text line-through">₹963</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-green-500 bg-green-500/10 px-2.5 py-1 rounded">
                    Save 48%
                  </span>
                </div>
              </div>

              <hr className="border-gold-luxury/10" />

              {/* Pitch */}
              <p className="text-muted-text text-sm md:text-base leading-relaxed">
                Handcrafted using the ancient <strong>Taila Paka Vidhi</strong> process. Cooked in copper vessels on a open wood fire for over 12 hours, allowing 20+ Ayurvedic herbs like Jatamansi, Vetiver, Brahmi, and Amla to lock their pure botanical nutrition directly into your base oils.
              </p>

              {/* Quantity Selector & Buy Trigger */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center border border-gold-luxury/20 rounded-full overflow-hidden bg-herbal-deep/20 h-[52px]">
                    <button
                      onClick={() => handleQtyChange(-1)}
                      aria-label="Decrease quantity"
                      className="px-4 text-cream-white hover:text-gold-luxury transition-colors focus:outline-none"
                    >
                      <Minus size={16} aria-hidden="true" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-cream-white">{quantity}</span>
                    <button
                      onClick={() => handleQtyChange(1)}
                      aria-label="Increase quantity"
                      className="px-4 text-cream-white hover:text-gold-luxury transition-colors focus:outline-none"
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </div>

                  <Button href={checkoutHref} variant="gold" className="w-full sm:flex-grow h-[52px] !py-0 flex items-center justify-center">
                    Purchase Oil <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>

                {/* Social Proof trust notice */}
                <div className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gold-luxury/5 border border-gold-luxury/15 rounded-xl text-center">
                  <Sparkles size={13} className="text-gold-luxury animate-pulse shrink-0" />
                  <span className="text-[10px] sm:text-xs font-semibold text-gold-luxury uppercase tracking-wider">
                    ⚡ Over 500+ bottles hand-brewed & delivered this season
                  </span>
                </div>
              </div>

              {/* Micro Trust badges */}
              <div className="grid grid-cols-3 gap-4 pt-2 text-center">
                <div className="flex flex-col items-center p-3 rounded-xl bg-herbal-deep/10 border border-gold-luxury/5">
                  <Truck size={18} className="text-gold-luxury mb-1" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cream-white font-semibold">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl bg-herbal-deep/10 border border-gold-luxury/5">
                  <Shield size={18} className="text-gold-luxury mb-1" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cream-white font-semibold">100% Genuine</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl bg-herbal-deep/10 border border-gold-luxury/5">
                  <RefreshCw size={18} className="text-gold-luxury mb-1" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cream-white font-semibold">COD Available</span>
                </div>
              </div>

              {/* Informative Tab Panel Details */}
              <div className="border border-gold-luxury/15 rounded-2xl overflow-hidden bg-herbal-deep/10">
                <div className="flex border-b border-gold-luxury/10">
                  {(["benefits", "ingredients", "usage"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-4 text-xs uppercase tracking-widest font-bold border-b-2 focus:outline-none transition-colors ${
                        activeTab === tab
                          ? "border-gold-luxury text-gold-luxury bg-herbal-deep/20"
                          : "border-transparent text-muted-text hover:text-cream-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-6 text-sm text-muted-text leading-relaxed min-h-[140px] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === "benefits" && (
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Check size={16} className="text-gold-luxury mt-0.5 flex-shrink-0" />
                            <span>Significantly reduces excessive hair fall and shedding in 2-3 weeks.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={16} className="text-gold-luxury mt-0.5 flex-shrink-0" />
                            <span>Stimulates dormant follicles to kickstart new healthy hair regrowth.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={16} className="text-gold-luxury mt-0.5 flex-shrink-0" />
                            <span>Purifies and detoxifies the scalp to naturally eliminate dry dandruff flakes.</span>
                          </li>
                        </ul>
                      )}

                      {activeTab === "ingredients" && (
                        <p>
                          Coconut Oil (35%), Almond Oil (10%), Sesame Oil (10%), Jojoba Oil (8%), Ashwagandha Oil (7%), Castor Oil (5%), Hibiscus Oil (5%), Neem Oil (3%), Argan Oil (2%), Rosemary Oil (2%), Tea Tree Oil (1%), and organic roots/leaves (Jatamansi, Vetiver, Anantmool, Brahmi, Amla, Liquorice).
                        </p>
                      )}

                      {activeTab === "usage" && (
                        <ol className="space-y-2 list-decimal list-inside">
                          <li>Apply 1-2 palm-sized amounts directly onto dry scalp and hair.</li>
                          <li>Massage thoroughly using fingertips for 5-10 minutes.</li>
                          <li>Leave on for a minimum of 2 hours, or overnight for deep hair root saturation.</li>
                          <li>Wash out using a mild, chemical-free shampoo. Repeat 3 times weekly.</li>
                        </ol>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />

      {/* Mobile Sticky Buy Button banner */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-primary-bg/95 border-t border-gold-luxury/20 backdrop-blur p-4 flex items-center justify-between gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
      >
        <div>
          <span className="text-[10px] uppercase font-bold text-muted-text">Zveda 200ml</span>
          <p className="text-lg font-bold text-cream-white">₹499 <span className="text-xs text-muted-text line-through font-normal">₹963</span></p>
        </div>
        <Button href={checkoutHref} variant="gold" className="!px-6 !py-3 flex-grow text-center text-sm font-semibold justify-center">
          Buy Now
        </Button>
      </motion.div>
    </>
  );
}
