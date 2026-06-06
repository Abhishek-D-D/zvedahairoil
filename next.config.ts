import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

// Phase 10: gated by `ANALYZE=true npm run build` — emits .next/analyze reports.
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Supabase Storage — replace <project-ref> with your project ID
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
