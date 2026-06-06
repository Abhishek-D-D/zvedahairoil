/**
 * app/sitemap.ts
 *
 * Phase 10: Programmatic sitemap for the ZVEDA marketing site.
 * Includes only public, indexable routes. Auth/dashboard/checkout pages
 * (which require a session or carry user data) are excluded — robots.ts
 * also disallows them.
 */

import type { MetadataRoute } from "next";

const BASE_URL = "https://zvedaoils.com";

interface RouteConfig {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}

const PUBLIC_ROUTES: RouteConfig[] = [
  { path: "/",                      changeFrequency: "weekly",  priority: 1.0 },
  { path: "/product",               changeFrequency: "weekly",  priority: 0.9 },
  { path: "/ingredients",           changeFrequency: "monthly", priority: 0.8 },
  { path: "/taila-paka-vidhi",      changeFrequency: "monthly", priority: 0.8 },
  { path: "/hair-recovery-journey", changeFrequency: "monthly", priority: 0.7 },
  { path: "/testimonials",          changeFrequency: "weekly",  priority: 0.7 },
  { path: "/about",                 changeFrequency: "yearly",  priority: 0.6 },
  { path: "/contact",               changeFrequency: "yearly",  priority: 0.6 },
  { path: "/faq",                   changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy-policy",        changeFrequency: "yearly",  priority: 0.3 },
  { path: "/terms-and-conditions",  changeFrequency: "yearly",  priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PUBLIC_ROUTES.map((r) => ({
    url:            `${BASE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority:        r.priority,
  }));
}
