/**
 * services/razorpayService.ts
 *
 * Typed wrapper for the Razorpay browser SDK.
 * Keeps all Razorpay config in one place — no magic strings in components.
 *
 * Usage:
 *   import { openRazorpay } from "@/services/razorpayService";
 *   await openRazorpay({ amount: 998, quantity: 2, prefill: { ... }, onSuccess, onDismiss });
 */

import { rupeesToPaise } from "@/utils/formatters";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RazorpayPrefill {
  name: string;
  email: string;
  contact: string;
}

export interface OpenRazorpayOptions {
  /** Total amount in INR (will be converted to paise internally) */
  amountINR: number;
  quantity: number;
  prefill: RazorpayPrefill;
  onSuccess: (paymentId: string) => void | Promise<void>;
  onDismiss: () => void;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const RAZORPAY_KEY = "rzp_live_DRYLVTwEkDODAu";

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Opens the Razorpay checkout modal.
 * Returns "not_loaded" if the SDK script hasn't been added to the page.
 */
export function openRazorpay(options: OpenRazorpayOptions): "not_loaded" | "opened" {
  if (typeof window === "undefined" || typeof window.Razorpay === "undefined") {
    return "not_loaded";
  }

  const rzpOptions = {
    key: RAZORPAY_KEY,
    amount: rupeesToPaise(options.amountINR).toString(),
    currency: "INR",
    name: "Zveda Oils",
    description: `Zveda Hair Oil — ${options.quantity} Bottle${options.quantity > 1 ? "s" : ""}`,
    image: "/img/Zvedalogo.png",
    handler: async function (response: { razorpay_payment_id: string }) {
      await options.onSuccess(response.razorpay_payment_id);
    },
    prefill: options.prefill,
    theme: { color: "#102415" },
    modal: {
      ondismiss: options.onDismiss,
    },
  };

  try {
    const rzp = new window.Razorpay(rzpOptions);
    rzp.open();
    return "opened";
  } catch (err) {
    console.error("[razorpayService] Failed to open Razorpay:", err);
    return "not_loaded";
  }
}
