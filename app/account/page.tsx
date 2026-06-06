"use client";

export const dynamic = "force-dynamic";

/**
 * app/account/page.tsx  (Phase 6 upgrade)
 *
 * Protected account dashboard — shows ProfileForm and quick links.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, ArrowRight, ShoppingBag } from "lucide-react";
import { useRequireAuth } from "@/hooks/useAuth";
import { staggerContainer, scaleIn, fadeUp } from "@/animations/variants";
import { cn } from "@/utils/cn";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default function AccountPage() {
  const { user, loading } = useRequireAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-2 border-gold-luxury/30 border-t-gold-luxury rounded-full"
        />
      </div>
    );
  }

  if (!user) return null;

  return (
    <DashboardLayout
      title="My Profile"
      subtitle="Manage your personal information"
    >
      <motion.div
        className="space-y-6"
        variants={staggerContainer(0.1, 0)}
        initial="hidden"
        animate="visible"
      >
        {/* Profile form */}
        <ProfileForm user={user} />

        {/* Quick links */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/orders"
            className={cn(
              "group flex items-center gap-4 glass-panel rounded-2xl p-5",
              "border border-gold-luxury/10 hover:border-gold-luxury/30",
              "hover:-translate-y-0.5 transition-all duration-300"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-gold-luxury/10 border border-gold-luxury/20 flex items-center justify-center">
              <Package size={18} className="text-gold-luxury" />
            </div>
            <div>
              <p className="text-cream-white font-semibold text-sm">My Orders</p>
              <p className="text-muted-text text-xs mt-0.5">View order history</p>
            </div>
            <ArrowRight
              size={15}
              className="ml-auto text-muted-text group-hover:text-gold-luxury group-hover:translate-x-1 transition-all"
            />
          </Link>

          <Link
            href="/checkout"
            className={cn(
              "group flex items-center gap-4 glass-panel rounded-2xl p-5",
              "border border-gold-luxury/10 hover:border-gold-luxury/30",
              "hover:-translate-y-0.5 transition-all duration-300"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-gold-luxury/10 border border-gold-luxury/20 flex items-center justify-center">
              <ShoppingBag size={18} className="text-gold-luxury" />
            </div>
            <div>
              <p className="text-cream-white font-semibold text-sm">Shop Now</p>
              <p className="text-muted-text text-xs mt-0.5">Place a new order</p>
            </div>
            <ArrowRight
              size={15}
              className="ml-auto text-muted-text group-hover:text-gold-luxury group-hover:translate-x-1 transition-all"
            />
          </Link>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
