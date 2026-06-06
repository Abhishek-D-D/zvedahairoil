"use client";

/**
 * components/checkout/OrderSummary.tsx
 *
 * Sticky right-sidebar order summary card.
 * Shows the product, quantity stepper, subtotal/shipping/grand total.
 *
 * Phase 5: extracted from app/checkout/page.tsx.
 */

import Image from "next/image";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { formatINR, calculateTotal } from "@/utils/formatters";

interface OrderSummaryProps {
  quantity: number;
  onQuantityChange: (q: number) => void;
  unitPrice: number;
  /** Minimum order quantity (default 1). */
  minQuantity?: number;
  /** Maximum order quantity (default 10). */
  maxQuantity?: number;
}

export default function OrderSummary({
  quantity,
  onQuantityChange,
  unitPrice,
  minQuantity = 1,
  maxQuantity = 10,
}: OrderSummaryProps) {
  const totalINR = calculateTotal(unitPrice, quantity);

  function decrement() {
    onQuantityChange(Math.max(minQuantity, quantity - 1));
  }

  function increment() {
    onQuantityChange(Math.min(maxQuantity, quantity + 1));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <GlassCard className="border border-gold-luxury/10" hoverEffect={false}>
        <h3 className="text-lg font-heading font-semibold text-cream-white border-b border-gold-luxury/10 pb-4 mb-4">
          Order Summary
        </h3>

        {/* Product + quantity stepper */}
        <div className="flex gap-4 items-center mb-6">
          <div className="relative w-16 h-16 rounded-xl border border-gold-luxury/15 overflow-hidden p-2 bg-primary-bg/50">
            <Image
              src="/img/ert.png"
              alt="Zveda Hair Oil 200ml"
              fill
              sizes="64px"
              className="object-contain p-1"
            />
          </div>
          <div className="flex-grow">
            <h4 className="font-bold text-sm text-cream-white font-sans">Zveda Hair Oil</h4>
            <p className="text-xs text-muted-text">200ml Bottle</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center border border-gold-luxury/20 rounded-md overflow-hidden bg-primary-bg/30">
                <button
                  type="button"
                  onClick={decrement}
                  disabled={quantity <= minQuantity}
                  aria-label="Decrease quantity"
                  className="px-2 py-0.5 text-xs text-cream-white hover:text-gold-luxury disabled:opacity-30 disabled:hover:text-cream-white focus:outline-none"
                >
                  -
                </button>
                <span className="px-2 text-xs font-bold text-cream-white min-w-[1.5rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={increment}
                  disabled={quantity >= maxQuantity}
                  aria-label="Increase quantity"
                  className="px-2 py-0.5 text-xs text-cream-white hover:text-gold-luxury disabled:opacity-30 disabled:hover:text-cream-white focus:outline-none"
                >
                  +
                </button>
              </div>
              <motion.span
                key={totalINR}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-bold text-gold-luxury"
              >
                {formatINR(totalINR, true)}
              </motion.span>
            </div>
          </div>
        </div>

        {/* Totals breakdown */}
        <div className="space-y-3 text-xs pt-4 border-t border-gold-luxury/5">
          <div className="flex justify-between text-muted-text">
            <span>Subtotal</span>
            <span>{formatINR(totalINR, true)}</span>
          </div>
          <div className="flex justify-between text-muted-text">
            <span>Shipping Fee</span>
            <span className="text-green-500 font-semibold uppercase">Free</span>
          </div>
          <div className="flex justify-between text-cream-white font-bold text-sm pt-2 border-t border-gold-luxury/10">
            <span>Grand Total</span>
            <span className="text-gold-luxury">{formatINR(totalINR, true)}</span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
