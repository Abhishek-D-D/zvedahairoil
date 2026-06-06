/**
 * services/emailService.ts
 *
 * Resend email integration for ZVEDA.
 *
 * Sends transactional emails:
 *   - Order confirmation (COD + Online)
 *   - Payment confirmation
 *
 * Setup:
 *   1. Create account at resend.com
 *   2. Add/verify your domain (zvedaoils.com)
 *   3. Create API key → paste into RESEND_API_KEY in .env.local
 *   4. Update FROM_EMAIL to your verified sender
 *
 * Docs: https://resend.com/docs/api-reference/emails/send-email
 */

import type { OrderPayload } from "@/types/order";
import { formatINR } from "@/utils/formatters";

// ─── Config ───────────────────────────────────────────────────────────────────

const RESEND_API_KEY  = process.env.RESEND_API_KEY ?? "";
const FROM_EMAIL      = process.env.RESEND_FROM_EMAIL ?? "orders@zvedaoils.com";
const RESEND_ENDPOINT = "https://api.resend.com/emails";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EmailPayload {
  from:    string;
  to:      string[];
  subject: string;
  html:    string;
}

interface ResendResponse {
  id?: string;
  error?: { message: string };
}

// ─── Internal sender ──────────────────────────────────────────────────────────

async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn("[emailService] RESEND_API_KEY not set — skipping email.");
    return true; // Don't block order flow
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method:  "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json: ResendResponse = await res.json();

    if (!res.ok || json.error) {
      console.error("[emailService] Send failed:", json.error?.message);
      return false;
    }

    console.log("[emailService] Email sent:", json.id);
    return true;
  } catch (err) {
    console.error("[emailService] Network error:", err);
    return false;
  }
}

// ─── Email templates ──────────────────────────────────────────────────────────

function buildOrderConfirmationHtml(order: OrderPayload, orderId: string): string {
  const total      = formatINR(order.amount, true);
  const method     = order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment";
  const methodIcon = order.paymentMethod === "cod" ? "💵" : "✅";
  const year       = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Confirmed — Zveda Oils</title>
</head>
<body style="margin:0;padding:0;background:#0B140D;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">

    <!-- Header -->
    <div style="text-align:center;padding-bottom:32px;border-bottom:1px solid rgba(200,169,107,0.15);">
      <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C8A96B;margin:0 0 8px;">
        ZVEDA OILS
      </p>
      <h1 style="font-size:28px;font-weight:700;color:#F5F0E8;margin:0;letter-spacing:-0.5px;">
        Order Confirmed 🌿
      </h1>
    </div>

    <!-- Greeting -->
    <div style="padding:32px 0 24px;">
      <p style="color:#9CA89C;font-size:15px;margin:0 0 8px;">
        Hello <strong style="color:#F5F0E8;">${order.name}</strong>,
      </p>
      <p style="color:#9CA89C;font-size:15px;line-height:1.6;margin:0;">
        Thank you for choosing Zveda. Your order has been successfully placed and our team
        is already preparing your Ayurvedic hair oil. 🙏
      </p>
    </div>

    <!-- Order Details Card -->
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(200,169,107,0.15);border-radius:16px;padding:24px;margin-bottom:24px;">
      <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#C8A96B;margin:0 0 16px;">
        Order Summary
      </p>

      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#9CA89C;font-size:13px;">Order ID</td>
          <td style="padding:8px 0;color:#F5F0E8;font-size:13px;text-align:right;font-family:monospace;">${orderId}</td>
        </tr>
        <tr style="border-top:1px solid rgba(200,169,107,0.08);">
          <td style="padding:8px 0;color:#9CA89C;font-size:13px;">Product</td>
          <td style="padding:8px 0;color:#F5F0E8;font-size:13px;text-align:right;">Zveda Hair Oil — 200ml</td>
        </tr>
        <tr style="border-top:1px solid rgba(200,169,107,0.08);">
          <td style="padding:8px 0;color:#9CA89C;font-size:13px;">Quantity</td>
          <td style="padding:8px 0;color:#F5F0E8;font-size:13px;text-align:right;">${order.quantity} bottle${order.quantity > 1 ? "s" : ""}</td>
        </tr>
        <tr style="border-top:1px solid rgba(200,169,107,0.08);">
          <td style="padding:8px 0;color:#9CA89C;font-size:13px;">Shipping</td>
          <td style="padding:8px 0;color:#4ADE80;font-size:13px;text-align:right;font-weight:600;">FREE</td>
        </tr>
        <tr style="border-top:1px solid rgba(200,169,107,0.15);">
          <td style="padding:12px 0 0;color:#F5F0E8;font-size:15px;font-weight:700;">Total Paid</td>
          <td style="padding:12px 0 0;color:#C8A96B;font-size:15px;font-weight:700;text-align:right;">${total}</td>
        </tr>
      </table>

      <div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(200,169,107,0.08);">
        <p style="margin:0;font-size:12px;color:#9CA89C;">
          ${methodIcon} Payment method: <strong style="color:#F5F0E8;">${method}</strong>
        </p>
      </div>
    </div>

    <!-- Delivery Address -->
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(200,169,107,0.15);border-radius:16px;padding:24px;margin-bottom:24px;">
      <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#C8A96B;margin:0 0 12px;">
        📦 Delivery Address
      </p>
      <p style="color:#F5F0E8;font-size:14px;font-weight:600;margin:0 0 4px;">${order.name}</p>
      <p style="color:#9CA89C;font-size:13px;margin:0;line-height:1.7;">
        ${order.address}<br/>
        ${order.city} — ${order.pincode}
      </p>
      <p style="color:#9CA89C;font-size:12px;margin:12px 0 0;">
        📱 ${order.phone} &nbsp;|&nbsp; ✉️ ${order.email}
      </p>
    </div>

    <!-- Timeline expectation -->
    <div style="text-align:center;padding:24px 0;border-top:1px solid rgba(200,169,107,0.1);border-bottom:1px solid rgba(200,169,107,0.1);margin-bottom:24px;">
      <p style="color:#9CA89C;font-size:13px;margin:0 0 8px;">Expected Delivery</p>
      <p style="color:#F5F0E8;font-size:18px;font-weight:700;margin:0;">3 – 7 Working Days 🚚</p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:32px;">
      <a href="https://zvedaoils.com/orders"
         style="display:inline-block;background:#C8A96B;color:#0B140D;padding:14px 32px;border-radius:50px;text-decoration:none;font-size:14px;font-weight:700;letter-spacing:0.05em;">
        Track My Order
      </a>
    </div>

    <!-- Support -->
    <div style="text-align:center;padding-bottom:32px;">
      <p style="color:#9CA89C;font-size:12px;margin:0 0 4px;">
        Questions? We're here to help.
      </p>
      <p style="color:#C8A96B;font-size:12px;margin:0;">
        📧 zvedaoils@gmail.com &nbsp;|&nbsp; 📞 +91 73383 48401
      </p>
    </div>

    <!-- Footer -->
    <p style="text-align:center;color:rgba(156,168,156,0.4);font-size:11px;margin:0;">
      © ${year} Zveda Oils. Made with 🌿 in India.
    </p>
  </div>
</body>
</html>`;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Send an order confirmation email to the customer.
 * Called from the API webhook after order is placed.
 */
export async function sendOrderConfirmationEmail(
  order: OrderPayload,
  orderId: string
): Promise<boolean> {
  return sendEmail({
    from:    `Zveda Oils <${FROM_EMAIL}>`,
    to:      [order.email],
    subject: `✅ Order Confirmed — ${orderId} | Zveda Oils`,
    html:    buildOrderConfirmationHtml(order, orderId),
  });
}

/**
 * Send an internal alert to the Zveda team on new order.
 * Optional — set ADMIN_EMAIL in env to enable.
 */
export async function sendAdminOrderAlert(
  order: OrderPayload,
  orderId: string
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return true;

  return sendEmail({
    from:    `Zveda Orders <${FROM_EMAIL}>`,
    to:      [adminEmail],
    subject: `🆕 New Order: ${orderId} — ${order.paymentMethod.toUpperCase()}`,
    html: `
      <div style="font-family:monospace;padding:24px;background:#f9f9f9;">
        <h2>New Order Received</h2>
        <table>
          <tr><td><b>Order ID</b></td><td>${orderId}</td></tr>
          <tr><td><b>Name</b></td><td>${order.name}</td></tr>
          <tr><td><b>Phone</b></td><td>${order.phone}</td></tr>
          <tr><td><b>Email</b></td><td>${order.email}</td></tr>
          <tr><td><b>City</b></td><td>${order.city}</td></tr>
          <tr><td><b>Qty</b></td><td>${order.quantity}</td></tr>
          <tr><td><b>Amount</b></td><td>₹${order.amount}</td></tr>
          <tr><td><b>Method</b></td><td>${order.paymentMethod.toUpperCase()}</td></tr>
          <tr><td><b>Payment ID</b></td><td>${order.paymentId}</td></tr>
        </table>
      </div>
    `,
  });
}
