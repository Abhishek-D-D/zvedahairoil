"use client";

/**
 * components/checkout/PaymentSelector.tsx
 *
 * Payment mode selector (Razorpay online vs Cash on Delivery),
 * terms-of-service consent checkbox, animated error message,
 * and the primary "Place Order / Pay" submit button.
 *
 * Phase 5: extracted from app/checkout/page.tsx.
 */

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, RefreshCw, AlertCircle } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";
import { formatINR } from "@/utils/formatters";
import type { PaymentMethod } from "@/types/order";

interface PaymentSelectorProps {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  agreed: boolean;
  onAgreedChange: (value: boolean) => void;
  errorMessage: string;
  isSubmitting: boolean;
  onSubmit: () => void;
  totalINR: number;
}

interface PaymentOption {
  id: PaymentMethod;
  title: string;
  subtitle: string;
  icon: typeof CreditCard;
}

const OPTIONS: PaymentOption[] = [
  {
    id: "online",
    title: "Pay Securely Online",
    subtitle: "UPI / Cards / Net Banking",
    icon: CreditCard,
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    subtitle: "Pay with cash at doorsteps",
    icon: RefreshCw,
  },
];

export default function PaymentSelector({
  paymentMethod,
  onPaymentMethodChange,
  agreed,
  onAgreedChange,
  errorMessage,
  isSubmitting,
  onSubmit,
  totalINR,
}: PaymentSelectorProps) {
  const submitLabel =
    paymentMethod === "cod"
      ? "Place Cash On Delivery Order"
      : `Pay Securely: ${formatINR(totalINR, true)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <GlassCard className="border border-gold-luxury/10" hoverEffect={false}>
        <h2 className="text-xl font-bold text-cream-white border-b border-gold-luxury/10 pb-4 mb-6 flex items-center gap-2">
          <span>2.</span> Select Payment Mode
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OPTIONS.map((opt) => (
            <PaymentOptionCard
              key={opt.id}
              option={opt}
              selected={paymentMethod === opt.id}
              onSelect={() => onPaymentMethodChange(opt.id)}
            />
          ))}
        </div>

        {/* Consent */}
        <div className="mt-8 flex items-start gap-3">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => onAgreedChange(e.target.checked)}
            className="w-4 h-4 rounded border-gold-luxury/20 text-gold-luxury focus:ring-gold-luxury/50 mt-1 cursor-pointer"
          />
          <label
            htmlFor="agree"
            className="text-xs text-muted-text leading-relaxed cursor-pointer select-none"
          >
            I agree to receive transactional updates and consent to the{" "}
            <Link href="/terms-and-conditions" className="text-gold-luxury hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-gold-luxury hover:underline">
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        {/* Animated error message */}
        <AnimatePresence mode="wait">
          {errorMessage && (
            <motion.div
              key={errorMessage}
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div
                role="alert"
                className="flex items-start gap-2 mt-4 rounded-lg border border-red-400/30 bg-red-500/5 px-3 py-2"
              >
                <AlertCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-400 text-xs leading-relaxed">{errorMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <div className="mt-6">
          <Button
            onClick={onSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
            variant="gold"
            className="w-full h-14 flex items-center justify-center font-bold tracking-wider"
          >
            {submitLabel}
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ─── Single payment option card ────────────────────────────────────────────────

interface PaymentOptionCardProps {
  option: PaymentOption;
  selected: boolean;
  onSelect: () => void;
}

function PaymentOptionCard({ option, selected, onSelect }: PaymentOptionCardProps) {
  const Icon = option.icon;
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
      className={`relative text-left p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
        selected
          ? "bg-herbal-deep/40 border-gold-luxury shadow-[0_0_15px_rgba(200,169,107,0.15)]"
          : "bg-herbal-deep/5 border-gold-luxury/10 hover:border-gold-luxury/30"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-cream-white">{option.title}</h4>
          <p className="text-xs text-muted-text">{option.subtitle}</p>
        </div>
        <Icon size={18} className="text-gold-luxury" />
      </div>
    </motion.button>
  );
}
