/**
 * services/whatsappService.ts
 *
 * WhatsApp Business API integration via Interakt.
 *
 * Sends WhatsApp messages using pre-approved templates:
 *   - Order confirmation (template: "order_confirmation")
 *   - Shipping update  (template: "order_shipped")
 *   - COD reminder     (template: "cod_reminder")
 *
 * Setup (Interakt):
 *   1. Sign up at app.interakt.ai
 *   2. Connect WhatsApp Business number
 *   3. Create and get templates approved by Meta
 *   4. Get API key from Settings → API
 *   5. Add INTERAKT_API_KEY + INTERAKT_FROM_NUMBER to .env.local
 *
 * Template variable order must match your approved Interakt templates.
 *
 * Docs: https://docs.interakt.ai/reference/send-message
 */

import type { OrderPayload } from "@/types/order";
import { formatINR } from "@/utils/formatters";

// ─── Config ───────────────────────────────────────────────────────────────────

const INTERAKT_API_KEY      = process.env.INTERAKT_API_KEY ?? "";
const INTERAKT_FROM_NUMBER  = process.env.INTERAKT_FROM_NUMBER ?? "";
const INTERAKT_ENDPOINT     = "https://api.interakt.ai/v1/public/message/";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WhatsAppTemplatePayload {
  countryCode:  string;
  phoneNumber:  string;
  callbackData: string;
  type:         "Template";
  template: {
    name:       string;
    languageCode: string;
    bodyValues: string[];
    buttonValues?: Record<string, string[]>;
  };
}

// ─── Internal sender ──────────────────────────────────────────────────────────

/**
 * Normalise an Indian mobile number to 10 digits (no country code).
 */
function normalisePhone(phone: string): string {
  return phone.replace(/\D/g, "").replace(/^91/, "").slice(-10);
}

async function sendWhatsApp(payload: WhatsAppTemplatePayload): Promise<boolean> {
  if (!INTERAKT_API_KEY) {
    console.warn("[whatsappService] INTERAKT_API_KEY not set — skipping WhatsApp.");
    return true; // Don't block order flow
  }

  try {
    const res = await fetch(INTERAKT_ENDPOINT, {
      method:  "POST",
      headers: {
        "Authorization": `Basic ${INTERAKT_API_KEY}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[whatsappService] Send failed:", res.status, text);
      return false;
    }

    console.log("[whatsappService] WhatsApp message sent.");
    return true;
  } catch (err) {
    console.error("[whatsappService] Network error:", err);
    return false;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Send an order confirmation WhatsApp message.
 *
 * Template variables (in order):
 *   {{1}} Customer name
 *   {{2}} Order ID
 *   {{3}} Product name + quantity
 *   {{4}} Total amount
 *   {{5}} Payment method
 *   {{6}} Expected delivery
 *
 * Example template body:
 * "Hello {{1}}! 🌿 Your Zveda order {{2}} has been confirmed.
 *  Product: {{3}} | Amount: {{4}} | Payment: {{5}}.
 *  Expected delivery: {{6}}. Track at zvedaoils.com/orders"
 */
export async function sendOrderConfirmationWhatsApp(
  order: OrderPayload,
  orderId: string
): Promise<boolean> {
  const phone       = normalisePhone(order.phone);
  const productName = `Zveda Hair Oil 200ml × ${order.quantity}`;
  const method      = order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment";
  const amount      = formatINR(order.amount, true);

  return sendWhatsApp({
    countryCode:  "91",
    phoneNumber:  phone,
    callbackData: `order_confirmation:${orderId}`,
    type:         "Template",
    template: {
      name:         "order_confirmation",
      languageCode: "en",
      bodyValues:   [order.name, orderId, productName, amount, method, "3–7 working days"],
    },
  });
}

/**
 * Send a shipping update WhatsApp when order is dispatched.
 *
 * Template variables:
 *   {{1}} Customer name
 *   {{2}} Order ID
 *   {{3}} Tracking ID
 *   {{4}} Tracking URL
 */
export async function sendShippingUpdateWhatsApp(
  customerName: string,
  phone: string,
  orderId: string,
  trackingId: string
): Promise<boolean> {
  const normPhone   = normalisePhone(phone);
  const trackingUrl = `https://zvedaoils.com/tracking/${trackingId}`;

  return sendWhatsApp({
    countryCode:  "91",
    phoneNumber:  normPhone,
    callbackData: `shipped:${orderId}`,
    type:         "Template",
    template: {
      name:         "order_shipped",
      languageCode: "en",
      bodyValues:   [customerName, orderId, trackingId, trackingUrl],
    },
  });
}

/**
 * Send a COD payment reminder WhatsApp.
 *
 * Template variables:
 *   {{1}} Customer name
 *   {{2}} Order ID
 *   {{3}} Amount due
 */
export async function sendCodReminderWhatsApp(
  customerName: string,
  phone: string,
  orderId: string,
  amount: number
): Promise<boolean> {
  const normPhone = normalisePhone(phone);

  return sendWhatsApp({
    countryCode:  "91",
    phoneNumber:  normPhone,
    callbackData: `cod_reminder:${orderId}`,
    type:         "Template",
    template: {
      name:         "cod_reminder",
      languageCode: "en",
      bodyValues:   [customerName, orderId, formatINR(amount, true)],
    },
  });
}
