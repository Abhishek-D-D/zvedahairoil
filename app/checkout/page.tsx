"use client";

/**
 * app/checkout/page.tsx (Phase 5 rebuild)
 *
 * Clean orchestrator for the checkout flow:
 *   - <ShippingForm>     ← delivery info card
 *   - <PaymentSelector>  ← payment mode + consent + submit
 *   - <OrderSummary>     ← sticky right sidebar
 *   - <OrderSuccessModal>← animated success state
 *
 * Service layer (Phase 4):
 *   - sheetsService.submitOrder()   → Google Sheets logging
 *   - razorpayService.openRazorpay()→ Razorpay modal
 *
 * Validation (Phase 5):
 *   - utils/validators.ts → validateShippingForm + agreed check
 */

import { useState, useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, RefreshCw, Mail, Phone, Clock } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import WhatsAppButton from "@/components/WhatsAppButton";

import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentSelector from "@/components/checkout/PaymentSelector";
import OrderSummary from "@/components/checkout/OrderSummary";
import OrderSuccessModal from "@/components/checkout/OrderSuccessModal";

import { useAuthContext } from "@/providers/AuthProvider";
import { submitOrder, generateCodOrderId } from "@/services/sheetsService";
import { openRazorpay } from "@/services/razorpayService";
import { calculateTotal } from "@/utils/formatters";
import {
  validateShippingForm,
  type ShippingFormData,
} from "@/utils/validators";

import type { OrderPayload, PaymentMethod } from "@/types/order";

// ─── Constants ────────────────────────────────────────────────────────────────

const UNIT_PRICE = 499;

const INITIAL_FORM: ShippingFormData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  pincode: "",
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [formData, setFormData] = useState<ShippingFormData>(INITIAL_FORM);
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderReference, setOrderReference] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const totalINR = calculateTotal(UNIT_PRICE, quantity);

  // ─── Auth Guard & Prefill ──────────────────────────────────────────────────
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/checkout");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || prev.email,
        phone: user.phone ? user.phone.replace(/^\+91/, "").replace(/\D/g, "").trim() : prev.phone,
        name: user.user_metadata?.full_name || user.user_metadata?.name || prev.name,
      }));
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-luxury"></div>
      </div>
    );
  }

  // ─── Handlers ──────────────────────────────────────────────────────────────

  function handleFieldChange(field: keyof ShippingFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage("");
  }

  async function logOrderToSheets(
    paymentId: string,
    method: PaymentMethod
  ): Promise<{ payload: OrderPayload; orderId: string }> {
    const payload: OrderPayload = {
      ...formData,
      paymentId,
      quantity,
      amount: totalINR,
      paymentMethod: method,
    };
    const orderId = method === "cod" ? paymentId : `ZVD-${Date.now()}`;
    await submitOrder(payload);
    return { payload, orderId };
  }

  /** Fire-and-forget: calls the API webhook to send email + WhatsApp */
  function notifyOrderPlaced(order: OrderPayload, orderId: string) {
    const secret = process.env.NEXT_PUBLIC_WEBHOOK_SECRET ?? "";
    fetch("/api/webhooks/order-placed", {
      method: "POST",
      headers: {
        "Content-Type":       "application/json",
        ...(secret ? { "x-webhook-secret": secret } : {}),
      },
      body: JSON.stringify({ order, orderId }),
    }).catch((err) =>
      console.warn("[checkout] Webhook notification failed:", err)
    );
  }

  async function handleOrderSubmission() {
    setErrorMessage("");

    const shippingError = validateShippingForm(formData);
    if (shippingError) {
      setErrorMessage(shippingError);
      return;
    }
    if (!agreed) {
      setErrorMessage(
        "You must agree to the Terms and Conditions to complete your order."
      );
      return;
    }

    setIsSubmitting(true);

    // COD flow
    if (paymentMethod === "cod") {
      const orderId = generateCodOrderId();
      const { payload } = await logOrderToSheets(orderId, "cod");
      notifyOrderPlaced(payload, orderId);  // fire-and-forget
      setOrderReference(orderId);
      setOrderSuccess(true);
      setIsSubmitting(false);
      return;
    }

    // Online (Razorpay) flow
    const result = openRazorpay({
      amountINR: totalINR,
      quantity,
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      onSuccess: async (paymentId) => {
        const { payload, orderId } = await logOrderToSheets(paymentId, "online");
        notifyOrderPlaced(payload, orderId);  // fire-and-forget
        setOrderReference(paymentId);
        setOrderSuccess(true);
        setIsSubmitting(false);
      },
      onDismiss: () => {
        setIsSubmitting(false);
      },
    });

    if (result === "not_loaded") {
      setErrorMessage(
        "Razorpay SDK failed to load. Please check your connection and try again."
      );
      setIsSubmitting(false);
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Navbar />

      <main className="flex-grow pt-28 pb-20 bg-primary-bg min-h-screen relative z-10 text-muted-text">
        <TrustStrip />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-cream-white mb-10 text-center lg:text-left"
          >
            Secure Checkout
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left column */}
            <div className="lg:col-span-8 space-y-8">
              <ShippingForm data={formData} onChange={handleFieldChange} />
              <PaymentSelector
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                agreed={agreed}
                onAgreedChange={setAgreed}
                errorMessage={errorMessage}
                isSubmitting={isSubmitting}
                onSubmit={handleOrderSubmission}
                totalINR={totalINR}
              />
            </div>

            {/* Right column (sticky) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <OrderSummary
                quantity={quantity}
                onQuantityChange={setQuantity}
                unitPrice={UNIT_PRICE}
              />
              <NeedAssistanceCard />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />

      <OrderSuccessModal open={orderSuccess} reference={orderReference} />
    </>
  );
}

// ─── Local presentation components ────────────────────────────────────────────

function TrustStrip() {
  return (
    <div className="bg-herbal-deep border-y border-gold-luxury/10 py-3 mb-10 text-xs tracking-wider text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-6 md:gap-16">
        <span className="flex items-center gap-1.5 text-cream-white">
          <ShieldCheck size={14} className="text-gold-luxury" /> 256-bit SSL Secure checkout
        </span>
        <span className="flex items-center gap-1.5 text-cream-white">
          <Truck size={14} className="text-gold-luxury" /> Free shipping across India
        </span>
        <span className="flex items-center gap-1.5 text-cream-white">
          <RefreshCw size={14} className="text-gold-luxury" /> Cash on Delivery available
        </span>
      </div>
    </div>
  );
}

function NeedAssistanceCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <GlassCard className="border border-gold-luxury/10 p-6 space-y-4" hoverEffect={false}>
        <h3 className="font-heading font-semibold text-cream-white text-base border-b border-gold-luxury/5 pb-2">
          Need Assistance?
        </h3>
        <ul className="space-y-3 text-xs text-muted-text">
          <li className="flex items-center gap-2">
            <Mail size={14} className="text-gold-luxury" />
            <span>zvedaoils@gmail.com</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone size={14} className="text-gold-luxury" />
            <span>+91 73383 48401</span>
          </li>
          <li className="flex items-center gap-2">
            <Clock size={14} className="text-gold-luxury" />
            <span>Mon – Sat: 10:00 AM – 6:00 PM</span>
          </li>
        </ul>
      </GlassCard>
    </motion.div>
  );
}
