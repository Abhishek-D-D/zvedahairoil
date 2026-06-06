"use client";

export const dynamic = "force-dynamic";

/**
 * app/tracking/[trackingId]/page.tsx
 *
 * Public order tracking page — accessible without login.
 * Anyone with a tracking ID can view their package status.
 *
 * Route: /tracking/IND123456789
 */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrackingHeader from "@/components/tracking/TrackingHeader";
import TrackingTimeline from "@/components/tracking/TrackingTimeline";
import Button from "@/components/Button";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { cn } from "@/utils/cn";
import type { TrackingInfo, OrderStatus } from "@/types/order";

// ─── Mock tracking resolver ───────────────────────────────────────────────────
// In production: replace with a real API call to your Apps Script / backend.

const MOCK_TRACKING: Record<string, TrackingInfo> = {
  "IND123456789": {
    orderId:           "ZVD-20240601-103045",
    trackingId:        "IND123456789",
    currentStatus:     "shipped",
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    steps: buildSteps("shipped"),
  },
  "IND987654321": {
    orderId:           "ZVD-20240515-084512",
    trackingId:        "IND987654321",
    currentStatus:     "delivered",
    steps:             buildSteps("delivered"),
  },
};

function buildSteps(currentStatus: OrderStatus) {
  const STATUS_SEQ: OrderStatus[] = [
    "pending", "confirmed", "processing", "packed", "shipped", "delivered",
  ];
  const LABELS: Record<OrderStatus, { label: string; description: string }> = {
    pending:    { label: "Order Placed",   description: "Your order has been received" },
    confirmed:  { label: "Confirmed",       description: "Order verified and accepted" },
    processing: { label: "Processing",      description: "Being prepared at our facility" },
    packed:     { label: "Packed",          description: "Securely packaged for shipment" },
    shipped:    { label: "Shipped",         description: "On its way to your address" },
    delivered:  { label: "Delivered",       description: "Successfully delivered" },
    cancelled:  { label: "Cancelled",       description: "Order was cancelled" },
  };

  const currentIndex = STATUS_SEQ.indexOf(currentStatus);

  return STATUS_SEQ.map((status, i) => ({
    status,
    label:       LABELS[status].label,
    description: LABELS[status].description,
    completed:   i <= currentIndex,
    active:      i === currentIndex,
    timestamp:   i <= currentIndex
      ? new Date(Date.now() - (currentIndex - i) * 24 * 60 * 60 * 1000).toISOString()
      : undefined,
  }));
}

async function resolveTracking(trackingId: string): Promise<TrackingInfo | null> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 700));

  const appsScriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
  if (appsScriptUrl) {
    try {
      const res = await fetch(
        `${appsScriptUrl}?trackingId=${encodeURIComponent(trackingId)}`,
        { cache: "no-store" }
      );
      if (res.ok) return (await res.json()) as TrackingInfo;
    } catch {
      // Fall through to mock
    }
  }

  return MOCK_TRACKING[trackingId] ?? null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TrackingPage() {
  const { trackingId } = useParams<{ trackingId: string }>();
  const [info, setInfo] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!trackingId) return;

    resolveTracking(trackingId).then((result) => {
      setInfo(result);
      setNotFound(!result);
      setLoading(false);
    });
  }, [trackingId]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          {/* ── Loading ──────────────────────────────────────────────────── */}
          {loading && (
            <div className="space-y-4">
              <div className="glass-panel rounded-2xl p-6 border border-gold-luxury/10 animate-pulse h-40" />
              <div className="glass-panel rounded-2xl p-6 border border-gold-luxury/10 animate-pulse h-72" />
            </div>
          )}

          {/* ── Not found ────────────────────────────────────────────────── */}
          {!loading && notFound && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="glass-panel rounded-2xl p-12 border border-gold-luxury/10 text-center"
            >
              <p className="text-4xl mb-4">📦</p>
              <h1 className="text-cream-white font-heading font-semibold text-2xl mb-3">
                Tracking ID Not Found
              </h1>
              <p className="text-muted-text text-sm mb-8 max-w-xs mx-auto">
                We couldn&apos;t find a package with tracking ID{" "}
                <span className="font-mono text-cream-white">{trackingId}</span>.
                Please check your order confirmation email.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button href="/orders" variant="gold">View My Orders</Button>
                <Button href="/contact" variant="outline">Contact Support</Button>
              </div>
            </motion.div>
          )}

          {/* ── Tracking info ─────────────────────────────────────────────── */}
          {!loading && info && (
            <motion.div
              variants={staggerContainer(0.1, 0)}
              initial="hidden"
              animate="visible"
            >
              <TrackingHeader
                orderId={info.orderId}
                trackingId={info.trackingId}
                status={info.currentStatus}
                estimatedDelivery={info.estimatedDelivery}
              />

              <motion.div
                variants={fadeUp}
                className="glass-panel rounded-2xl p-6 border border-gold-luxury/10 mb-6"
              >
                <h2 className="text-cream-white font-semibold text-sm mb-6">
                  Delivery Progress
                </h2>
                <TrackingTimeline steps={info.steps} />
              </motion.div>

              {/* Help */}
              <motion.div
                variants={fadeUp}
                className={cn(
                  "glass-panel rounded-2xl p-5 border border-gold-luxury/10",
                  "flex flex-col sm:flex-row items-start sm:items-center gap-4"
                )}
              >
                <div>
                  <p className="text-cream-white text-sm font-semibold">Need help?</p>
                  <p className="text-muted-text text-xs mt-0.5">
                    Contact our support team with your tracking ID.
                  </p>
                </div>
                <div className="flex gap-3 sm:ml-auto flex-shrink-0">
                  <Button href="/contact" variant="outline" className="text-xs px-4 py-2">
                    Contact Us
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
