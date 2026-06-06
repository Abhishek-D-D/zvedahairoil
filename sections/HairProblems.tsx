"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import Badge from "@/components/Badge";

export default function HairProblems() {
  const problems = [
    {
      number: "01",
      title: "Excessive Hair Fall",
      desc: "Stops shedding by strengthening root anchors and restoring depleted scalp nutrients within 2-3 weeks.",
    },
    {
      number: "02",
      title: "Weak & Damaged Roots",
      desc: "Reinvigorates follicles starved of circulation, repairing the structural integrity of the root bulbs.",
    },
    {
      number: "03",
      title: "Thin & Lifeless Strands",
      desc: "Infuses protein-rich base oils (like castor and sesame) to expand shaft diameter and multiply visible density.",
    },
    {
      number: "04",
      title: "Dryness & Stubborn Dandruff",
      desc: "Combats dandruff-causing microbes using pure neem and tea tree extract, maintaining an itch-free, hydrated scalp environment.",
    },
    {
      number: "05",
      title: "Stunted Hair Growth",
      desc: "Reawakens dormant follicles with Rosemary and Jatamansi, accelerating new hair growth cycles.",
    },
  ];

  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVars = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative py-24 bg-primary-bg overflow-hidden z-10">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-herbal-deep/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-botanical-green/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <Badge variant="gold">Targeted Recovery</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Signs Your Scalp is <br />
            <span className="gold-text-glow font-editorial italic font-light">Starved of Nutrition</span>
          </h2>
          <p className="text-muted-text text-sm md:text-base">
            Modern lifestyles, chemical shampoos, and stress deplete the scalp. Zveda Hair Oil actively addresses all five root causes of hair deterioration.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVars}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {problems.map((prob, i) => (
            <motion.div key={i} variants={cardVars} className="h-full">
              <GlassCard className="flex flex-col justify-between h-full border border-gold-luxury/10 hover:border-gold-luxury/30 transition-luxury p-8 relative group">
                {/* Decorative light leak on card hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-luxury/5 rounded-full blur-xl group-hover:bg-gold-luxury/10 transition-colors pointer-events-none" />

                <div className="space-y-6">
                  {/* Accent Number */}
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-luxury/60">
                    Problem {prob.number}
                  </span>

                  <h3 className="text-xl md:text-2xl font-bold text-cream-white tracking-wide">
                    {prob.title}
                  </h3>
                  <p className="text-sm text-muted-text leading-relaxed">
                    {prob.desc}
                  </p>
                </div>

                {/* Status bar */}
                <div className="w-full bg-gold-luxury/10 h-[2px] mt-8 rounded-full overflow-hidden">
                  <div className="bg-gold-luxury h-full w-1/3 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
