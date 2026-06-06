"use client";

/**
 * components/dashboard/OrderCard.tsx
 *
 * A single order row for the orders list page.
 * Shows status badge, product info, amount, and a link to detail.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { formatINR, formatDate } from "@/utils/formatters";
import { fadeUp } from "@/animations/variants";
import type { Order, OrderStatus } from "@/types/order";

// ─── Status badge config ──────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; dot: string }
> = {
  pending:    { label: "Pending",    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",   dot: "bg-yellow-400" },
  confirmed:  { label: "Confirmed",  color: "text-blue-400 bg-blue-400/10 border-blue-400/20",         dot: "bg-blue-400" },
  processing: { label: "Processing", color: "text-purple-400 bg-purple-400/10 border-purple-400/20",   dot: "bg-purple-400" },
  packed:     { label: "Packed",     color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",          dot: "bg-cyan-400" },
  shipped:    { label: "Shipped",    color: "text-gold-luxury bg-gold-luxury/10 border-gold-luxury/20", dot: "bg-gold-luxury" },
  delivered:  { label: "Delivered",  color: "text-green-400 bg-green-400/10 border-green-400/20",       dot: "bg-green-400" },
  cancelled:  { label: "Cancelled",  color: "text-red-400 bg-red-400/10 border-red-400/20",             dot: "bg-red-400" },
};

interface OrderCardProps {
  order: Order;
  /** Animation delay for staggered list entrance */
  delay?: number;
}

export default function OrderCard({ order, delay = 0 }: OrderCardProps) {
  const status = STATUS_CONFIG[order.orderStatus] ?? STATUS_CONFIG.pending;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      <Link
        href={`/orders/${order.orderId}`}
        className={cn(
          "group flex flex-col sm:flex-row items-start sm:items-center gap-4",
          "glass-panel rounded-2xl p-5 border border-gold-luxury/10",
          "hover:border-gold-luxury/30 hover:-translate-y-0.5",
          "transition-all duration-300"
        )}
      >
        {/* Product icon */}
        <div className="w-12 h-12 rounded-xl bg-gold-luxury/10 border border-gold-luxury/20 flex items-center justify-center flex-shrink-0">
          <Package size={20} className="text-gold-luxury" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <p className="text-cream-white font-semibold text-sm truncate">
              {order.product}
            </p>
            {/* Status badge */}
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border",
                status.color
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full", status.dot)} />
              {status.label}
            </span>
          </div>
          <p className="text-muted-text text-xs">
            Order ID: <span className="font-mono text-cream-white/60">{order.orderId}</span>
          </p>
          <p className="text-muted-text text-xs mt-0.5">
            Placed on {formatDate(order.createdAt)} · Qty: {order.quantity}
          </p>
        </div>

        {/* Amount + arrow */}
        <div className="flex items-center gap-3 ml-auto flex-shrink-0">
          <span className="text-gold-luxury font-bold text-base">
            {formatINR(order.amount, true)}
          </span>
          <ChevronRight
            size={16}
            className="text-muted-text group-hover:text-gold-luxury group-hover:translate-x-1 transition-all duration-200"
          />
        </div>
      </Link>
    </motion.div>
  );
}
