import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/sections/FAQ";
import JsonLd from "@/components/JsonLd";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How soon can I expect visible results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most users notice a significant reduction in hair fall and shedding within 2 to 3 weeks. By week 6 of consistent application, you will begin to observe new hair follicles emerging along the hairline and thinning patches, with increased hair thickness."
      }
    },
    {
      "@type": "Question",
      "name": "How many times a week should I apply Zveda Hair Oil?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For optimal hair recovery, we recommend applying the oil 3 times a week. Massage it gently into the scalp using your fingertips for 5-10 minutes. Leave it on for at least 2 hours or overnight, and wash it out with a mild, chemical-free shampoo."
      }
    },
    {
      "@type": "Question",
      "name": "Is it suitable for both men and women?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Zveda Hair Oil is formulated to balance scalp hormones and blood circulation for all genders. It works effectively for male pattern thinning, female partition hair loss, stress-related shedding, and dandruff issues."
      }
    },
    {
      "@type": "Question",
      "name": "What makes Taila Paka Vidhi better than regular cold-pressed oils?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cold-pressing only extracts base oil from seeds. Taila Paka Vidhi is a double-infusion technique where active botanicals are cooked on a low wood fire in copper vessels for 12 hours. This transfers the non-oil-soluble organic compounds of herbs like Jatamansi and Vetiver directly into the oil medium, multiplying its biological potency."
      }
    },
    {
      "@type": "Question",
      "name": "Does this product contain any synthetic mineral oils or chemicals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely not. Zveda is 100% chemical-free. We do not use mineral oil, paraffin, silicones, artificial fragrances, or parabens. The base consists of cold-pressed Coconut, Sesame, Almond, and Castor oils cooked with raw herbs."
      }
    }
  ]
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Navbar />
      <main className="flex-grow pt-28 pb-20 bg-primary-bg min-h-screen relative z-10 text-muted-text">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-luxury hover:text-cream-white transition-colors mb-8"
          >
            ← Back to Ritual
          </Link>
        </div>
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
