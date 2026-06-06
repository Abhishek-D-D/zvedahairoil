"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { parallax, clipRevealOnScroll } from "@/animations/gsap";

export default function AyurvedicStorytelling() {
  const bottleRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // ── GSAP: subtle parallax on the bottle composition + heading clip-reveal ──
  useEffect(() => {
    const cleanups = [
      parallax(bottleRef.current, { yAmount: 40, scrub: 1 }),
      clipRevealOnScroll(headingRef.current, { start: "top 85%" }),
    ];
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className="relative py-24 bg-herbal-deep/20 border-y border-gold-luxury/10 overflow-hidden z-10">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-botanical-green/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Visual Composition */}
          <div className="relative flex justify-center order-last lg:order-first">
            {/* Ambient Background Aura */}
            <div className="absolute w-[350px] h-[350px] bg-gold-luxury/5 rounded-full blur-2xl pointer-events-none" />
            <div
              ref={bottleRef}
              className="relative border border-gold-luxury/20 p-4 rounded-3xl overflow-hidden bg-primary-bg/40 max-w-md w-full"
            >
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden bg-herbal-deep/50">
                <Image
                  src="/img/productimage2.png"
                  alt="Zveda Ayurvedic Ritual Bottle"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-8 scale-95 hover:scale-100 transition-luxury duration-700"
                />
              </div>

              {/* Float tag */}
              <div className="absolute bottom-8 left-8 right-8 glass-panel border border-gold-luxury/20 py-3 px-6 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs uppercase font-semibold text-gold-luxury tracking-widest">
                    Crafted Batch No. 042
                  </h4>
                  <p className="text-[10px] text-muted-text mt-0.5">Limited seasonal production</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-gold-luxury animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="space-y-8">
            <Badge variant="gold">The Parampar Essence</Badge>
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
            >
              An Ancient Recipe <br />
              <span className="gold-text-glow font-editorial italic font-light">Slow-Cooked For Hours</span>
            </h2>

            <div className="space-y-6 text-muted-text text-sm md:text-base leading-relaxed">
              <p>
                Zveda Hair Oil is not a mass-produced chemical solution mixed in a factory. It is a sacred ritual. Rooted in the ancient science of Ayurveda, our oil is formulated using the traditional <strong className="text-cream-white font-semibold">Taila Paka Vidhi</strong> preparation process.
              </p>
              <p>
                We hand-pick 20+ potent botanical roots and leaves—including Jatamansi, Vetiver, and Brahmi. These are infused into premium quality base oils and slow-cooked in copper vessels on a wood fire for <strong className="text-cream-white font-semibold">over 12 hours</strong>.
              </p>
              <p>
                This controlled low-flame cooking allows the cellular structure of the herbs to rupture naturally, locking their full nutrient concentration and therapeutic properties into every single drop of oil.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gold-luxury/10">
              <div className="space-y-1">
                <span className="text-gold-luxury font-bold font-heading text-lg">Copper Cooked</span>
                <p className="text-xs text-muted-text/80">Purifies and enhances the natural mineral elements of ingredients.</p>
              </div>
              <div className="space-y-1">
                <span className="text-gold-luxury font-bold font-heading text-lg">Zero Mineral Oils</span>
                <p className="text-xs text-muted-text/80">Prepared strictly with premium cold-pressed Sesame, Coconut, and Almond oils.</p>
              </div>
            </div>

            <div className="pt-4 flex">
              <Button href="/taila-paka-vidhi" variant="gold">
                Learn Preparation Process
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
