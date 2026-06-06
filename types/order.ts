/**
 * types/order.ts
 *
 * All order-related TypeScript interfaces and enums for the ZVEDA platform.
 * These map directly to the existing Google Sheet columns — no schema changes needed.
 */

// ─── Enums ────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "online" | "cod";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

// ─── Payload sent to Google Sheets ────────────────────────────────────────────

/**
 * Typed shape of what gets submitted to the Google Form / Sheet.
 * Maps 1:1 with the existing GF_MAPPING entry IDs.
 */
export interface OrderPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  /** Formatted as "ONLINE:pay_xxx" or "COD:ZVD-YYYYMMDD-HHMMSS" */
  paymentId: string;
  quantity: number;
  amount: number;
  paymentMethod: PaymentMethod;
}

// ─── Full Order record (for dashboard / tracking) ─────────────────────────────

/**
 * Represents a complete order as stored in Google Sheets and
 * returned to the customer dashboard / tracking page.
 */
export interface Order {
  orderId: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  product: string;
  quantity: number;
  amount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingId?: string;
  createdAt: string;
}

// ─── Tracking ─────────────────────────────────────────────────────────────────

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp?: string;
  completed: boolean;
  active: boolean;
}

export interface TrackingInfo {
  orderId: string;
  trackingId: string;
  currentStatus: OrderStatus;
  steps: TrackingStep[];
  estimatedDelivery?: string;
}

// ─── Service response wrapper ──────────────────────────────────────────────────

export interface ServiceResult<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}
