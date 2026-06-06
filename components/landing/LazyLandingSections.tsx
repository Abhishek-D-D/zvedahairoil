"use client";

/**
 * components/landing/LazyLandingSections.tsx
 *
 * Phase 10: Code-split wrapper for below-the-fold landing sections.
 *
 * Why a Client Component shell?
 *   Per the Next.js 16 docs (app/02-guides/lazy-loading.md), when a Server
 *   Component dynamically imports a Client Component, automatic code-splitting
 *   is currently NOT supported. So we keep `app/page.tsx` as a Server Component
 *   (for the static metadata path) and route the `next/dynamic` calls through
 *   this tiny client shell — where they DO code-split properly.
 *
 * Why `ssr: true` (default)?
 *   SEO. The HTML still renders these sections on the server, so crawlers
 *   see the content. We only defer the JS chunks so they don't bloat the
 *   initial bundle.
 */

import dynamic from "next/dynamic";

const AyurvedicStorytelling = dynamic(
  () => import("@/sections/AyurvedicStorytelling")
);
const ProductShowcase = dynamic(() => import("@/sections/ProductShowcase"));
const TailaPakaVidhi   = dynamic(() => import("@/sections/TailaPakaVidhi"));
const Testimonials     = dynamic(() => import("@/sections/Testimonials"));
const FAQ              = dynamic(() => import("@/sections/FAQ"));

export default function LazyLandingSections() {
  return (
    <>
      <AyurvedicStorytelling />
      <ProductShowcase />
      <TailaPakaVidhi />
      <Testimonials />
      <FAQ />
    </>
  );
}
