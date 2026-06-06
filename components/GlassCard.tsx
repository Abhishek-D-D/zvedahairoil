"use client";

/**
 * components/GlassCard.tsx (upgraded)
 *
 * Premium glassmorphism card with:
 * - padding and rounded variants
 * - Optional Framer Motion scroll-triggered entry animation
 * - Optional hover lift effect
 */

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { scaleIn } from "@/animations/variants";
import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Inner padding preset */
  padding?: "none" | "sm" | "md" | "lg";
  /** Border radius preset */
  rounded?: "lg" | "xl" | "2xl" | "3xl";
  /** Lift and glow on hover */
  hoverEffect?: boolean;
  /** Animate in on scroll */
  animate?: boolean;
  /** Delay for staggered entrances */
  animationDelay?: number;
  onClick?: () => void;
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const roundedClasses = {
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

export default function GlassCard({
  children,
  className,
  padding = "md",
  rounded = "2xl",
  hoverEffect = true,
  animate = false,
  animationDelay = 0,
  onClick,
}: GlassCardProps) {
  const baseClasses = cn(
    "glass-panel",
    roundedClasses[rounded],
    paddingClasses[padding],
    hoverEffect && "glass-panel-hover",
    onClick && "cursor-pointer",
    className
  );

  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: animationDelay }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  );
}
