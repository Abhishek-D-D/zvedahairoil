"use client";

/**
 * providers/LenisProvider.tsx
 *
 * Upgraded Lenis smooth scroll provider with GSAP ScrollTrigger synchronisation.
 *
 * Why this replaces the old ScrollProvider:
 * - Exposes the Lenis instance via React context so any component can call
 *   lenis.scrollTo(), lenis.stop(), lenis.start() etc.
 * - Syncs Lenis RAF (requestAnimationFrame) tick with GSAP's ticker so
 *   ScrollTrigger animations stay perfectly in step with smooth scroll.
 * - Respects `prefers-reduced-motion` — disables smooth scroll for accessibility.
 * - Cleans up on unmount.
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// ─── Context ──────────────────────────────────────────────────────────────────

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Access the Lenis instance from any client component.
 *
 * @example
 * const { lenis } = useLenis();
 * lenis?.scrollTo("#section-id", { duration: 1.2 });
 */
export function useLenis(): LenisContextValue {
  return useContext(LenisContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Initialise Lenis
    const lenis = new Lenis({
      duration: 1.4,        // Smoothness duration in seconds — longer = more floaty
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential ease-out
      smoothWheel: true,
      wheelMultiplier: 1.1, // Reactive scrolling momentum
      autoRaf: false,       // We drive RAF manually via GSAP ticker
      anchors: {
        offset: -80,        // Navbar offset
        easing: (t) => 1 - Math.pow(1 - t, 3),
      },
      prevent: (node) => node.hasAttribute("data-lenis-prevent"),
    });

    lenisRef.current = lenis;

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Sync Lenis RAF with GSAP ticker — critical for ScrollTrigger accuracy
    gsap.ticker.add(updateLenis);

    // Disable GSAP's default lag smoothing so frames stay in sync
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger updated on every Lenis scroll event
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}
