"use client";

/**
 * hooks/useParallax.ts
 *
 * React hook for GSAP parallax effects.
 * Attaches a scroll-scrub parallax to a ref'd element.
 *
 * @example
 * const bgRef = useParallax<HTMLDivElement>({ yAmount: -80 });
 * <div ref={bgRef} />
 *
 * @example — multi-layer
 * const containerRef = useRef<HTMLDivElement>(null);
 * const bgRef    = useParallaxLayer(containerRef, 0.4);
 * const bottleRef = useParallaxLayer(containerRef, -0.2);
 */

import { useRef, useEffect, type RefObject } from "react";
import { parallax, parallaxLayers, type ParallaxOptions } from "@/animations/gsap";

// ─── Single element ───────────────────────────────────────────────────────────

/**
 * Returns a ref — attach it to any element to give it a parallax effect.
 */
export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null!);

  useEffect(() => {
    if (!ref.current) return;
    return parallax(ref.current, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

// ─── Multi-layer ──────────────────────────────────────────────────────────────

/**
 * Attaches depth-based parallax to multiple elements relative to a container.
 *
 * @example
 * const containerRef = useRef<HTMLDivElement>(null);
 * const bgRef = useRef<HTMLDivElement>(null);
 * const bottleRef = useRef<HTMLDivElement>(null);
 * useParallaxLayers(containerRef, [
 *   { ref: bgRef,     depth: 0.3  },
 *   { ref: bottleRef, depth: -0.15 },
 * ]);
 */
export function useParallaxLayers(
  containerRef: RefObject<HTMLElement | null>,
  layers: Array<{ ref: RefObject<HTMLElement | null>; depth: number }>,
  baseAmount = 120
): void {
  useEffect(() => {
    const resolved = layers
      .filter((l) => l.ref.current != null)
      .map((l) => ({ element: l.ref.current!, depth: l.depth }));

    if (!resolved.length) return;
    return parallaxLayers(resolved, containerRef.current, baseAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
