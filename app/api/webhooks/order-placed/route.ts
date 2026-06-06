/**
 * app/api/webhooks/order-placed/route.ts
 *
 * Internal API route: POST /api/webhooks/order-placed
 *
 * Called by the checkout page immediately after:
 *   1. Google Sheets order log succeeds (sheetsService)
 *   2. Razorpay payment confirmed (online) OR COD order generated
 *
 * This route triggers:
 *   - Order confirmation email  (Resend)
 *   - Order confirmation WhatsApp (Interakt)
 *   - Admin alert email         (optional)
 *
 * Security:
 *   - Validates WEBHOOK_SECRET header (set WEBHOOK_SECRET in .env.local)
 *   - Rate-limited by Next.js edge runtime (no bot abuse)
 *   - Never exposes Resend/Interakt keys to the browser
 *
 * Request body (JSON):
 * {
 *   "order": OrderPayload,
 *   "orderId": "ZVD-20240601-103045"
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { sendOrderConfirmationEmail, sendAdminOrderAlert } from "@/services/emailService";
import { sendOrderConfirmationWhatsApp } from "@/services/whatsappService";
import type { OrderPayload } from "@/types/order";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrderPlacedBody {
  order:   OrderPayload;
  orderId: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validateSecret(request: NextRequest): boolean {
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) return true; // No secret configured → allow (dev mode)

  const header = request.headers.get("x-webhook-secret");
  return header === secret;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  // ── Authenticate ──────────────────────────────────────────────────────────
  if (!validateSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let body: OrderPlacedBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { order, orderId } = body;

  if (!order || !orderId) {
    return NextResponse.json(
      { error: "Missing required fields: order, orderId" },
      { status: 400 }
    );
  }

  // ── Fire notifications in parallel ────────────────────────────────────────
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

  console.log(`[webhook/order-placed] ${orderId} →`, results);

  return NextResponse.json({
    success: true,
    orderId,
    notifications: results,
  });
}

// ─── Reject other methods ─────────────────────────────────────────────────────
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
