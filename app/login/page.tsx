"use client";

/**
 * app/login/page.tsx
 *
 * Premium ZVEDA login page with 3 auth methods:
 * 1. 📱 Mobile OTP (default tab — most common for Indian users)
 * 2. 📧 Email + Password
 * 3. 🔵 Google OAuth
 */

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import PhoneInput from "@/components/auth/PhoneInput";
import OtpInput from "@/components/auth/OtpInput";
import ResendTimer from "@/components/auth/ResendTimer";
import SocialButton from "@/components/auth/SocialButton";
import Button from "@/components/Button";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { validateEmail, validatePassword, validatePhone } from "@/utils/validators";
import {
  signInWithEmail,
  signInWithGoogle,
} from "@/services/authService";
import { useOtp } from "@/hooks/useOtp";
import type { AuthTab } from "@/types/user";

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS: { id: AuthTab; label: string; emoji: string }[] = [
  { id: "phone", label: "Mobile", emoji: "📱" },
  { id: "email", label: "Email", emoji: "📧" },
  { id: "google", label: "Google", emoji: "🔵" },
];

// ─── Inner component (uses useSearchParams) ───────────────────────────────────
function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/account";

  const [activeTab, setActiveTab] = useState<AuthTab>("email");
  const [phone, setPhone] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [otpError, setOtpError] = useState(false);

  const otp = useOtp();

  // ─── Handlers ───────────────────────────────────────────────────────────────

  async function handleSendOtp() {
    const phoneError = validatePhone(phone);
    if (phoneError) return;
    await otp.sendOtp(phone);
  }

  async function handleVerifyOtp() {
    if (otpValue.length < 6) return;
    setOtpError(false);
    const success = await otp.verifyOtp(otpValue);
    if (success) {
      setSuccessMessage("Signed in! Redirecting…");
      setTimeout(() => router.push(redirect), 1000);
    } else {
      setOtpError(true);
      setOtpValue("");
    }
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    if (eErr) { setEmailError(eErr); return; }
    if (pErr) { setPasswordError(pErr); return; }

    setEmailLoading(true);
    const result = await signInWithEmail(email, password);
    setEmailLoading(false);

    if (!result.success) {
      setEmailError(result.error ?? "Invalid credentials. Please try again.");
      return;
    }

    setSuccessMessage("Signed in! Redirecting…");
    setTimeout(() => router.push(redirect), 800);
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    await signInWithGoogle();
    // Page will redirect — no need to setGoogleLoading(false)
  }

  function handleTabChange(tab: AuthTab) {
    setActiveTab(tab);
    otp.reset();
    setOtpValue("");
    setEmailError(null);
    setPasswordError(null);
    setOtpError(false);
  }

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left — Branding (desktop only) */}
      <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center overflow-hidden bg-herbal-deep/60">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/img/hero-image.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-bg/20 via-transparent to-primary-bg/80" />

        <motion.div
          className="relative z-10 text-center px-10 py-12 rounded-3xl border border-gold-luxury/10 bg-primary-bg/45 backdrop-blur-md max-w-sm mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          variants={staggerContainer(0.15, 0.3)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="mb-8 flex justify-center">
            <div className="relative flex items-center justify-center">
              {/* Soft gold aura */}
              <div
                style={{
                  position: "absolute",
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(200,169,107,0.12) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <Image
                src="/img/Zvedalogo.png"
                alt="Zveda"
                width={110}
                height={110}
                className="relative"
                style={{
                  filter: "brightness(0) invert(0.9) drop-shadow(0 2px 10px rgba(200,169,107,0.3))",
                  opacity: 0.95
                }}
              />
            </div>
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-heading text-4xl font-semibold text-cream-white mb-4 leading-tight">
            Welcome back to<br />
            <em className="font-editorial font-light text-gold-luxury not-italic">your ritual</em>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-muted-text text-base leading-relaxed max-w-xs mx-auto">
            Track your orders, manage your profile, and experience the Parampar journey.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Mobile: Hero branding strip ──────────────────────────────────────── */}
      <div className="lg:hidden relative flex-shrink-0" style={{ height: "42vh", minHeight: 280 }}>
        {/* Full-bleed hero image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/img/hero-image.png')" }}
        />
        {/* Gradient overlay: dark at top and bottom, lighter in middle */}
        <div className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(11,20,13,0.55) 0%, rgba(11,20,13,0.1) 40%, rgba(11,20,13,0.7) 100%)"
          }}
        />
        {/* Logo + micro tagline */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <Link href="/">
            <Image
              src="/img/Zvedalogo.png"
              alt="Zveda"
              width={90}
              height={90}
              style={{
                filter: "brightness(0) invert(0.9) drop-shadow(0 2px 10px rgba(200,169,107,0.3))",
                opacity: 0.95
              }}
            />
          </Link>
          <span className="text-[10px] tracking-[0.35em] uppercase font-semibold"
            style={{ color: "rgba(200,169,107,0.85)", textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
          >
            ✦ Pure Ayurveda ✦
          </span>
        </div>
      </div>

      {/* Right — Auth form */}
      <div className="flex-1 flex items-center lg:justify-center lg:py-0"
        style={{
          background: "var(--color-primary-bg, #0B140D)",
        }}
      >
        {/* Bottom-sheet card on mobile, centered panel on desktop */}
        <div
          className="w-full lg:max-w-md lg:mx-auto px-6 pt-8 pb-20 lg:pb-8"
          style={{
            borderRadius: "24px 24px 0 0",
            marginTop: "-20px",
            background: "var(--color-primary-bg, #0B140D)",
          }}
        >
        <motion.div
          className="w-full"
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate="visible"
        >


          {/* Heading */}
          <motion.div variants={fadeUp} className="mb-8 text-center lg:text-left">
            <h2 className="font-heading text-3xl font-semibold text-cream-white mb-2">Sign in</h2>
            <p className="text-muted-text text-sm">
              New to Zveda?{" "}
              <Link href={`/signup?redirect=${encodeURIComponent(redirect)}`} className="text-gold-luxury hover:text-cream-white transition-colors font-semibold">
                Create account
              </Link>
            </p>
          </motion.div>

          {/* Tab switcher */}
          <motion.div variants={fadeUp} className="flex bg-herbal-deep/60 rounded-xl p-1 mb-8 border border-gold-luxury/10">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gold-luxury text-primary-bg shadow-[0_2px_12px_rgba(200,169,107,0.3)]"
                    : "text-muted-text hover:text-cream-white"
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Success Banner */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mb-6 p-4 rounded-xl bg-botanical-green/20 border border-botanical-green/40 text-botanical-green text-sm font-semibold text-center"
              >
                ✓ {successMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tab Content */}
          <AnimatePresence mode="wait">

            {/* ── Phone OTP ─────────────────────────────────────── */}
            {activeTab === "phone" && (
              <motion.div
                key="phone-tab"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {otp.step === "idle" || otp.step === "sending" || otp.step === "error" ? (
                  <>
                    <PhoneInput
                      value={phone}
                      onChange={setPhone}
                      disabled={otp.step === "sending"}
                      autoFocus
                    />

                    {otp.error && (
                      <p className="text-red-400 text-sm bg-red-900/20 border border-red-400/30 rounded-lg px-4 py-3">
                        {otp.error}
                      </p>
                    )}

                    <Button
                      onClick={handleSendOtp}
                      loading={otp.step === "sending"}
                      disabled={phone.replace(/\D/g, "").length < 10}
                      className="w-full"
                    >
                      Send OTP
                    </Button>
                  </>
                ) : (
                  <>
                    {/* OTP sent — Step 2 */}
                    <div className="text-center space-y-2">
                      <p className="text-cream-white text-sm font-medium">
                        OTP sent to <span className="text-gold-luxury">+91 {phone}</span>
                      </p>
                      <button
                        onClick={otp.reset}
                        className="text-xs text-muted-text hover:text-cream-white underline transition-colors"
                      >
                        Change number
                      </button>
                    </div>

                    <OtpInput
                      value={otpValue}
                      onChange={setOtpValue}
                      disabled={otp.step === "verifying" || otp.step === "success"}
                      error={otpError}
                    />

                    {otp.error && (
                      <p className="text-red-400 text-sm text-center">
                        {otp.error}
                      </p>
                    )}

                    <Button
                      onClick={handleVerifyOtp}
                      loading={otp.step === "verifying"}
                      disabled={otpValue.length < 6}
                      className="w-full"
                    >
                      Verify & Sign In
                    </Button>

                    <ResendTimer
                      timeLeft={otp.timeLeft}
                      canResend={otp.canResend}
                      onResend={otp.resendOtp}
                      isResending={otp.isResending}
                    />
                  </>
                )}
              </motion.div>
            )}

            {/* ── Email ─────────────────────────────────────────── */}
            {activeTab === "email" && (
              <motion.form
                key="email-tab"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleEmailLogin}
                className="space-y-5"
              >
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold tracking-wider uppercase text-gold-luxury">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    autoFocus
                    className={`bg-herbal-deep/40 border rounded-xl px-4 py-3.5 text-cream-white placeholder:text-muted-text/50 outline-none transition-colors ${
                      emailError ? "border-red-400/60 focus:border-red-400" : "border-gold-luxury/20 focus:border-gold-luxury/60"
                    }`}
                  />
                  {emailError && <p className="text-red-400 text-xs">{emailError}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-xs font-semibold tracking-wider uppercase text-gold-luxury">
                      Password
                    </label>
                    <Link href="/forgot-password" className="text-xs text-muted-text hover:text-gold-luxury transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className={`bg-herbal-deep/40 border rounded-xl px-4 py-3.5 text-cream-white placeholder:text-muted-text/50 outline-none transition-colors ${
                      passwordError ? "border-red-400/60 focus:border-red-400" : "border-gold-luxury/20 focus:border-gold-luxury/60"
                    }`}
                  />
                  {passwordError && <p className="text-red-400 text-xs">{passwordError}</p>}
                </div>

                <Button type="submit" loading={emailLoading} className="w-full">
                  Sign In
                </Button>
              </motion.form>
            )}

            {/* ── Google ────────────────────────────────────────── */}
            {activeTab === "google" && (
              <motion.div
                key="google-tab"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <p className="text-muted-text text-sm text-center">
                  Continue with your Google account. Fast, secure, no password needed.
                </p>
                <SocialButton onClick={handleGoogle} loading={googleLoading} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gold-luxury/10" />
            <span className="text-xs text-muted-text">OR</span>
            <div className="flex-1 h-px bg-gold-luxury/10" />
          </div>

          {/* Quick Google link shown on non-google tabs */}
          {activeTab !== "google" && (
            <SocialButton onClick={handleGoogle} loading={googleLoading} />
          )}

          {/* Footer */}
          <p className="text-center text-xs text-muted-text mt-8 leading-relaxed">
            By continuing, you agree to our{" "}
            <Link href="/terms-and-conditions" className="text-gold-luxury hover:underline">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy-policy" className="text-gold-luxury hover:underline">Privacy Policy</Link>.
          </p>
        </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Page (Suspense boundary for useSearchParams) ─────────────────────────────
export default function LoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
}
