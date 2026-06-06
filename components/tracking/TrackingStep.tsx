"use client";

/**
 * components/tracking/TrackingStep.tsx
 *
 * A single step in the order tracking timeline.
 * Used by TrackingTimeline.tsx.
 */

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { TrackingStep as TrackingStepType } from "@/types/order";

interface TrackingStepProps {
  step: TrackingStepType;
  isLast: boolean;
  index: number;
}

const STATUS_ICONS: Record<string, string> = {
  pending:    "📋",
  confirmed:  "✅",
  processing: "⚙️",
  packed:     "📦",
  shipped:    "🚚",
  delivered:  "🏠",
  cancelled:  "❌",
};

export default function TrackingStep({
  step,
  isLast,
  index,
}: TrackingStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 relative"
    >
      {/* Left column: dot + connecting line */}
      <div className="flex flex-col items-center flex-shrink-0 w-10">
        {/* Step dot */}
        <div
          className={cn(
            "w-10 h-10 rounded-full border-2 flex items-center justify-center text-base z-10 transition-all duration-700",
            step.active
              ? "border-gold-luxury bg-gold-luxury/20 shadow-[0_0_20px_rgba(200,169,107,0.4)]"
              : step.completed
              ? "border-gold-luxury/60 bg-gold-luxury/10"
              : "border-gold-luxury/10 bg-primary-bg"
          )}
        >
          {step.completed || step.active ? (
            <span className="text-sm">{STATUS_ICONS[step.status] ?? "•"}</span>
          ) : (
            <span className="w-2 h-2 rounded-full bg-gold-luxury/20" />
          )}
        </div>

        {/* Connecting line */}
        {!isLast && (
          <div className="flex-1 w-px mt-1 min-h-[2rem]">
            <motion.div
              className="w-full h-full"
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: step.completed ? 1 : 0.3 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              style={{
                background: step.completed
                  ? "linear-gradient(to bottom, rgba(200,169,107,0.6), rgba(200,169,107,0.1))"
                  : "rgba(200,169,107,0.08)",
              }}
            />
          </div>
        )}
      </div>

      {/* Right column: text content */}
      <div className="pb-8 pt-1.5 flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-semibold transition-colors",
            step.active
              ? "text-gold-luxury"
              : step.completed
              ? "text-cream-white"
              : "text-muted-text/40"
          )}
        >
          {step.label}
          {step.active && (
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="ml-2 text-xs font-normal text-gold-luxury/70"
            >
              — In Progress
            </motion.span>
          )}
        </p>
        <p
          className={cn(
            "text-xs mt-0.5",
            step.completed || step.active
              ? "text-muted-text"
              : "text-muted-text/25"
          )}
        >
          {step.description}
        </p>
        {step.timestamp && (
          <p className="text-xs text-gold-luxury/60 mt-1 font-mono">
            {new Date(step.timestamp).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </motion.div>
  );
}
