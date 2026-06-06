"use client";

export const dynamic = "force-dynamic";

/**
 * app/orders/[orderId]/page.tsx
 *
 * Individual order detail page.
 * Shows full order info, status timeline, and tracking link.
 */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Package, MapPin, Phone, Mail, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRequireAuth } from "@/hooks/useAuth";
import { fetchOrderById } from "@/services/orderService";
import { staggerContainer, fadeUp, scaleIn } from "@/animations/variants";
import { formatINR, formatDate } from "@/utils/formatters";
import { cn } from "@/utils/cn";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Button from "@/components/Button";
import type { Order, OrderStatus } from "@/types/order";

// ─── Order timeline config ────────────────────────────────────────────────────

const TIMELINE_STEPS: { status: OrderStatus; label: string; desc: string }[] = [
  { status: "pending",    label: "Order Placed",    desc: "We've received your order" },
  { status: "confirmed",  label: "Confirmed",        desc: "Order verified and accepted" },
  { status: "processing", label: "Processing",       desc: "Being prepared in our facility" },
  { status: "packed",     label: "Packed",           desc: "Securely packaged for shipping" },
  { status: "shipped",    label: "Shipped",          desc: "On its way to you" },
  { status: "delivered",  label: "Delivered",        desc: "Delivered to your address" },
];

const STATUS_ORDER: OrderStatus[] = [
  "pending", "confirmed", "processing", "packed", "shipped", "delivered",
];

function getStepIndex(status: OrderStatus): number {
  return STATUS_ORDER.indexOf(status);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { user, loading: authLoading } = useRequireAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderLoading, setOrderLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !orderId) return;

    async function load() {
      setOrderLoading(true);
      try {
        const result = await fetchOrderById(orderId, {
          phone: user!.phone ?? undefined,
          email: user!.email ?? undefined,
        });
        setOrder(result);
      } catch {
        setError("Could not load order details.");
      } finally {
        setOrderLoading(false);
      }
    }

    load();
  }, [user, orderId]);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (authLoading || orderLoading) {
    return (
      <DashboardLayout title="Order Details">
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-6 border border-gold-luxury/10 animate-pulse h-48" />
          <div className="glass-panel rounded-2xl p-6 border border-gold-luxury/10 animate-pulse h-64" />
        </div>
      </DashboardLayout>
    );
  }

  // ── Error / not found ──────────────────────────────────────────────────────
  if (error || !order) {
    return (
      <DashboardLayout title="Order Not Found">
        <motion.div variants={fadeUp} initial="hidden" animate="visible"
          className="glass-panel rounded-2xl p-10 border border-gold-luxury/10 text-center"
        >
          <p className="text-muted-text mb-6">
            {error ?? "This order doesn't exist or doesn't belong to your account."}
          </p>
          <Button href="/orders" variant="outline">
            <ArrowLeft size={14} /> Back to Orders
          </Button>
        </motion.div>
      </DashboardLayout>
    );
  }

  const currentStepIndex = getStepIndex(order.orderStatus);

  return (
    <DashboardLayout title="Order Details" subtitle={`Order #${order.orderId}`}>
      <motion.div
        className="space-y-6"
        variants={staggerContainer(0.08, 0)}
        initial="hidden"
        animate="visible"
      >
        {/* ── Status timeline ──────────────────────────────────────────────── */}
        <motion.div
          variants={scaleIn}
          className="glass-panel rounded-2xl p-6 border border-gold-luxury/10"
        >
          <h2 className="text-cream-white font-semibold text-sm mb-6 flex items-center gap-2">
            <Package size={16} className="text-gold-luxury" />
            Order Status
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-4 bottom-4 w-px bg-gold-luxury/10" />

            <div className="space-y-6">
              {TIMELINE_STEPS.map((step, i) => {
                const isCompleted = i <= currentStepIndex;
                const isCurrent = i === currentStepIndex;

                return (
                  <motion.div
                    key={step.status}
                    variants={fadeUp}
                    className="flex items-start gap-4 relative pl-1"
                  >
                    {/* Step dot */}
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 transition-all duration-500",
                        isCompleted
                          ? isCurrent
                            ? "bg-gold-luxury border-gold-luxury shadow-[0_0_16px_rgba(200,169,107,0.5)]"
                            : "bg-gold-luxury/30 border-gold-luxury/60"
                          : "bg-primary-bg border-gold-luxury/20"
                      )}
                    >
                      {isCompleted && !isCurrent && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-luxury" />
                        </svg>
                      )}
                      {isCurrent && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-bg" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="pt-1">
                      <p className={cn(
                        "text-sm font-semibold",
                        isCurrent ? "text-gold-luxury" : isCompleted ? "text-cream-white" : "text-muted-text/50"
                      )}>
                        {step.label}
                        {isCurrent && (
                          <span className="ml-2 text-xs font-normal text-gold-luxury/70 animate-pulse">
                            — Current
                          </span>
                        )}
                      </p>
                      <p className={cn(
                        "text-xs mt-0.5",
                        isCompleted ? "text-muted-text" : "text-muted-text/30"
                      )}>
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Tracking link */}
          {order.trackingId && order.orderStatus === "shipped" && (
            <div className="mt-6 pt-6 border-t border-gold-luxury/10">
              <Button href={`/tracking/${order.trackingId}`} variant="gold" className="w-full sm:w-auto">
                Track Package
              </Button>
            </div>
          )}
        </motion.div>

        {/* ── Order summary ────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="glass-panel rounded-2xl p-6 border border-gold-luxury/10"
        >
          <h2 className="text-cream-white font-semibold text-sm mb-5 flex items-center gap-2">
            <CreditCard size={16} className="text-gold-luxury" />
            Order Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-text text-sm">{order.product}</span>
              <span className="text-cream-white text-sm font-semibold">
                × {order.quantity}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-text text-sm">Shipping</span>
              <span className="text-green-400 text-sm font-semibold">Free</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gold-luxury/10">
              <span className="text-cream-white font-semibold text-sm">Total Paid</span>
              <span className="text-gold-luxury font-bold text-lg">
                {formatINR(order.amount, true)}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gold-luxury/5">
            <p className="text-xs text-muted-text">
              Placed on{" "}
              <span className="text-cream-white">{formatDate(order.createdAt)}</span>
            </p>
          </div>
        </motion.div>

        {/* ── Delivery info ────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="glass-panel rounded-2xl p-6 border border-gold-luxury/10"
        >
          <h2 className="text-cream-white font-semibold text-sm mb-5 flex items-center gap-2">
            <MapPin size={16} className="text-gold-luxury" />
            Delivery Address
          </h2>

          <div className="space-y-2 text-sm">
            <p className="text-cream-white font-semibold">{order.name}</p>
            <p className="text-muted-text">{order.address}</p>
            <p className="text-muted-text">{order.city} — {order.pincode}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <span className="flex items-center gap-1.5 text-muted-text text-xs">
                <Phone size={11} className="text-gold-luxury" /> {order.phone}
              </span>
              <span className="flex items-center gap-1.5 text-muted-text text-xs">
                <Mail size={11} className="text-gold-luxury" /> {order.email}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Back */}
        <motion.div variants={fadeUp}>
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm text-muted-text hover:text-gold-luxury transition-colors"
          >
            <ArrowLeft size={14} /> All Orders
          </Link>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
