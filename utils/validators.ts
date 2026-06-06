/**
 * utils/validators.ts
 *
 * Form validation utilities for the ZVEDA platform.
 * Extracted from inline checkout validation for reuse across all forms.
 *
 * All validators return null on success, or an error string on failure.
 */

// ─── Primitive validators ─────────────────────────────────────────────────────

/** Returns true if the string is non-empty after trimming. */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validate an Indian mobile number (10 digits, starts with 6-9).
 * Works with or without +91 prefix.
 */
export function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "").replace(/^91/, "");
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return "Please enter a valid 10-digit Indian mobile number.";
  }
  return null;
}

/** Validate a standard email address. */
export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return "Please enter a valid email address.";
  }
  return null;
}

/** Validate a 6-digit Indian postal code. */
export function validatePincode(pincode: string): string | null {
  if (!/^\d{6}$/.test(pincode)) {
    return "Please enter a valid 6-digit postal code.";
  }
  return null;
}

/**
 * Validate password strength.
 * Requires minimum 8 characters.
 */
export function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  return null;
}

/** Validate a 6-digit OTP token. */
export function validateOtp(otp: string): string | null {
  if (!/^\d{6}$/.test(otp)) {
    return "Please enter the 6-digit code sent to your phone.";
  }
  return null;
}

// ─── Compound validators ──────────────────────────────────────────────────────

export interface ShippingFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
}

/**
 * Validate the full shipping form.
 * Returns the first error found, or null if all fields are valid.
 */
export function validateShippingForm(data: ShippingFormData): string | null {
  if (!isNonEmpty(data.name)) return "Please enter your full name.";
  if (!isNonEmpty(data.phone)) return "Please enter your mobile number.";
  if (!isNonEmpty(data.email)) return "Please enter your email address.";
  if (!isNonEmpty(data.address)) return "Please enter your delivery address.";
  if (!isNonEmpty(data.city)) return "Please enter your city.";
  if (!isNonEmpty(data.pincode)) return "Please enter your postal code.";

  const phoneError = validatePhone(data.phone);
  if (phoneError) return phoneError;

  const emailError = validateEmail(data.email);
  if (emailError) return emailError;

  const pincodeError = validatePincode(data.pincode);
  if (pincodeError) return pincodeError;

  return null;
}
