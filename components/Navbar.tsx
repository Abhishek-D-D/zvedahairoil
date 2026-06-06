"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X, ShoppingBag, Package2, LogOut, User } from "lucide-react";
import { useLenis } from "@/providers/LenisProvider";
import { useAuthContext } from "@/providers/AuthProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const pillRef = useRef<HTMLDivElement>(null);
  const { lenis } = useLenis();
  const { user, signOut } = useAuthContext();

  const userInitial = user?.email?.charAt(0).toUpperCase() ?? user?.user_metadata?.full_name?.charAt(0).toUpperCase() ?? "U";

  async function handleSignOut() {
    setIsMobileMenuOpen(false);
    await signOut();
    router.push("/");
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll and halt Lenis tracking when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isMobileMenuOpen, lenis]);

  const navLinks = [
    { name: "Home", href: "/", emoji: "🏡" },
    { name: "The Ritual", href: "/taila-paka-vidhi", emoji: "🪷" },
    { name: "Hair Oil", href: "/product", emoji: "✨" },
  ];

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes navFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes menuSlide {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes goldPulse {
          0%, 100% { box-shadow: 0 0 0px rgba(200,169,107,0); }
          50%       { box-shadow: 0 0 18px rgba(200,169,107,0.35); }
        }
        .nav-pill {
          animation: navFadeIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .shimmer-text {
          background: linear-gradient(90deg, #C8A96B 0%, #F4EFE6 40%, #C8A96B 60%, #B89047 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .shop-btn-glow {
          animation: goldPulse 3s ease-in-out infinite;
        }
        .link-indicator {
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
        }
        .mobile-overlay {
          transition: opacity 0.4s ease, visibility 0.4s ease;
        }
        .mobile-menu-inner {
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* ── Top gold accent line ─────────────────────────────────────────── */}
        <div
          className="w-full h-[2px] pointer-events-none transition-opacity duration-500"
          style={{
            background: "linear-gradient(90deg, transparent, #C8A96B 30%, #F4EFE6 50%, #C8A96B 70%, transparent)",
            opacity: isScrolled ? 1 : 0.6,
          }}
        />

        {/* ── Main nav bar ─────────────────────────────────────────────────── */}
        <div
          className="pointer-events-auto transition-all duration-500"
          style={{
            background: isScrolled
              ? "rgba(11, 20, 13, 0.92)"
              : "rgba(11, 20, 13, 0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: isScrolled
              ? "0 4px 32px rgba(0,0,0,0.45), inset 0 -1px 0 rgba(200,169,107,0.15)"
              : "none",
          }}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16 md:h-[70px]">

            {/* ── Logo ──────────────────────────────────────────────────────── */}
            <Link href="/" className="relative z-10 flex items-center gap-2 group shrink-0">
              <div
                className="relative"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(200,169,107,0.3))",
                  transition: "filter 0.3s ease",
                }}
              >
                <Image
                  src="/img/Zvedalogo.png"
                  alt="Zveda Logo"
                  width={130}
                  height={38}
                  className="object-contain h-8 md:h-9 w-auto transition-opacity duration-300 group-hover:opacity-90"
                  priority
                />
              </div>
              {/* Subtle tagline below logo on desktop */}
              <span
                className="hidden xl:block text-[9px] tracking-[0.25em] uppercase leading-none mt-0.5 self-end mb-1"
                style={{ color: "rgba(200,169,107,0.65)" }}
              >
                Pure Ayurveda
              </span>
            </Link>

            {/* ── Desktop: Pill Navigation ──────────────────────────────────── */}
            <nav
              ref={pillRef}
              className="nav-pill hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full"
              style={{
                background: "rgba(200,169,107,0.06)",
                border: "1px solid rgba(200,169,107,0.14)",
              }}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isHovered = hoveredLink === link.name;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300"
                    style={{
                      color: isActive ? "#0B140D" : isHovered ? "#F4EFE6" : "rgba(244,239,230,0.65)",
                      background: isActive
                        ? "linear-gradient(135deg, #C8A96B, #B89047)"
                        : isHovered
                        ? "rgba(200,169,107,0.1)"
                        : "transparent",
                      boxShadow: isActive
                        ? "0 2px 12px rgba(200,169,107,0.35)"
                        : "none",
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop: CTA / Auth ───────────────────────────────────────── */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              {user ? (
                <>
                  {/* Orders */}
                  <Link
                    href="/orders"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:bg-gold-luxury/10"
                    style={{ color: "rgba(200,169,107,0.85)" }}
                  >
                    <Package2 size={12} strokeWidth={2.5} />
                    Orders
                  </Link>

                  {/* Account avatar */}
                  <Link
                    href="/account"
                    title="My Account"
                    className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs shrink-0 transition-all duration-300 hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, #C8A96B, #B89047)",
                      color: "#0B140D",
                      boxShadow: "0 0 14px rgba(200,169,107,0.4)",
                    }}
                  >
                    {userInitial}
                  </Link>

                  {/* Sign out */}
                  <button
                    onClick={handleSignOut}
                    title="Sign out"
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:bg-red-500/10"
                    style={{ color: "rgba(244,239,230,0.45)" }}
                  >
                    <LogOut size={14} strokeWidth={2} />
                  </button>

                  {/* Shop Now */}
                  <Link
                    href="/checkout"
                    className="shop-btn-glow flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #C8A96B 0%, #B89047 50%, #C8A96B 100%)",
                      backgroundSize: "200% auto",
                      color: "#0B140D",
                    }}
                  >
                    <ShoppingBag size={12} strokeWidth={2.5} />
                    Shop Now
                  </Link>
                </>
              ) : (
                <>
                  {/* Login */}
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:bg-gold-luxury/10"
                    style={{ color: "rgba(200,169,107,0.85)" }}
                  >
                    <User size={12} strokeWidth={2.5} />
                    Login
                  </Link>

                  {/* Shop Now → login redirect */}
                  <Link
                    href="/login?redirect=/checkout"
                    className="shop-btn-glow flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #C8A96B 0%, #B89047 50%, #C8A96B 100%)",
                      backgroundSize: "200% auto",
                      color: "#0B140D",
                    }}
                  >
                    <ShoppingBag size={12} strokeWidth={2.5} />
                    Shop Now
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile: Cart icon + Hamburger ────────────────────────────── */}
            <div className="flex md:hidden items-center gap-2 shrink-0">
              {user ? (
                /* Account avatar (mobile) */
                <Link
                  href="/account"
                  className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #C8A96B, #B89047)",
                    color: "#0B140D",
                    boxShadow: "0 0 10px rgba(200,169,107,0.35)",
                  }}
                >
                  {userInitial}
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 hover:bg-gold-luxury/10"
                  aria-label="Login"
                  style={{ color: "#C8A96B" }}
                >
                  <User size={18} strokeWidth={2} />
                </Link>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
                style={{
                  background: isMobileMenuOpen
                    ? "rgba(200,169,107,0.15)"
                    : "transparent",
                  color: "#F4EFE6",
                  border: "1px solid rgba(200,169,107,0.2)",
                }}
                aria-label="Toggle Menu"
              >
                <span
                  style={{
                    transition: "transform 0.3s ease, opacity 0.2s ease",
                    display: "flex",
                    transform: isMobileMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                >
                  {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen menu overlay ─────────────────────────────────── */}
      <div
        className="mobile-overlay fixed inset-0 z-40 md:hidden"
        style={{
          opacity: isMobileMenuOpen ? 1 : 0,
          visibility: isMobileMenuOpen ? "visible" : "hidden",
          background: "rgba(11,20,13,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Decorative gold blur orb */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(200,169,107,0.10) 0%, transparent 70%)",
            transform: "translate(-50%, -30%)",
          }}
        />

        <div
          className="mobile-menu-inner flex flex-col h-full px-8 pt-24 pb-12"
          style={{
            transform: isMobileMenuOpen ? "translateY(0) scale(1)" : "translateY(-12px) scale(0.98)",
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
        >
          {/* Gold divider */}
          <div
            className="w-12 h-[1px] mb-10"
            style={{ background: "linear-gradient(90deg, #C8A96B, transparent)" }}
          />

          <nav className="flex flex-col gap-2 flex-1">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300"
                  style={{
                    background: isActive
                      ? "rgba(200,169,107,0.12)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(200,169,107,0.25)"
                      : "1px solid transparent",
                    animationDelay: `${i * 0.06}s`,
                    animation: isMobileMenuOpen ? `menuSlide 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s both` : "none",
                  }}
                >
                  <span className="text-2xl">{link.emoji}</span>
                  <span
                    className="text-xl font-bold tracking-tight"
                    style={{
                      color: isActive ? "#C8A96B" : "rgba(244,239,230,0.85)",
                    }}
                  >
                    {link.name}
                  </span>
                  {isActive && (
                    <span
                      className="ml-auto text-xs font-semibold tracking-widest uppercase"
                      style={{ color: "rgba(200,169,107,0.5)" }}
                    >
                      Active
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Auth-specific mobile links */}
            {user ? (
              <>
                <div className="h-[1px] my-2" style={{ background: "rgba(200,169,107,0.12)" }} />
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300"
                  style={{
                    background: pathname === "/account" ? "rgba(200,169,107,0.12)" : "transparent",
                    border: pathname === "/account" ? "1px solid rgba(200,169,107,0.25)" : "1px solid transparent",
                  }}
                >
                  <span className="text-2xl">👤</span>
                  <span className="text-xl font-bold tracking-tight" style={{ color: "rgba(244,239,230,0.85)" }}>My Account</span>
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300"
                  style={{
                    background: pathname === "/orders" ? "rgba(200,169,107,0.12)" : "transparent",
                    border: pathname === "/orders" ? "1px solid rgba(200,169,107,0.25)" : "1px solid transparent",
                  }}
                >
                  <span className="text-2xl">📦</span>
                  <span className="text-xl font-bold tracking-tight" style={{ color: "rgba(244,239,230,0.85)" }}>My Orders</span>
                </Link>
              </>
            ) : (
              <>
                <div className="h-[1px] my-2" style={{ background: "rgba(200,169,107,0.12)" }} />
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300"
                  style={{ border: "1px solid transparent" }}
                >
                  <span className="text-2xl">🔑</span>
                  <span className="text-xl font-bold tracking-tight" style={{ color: "rgba(244,239,230,0.85)" }}>Login / Sign Up</span>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile CTA */}
          <div className="space-y-3">
            <div
              className="h-[1px] mb-6"
              style={{ background: "linear-gradient(90deg, transparent, rgba(200,169,107,0.2), transparent)" }}
            />
            <Link
              href={user ? "/checkout" : "/login?redirect=/checkout"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #C8A96B, #B89047)",
                color: "#0B140D",
                boxShadow: "0 8px 24px rgba(200,169,107,0.3)",
              }}
            >
              <ShoppingBag size={16} strokeWidth={2.5} />
              {user ? "Shop Zveda Oil" : "Shop Now"}
            </Link>
            {user && (
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-semibold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 border"
                style={{
                  borderColor: "rgba(239,68,68,0.2)",
                  color: "rgba(239,68,68,0.7)",
                }}
              >
                <LogOut size={14} strokeWidth={2} />
                Sign Out
              </button>
            )}
            <p
              className="text-center text-[10px] tracking-widest uppercase"
              style={{ color: "rgba(200,169,107,0.4)" }}
            >
              ✦ Free shipping on orders over ₹499 ✦
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
