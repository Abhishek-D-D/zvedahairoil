/**
 * services/authService.ts
 *
 * All Supabase Auth operations for the ZVEDA platform.
 * No raw Supabase calls in components — always use this service.
 *
 * Supports:
 * - Phone OTP (Supabase + Twilio SMS)
 * - Email + Password
 * - Google OAuth
 * - Password Reset
 * - Session management
 */

import { supabaseBrowser } from "@/lib/supabase/client";
import { formatPhoneE164 } from "@/utils/formatters";
import type { AuthResult, AuthUser } from "@/types/user";
import type { Session, User } from "@supabase/supabase-js";

// ─── Phone OTP ────────────────────────────────────────────────────────────────

/**
 * Step 1: Send OTP SMS to the given Indian phone number.
 * Accepts raw 10-digit number (e.g. "9876543210") or E.164 format.
 */
export async function sendPhoneOtp(phone: string): Promise<AuthResult> {
  const supabase = supabaseBrowser();
  const formattedPhone = formatPhoneE164(phone);

  const { error } = await supabase.auth.signInWithOtp({
    phone: formattedPhone,
  });

  if (error) {
    return { success: false, error: error.message, nextStep: undefined };
  }

  return { success: true, error: null, nextStep: "verify_otp" };
}

/**
 * Step 2: Verify the OTP token received via SMS.
 * On success, the user is signed in and a session is created.
 */
export async function verifyPhoneOtp(
  phone: string,
  token: string
): Promise<AuthResult> {
  const supabase = supabaseBrowser();
  const formattedPhone = formatPhoneE164(phone);

  const { error } = await supabase.auth.verifyOtp({
    phone: formattedPhone,
    token,
    type: "sms",
  });

  if (error) {
    return { success: false, error: error.message, nextStep: undefined };
  }

  return { success: true, error: null, nextStep: "complete" };
}

// ─── Email Auth ───────────────────────────────────────────────────────────────

export async function signUpWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  const supabase = supabaseBrowser();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null, nextStep: "confirm_email" };
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  const supabase = supabaseBrowser();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null, nextStep: "complete" };
}

export async function resetPassword(email: string): Promise<AuthResult> {
  const supabase = supabaseBrowser();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/callback?next=/account/reset-password`,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

// ─── Google OAuth ─────────────────────────────────────────────────────────────

export async function signInWithGoogle(): Promise<void> {
  const supabase = supabaseBrowser();

  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
}

// ─── Session ──────────────────────────────────────────────────────────────────

export async function getSession(): Promise<Session | null> {
  const supabase = supabaseBrowser();
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getUser(): Promise<User | null> {
  const supabase = supabaseBrowser();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function signOut(): Promise<void> {
  const supabase = supabaseBrowser();
  await supabase.auth.signOut();
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Map a Supabase User to our internal AuthUser shape.
 */
export function toAuthUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email ?? undefined,
    phone: user.phone ?? undefined,
    emailConfirmed: !!user.email_confirmed_at,
    phoneConfirmed: !!user.phone_confirmed_at,
    createdAt: user.created_at,
    lastSignInAt: user.last_sign_in_at ?? undefined,
  };
}
