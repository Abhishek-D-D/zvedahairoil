"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Badge from "@/components/Badge";
import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";
import { useAuthContext } from "@/providers/AuthProvider";

interface JourneyMilestone {
  week: string;
  title: string;
  biologicalAction: string;
  details: string;
  tips: string;
}

export default function HairRecoveryJourneyPage() {
  const { user } = useAuthContext();
  const checkoutHref = user ? "/checkout" : "/login?redirect=/checkout";
  const milestones: JourneyMilestone[] = [
    {
      week: "Week 1",
      title: "Detoxification & Soothing",
      biologicalAction: "Scalp Pore Cleansing & Sebum Balancing",
      details:
        "The active antiseptic compounds of Neem, Tea Tree, and Jojoba oils cleanse chemical residues left by synthetic shampoos. Excess sebum is dissolved, and scalp itching, flaking, or irritation is instantly calmed as the cooling properties of Coconut and Vetiver soothe the skin.",
      tips: "Massage gently for 5 minutes at night. Leave on overnight to allow roots to absorb the base hydration.",
    },
    {
      week: "Week 3",
      title: "Root Anchoring & Fall Control",
      biologicalAction: "Follicle Bulbs Micro-Circulation Boost",
      details:
        "Excessive hair fall drops significantly (up to 80% reduction). Ingredients like Rosemary, Jatamansi, and Sesame oil boost micro-circulation to the roots, feeding nutrients like Vitamin E directly into follicle bulbs to strengthen hair anchors.",
      tips: "Apply 3 times weekly. Do not tie hair too tightly after application to avoid mechanical root stress.",
    },
    {
      week: "Week 6",
      title: "Active Regrowth & Luster",
      biologicalAction: "Anagen Phase Activation & Shaft Expansion",
      details:
        "Small baby hair follicles emerge along thinning areas and the hairline. Castor and Ashwagandha oils stimulate dormant hair roots. Amla and Hibiscus nourish the hair shaft, expanding shaft thickness and restoring a deep, natural shine.",
      tips: "Keep application consistent. Use a soft wooden comb to distribute natural scalp oils evenly.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 pb-20 bg-primary-bg min-h-screen relative z-10 text-muted-text">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-luxury hover:text-cream-white transition-colors mb-8"
          >
            ← Back to Ritual
          </Link>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge variant="gold">Biological Timeline</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-cream-white">
              The 6-Week Hair <br />
              <span className="gold-text-glow font-editorial italic font-light">Recovery Journey</span>
            </h1>
            <p className="text-muted-text text-sm md:text-base leading-relaxed">
              Hair recovery is a biological process that takes time and dedication. Follow our timeline to see how Zveda transforms your scalp layer by layer.
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="relative border-l border-gold-luxury/20 ml-6 pl-10 space-y-12 mb-16">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Node */}
                <span className="absolute -left-[61px] top-2 w-10 h-10 rounded-full bg-primary-bg border-2 border-gold-luxury flex items-center justify-center text-xs font-bold text-gold-luxury group-hover:bg-gold-luxury group-hover:text-primary-bg transition-colors duration-500 shadow-md">
                  {idx + 1}
                </span>

                <GlassCard className="border border-gold-luxury/10 hover:border-gold-luxury/25 transition-luxury p-8">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-b border-gold-luxury/10 pb-4 mb-4">
                    <div>
                      <span className="text-xs uppercase tracking-widest font-bold text-gold-luxury">
                        {milestone.week}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-cream-white font-heading mt-1">
                        {milestone.title}
                      </h3>
                    </div>
                    <Badge variant="green" className="text-[10px]">
                      {milestone.biologicalAction}
                    </Badge>
                  </div>

                  <p className="text-sm md:text-base leading-relaxed text-muted-text mb-4">
                    {milestone.details}
                  </p>

                  <div className="bg-herbal-deep/20 border border-gold-luxury/5 p-4 rounded-xl">
                    <p className="text-xs text-gold-luxury font-medium tracking-wide">
                      💡 Rituale Tip:
                    </p>
                    <p className="text-xs text-muted-text mt-1 italic">
                      {milestone.tips}
                    </p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>

          {/* Final CTA Card */}
          <GlassCard className="border border-gold-luxury/20 p-8 md:p-12 text-center space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gold-luxury/5 to-transparent pointer-events-none" />
            <h2 className="text-2xl md:text-4xl font-bold text-cream-white font-heading">
              Ready to Start Your Transformation?
            </h2>
            <p className="text-sm text-muted-text max-w-xl mx-auto leading-relaxed">
              Order your handcrafted bottle of Zveda Hair Oil today. Every purchase is covered by our express delivery and Cash on Delivery option.
            </p>
            <div className="pt-4 flex justify-center">
              <Button href={checkoutHref} variant="gold">
                Claim Your Bottle Now
              </Button>
            </div>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </>
  );
}
