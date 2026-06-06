"use client";

/**
 * components/auth/PhoneInput.tsx
 *
 * Indian phone number input with +91 country code prefix.
 * Validates on blur and shows inline error.
 */

import { useState } from "react";
import { cn } from "@/utils/cn";
import { validatePhone } from "@/utils/validators";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export default function PhoneInput({
  value,
  onChange,
  disabled = false,
  autoFocus = false,
}: PhoneInputProps) {
  const [touched, setTouched] = useState(false);
  const error = touched ? validatePhone(value) : null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Allow only digits, max 10
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange(digits);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="phone-input"
        className="text-xs font-semibold tracking-wider uppercase text-gold-luxury"
      >
        Mobile Number
      </label>

      <div
        className={cn(
          "flex items-center rounded-xl border transition-all duration-300",
          "bg-herbal-deep/40 backdrop-blur-sm",
          error
            ? "border-red-400/60 focus-within:border-red-400"
            : "border-gold-luxury/20 focus-within:border-gold-luxury/60",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* Country Code */}
        <div className="flex items-center gap-1.5 pl-4 pr-3 border-r border-gold-luxury/20 select-none">
          <span className="text-base">🇮🇳</span>
          <span className="text-sm font-semibold text-cream-white">+91</span>
        </div>

        {/* Number input */}
        <input
          id="phone-input"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="98765 43210"
          value={value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete="tel-national"
          maxLength={10}
          aria-invalid={!!error}
          aria-describedby={error ? "phone-error" : undefined}
          className={cn(
            "flex-1 bg-transparent px-4 py-3.5 text-base text-cream-white",
            "placeholder:text-muted-text/50 outline-none",
            "tracking-widest font-medium"
          )}
        />
      </div>

      {error && (
        <p id="phone-error" role="alert" className="text-xs text-red-400 mt-0.5 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
