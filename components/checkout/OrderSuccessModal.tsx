"use client";

/**
 * components/checkout/OrderSuccessModal.tsx
 *
 * Animated post-order confirmation modal.
 * Mounted/unmounted by an AnimatePresence in the parent.
 *
 * Phase 5: extracted from app/checkout/page.tsx.
 */

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";

interface OrderSuccessModalProps {
  open: boolean;
  /** Optional human-friendly order reference (e.g. "ZVD-20240115-103045" or "pay_xxx"). */
  reference?: string;
  /** Optional override for the homepage CTA link. */
  homeHref?: string;
}

export default function OrderSuccessModal({
  open,
  reference,
  homeHref = "/",
}: OrderSuccessModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary-bg/95 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: "spring" as const, damping: 25, stiffness: 350 }}
            className="max-w-md w-full"
          >
            <GlassCard
              className="border border-gold-luxury text-center p-8 space-y-6"
              hoverEffect={false}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring" as const, damping: 12 }}
                className="w-16 h-16 rounded-full bg-gold-luxury/10 text-gold-luxury flex items-center justify-center mx-auto shadow-inner"
              >
                <CheckCircle size={36} />
              </motion.div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-cream-white font-heading">
                  Order Placed Successfully!
                </h3>
                <p className="text-sm text-muted-text leading-relaxed">
                  Thank you for choosing Zveda. Your order has been securely logged and will be
                  dispatched via express tracking. Expect delivery in 3 to 7 working days.
                </p>
                {reference && (
                  <p className="text-xs text-muted-text/80 pt-2">
                    Reference:{" "}
                    <span className="font-mono text-gold-luxury">{reference}</span>
                  </p>
                )}
              </div>
              <div className="pt-2">
                <Button href={homeHref} variant="gold" className="w-full">
                  Return to Homepage
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
