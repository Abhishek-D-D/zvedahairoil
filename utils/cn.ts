/**
 * utils/cn.ts
 *
 * Class name merging utility using clsx + tailwind-merge.
 * Replaces manual string concatenation across the codebase.
 *
 * Usage:
 *   cn("base-class", condition && "conditional-class", "another-class")
 *   cn("px-4", isPrimary ? "bg-gold-luxury" : "bg-transparent")
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names intelligently:
 * - Resolves conditional classes (clsx)
 * - Deduplicates conflicting Tailwind classes (tailwind-merge)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
