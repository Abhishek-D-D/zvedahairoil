"use client";

/**
 * components/tracking/TrackingHeader.tsx
 *
 * Header section for the tracking page.
 * Shows tracking ID, estimated delivery, and a glowing status indicator.
 */

import { motion } from "framer-motion";
import { Truck, Calendar } from "lucide-react";
import { cn } from "@/utils/cn";
import { fadeUp } from "@/animations/variants";
import type { OrderStatus } from "@/types/order";

interface TrackingHeaderProps {
  orderId: string;
  trackingId: string;
  status: OrderStatus;
  estimatedDelivery?: string;
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending:    "Order Received",
  confirmed:  "Order Confirmed",
  processing: "In Production",
  packed:     "Packed & Ready",
  shipped:    "Out for Delivery",
  delivered:  "Delivered ✓",
  cancelled:  "Cancelled",
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending:    "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  confirmed:  "text-blue-400 border-blue-400/30 bg-blue-400/10",
  processing: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  packed:     "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
  shipped:    "text-gold-luxury border-gold-luxury/30 bg-gold-luxury/10",
  delivered:  "text-green-400 border-green-400/30 bg-green-400/10",
  cancelled:  "text-red-400 border-red-400/30 bg-red-400/10",
};

export default function TrackingHeader({
  orderId,
  trackingId,
  status,
  estimatedDelivery,
}: TrackingHeaderProps) {
  const isShipped = status === "shipped";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="glass-panel rounded-2xl p-6 border border-gold-luxury/10 mb-6"
    >
      {/* Animated icon */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-gold-luxury font-semibold mb-2">
            Package Tracking
          </p>
          <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-cream-white">
            {orderId}
          </h1>
        </div>

        {/* Animated truck on shipped */}
        <motion.div
          animate={isShipped ? { x: [0, 4, 0] } : {}}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-12 h-12 rounded-xl bg-gold-luxury/10 border border-gold-luxury/20 flex items-center justify-center flex-shrink-0"
        >
          <Truck size={22} className="text-gold-luxury" />
        </motion.div>
      </div>

      {/* Tracking ID */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-text uppercase tracking-wide mb-1">Tracking ID</p>
          <p className="text-cream-white font-mono text-sm font-semibold">{trackingId}</p>
        </div>

        {estimatedDelivery && (
          <div>
            <p className="text-xs text-muted-text uppercase tracking-wide mb-1">Est. Delivery</p>
            <p className="text-cream-white text-sm font-semibold flex items-center gap-1.5">
              <Calendar size={12} className="text-gold-luxury" />
              {new Date(estimatedDelivery).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "2-digit",
                month: "short",
              })}
            </p>
          </div>
        )}
      </div>

      {/* Status pill */}
      <span
        className={cn(
          "inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border",
          STATUS_COLOR[status]
        )}
      >
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-2 h-2 rounded-full bg-current"
        />
        {STATUS_LABEL[status]}
      </span>
    </motion.div>
  );
}
