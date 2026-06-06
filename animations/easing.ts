/**
 * animations/easing.ts
 *
 * Curated easing curves for the ZVEDA premium motion system.
 * Used across Framer Motion transitions and GSAP animations.
 */

// ─── Framer Motion easing arrays ──────────────────────────────────────────────

/** Apple-style spring feel — used for entrances and reveals */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Smooth deceleration — used for exits and fades */
export const easeInOutQuart = [0.76, 0, 0.24, 1] as const;

/** Slightly elastic, premium feel — used for hover scale */
export const easeOutBack = [0.34, 1.56, 0.64, 1] as const;

/** Brisk snap — used for quick micro-interactions */
export const easeOutQuint = [0.22, 1, 0.36, 1] as const;

// ─── GSAP easing strings ──────────────────────────────────────────────────────

export const gsapEase = {
  /** Apple-style deceleration */
  expo: "expo.out",
  /** Smooth power4 — used in text reveals */
  power4: "power4.out",
  /** Snappy micro interactions */
  back: "back.out(1.7)",
  /** Default smooth */
  smooth: "power2.inOut",
} as const;

// ─── CSS cubic-bezier strings ─────────────────────────────────────────────────

export const cssEase = {
  luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
  smooth: "cubic-bezier(0.76, 0, 0.24, 1)",
  snap: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;
