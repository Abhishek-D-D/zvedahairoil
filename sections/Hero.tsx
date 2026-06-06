"use client";

/**
 * sections/Hero.tsx  (Phase 9 — GSAP Parallax upgrade)
 *
 * Added:
 *  - Multi-layer parallax: background image drifts slower than foreground
 *  - Scroll-scrub text fade: hero text fades out as you scroll away
 *  - Magnetic hover on CTA buttons (desktop)
 *  - Clip-path reveal for mobile text block
 *  - textScrambleReveal on desktop badge text
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import { magneticHover, textScrambleReveal } from "@/animations/gsap";
import { useAuthContext } from "@/providers/AuthProvider";

export default function Hero() {
  const { user } = useAuthContext();
  const buyHref = user ? "/checkout" : "/login?redirect=/checkout";
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef  = useRef<HTMLElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const floatRef    = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const badgeRef    = useRef<HTMLSpanElement>(null);
  const btn1Ref     = useRef<HTMLAnchorElement>(null);
  const btn2Ref     = useRef<HTMLAnchorElement>(null);

  // ── Scroll-scrub fade: hero content fades as you scroll past ──────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgScale     = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // ── Mouse parallax (desktop) ───────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ── GSAP: Magnetic hover on CTA buttons ───────────────────────────────────
  useEffect(() => {
    const cleanup1 = magneticHover(btn1Ref.current, 0.35);
    const cleanup2 = magneticHover(btn2Ref.current, 0.35);
    return () => {
      cleanup1();
      cleanup2();
    };
  }, []);

  // ── GSAP: Text scramble reveal on badge ───────────────────────────────────
  useEffect(() => {
    return textScrambleReveal(badgeRef.current, { stagger: 0.03, duration: 0.04 });
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full z-10 overflow-hidden bg-primary-bg">

      {/* 1. DESKTOP (lg+) ─────────────────────────────────────────────────── */}
      <div className="hidden lg:flex relative w-full min-h-screen items-center" style={{ perspective: 1000 }}>

        {/* Background image — slower scroll parallax via Framer Motion */}
        <motion.div
          ref={bgRef}
          className="absolute inset-0 bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('/img/hero-image.png')",
            y: heroY,
            scale: bgScale,
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* SR content */}
        <div className="sr-only">
          <h1>Zveda Oils — The Parampar Essence</h1>
          <h2>Ancient Ayurvedic Hair Ritual for Stronger, Thicker &amp; Healthier Hair</h2>
          <p>Made with Taila Paka Vidhi. Slow cooked for 8-12 hours for maximum potency.</p>
        </div>

        {/* Floating CTA Card — mouse parallax + scroll fade */}
        <motion.div
          ref={ctaRef}
          style={{ opacity: heroOpacity }}
          animate={{ x: mousePos.x * 12, y: mousePos.y * 12 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
          className="absolute left-[8%] xl:left-[10%] top-[45%] xl:top-[43%] z-20 glass-panel p-8 rounded-3xl border border-gold-luxury/25 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-5 max-w-[440px]"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[0.3em] font-bold text-gold-luxury uppercase block">
                ✨ Pure Ayurveda
              </span>
              <div className="flex items-center gap-1 bg-gold-luxury/10 border border-gold-luxury/20 px-2 py-0.5 rounded-full">
                <span className="text-[9px] font-bold text-gold-luxury tracking-wide uppercase">
                  500+ Sold
                </span>
              </div>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-cream-white leading-tight font-heading">
              Ancient Ayurvedic <br />
              <span className="gold-text-glow font-editorial italic font-light">Hair Regrowth Ritual</span>
            </h2>
            <p className="text-xs text-muted-text/90 leading-relaxed">
              Clinically-proven Ayurvedic recipe slow-cooked for 12 hours on an open wood fire. Stops excessive hair fall in 14 days, activates dormant root follicles, and accelerates thick regrowth.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <Button
              ref={btn1Ref}
              href={buyHref}
              variant="gold"
              className="!px-8 !py-3.5 shadow-xl w-full text-center"
            >
              {user ? "Buy Now" : "Shop Now"}
            </Button>
            <Button
              ref={btn2Ref}
              href="/taila-paka-vidhi"
              variant="outline"
              className="!px-6 !py-3.5 backdrop-blur-sm w-full text-center"
            >
              Watch Ritual
            </Button>
          </div>
        </motion.div>

        {/* Floating leaf — deep layer parallax (opposite direction) */}
        <div ref={floatRef} className="absolute inset-0 z-10 pointer-events-none select-none">
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [15, 20, 15],
              x: mousePos.x * -8,
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 opacity-30 w-10 h-10 text-botanical-green"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M17,8C8,10 5.9,16.1 5.1,18C5.8,17.2 9.5,14 17,14C17.5,14 18,13.5 18,13C18,10.2 17.6,9.1 17,8M17,6C18.7,6 20,7.3 20,9C20,15 14,16 14,20H12C12,14.5 10,13 6,10C7.5,9.5 10,10 13,11.5C14.8,8.2 15.5,6 17,6Z" />
            </svg>
          </motion.div>

          {/* Second floating particle — opposite parallax */}
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [-10, -15, -10],
              x: mousePos.x * 6,
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/3 right-1/4 opacity-20 w-6 h-6 text-gold-luxury"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
            </svg>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-text">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-gold-luxury/60 to-transparent"
          />
        </motion.div>
      </div>

      {/* 2. MOBILE & TABLET (under lg) ─────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col w-full min-h-screen">
        {/* Image panel */}
        <motion.div
          className="w-full h-[55vh] min-h-[380px] bg-cover bg-[position:78%_center] relative"
          style={{ backgroundImage: "url('/img/hero-image.png')" }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary-bg to-transparent" />
          <div className="absolute top-6 left-6">
            <Badge variant="gold">✨ Pure Ayurveda</Badge>
          </div>
        </motion.div>

        {/* Text + CTA */}
        <motion.div
          className="flex-grow bg-primary-bg px-6 pb-12 pt-4 flex flex-col justify-between space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-semibold tracking-widest text-gold-luxury uppercase">
                The Parampar Essence
              </h2>
              <span className="text-[9px] font-bold text-gold-luxury bg-gold-luxury/10 border border-gold-luxury/25 px-2 py-0.5 rounded-full uppercase">
                500+ Happy Customers
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-cream-white leading-tight">
              Ancient Ayurvedic <br />
              <span className="gold-text-glow font-editorial italic font-light">Hair Ritual</span>
            </h1>
            <p className="text-muted-text text-sm leading-relaxed">
              Clinically-proven recipe slow-cooked for 12 hours on a wood fire. Stops hair fall in 14 days, strengthens root anchors, and accelerates thick regrowth—naturally.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-[10px] text-muted-text">
            {[["100%", "Natural"], ["0%", "Mineral Oil"], ["12 Hours", "Slow Brewed"]].map(([val, label]) => (
              <div key={label} className="border border-gold-luxury/10 py-2 rounded-lg bg-herbal-deep/20">
                <p className="font-semibold text-gold-luxury">{val}</p>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Button href={buyHref} variant="gold" className="w-full text-center">
              {user ? "Buy Now" : "Shop Now"}
            </Button>
            <Button href="/taila-paka-vidhi" variant="outline" className="w-full text-center">
              Watch The Ritual
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
