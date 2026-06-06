/**
 * animations/variants.ts
 *
 * Reusable Framer Motion animation variants for the ZVEDA platform.
 * Import and spread these directly into motion components.
 *
 * Usage:
 *   <motion.div variants={fadeUp} initial="hidden" animate="visible">
 *   <motion.div variants={staggerContainer} initial="hidden" animate="visible">
 *     <motion.span variants={fadeUp}>Child 1</motion.span>
 */

import type { Variants } from "framer-motion";
import { easeOutExpo, easeOutQuint, easeInOutQuart } from "./easing";

// ─── Fade variants ─────────────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

// ─── Scale variants ───────────────────────────────────────────────────────────

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

// ─── Stagger containers ───────────────────────────────────────────────────────

/**
 * Wrap stagger children with this container.
 * Each child will animate in sequence with the given staggerChildren delay.
 */
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Pre-built container with 0.12s stagger — most common usage */
export const staggerSlow: Variants = staggerContainer(0.12, 0.1);
export const staggerFast: Variants = staggerContainer(0.07, 0);

// ─── Reveal variants ──────────────────────────────────────────────────────────

/** Clip-path reveal — content slides up through a mask */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

/** Used for section headings — slight scale + fade */
export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

// ─── Overlay / modal variants ─────────────────────────────────────────────────

export const overlayVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: easeInOutQuart } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: easeInOutQuart } },
};

export const modalVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    transition: { duration: 0.25, ease: easeInOutQuart },
  },
};

// ─── Page transitions ─────────────────────────────────────────────────────────

export const pageVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutQuint },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: easeInOutQuart },
  },
};
