"use client";

/**
 * components/auth/ResendTimer.tsx
 *
 * Shows a countdown timer and a resend button for OTP.
 * Disabled during cooldown, enabled when timeLeft reaches 0.
 */

import { motion, AnimatePresence } from "framer-motion";
import { formatCountdown } from "@/utils/formatters";

interface ResendTimerProps {
  timeLeft: number;
  canResend: boolean;
  onResend: () => void;
  isResending?: boolean;
}

export default function ResendTimer({
  timeLeft,
  canResend,
  onResend,
  isResending = false,
}: ResendTimerProps) {
  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      <span className="text-muted-text">Didn&apos;t receive the code?</span>

      <AnimatePresence mode="wait">
        {canResend ? (
          <motion.button
            key="resend"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            onClick={onResend}
            disabled={isResending}
            className="text-gold-luxury font-semibold hover:text-cream-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed underline underline-offset-2"
          >
            {isResending ? "Sending…" : "Resend OTP"}
          </motion.button>
        ) : (
          <motion.span
            key="timer"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-gold-luxury font-semibold tabular-nums"
          >
            Resend in {formatCountdown(timeLeft)}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
