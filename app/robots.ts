/**
 * app/robots.ts
 *
 * Phase 10: Robots.txt generator. Allows crawl of marketing routes,
 * disallows user-session-bound and transactional pages.
 */

import type { MetadataRoute } from "next";

const BASE_URL = "https://zvedaoils.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow:    "/",
        disallow: [
          "/account",
          "/orders",
          "/tracking",
          "/checkout",
          "/login",
          "/signup",
          "/auth",
          "/api",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
