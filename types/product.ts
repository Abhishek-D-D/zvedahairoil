/**
 * types/product.ts
 *
 * Product catalog types for the ZVEDA platform.
 * Designed to be extensible for future multi-product expansion.
 */

// ─── Product Variant ───────────────────────────────────────────────────────────

export interface ProductVariant {
  id: string;
  name: string;
  /** Volume in ml */
  volume: number;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  sku: string;
}

// ─── Ingredient ───────────────────────────────────────────────────────────────

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  percentage: string;
  image: string;
  category: "growth" | "strength" | "scalp" | "base";
}

// ─── Product ──────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  images: string[];
  variants: ProductVariant[];
  ingredients: Ingredient[];
  /** How many units sold, for social proof */
  unitsSold?: number;
  rating?: number;
  reviewCount?: number;
  /** Price in paise (× 100 for Razorpay) */
  defaultPriceInPaise: number;
  isBestSeller: boolean;
  badge?: string;
}

// ─── Cart Item ────────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  name: string;
  image: string;
}
