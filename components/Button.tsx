"use client";

/**
 * components/Button.tsx (upgraded)
 *
 * Premium button component with:
 * - 3 variants: gold (primary), solid, outline
 * - Loading state with spinner
 * - `type` prop for form submit buttons
 * - Framer Motion hover/tap micro-animations
 * - Works as both <button> and Next.js <Link>
 */

import Link from "next/link";
import { type ReactNode, type ButtonHTMLAttributes, type Ref } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "gold";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  /** Pass target="_blank" for external links */
  target?: string;
  /**
   * Forwarded ref:
   *   - With `href` → attached to the underlying `<a>` (Next Link).
   *   - Without `href` → attached to the underlying `<button>`.
   * Callers should type the ref to match the rendered element (anchor or button).
   */
  ref?: Ref<HTMLAnchorElement> | Ref<HTMLButtonElement>;
}

const baseStyles =
  "relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wider uppercase transition-colors duration-300 rounded-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-luxury focus-visible:ring-offset-2 focus-visible:ring-offset-primary-bg";

const variants = {
  gold: cn(
    "bg-gradient-to-r from-[#E5A93B] via-[#FFF2B2] to-[#D49324] text-primary-bg font-extrabold",
    "hover:from-[#f0b94e] hover:via-[#fffae0] hover:to-[#e0a234]",
    "shadow-[0_0_20px_rgba(229,169,59,0.45)] hover:shadow-[0_0_30px_rgba(229,169,59,0.7)]",
    "transition-all duration-300",
    // Shimmer overlay
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/30 before:via-transparent before:to-transparent",
    "before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-[cubic-bezier(0.16,1,0.3,1)]"
  ),
  solid: cn(
    "bg-herbal-deep text-cream-white",
    "hover:bg-botanical-green",
    "border border-gold-luxury/20 hover:border-gold-luxury/50",
    "shadow-md"
  ),
  outline: cn(
    "bg-transparent text-cream-white",
    "border border-gold-luxury/30 hover:border-gold-luxury",
    "hover:bg-gold-luxury/8",
    "shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
  ),
};

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3H4a8 8 0 010-16z"
      />
    </svg>
  );
}

export default function Button({
  children,
  href,
  onClick,
  variant = "gold",
  className,
  disabled = false,
  loading = false,
  type = "button",
  target,
  ref,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const combinedStyles = cn(
    baseStyles,
    variants[variant],
    isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  const motionProps = {
    whileHover: isDisabled ? {} : { scale: 1.02 },
    whileTap: isDisabled ? {} : { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  const inner = (
    <>
      {loading && <Spinner />}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.div className="inline-block" {...motionProps}>
        <Link
          href={href}
          ref={ref as Ref<HTMLAnchorElement>}
          className={combinedStyles}
          target={target}
        >
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      ref={ref as Ref<HTMLButtonElement>}
      onClick={onClick}
      className={combinedStyles}
      disabled={isDisabled}
      type={type}
    >
      {inner}
    </motion.button>
  );
}
