"use client";

/**
 * components/dashboard/DashboardLayout.tsx
 *
 * Shared sidebar + content layout for all dashboard pages.
 * Renders a left navigation sidebar on desktop, bottom tab bar on mobile.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { User, Package, LogOut, ArrowLeft, ShoppingBag } from "lucide-react";
import { useAuthContext } from "@/providers/AuthProvider";
import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/account", label: "Profile", icon: User },
  { href: "/orders", label: "My Orders", icon: Package },
  { href: "/checkout", label: "Shop Now", icon: ShoppingBag },
];

interface DashboardLayoutProps {
  children: ReactNode;
  /** Page title shown in the header */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
}

export default function DashboardLayout({
  children,
  title,
  subtitle,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const { signOut } = useAuthContext();

  return (
    <div className="min-h-screen bg-primary-bg pt-24 pb-24 lg:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar (desktop) ──────────────────────────────────────────── */}
          <aside className="hidden lg:flex flex-col w-56 flex-shrink-0">
            {/* Brand */}
            <div className="mb-8">
              <Link
                href="/"
                className="flex items-center gap-2 text-muted-text hover:text-gold-luxury transition-colors text-sm"
              >
                <ArrowLeft size={14} />
                Back to Store
              </Link>
            </div>

            {/* Nav links */}
            <nav className="space-y-1">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gold-luxury/10 text-gold-luxury border border-gold-luxury/20"
                        : "text-muted-text hover:text-cream-white hover:bg-white/5"
                    )}
                  >
                    <Icon size={16} />
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="ml-auto w-1 h-4 rounded-full bg-gold-luxury"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Sign out */}
            <button
              onClick={signOut}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-text hover:text-red-400 transition-colors mt-auto"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </aside>

          {/* ── Main content ──────────────────────────────────────────────── */}
          <main className="flex-1 min-w-0">
            {/* Page header */}
            <div className="mb-8">
              <p className="text-xs tracking-[0.2em] uppercase text-gold-luxury font-semibold mb-2">
                My Account
              </p>
              <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-cream-white">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted-text text-sm mt-1">{subtitle}</p>
              )}
            </div>

            {children}
          </main>
        </div>
      </div>

      {/* ── Bottom nav (mobile) ─────────────────────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-primary-bg/90 backdrop-blur-md border-t border-gold-luxury/10">
        <div className="flex items-center justify-around py-3 px-4">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-1 text-xs font-medium transition-colors",
                  isActive ? "text-gold-luxury" : "text-muted-text"
                )}
              >
                <Icon size={20} />
                {label}
              </Link>
            );
          })}
          <button
            onClick={signOut}
            className="flex flex-col items-center gap-1 px-4 py-1 text-xs font-medium text-muted-text hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            Sign out
          </button>
        </div>
      </nav>
    </div>
  );
}
