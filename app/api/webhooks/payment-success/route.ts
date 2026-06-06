/**
 * app/api/webhooks/payment-success/route.ts
 *
 * Internal API route: POST /api/webhooks/payment-success
 *
 * Called when a Razorpay online payment is verified successfully.
 * This is the payment-specific hook (COD uses order-placed only).
 *
 * Use this route for:
 *   - Sending payment receipt emails
 *   - Triggering inventory deduction
 *   - Notifying fulfillment team
 *
 * Request body (JSON):
 * {
 *   "razorpay_payment_id": "pay_PJx0...",
 *   "razorpay_order_id":   "order_...",   // if using Razorpay Orders API
 *   "razorpay_signature":  "...",          // for signature verification
 *   "order": OrderPayload,
 *   "orderId": "ZVD-20240601-103045"
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { sendOrderConfirmationEmail, sendAdminOrderAlert } from "@/services/emailService";
import { sendOrderConfirmationWhatsApp } from "@/services/whatsappService";
import type { OrderPayload } from "@/types/order";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PaymentSuccessBody {
  razorpay_payment_id:  string;
  razorpay_order_id?:   string;
  razorpay_signature?:  string;
  order:   OrderPayload;
  orderId: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validateSecret(request: NextRequest): boolean {
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) return true; // dev mode

  const header = request.headers.get("x-webhook-secret");
  return header === secret;
}

/**
 * Optional Razorpay signature verification using HMAC-SHA256.
 * Requires RAZORPAY_SECRET in env.
 * Only runs if razorpay_order_id + razorpay_signature are present.
 */
async function verifyRazorpaySignature(
  paymentId: string,
  orderId: string,
  signature: string
): Promise<boolean> {
  const secret = process.env.RAZORPAY_SECRET;
  if (!secret) return true; // No secret → skip verification

  try {
    const encoder = new TextEncoder();
    const message = `${orderId}|${paymentId}`;
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sigBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
    const computed  = Array.from(new Uint8Array(sigBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return computed === signature;
  } catch {
    return false;
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  // ── Authenticate ──────────────────────────────────────────────────────────
  if (!validateSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let body: PaymentSuccessBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    order,
    orderId,
  } = body;

  if (!razorpay_payment_id || !order || !orderId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // ── Verify Razorpay signature (if Razorpay Orders API is used) ───────────
  if (razorpay_order_id && razorpay_signature) {
    const valid = await verifyRazorpaySignature(
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    );
    if (!valid) {
      console.error("[webhook/payment-success] Signature mismatch:", razorpay_payment_id);
      return NextResponse.json({ error: "Signature verification failed" }, { status: 400 });
    }
  }

  // ── Send notifications ───────────────────────────────────────────────────
  const [emailOk, whatsappOk, adminOk] = await Promise.allSettled([
    sendOrderConfirmationEmail(order, orderId),
    sendOrderConfirmationWhatsApp(order, orderId),
    sendAdminOrderAlert(order, orderId),
  ]);

  const results = {
    email:    emailOk.status    === "fulfilled" ? emailOk.value    : false,
    whatsapp: whatsappOk.status === "fulfilled" ? whatsappOk.value : false,
    admin:    adminOk.status    === "fulfilled" ? adminOk.value    : false,
  };

  console.log(`[webhook/payment-success] ${orderId} (${razorpay_payment_id}) →`, results);

  return NextResponse.json({
    success:   true,
    orderId,
    paymentId: razorpay_payment_id,
    notifications: results,
  });
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
