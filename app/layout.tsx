import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/providers/LenisProvider";
import AuthProvider from "@/providers/AuthProvider";
import CinematicLoader from "@/components/CinematicLoader";
import JsonLd from "@/components/JsonLd";

// ─── Structured data: Organization (site-wide) ────────────────────────────────
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type":    "Organization",
  name:       "Zveda Oils",
  alternateName: "Zveda — The Parampar Essence",
  url:        "https://zvedaoils.com",
  logo:       "https://zvedaoils.com/img/Zvedalogo.png",
  description:
    "Premium Ayurvedic hair oil handcrafted through the traditional Taila Paka Vidhi ritual — 20+ potent botanicals slow-cooked in copper vessels for 12 hours.",
  contactPoint: {
    "@type":      "ContactPoint",
    telephone:    "+91-73383-48401",
    contactType:  "customer service",
    areaServed:   "IN",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.instagram.com/zvedaoils",
  ],
};

const clashDisplay = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "./fonts/ClashDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const SHARE_TITLE =
  "Zveda — The Parampar Essence | Premium Ayurvedic Hair Oil";
const SHARE_DESCRIPTION =
  "Experience the ancient Ayurvedic hair recovery ritual. Handcrafted with 20+ potent herbs for natural hair growth.";
const SHARE_IMAGE = {
  url:    "/img/zvedaoils2.png",
  width:  853,
  height: 1844,
  alt:    "Zveda Hair Oil — The Parampar Essence",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zvedaoils.com"),
  title: SHARE_TITLE,
  description:
    "Experience the ancient Ayurvedic hair recovery ritual. Handcrafted through Taila Paka Vidhi with 20+ potent herbs like Jatamansi and Vetiver for natural hair growth.",
  keywords:
    "Zveda hair oil, Ayurvedic hair oil, Taila Paka Vidhi, stop hair fall, natural hair growth, chemical-free hair oil, luxury hair care",
  openGraph: {
    type: "website",
    siteName: "Zveda Oils",
    url: "https://zvedaoils.com",
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  twitter: {
    // Portrait image — use small "summary" card instead of "summary_large_image"
    // (X crops the large card to 1.91:1 landscape, which would chop most of
    // the bottle out of the frame).
    card: "summary",
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [SHARE_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${cormorant.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-primary-bg text-cream-white selection:bg-gold-luxury selection:text-primary-bg"
        suppressHydrationWarning
      >
        <JsonLd data={organizationJsonLd} />
        <CinematicLoader />
        <AuthProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
