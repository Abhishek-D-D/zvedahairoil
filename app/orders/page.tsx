"use client";

export const dynamic = "force-dynamic";

/**
 * app/orders/page.tsx
 *
 * Protected order history page.
 * Lists all orders for the current user fetched via orderService.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useRequireAuth } from "@/hooks/useAuth";
import { fetchUserOrders } from "@/services/orderService";
import { staggerContainer, fadeUp } from "@/animations/variants";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OrderCard from "@/components/dashboard/OrderCard";
import Button from "@/components/Button";
import type { Order } from "@/types/order";

export default function OrdersPage() {
  const { user, loading: authLoading } = useRequireAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    async function loadOrders() {
      setOrdersLoading(true);
      setError(null);
      try {
        const result = await fetchUserOrders({
          phone: user!.phone ?? undefined,
          email: user!.email ?? undefined,
        });
        setOrders(result);
      } catch {
        setError("Could not load your orders. Please try again.");
      } finally {
        setOrdersLoading(false);
      }
    }

    loadOrders();
  }, [user]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (authLoading || ordersLoading) {
    return (
      <DashboardLayout title="My Orders">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-panel rounded-2xl p-5 border border-gold-luxury/10 animate-pulse h-24"
            />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <DashboardLayout title="My Orders">
        <div className="glass-panel rounded-2xl p-8 border border-red-400/20 text-center">
          <p className="text-red-400 text-sm mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // ── Empty state ────────────────────────────────────────────────────────────
  if (orders.length === 0) {
    return (
      <DashboardLayout
        title="My Orders"
        subtitle="All your Zveda orders in one place"
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-panel rounded-2xl p-12 border border-gold-luxury/10 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-gold-luxury/10 border border-gold-luxury/20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={28} className="text-gold-luxury" />
          </div>
          <h3 className="text-cream-white font-semibold text-lg mb-2">
            No orders yet
          </h3>
          <p className="text-muted-text text-sm mb-8 max-w-xs mx-auto">
            You haven&apos;t placed any orders with Zveda. Discover our
            premium Ayurvedic hair oil today.
          </p>
          <Button href="/product" variant="gold">
            Shop Now
          </Button>
        </motion.div>
      </DashboardLayout>
    );
  }

  // ── Orders list ────────────────────────────────────────────────────────────
  return (
    <DashboardLayout
      title="My Orders"
      subtitle={`${orders.length} order${orders.length !== 1 ? "s" : ""} found`}
    >
      <motion.div
        className="space-y-4"
        variants={staggerContainer(0.08, 0)}
        initial="hidden"
        animate="visible"
      >
        {orders.map((order, index) => (
          <OrderCard key={order.orderId} order={order} delay={index * 0.06} />
        ))}
      </motion.div>
    </DashboardLayout>
  );
}
