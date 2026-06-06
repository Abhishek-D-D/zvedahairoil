/**
 * services/sheetsService.ts
 *
 * Typed wrapper around the existing Google Forms no-cors webhook.
 *
 * IMPORTANT: The Google Sheet, Form URL, and entry IDs are
 * UNCHANGED from the original checkout. This service only
 * provides a clean, reusable typed interface over the raw fetch.
 *
 * Google Form:
 *   https://docs.google.com/forms/d/e/1FAIpQLScK0PLvXZ5PHhVwanzpR_WkCyKrVqe_Bjwai1oGWKU2SbHxUQ/formResponse
 *
 * Sheet columns → entry ID mapping:
 *   name        → entry.137966236
 *   email       → entry.402325529
 *   phone       → entry.1119161222
 *   address     → entry.1895725893
 *   city        → entry.1156646242
 *   pincode     → entry.565442736
 *   state       → entry.1985786831
 *   paymentId   → entry.1378629200  ("ONLINE:pay_xxx" | "COD:ZVD-...")
 */

import { generateOrderId } from "@/utils/formatters";
import type { OrderPayload } from "@/types/order";

// ─── Config (single source of truth) ─────────────────────────────────────────

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScK0PLvXZ5PHhVwanzpR_WkCyKrVqe_Bjwai1oGWKU2SbHxUQ/formResponse";

/** Maps OrderPayload fields to Google Form entry IDs */
const GF_ENTRY = {
  name:      "entry.137966236",
  email:     "entry.402325529",
  phone:     "entry.1119161222",
  address:   "entry.1895725893",
  city:      "entry.1156646242",
  pincode:   "entry.565442736",
  state:     "entry.1985786831",
  paymentId: "entry.1378629200",
} as const;

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Submit an order to the Google Sheet via the Form webhook.
 *
 * Uses no-cors mode — we can't read the response, but the sheet
 * will log the row on success. Returns true always to not block UX
 * (same behaviour as the original inline implementation).
 *
 * @example
 * const ok = await submitOrder({
 *   name: "Amit", email: "amit@gmail.com", phone: "9876543210",
 *   address: "123 MG Road", city: "Bengaluru", pincode: "560001",
 *   paymentId: "pay_PJx0...", quantity: 2, amount: 998,
 *   paymentMethod: "online",
 * });
 */
export async function submitOrder(payload: OrderPayload): Promise<boolean> {
  const formData = new FormData();

  formData.append(GF_ENTRY.name,      payload.name);
  formData.append(GF_ENTRY.email,     payload.email);
  formData.append(GF_ENTRY.phone,     payload.phone);
  formData.append(GF_ENTRY.address,   payload.address);
  formData.append(GF_ENTRY.city,      payload.city);
  formData.append(GF_ENTRY.pincode,   payload.pincode);
  formData.append(GF_ENTRY.state,     "N/A");
  formData.append(
    GF_ENTRY.paymentId,
    `${payload.paymentMethod.toUpperCase()}:${payload.paymentId}`
  );

  try {
    await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      mode:   "no-cors",
      body:   formData,
    });
    return true;
  } catch (err) {
    // Log but don't block — payment is already confirmed at this point
    console.error("[sheetsService] Order log submission failed:", err);
    return true;
  }
}

/**
 * Generate a unique COD order ID.
 * Delegates to utils/formatters for consistency.
 *
 * @example generateCodOrderId() → "ZVD-20240115-103045"
 */
export { generateOrderId as generateCodOrderId };

/**
 * Build the paymentId string stored in the sheet.
 *
 * @example
 * buildPaymentId("online", "pay_PJx0abc") → "ONLINE:pay_PJx0abc"
 * buildPaymentId("cod", "ZVD-20240115-103045") → "COD:ZVD-20240115-103045"
 */
export function buildPaymentId(
  method: "online" | "cod",
  id: string
): string {
  return `${method.toUpperCase()}:${id}`;
}
