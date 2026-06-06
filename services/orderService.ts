/**
 * services/orderService.ts
 *
 * Fetches order data for the customer dashboard.
 *
 * Strategy: Since orders are stored in Google Sheets (no direct DB query),
 * we filter by phone/email match using the customer's auth profile.
 *
 * The orders list page calls fetchUserOrders(phone | email).
 * Returns mock data in dev when no Apps Script URL is configured.
 */

import type { Order, OrderStatus } from "@/types/order";

// ─── Config ───────────────────────────────────────────────────────────────────

/**
 * Optional: Google Apps Script Web App URL that exposes sheet data as JSON.
 * If not set, returns mock orders for development/preview.
 * Set via: NEXT_PUBLIC_APPS_SCRIPT_URL in .env.local
 */
const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? "";

// ─── Mock orders (dev / preview) ─────────────────────────────────────────────

const MOCK_ORDERS: Order[] = [
  {
    orderId: "ZVD-20240601-103045",
    name: "Amit Sharma",
    email: "amit@example.com",
    phone: "9876543210",
    address: "42, MG Road, Bengaluru",
    city: "Bengaluru",
    pincode: "560001",
    product: "Zveda Hair Oil — 200ml",
    quantity: 2,
    amount: 998,
    paymentStatus: "paid",
    orderStatus: "shipped",
    trackingId: "IND123456789",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    orderId: "ZVD-20240515-084512",
    name: "Amit Sharma",
    email: "amit@example.com",
    phone: "9876543210",
    address: "42, MG Road, Bengaluru",
    city: "Bengaluru",
    pincode: "560001",
    product: "Zveda Hair Oil — 200ml",
    quantity: 1,
    amount: 499,
    paymentStatus: "paid",
    orderStatus: "delivered",
    trackingId: "IND987654321",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch all orders for the current user identified by phone or email.
 *
 * In production: calls Google Apps Script Web App → returns JSON.
 * In development (no URL set): returns mock orders after a short delay.
 */
export async function fetchUserOrders(
  identifier: { phone?: string; email?: string }
): Promise<Order[]> {
  // ── Dev/preview mode: return mocks ─────────────────────────────────────────
  if (!APPS_SCRIPT_URL) {
    await new Promise((r) => setTimeout(r, 800)); // simulate network
    return MOCK_ORDERS;
  }

  // ── Production: fetch from Apps Script JSON API ────────────────────────────
  try {
    const params = new URLSearchParams();
    if (identifier.phone) params.set("phone", identifier.phone);
    if (identifier.email) params.set("email", identifier.email);

    const res = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Apps Script error: ${res.status}`);

    const json = await res.json();
    return (json.orders ?? []) as Order[];
  } catch (err) {
    console.error("[orderService] fetchUserOrders failed:", err);
    return [];
  }
}

/**
 * Fetch a single order by orderId.
 * Falls back to filtering the full order list.
 */
export async function fetchOrderById(
  orderId: string,
  identifier: { phone?: string; email?: string }
): Promise<Order | null> {
  const orders = await fetchUserOrders(identifier);
  return orders.find((o) => o.orderId === orderId) ?? null;
}

/**
 * Map Google Sheets row to an Order object.
 * Column order must match what the Apps Script returns.
 * Adjust indices if your sheet columns differ.
 */
export function sheetRowToOrder(row: string[]): Order {
  return {
    orderId:       row[0] ?? "",
    name:          row[1] ?? "",
    email:         row[2] ?? "",
    phone:         row[3] ?? "",
    address:       row[4] ?? "",
    city:          row[5] ?? "",
    pincode:       row[6] ?? "",
    product:       "Zveda Hair Oil — 200ml",
    quantity:      Number(row[7] ?? 1),
    amount:        Number(row[8] ?? 499),
    paymentStatus: "paid",
    orderStatus:   (row[9] as OrderStatus) ?? "pending",
    trackingId:    row[10] ?? undefined,
    createdAt:     row[11] ?? new Date().toISOString(),
  };
}
