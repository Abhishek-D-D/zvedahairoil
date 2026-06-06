/**
 * utils/formatters.ts
 *
 * Pure formatting utilities for the ZVEDA platform.
 * All functions are stateless and side-effect free.
 */

// ─── Currency ─────────────────────────────────────────────────────────────────

/**
 * Format a number as Indian Rupee currency.
 * @example formatINR(499) → "₹499"
 * @example formatINR(1499, true) → "₹1,499"
 */
export function formatINR(amount: number, withCommas = false): string {
  if (withCommas) {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  return `₹${amount}`;
}

/**
 * Convert rupees to paise for Razorpay.
 * @example rupeesToPaise(499) → 49900
 */
export function rupeesToPaise(rupees: number): number {
  return rupees * 100;
}

/**
 * Calculate total price for a quantity.
 * @example calculateTotal(499, 2) → 998
 */
export function calculateTotal(unitPrice: number, quantity: number): number {
  return unitPrice * quantity;
}

// ─── Phone ────────────────────────────────────────────────────────────────────

/**
 * Format a raw 10-digit Indian phone number for Supabase (E.164 format).
 * @example formatPhoneE164("9876543210") → "+919876543210"
 * @example formatPhoneE164("+919876543210") → "+919876543210" (no double prefix)
 */
export function formatPhoneE164(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  // Already has country code
  return phone.startsWith("+") ? phone : `+${cleaned}`;
}

/**
 * Strip the +91 prefix for display.
 * @example stripCountryCode("+919876543210") → "9876543210"
 */
export function stripCountryCode(phone: string): string {
  return phone.replace(/^\+91/, "").replace(/\D/g, "");
}

// ─── Date / Time ──────────────────────────────────────────────────────────────

/**
 * Format an ISO date string for display.
 * @example formatDate("2024-01-15T10:30:00Z") → "15 Jan 2024"
 */
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Generate a deterministic order ID based on current timestamp.
 * @example generateOrderId() → "ZVD-20240115-103045"
 */
export function generateOrderId(): string {
  const t = new Date();
  const date = `${t.getFullYear()}${String(t.getMonth() + 1).padStart(2, "0")}${String(t.getDate()).padStart(2, "0")}`;
  const time = `${String(t.getHours()).padStart(2, "0")}${String(t.getMinutes()).padStart(2, "0")}${String(t.getSeconds()).padStart(2, "0")}`;
  return `ZVD-${date}-${time}`;
}

/**
 * Format seconds into MM:SS countdown display.
 * @example formatCountdown(65) → "1:05"
 */
export function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
