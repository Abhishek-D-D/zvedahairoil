"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Badge from "@/components/Badge";
import GlassCard from "@/components/GlassCard";
import { ingredients } from "@/data/ingredients";
import { parallax } from "@/animations/gsap";

interface Hotspot {
  id: string;
  name: string;
  percentage: string;
  benefit: string;
  description: string;
  top: string; // Position relative to parent container (percentage)
  left: string; // Position relative to parent container (percentage)
  tooltipPos: "left" | "right" | "top" | "bottom";
}

export default function ProductShowcase() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const mobileBottleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanupDesktop = parallax(bottleRef.current, { yAmount: -35, start: "top bottom", end: "bottom top" });
    const cleanupMobile = parallax(mobileBottleRef.current, { yAmount: -25, start: "top bottom", end: "bottom top" });
    return () => {
      cleanupDesktop();
      cleanupMobile();
    };
  }, []);

  const hotspots: Hotspot[] = [
    {
      id: "jatamansi",
      name: "Jatamansi Root",
      percentage: "1.5%",
      benefit: "Stimulates Follicles",
      description: "A rare Ayurvedic root that calm stress, stimulates blood flow, and reactivates dormant follicles.",
      top: "28%",
      left: "38%",
      tooltipPos: "left",
    },
    {
      id: "vetiver",
      name: "Vetiver Root",
      percentage: "1.5%",
      benefit: "Soothes Scalp",
      description: "Provides deep cooling relief to the scalp, controlling inflammation, itching, and dryness.",
      top: "45%",
      left: "62%",
      tooltipPos: "right",
    },
    {
      id: "brahmi",
      name: "Brahmi Leaf",
      percentage: "1.5%",
      benefit: "Strengthens Hair Shaft",
      description: "Coats the hair follicles with essential nutrients to stop split ends, breakage, and thinning.",
      top: "60%",
      left: "35%",
      tooltipPos: "left",
    },
    {
      id: "amla",
      name: "Amla Fruit",
      percentage: "1.5%",
      benefit: "Vitamin C Powerhouse",
      description: "Fights premature graying and cellular aging with powerful antioxidants and Vitamin C.",
      top: "72%",
      left: "60%",
      tooltipPos: "right",
    },
  ];

  // Showcase exact 5 ingredients: Amla, Brahmi, Hibiscus, Coconut, Almond
  const showcaseNames = ["Amla", "Brahmi Leaf", "Hibiscus Flower", "Coconut Oil", "Almond Oil"];
  const showcaseIngredients = showcaseNames
    .map((name) => ingredients.find((ing) => ing.name === name))
    .filter((ing): ing is NonNullable<typeof ing> => !!ing);

  return (
    <section className="relative py-24 bg-primary-bg overflow-hidden z-10">
      {/* Background gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-luxury/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <Badge variant="gold">Interactive Spotlight</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Inside the Bottle: <br />
            <span className="gold-text-glow font-editorial italic font-light">Ingredient Hotspots</span>
          </h2>
          <p className="text-muted-text text-sm md:text-base">
            Tap or hover over the golden hotspots to explore the clinical benefits of our core botanical ingredients.
          </p>
        </div>

        {/* Desktop Interactive Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-[600px]">
          {/* Left descriptions column (shows active or default) */}
          <div className="col-span-4 space-y-6">
            <h3 className="text-sm font-semibold tracking-widest text-gold-luxury uppercase">
              Formulation Science
            </h3>
            {activeHotspot ? (
              (() => {
                const item = hotspots.find((h) => h.id === activeHotspot);
                return item ? (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-baseline justify-between border-b border-gold-luxury/20 pb-2">
                      <h4 className="text-2xl font-bold text-cream-white">{item.name}</h4>
                      <span className="text-gold-luxury font-heading text-lg font-bold">
                        {item.percentage}
                      </span>
                    </div>
                    <p className="text-sm text-gold-luxury font-medium tracking-wide uppercase">
                      ⭐ {item.benefit}
                    </p>
                    <p className="text-sm text-muted-text leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ) : null;
              })()
            ) : (
              <div className="space-y-4 opacity-75">
                <p className="text-sm text-muted-text leading-relaxed">
                  Hover over the flashing indicators on the bottle to see detail. Each herb is selected for synergistic action on hair root biology.
                </p>
                <div className="w-12 h-[1px] bg-gold-luxury/40" />
                <p className="text-xs text-gold-luxury/70 tracking-widest uppercase">
                  Meticulous botanical profiling
                </p>
              </div>
            )}
          </div>

          {/* Center Column: Bottle + Hotspots */}
          <div className="col-span-4 relative flex justify-center h-[550px] w-full">
            <div ref={bottleRef} className="relative w-full max-w-[280px] h-[500px]">
              <Image
                src="/img/ert-v2.png"
                alt="Zveda Bottle Ingredients Spotlight"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-10"
              />

              {/* Hotspots */}
              {hotspots.map((spot) => {
                const isActive = activeHotspot === spot.id;
                return (
                  <div
                    key={spot.id}
                    className="absolute z-20"
                    style={{ top: spot.top, left: spot.left }}
                    onMouseEnter={() => setActiveHotspot(spot.id)}
                    onMouseLeave={() => setActiveHotspot(null)}
                  >
                    {/* Pulsing ring */}
                    <span className="absolute -inset-1.5 rounded-full bg-gold-luxury/30 animate-ping pointer-events-none" />
                    {/* Core button */}
                    <button
                      className={`relative w-4 h-4 rounded-full border border-cream-white transition-all duration-300 ${
                        isActive ? "bg-cream-white scale-125" : "bg-gold-luxury"
                      }`}
                      aria-label={`Spotlight ${spot.name}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Hotspot Tooltip panels */}
          <div className="col-span-4 space-y-6">
            {hotspots.map((spot) => {
              const isActive = activeHotspot === spot.id;
              return (
                <div
                  key={spot.id}
                  className={`p-5 rounded-xl border transition-all duration-500 ${
                    isActive
                      ? "bg-herbal-deep/60 border-gold-luxury text-cream-white translate-x-2"
                      : "bg-herbal-deep/10 border-gold-luxury/10 text-cream-white/40"
                  }`}
                  onMouseEnter={() => setActiveHotspot(spot.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <h4 className="font-bold text-sm tracking-wide">{spot.name}</h4>
                  <p className="text-xs mt-1 line-clamp-2">{spot.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile touch-friendly list (under bottle image) */}
        <div className="lg:hidden space-y-8">
          <div ref={mobileBottleRef} className="relative flex justify-center h-[350px] w-full">
            <Image
              src="/img/ert-v2.png"
              alt="Zveda Bottle Showcase"
              width={220}
              height={350}
              className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Grid of ingredients list for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hotspots.map((spot) => (
              <GlassCard key={spot.id} className="border border-gold-luxury/15 p-5">
                <div className="flex justify-between items-baseline border-b border-gold-luxury/10 pb-2 mb-3">
                  <h4 className="font-heading font-semibold text-cream-white">{spot.name}</h4>
                  <span className="text-gold-luxury font-bold text-xs">{spot.percentage}</span>
                </div>
                <p className="text-xs text-gold-luxury font-medium mb-1">🛡️ {spot.benefit}</p>
                <p className="text-xs text-muted-text leading-relaxed">{spot.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Ingredient Cards Grid */}
        <div className="mt-28 border-t border-gold-luxury/10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          >
            <Badge variant="gold">Active Botanicals</Badge>
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-cream-white">
              The Key Restorative Actives
            </h3>
            <p className="text-muted-text text-sm md:text-base">
              Hand-selected herbs and oils scientifically proven to restore, nourish, and revitalize the hair follicle lifecycle.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          >
            {showcaseIngredients.map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
                  },
                }}
                className="h-full"
              >
                <GlassCard className="flex flex-col h-full border border-gold-luxury/10 hover:border-gold-luxury/30 transition-all duration-500 p-0 rounded-2xl overflow-hidden group">
                  {/* Image container with premium zoom */}
                  <div className="relative aspect-[4/3] w-full bg-herbal-deep/20 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 right-3 bg-primary-bg/90 backdrop-blur-sm border border-gold-luxury/30 py-1 px-3 rounded-full text-[10px] font-bold text-gold-luxury">
                      {item.percentage}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-heading text-lg font-bold text-cream-white group-hover:text-gold-luxury transition-colors duration-300">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-text leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Benefit badges */}
                    <div className="border-t border-gold-luxury/5 pt-3">
                      <div className="flex flex-wrap gap-1">
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
              </motion.div>
            ))}
          </motion.div>

          {/* Catalog Redirect button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mt-12"
          >
            <a
              href="/ingredients"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-transparent border border-gold-luxury/45 text-gold-luxury text-xs uppercase tracking-widest font-semibold hover:bg-gold-luxury hover:text-primary-bg hover:border-gold-luxury transition-all duration-300 group shadow-lg"
            >
              Explore All 20+ Active Ingredients
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
