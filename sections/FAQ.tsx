"use client";

import { useState } from "react";
import Badge from "@/components/Badge";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      q: "How soon can I expect visible results?",
      a: "Most users notice a significant reduction in hair fall and shedding within 2 to 3 weeks. By week 6 of consistent application, you will begin to observe new hair follicles emerging along the hairline and thinning patches, with increased hair thickness.",
    },
    {
      q: "How many times a week should I apply Zveda Hair Oil?",
      a: "For optimal hair recovery, we recommend applying the oil 3 times a week. Massage it gently into the scalp using your fingertips for 5-10 minutes. Leave it on for at least 2 hours or overnight, and wash it out with a mild, chemical-free shampoo.",
    },
    {
      q: "Is it suitable for both men and women?",
      a: "Yes, Zveda Hair Oil is formulated to balance scalp hormones and blood circulation for all genders. It works effectively for male pattern thinning, female partition hair loss, stress-related shedding, and dandruff issues.",
    },
    {
      q: "What makes Taila Paka Vidhi better than regular cold-pressed oils?",
      a: "Cold-pressing only extracts base oil from seeds. Taila Paka Vidhi is a double-infusion technique where active botanicals are cooked on a low wood fire in copper vessels for 12 hours. This transfers the non-oil-soluble organic compounds of herbs like Jatamansi and Vetiver directly into the oil medium, multiplying its biological potency.",
    },
    {
      q: "Does this product contain any synthetic mineral oils or chemicals?",
      a: "Absolutely not. Zveda is 100% chemical-free. We do not use mineral oil, paraffin, silicones, artificial fragrances, or parabens. The base consists of cold-pressed Coconut, Sesame, Almond, and Castor oils cooked with raw herbs.",
    },
  ];

  return (
    <section className="relative py-24 bg-primary-bg overflow-hidden z-10 border-t border-gold-luxury/10">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-herbal-deep/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="gold">Common Inquiries</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Frequently Asked <br />
            <span className="gold-text-glow font-editorial italic font-light">Questions</span>
          </h2>
          <p className="text-muted-text text-sm md:text-base">
            Everything you need to know about the Zveda hair recovery ritual, orders, and application cycles.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-gold-luxury/10 hover:border-gold-luxury/25 rounded-xl overflow-hidden transition-colors duration-300"
              >
                <button
                  id={`faq-trigger-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left bg-herbal-deep/10 text-cream-white hover:bg-herbal-deep/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-luxury"
                >
                  <span className="font-semibold text-sm sm:text-base pr-4">{faq.q}</span>
                  <span className="text-gold-luxury flex-shrink-0">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <div
                  id={`faq-panel-${idx}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${idx}`}
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[300px] border-t border-gold-luxury/10" : "max-h-0"
                  }`}
                >
                  <div className="p-4 sm:p-6 text-xs sm:text-sm text-muted-text bg-herbal-deep/5 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
