"use client";

/**
 * hooks/useOtp.ts
 *
 * Manages the complete phone OTP flow state machine.
 *
 * States: idle → sending → sent → verifying → success | error
 *
 * Usage:
 *   const otp = useOtp();
 *   await otp.sendOtp("9876543210");
 *   await otp.verifyOtp("123456");
 *   otp.timeLeft    // countdown seconds
 *   otp.step        // current state
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { sendPhoneOtp, verifyPhoneOtp } from "@/services/authService";
import type { OtpState } from "@/types/user";

const RESEND_COOLDOWN = 60; // seconds

interface UseOtpReturn {
  step: OtpState;
  phone: string;
  error: string | null;
  timeLeft: number;
  canResend: boolean;
  isResending: boolean;
  sendOtp: (phone: string) => Promise<void>;
  verifyOtp: (token: string) => Promise<boolean>;
  resendOtp: () => Promise<void>;
  reset: () => void;
}

export function useOtp(): UseOtpReturn {
  const [step, setStep] = useState<OtpState>("idle");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Timer ───────────────────────────────────────────────────────────────

  function startTimer() {
    setTimeLeft(RESEND_COOLDOWN);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // ─── Actions ──────────────────────────────────────────────────────────────

  const sendOtp = useCallback(async (phoneNumber: string) => {
    setError(null);
    setStep("sending");
    setPhone(phoneNumber);

    const result = await sendPhoneOtp(phoneNumber);

    if (!result.success) {
      let msg = result.error || "An error occurred while sending OTP.";
      if (msg.toLowerCase().includes("phone provider") || msg.toLowerCase().includes("sms")) {
        msg = "Mobile verification is currently unavailable. Please sign in using the Email or Google tab.";
      }
      setError(msg);
      setStep("error");
      return;
    }

    setStep("sent");
    startTimer();
  }, []);

  const verifyOtp = useCallback(
    async (token: string): Promise<boolean> => {
      setError(null);
      setStep("verifying");

      const result = await verifyPhoneOtp(phone, token);

      if (!result.success) {
        setError(result.error);
        setStep("sent"); // allow re-entry
        return false;
      }

      setStep("success");
      return true;
    },
    [phone]
  );

  const resendOtp = useCallback(async () => {
    if (timeLeft > 0) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setIsResending(true);
    await sendOtp(phone);
    setIsResending(false);
  }, [phone, timeLeft, sendOtp]);

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStep("idle");
    setPhone("");
    setError(null);
    setTimeLeft(0);
  }, []);

  return {
    step,
    phone,
    error,
    timeLeft,
    canResend: timeLeft === 0 && step === "sent",
    isResending,
    sendOtp,
    verifyOtp,
    resendOtp,
    reset,
  };
}
