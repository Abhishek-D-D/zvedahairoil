"use client";

/**
 * components/auth/OtpInput.tsx
 *
 * 6 individual digit boxes for OTP entry.
 * Features:
 * - Auto-advances focus to next box on digit entry
 * - Backspace moves focus back
 * - Paste support (pastes all 6 digits at once)
 * - Shake animation on wrong OTP
 */

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const OTP_LENGTH = 6;

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
}

export default function OtpInput({
  value,
  onChange,
  disabled = false,
  error = false,
  autoFocus = true,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first box when component mounts
  useEffect(() => {
    if (!autoFocus) return;
    const t = setTimeout(() => inputRefs.current[0]?.focus(), 100);
    return () => clearTimeout(t);
  }, [autoFocus]);

  // Focus first empty box when value changes externally
  useEffect(() => {
    const firstEmpty = value.length;
    if (firstEmpty < OTP_LENGTH) {
      inputRefs.current[firstEmpty]?.focus();
    }
  }, [value]);

  function handleChange(index: number, digit: string) {
    const cleaned = digit.replace(/\D/g, "");
    if (!cleaned) return;

    const chars = value.split("");
    chars[index] = cleaned.slice(-1); // take last digit if multiple pasted into one box
    const newValue = chars.join("").slice(0, OTP_LENGTH);
    onChange(newValue);

    // Advance to next box
    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();
      const chars = value.split("");
      if (chars[index]) {
        // Clear current box
        chars[index] = "";
        onChange(chars.join(""));
      } else if (index > 0) {
        // Move back and clear previous
        chars[index - 1] = "";
        onChange(chars.join(""));
        inputRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    onChange(pasted);
    // Focus last filled box or end
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  }

  const digits = Array.from({ length: OTP_LENGTH }, (_, i) => value[i] ?? "");

  return (
    <motion.div
      className="flex gap-3 justify-center"
      animate={error ? { x: [0, -8, 8, -6, 6, -4, 4, 0] } : {}}
      transition={{ duration: 0.5 }}
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          aria-label={`OTP digit ${index + 1}`}
          className={cn(
            "w-11 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all duration-200",
            "bg-herbal-deep/60 text-cream-white outline-none caret-transparent",
            "focus:scale-105",
            digit
              ? "border-gold-luxury/70 bg-herbal-deep/80"
              : "border-gold-luxury/20",
            error
              ? "border-red-400/70 bg-red-900/10"
              : "focus:border-gold-luxury",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      ))}
    </motion.div>
  );
}
