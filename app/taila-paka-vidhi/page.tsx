"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Badge from "@/components/Badge";
import GlassCard from "@/components/GlassCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ingredients } from "@/data/ingredients";

type FilterType = "all" | "growth" | "strength" | "scalp";

export default function TailaPakaPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const categories = [
    { key: "all", label: "All Ingredients" },
    { key: "growth", label: "Hair Growth" },
    { key: "strength", label: "Strength & Nourishment" },
    { key: "scalp", label: "Scalp Health" },
  ];

  const filteredIngredients =
    filter === "all"
      ? ingredients
      : ingredients.filter((ing) => ing.category === filter);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 pb-20 bg-primary-bg min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-luxury hover:text-cream-white transition-colors mb-8"
          >
            ← Back to Home
          </Link>

          {/* Page Title */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge variant="gold">The Science of Herbs</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-cream-white">
              The 20+ Potent Ingredients of <br />
              <span className="gold-text-glow font-editorial italic font-light">Zveda Hair Oil</span>
            </h1>
            <p className="text-muted-text text-sm md:text-base leading-relaxed">
              Explore the full botanical profile of our formula. Filter by category to discover how each active root, leaf, and cold-pressed oil targets scalp regeneration.
            </p>
          </div>

          {/* Navigation Filter Tabs */}
          <div className="flex justify-center border-b border-gold-luxury/10 pb-4 mb-12 overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex gap-4 min-w-max px-4">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setFilter(cat.key as FilterType)}
                  className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold border transition-all duration-300 focus:outline-none ${
                    filter === cat.key
                      ? "bg-gold-luxury text-primary-bg border-gold-luxury"
                      : "bg-herbal-deep/20 text-cream-white/70 border-gold-luxury/10 hover:border-gold-luxury/30"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredIngredients.map((item, idx) => (
              <GlassCard
                key={idx}
                className="flex flex-col h-full border border-gold-luxury/10 hover:border-gold-luxury/30 transition-luxury p-0 rounded-2xl overflow-hidden group"
              >
                {/* Image */}
                <div className="relative aspect-video w-full bg-herbal-deep/20 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-primary-bg/80 backdrop-blur-sm border border-gold-luxury/20 py-1 px-3 rounded-full text-[10px] font-bold text-gold-luxury">
                    {item.percentage}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-heading text-xl font-bold text-cream-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-muted-text leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Benefits tag strip */}
                  <div className="border-t border-gold-luxury/5 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {item.benefits.map((benefit, bIdx) => (
                        <span
                          key={bIdx}
                          className="text-[9px] uppercase tracking-wider font-semibold bg-gold-luxury/5 border border-gold-luxury/15 text-gold-luxury py-0.5 px-2 rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
