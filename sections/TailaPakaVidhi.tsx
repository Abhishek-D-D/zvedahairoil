"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Badge from "@/components/Badge";
import GlassCard from "@/components/GlassCard";
import { Play, Pause } from "lucide-react";
import {
  clipRevealOnScroll,
  scrollProgressLine,
  staggerRevealGrid,
} from "@/animations/gsap";

interface Step {
  step: string;
  title: string;
  duration: string;
  desc: string;
}

export default function TailaPakaVidhi() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const mobileStepsRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── GSAP: Heading clip-reveal + scrubbed progress line ────────────────────
  useEffect(() => {
    if (!mounted) return;
    const cleanupHeading = clipRevealOnScroll(headingRef.current, {
      start: "top 85%",
    });
    const cleanupLine = scrollProgressLine(
      progressLineRef.current,
      containerRef.current
    );
    return () => {
      cleanupHeading();
      cleanupLine();
    };
  }, [mounted]);

  // ── GSAP: Mobile vertical timeline — staggered card entrances ─────────────
  useEffect(() => {
    if (!mounted || isDesktop || !mobileStepsRef.current) return;
    const cards = Array.from(
      mobileStepsRef.current.querySelectorAll<HTMLElement>("[data-step-card]")
    );
    if (!cards.length) return;
    return staggerRevealGrid(cards, { stagger: 0.12, yFrom: 30 });
  }, [mounted, isDesktop]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => console.log("Video play failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const steps: Step[] = [
    {
      step: "01",
      title: "Herb Collection & Purification",
      duration: "Sunrise Hour",
      desc: "Wild Jatamansi, Vetiver, and fresh Amla are hand-harvested from chemical-free soil, washed in pristine water, and crushed into fine pulp.",
    },
    {
      step: "02",
      title: "Kalka & Kwatha Decoction",
      duration: "4 Hours Infusion",
      desc: "Herbs are soaked to create a kalka (herbal paste) and boiled in pure spring water to prepare a kwatha (potent herbal concentrate).",
    },
    {
      step: "03",
      title: "Slow Wood-Fired Simmer",
      duration: "12 Hours Cooking",
      desc: "Concentrate is mixed with sesame, coconut, and castor base oils inside copper vessels and cooked on open flame with continuous stirring.",
    },
    {
      step: "04",
      title: "Natural Filtration",
      duration: "Sedimentation",
      desc: "The brewed mixture sits to cool, separating herbal dregs. The pure liquid gold is filtered through premium double-layered cotton fabrics.",
    },
    {
      step: "05",
      title: "Amber Bottling",
      duration: "Final Lock",
      desc: "The resulting therapeutic formulation is filled into dark amber bottles, shielding the delicate botanical compounds from sunlight oxidation.",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <div
      ref={containerRef}
      className={`relative bg-herbal-deep/10 border-y border-gold-luxury/10 z-10 ${
        mounted && isDesktop ? "h-[160vh]" : "h-auto py-24"
      }`}
    >
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold-luxury/5 rounded-full blur-[100px] pointer-events-none" />

      {!mounted ? (
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 py-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge variant="gold">The Brewing Ritual</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              The Ancient Science: <br />
              <span className="gold-text-glow font-editorial italic font-light">Taila Paka Vidhi</span>
            </h2>
            <p className="text-muted-text text-sm md:text-base">
              How we prepare Zveda. A slow, meditative 12-hour copper cooking ritual that transfers the pure organic force of 20+ roots and leaves directly into your base oils.
            </p>
          </div>
        </div>
      ) : (
        <div className={`${isDesktop ? "sticky top-0 h-screen flex flex-col justify-center overflow-hidden" : "relative"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-4">
            <Badge variant="gold">The Brewing Ritual</Badge>
            <h2
              ref={headingRef}
              className="text-3xl md:text-5xl font-bold tracking-tight"
            >
              The Ancient Science: <br />
              <span className="gold-text-glow font-editorial italic font-light">Taila Paka Vidhi</span>
            </h2>
            <p className="text-muted-text text-sm md:text-base">
              How we prepare Zveda. A slow, meditative 12-hour copper cooking ritual that transfers the pure organic force of 20+ roots and leaves directly into your base oils.
            </p>
            {/* GSAP-scrubbed progress line — fills as the section scrolls */}
            <div className="relative max-w-xs mx-auto pt-2">
              <div className="h-px bg-gold-luxury/10" />
              <div
                ref={progressLineRef}
                className="absolute top-2 left-0 right-0 h-px bg-gradient-to-r from-gold-luxury/80 via-gold-luxury to-gold-luxury/80 shadow-[0_0_8px_rgba(200,169,107,0.5)]"
              />
            </div>
          </div>

          {isDesktop ? (
            <div className="grid grid-cols-12 gap-8 items-center h-[55vh]">
              {/* Left: Documentary Reel */}
              <div className="col-span-4 flex flex-col items-center">
                <h3 className="text-sm uppercase tracking-widest text-gold-luxury font-semibold mb-4">
                  Documentary Reel
                </h3>
                <div className="relative w-full max-w-[220px] aspect-[9/16] bg-primary-bg rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)] border border-gold-luxury/20 group">
                  <video
                    ref={videoRef}
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src="/videos/product reel copy.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    aria-pressed={isPlaying}
                    className="absolute inset-0 bg-primary-bg/25 group-hover:bg-primary-bg/40 flex items-center justify-center cursor-pointer transition-all duration-300"
                  >
                    <div className="p-3 rounded-full bg-gold-luxury/90 text-primary-bg hover:scale-110 transition-transform duration-300 shadow-lg">
                      {isPlaying ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" className="ml-0.5" />}
                    </div>
                  </button>

                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none bg-primary-bg/75 backdrop-blur-sm p-2 rounded-lg border border-white/5">
                    <p className="text-[9px] uppercase font-bold tracking-widest text-gold-luxury">
                      Traditional Brewery
                    </p>
                    <p className="text-[8px] text-cream-white/70 mt-0.5">Copper vessel wood-fired prep</p>
                  </div>
                </div>
              </div>

              {/* Right: Sliding Timeline Cards */}
              <div className="col-span-8 overflow-hidden relative py-4">
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gold-luxury/20 -translate-y-1/2 pointer-events-none z-0" />

                <motion.div style={{ x }} className="flex gap-8 pl-12 pr-[40vw] relative z-10">
                  {steps.map((item, idx) => (
                    <div key={idx} className="relative w-[340px] shrink-0">
                      <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary-bg border border-gold-luxury flex items-center justify-center text-xs font-bold text-gold-luxury shadow-lg shadow-black z-20">
                        {item.step}
                      </span>

                      <GlassCard className="p-6 border border-gold-luxury/10 hover:border-gold-luxury/30 transition-all duration-500 bg-primary-bg/40 backdrop-blur-md ml-4 h-[240px] flex flex-col justify-between">
                        <div className="border-b border-gold-luxury/5 pb-2">
                          <span className="text-[10px] uppercase tracking-widest text-gold-luxury font-semibold block mb-1">
                            ⏱️ {item.duration}
                          </span>
                          <h4 className="text-base font-bold text-cream-white tracking-wide">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-text leading-relaxed mt-2 flex-grow">
                          {item.desc}
                        </p>
                      </GlassCard>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 items-start mt-8">
              <div className="flex flex-col items-center">
                <h3 className="text-base font-heading text-gold-luxury font-semibold mb-4 tracking-wide">
                  Documentary Reel
                </h3>
                <div className="relative w-full max-w-[260px] aspect-[9/16] bg-primary-bg rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-gold-luxury/20 group">
                  <video
                    ref={videoRef}
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src="/videos/product reel copy.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    aria-pressed={isPlaying}
                    className="absolute inset-0 bg-primary-bg/25 group-hover:bg-primary-bg/40 flex items-center justify-center cursor-pointer transition-all duration-300"
                  >
                    <div className="p-4 rounded-full bg-gold-luxury/90 text-primary-bg hover:scale-110 transition-transform duration-300 shadow-lg">
                      {isPlaying ? <Pause size={24} aria-hidden="true" /> : <Play size={24} aria-hidden="true" className="ml-1" />}
                    </div>
                  </button>

                  <div className="absolute bottom-6 left-6 right-6 pointer-events-none bg-primary-bg/70 backdrop-blur-sm p-3 rounded-lg border border-white/5">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gold-luxury">
                      Traditional Brewery
                    </p>
                    <p className="text-[9px] text-cream-white/70 mt-0.5">Copper vessel wood-fired prep</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-base font-heading text-gold-luxury font-semibold mb-4 tracking-wide">
                  Step-by-Step Infusion
                </h3>
                <div
                  ref={mobileStepsRef}
                  className="relative border-l border-gold-luxury/20 ml-4 pl-8 space-y-8"
                >
                  {steps.map((item, idx) => (
                    <div key={idx} data-step-card className="relative group">
                      <span className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-primary-bg border border-gold-luxury flex items-center justify-center text-[10px] font-bold text-gold-luxury group-hover:bg-gold-luxury group-hover:text-primary-bg transition-colors duration-300">
                        {item.step}
                      </span>

                      <GlassCard className="p-6 border border-gold-luxury/10 hover:border-gold-luxury/25 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gold-luxury/5 pb-2 mb-3">
                          <h4 className="text-base font-bold text-cream-white tracking-wide">
                            {item.title}
                          </h4>
                          <span className="text-xs uppercase tracking-widest text-gold-luxury font-medium">
                            ⏱️ {item.duration}
                          </span>
                        </div>
                        <p className="text-xs text-muted-text leading-relaxed">
                          {item.desc}
                        </p>
                      </GlassCard>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
