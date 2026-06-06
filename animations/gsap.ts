"use client";

/**
 * animations/gsap.ts  (Phase 9 expansion)
 *
 * GSAP utility presets and ScrollTrigger helpers for the ZVEDA platform.
 * All functions assume GSAP + ScrollTrigger are already registered via LenisProvider.
 *
 * ─── Available utilities ────────────────────────────────────────────────────
 *
 * Reveal:
 *   revealOnScroll(targets, options)   — fade + slide up on scroll
 *   textScrambleReveal(element)        — character-by-character heading reveal
 *   clipRevealOnScroll(target)         — clip-path wipe reveal
 *
 * Parallax:
 *   parallax(target, options)          — single-element scrub parallax
 *   parallaxLayers(layers)             — multi-layer depth effect
 *
 * Interactive:
 *   magneticHover(el, strength)        — cursor magnetic attraction
 *
 * Scroll FX:
 *   scrollProgressLine(el)             — expand element width with scroll progress
 *   pinSection(trigger, end)           — pin a section during scroll
 *
 * Utility:
 *   refreshScrollTrigger()             — force recalc (call after layout shifts)
 *   killAllScrollTriggers()            — cleanup on unmount
 */

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { gsapEase } from "./easing";

// Register once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RevealOptions {
  /** Stagger delay between elements in seconds (default 0.1) */
  stagger?: number;
  /** Y offset to animate from (default 50) */
  yFrom?: number;
  /** Custom GSAP ease string */
  ease?: string;
  /** Animation duration in seconds (default 0.8) */
  duration?: number;
  /** ScrollTrigger start position (default "top 88%") */
  start?: string;
  /** Optional ScrollTrigger markers (debug only) */
  markers?: boolean;
  /** Once fired, never replay (default true) */
  once?: boolean;
}

export interface ParallaxOptions {
  /** Y movement in px (default 60) — negative for upward parallax */
  yAmount?: number;
  /** ScrollTrigger start (default "top bottom") */
  start?: string;
  /** ScrollTrigger end (default "bottom top") */
  end?: string;
  /** Scrub smoothing factor (true = 1, number = custom) */
  scrub?: boolean | number;
}

export interface ParallaxLayer {
  element: HTMLElement;
  /** Depth multiplier: 0.1 = subtle, 1.0 = full, negative = opposite direction */
  depth: number;
}

// ─── Reveal on scroll ─────────────────────────────────────────────────────────

/**
 * Animates elements into view as they scroll into the viewport.
 * Returns a cleanup function to kill the ScrollTrigger.
 *
 * @example
 * const cleanup = revealOnScroll(".ingredient-card", { stagger: 0.12 });
 * return cleanup; // inside useEffect
 */
export function revealOnScroll(
  targets: string | HTMLElement | HTMLElement[],
  options: RevealOptions = {}
): () => void {
  const {
    stagger = 0.1,
    yFrom = 50,
    ease = gsapEase.expo,
    duration = 0.8,
    start = "top 88%",
    markers = false,
    once = true,
  } = options;

  const els = typeof targets === "string" ? document.querySelectorAll(targets) : targets;
  if (!els || (els instanceof NodeList && els.length === 0)) return () => {};

  const triggerEl = typeof targets === "string"
    ? (document.querySelector(targets) as Element)
    : Array.isArray(targets) ? targets[0] : targets;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerEl,
      start,
      markers,
      toggleActions: once ? "play none none none" : "play none none reverse",
    },
  });

  tl.fromTo(
    targets,
    { opacity: 0, y: yFrom, willChange: "transform, opacity" },
    { opacity: 1, y: 0, duration, ease, stagger, clearProps: "willChange" }
  );

  return () => tl.kill();
}

// ─── Clip-path reveal ─────────────────────────────────────────────────────────

/**
 * Reveals an element with a clip-path wipe from bottom to top.
 * Great for section headers and hero elements.
 */
export function clipRevealOnScroll(
  target: HTMLElement | null,
  options: { start?: string; duration?: number } = {}
): () => void {
  if (!target) return () => {};

  const { start = "top 85%", duration = 1 } = options;

  const tween = gsap.fromTo(
    target,
    { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      duration,
      ease: gsapEase.expo,
      scrollTrigger: {
        trigger: target,
        start,
        toggleActions: "play none none none",
      },
    }
  );

  return () => tween.kill();
}

// ─── Parallax ─────────────────────────────────────────────────────────────────

/**
 * Applies a smooth parallax scrolling effect to a single element.
 * Returns a cleanup function.
 *
 * @example
 * const cleanup = parallax(bgRef.current, { yAmount: -80 });
 * return cleanup;
 */
export function parallax(
  target: HTMLElement | null,
  options: ParallaxOptions = {}
): () => void {
  if (!target) return () => {};

  const {
    yAmount = 60,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
  } = options;

  const tween = gsap.fromTo(
    target,
    { y: -yAmount, willChange: "transform" },
    {
      y: yAmount,
      ease: "none",
      clearProps: "willChange",
      scrollTrigger: {
        trigger: target,
        start,
        end,
        scrub,
      },
    }
  );

  return () => tween.kill();
}

/**
 * Multi-layer depth parallax effect.
 * Each layer moves at a different speed based on its depth value.
 * Depth 0.1 = barely moves, depth 1.0 = full movement, negative = inverse.
 *
 * @example
 * parallaxLayers([
 *   { element: bgRef.current!, depth: 0.3 },
 *   { element: bottleRef.current!, depth: -0.15 },
 *   { element: textRef.current!, depth: 0.08 },
 * ]);
 */
export function parallaxLayers(
  layers: ParallaxLayer[],
  containerRef?: HTMLElement | null,
  baseAmount = 120
): () => void {
  if (!layers.length) return () => {};

  const tweens = layers
    .filter((l) => l.element != null)
    .map(({ element, depth }) => {
      const yAmt = baseAmount * depth;

      return gsap.fromTo(
        element,
        { y: -yAmt, willChange: "transform" },
        {
          y: yAmt,
          ease: "none",
          clearProps: "willChange",
          scrollTrigger: {
            trigger: containerRef ?? element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    });

  return () => tweens.forEach((t) => t.kill());
}

// ─── Pin section ──────────────────────────────────────────────────────────────

/**
 * Pins a section while the user scrolls, creating a cinematic hold effect.
 * Returns a cleanup function.
 */
export function pinSection(
  trigger: string | HTMLElement,
  endTrigger?: string | HTMLElement
): () => void {
  const st = ScrollTrigger.create({
    trigger,
    start: "top top",
    end: endTrigger ? "bottom top" : "+=100%",
    endTrigger: endTrigger as Element | undefined,
    pin: true,
    pinSpacing: true,
  });

  return () => st.kill();
}

// ─── Scroll progress line ─────────────────────────────────────────────────────

/**
 * Animates the scaleX of an element from 0 → 1 as the section scrolls.
 * Perfect for timeline progress bars and reading indicators.
 *
 * @example
 * const cleanup = scrollProgressLine(lineRef.current, sectionRef.current);
 * return cleanup;
 */
export function scrollProgressLine(
  lineEl: HTMLElement | null,
  sectionEl?: HTMLElement | null
): () => void {
  if (!lineEl) return () => {};

  const tween = gsap.fromTo(
    lineEl,
    { scaleX: 0, transformOrigin: "left center" },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionEl ?? lineEl,
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
      },
    }
  );

  return () => tween.kill();
}

// ─── Text scramble reveal ─────────────────────────────────────────────────────

/**
 * Staggered character reveal for headings.
 * Wraps each character in a span and animates them in sequence.
 */
export function textScrambleReveal(
  element: HTMLElement | null,
  options: { duration?: number; stagger?: number } = {}
): () => void {
  if (!element) return () => {};

  const { duration = 0.06, stagger = 0.025 } = options;

  const originalText = element.textContent ?? "";
  const chars = originalText.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    return span;
  });

  element.textContent = "";
  chars.forEach((span) => element.appendChild(span));

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });

  tl.from(chars, {
    opacity: 0,
    y: 24,
    rotateX: -45,
    duration,
    stagger,
    ease: gsapEase.power4,
  });

  return () => tl.kill();
}

// ─── Magnetic hover ───────────────────────────────────────────────────────────

/**
 * Cursor magnetic attraction effect on an interactive element.
 * The element follows the cursor within its bounds.
 *
 * @example
 * useEffect(() => {
 *   const cleanup = magneticHover(buttonRef.current);
 *   return cleanup;
 * }, []);
 */
export function magneticHover(
  el: HTMLElement | null,
  strength = 0.4
): () => void {
  if (!el) return () => {};

  function onEnter(e: MouseEvent) {
    const { left, top, width, height } = el!.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * strength;
    const y = (e.clientY - top - height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.5, ease: "power2.out" });
  }

  function onLeave() {
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  }

  el.addEventListener("mousemove", onEnter);
  el.addEventListener("mouseleave", onLeave);

  return () => {
    el.removeEventListener("mousemove", onEnter);
    el.removeEventListener("mouseleave", onLeave);
    gsap.killTweensOf(el);
  };
}

// ─── Stagger reveal grid ──────────────────────────────────────────────────────

/**
 * Reveals a grid of cards in a staggered wave pattern.
 * Each row staggers slightly after the previous.
 */
export function staggerRevealGrid(
  targets: HTMLElement[],
  options: { stagger?: number; yFrom?: number; start?: string } = {}
): () => void {
  if (!targets.length) return () => {};

  const { stagger = 0.08, yFrom = 40, start = "top 85%" } = options;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: targets[0],
      start,
      toggleActions: "play none none none",
    },
  });

  tl.fromTo(
    targets,
    { opacity: 0, y: yFrom, scale: 0.96, willChange: "transform, opacity" },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: gsapEase.expo,
      stagger: { each: stagger, from: "start" },
      clearProps: "willChange",
    }
  );

  return () => tl.kill();
}

// ─── Utility ──────────────────────────────────────────────────────────────────

/** Call after dynamic content loads or layout shifts. */
export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

/** Kill all ScrollTriggers — call in global unmount or page transitions. */
export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}
