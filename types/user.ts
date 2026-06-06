/**
 * types/user.ts
 *
 * User and auth-related TypeScript interfaces for the ZVEDA platform.
 * Aligned with Supabase Auth user shape.
 */

// ─── Auth User (from Supabase session) ────────────────────────────────────────

export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  emailConfirmed: boolean;
  phoneConfirmed: boolean;
  createdAt: string;
  lastSignInAt?: string;
}

// ─── Customer Profile (stored in Supabase DB or local state) ──────────────────

export interface UserProfile {
  id: string;
  email?: string;
  phone?: string;
  fullName?: string;
  avatarUrl?: string;
  defaultAddress?: ShippingAddress;
  createdAt: string;
  updatedAt?: string;
}

// ─── Shipping Address ─────────────────────────────────────────────────────────

export interface ShippingAddress {
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  pincode: string;
  state?: string;
}

// ─── Auth operation result ────────────────────────────────────────────────────

export interface AuthResult {
  success: boolean;
  error: string | null;
  /** The next step in the flow, e.g. after sending OTP */
  nextStep?: "verify_otp" | "confirm_email" | "complete";
}

// ─── OTP State Machine ────────────────────────────────────────────────────────

export type OtpState =
  | "idle"
  | "sending"
  | "sent"
  | "verifying"
  | "success"
  | "error";

export interface OtpFlowState {
  step: OtpState;
  phone: string;
  error: string | null;
  timeLeft: number;
}

// ─── Auth Tab ─────────────────────────────────────────────────────────────────

export type AuthTab = "phone" | "email" | "google";
