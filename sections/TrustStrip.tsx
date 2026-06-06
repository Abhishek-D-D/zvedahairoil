"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Flame, Leaf, Users } from "lucide-react";

export default function TrustStrip() {
  const points = [
    {
      icon: <Leaf className="text-gold-luxury w-5 h-5" />,
      title: "100% Natural Formula",
      desc: "Pure Botanical Infusions",
    },
    {
      icon: <Flame className="text-gold-luxury w-5 h-5" />,
      title: "Taila Paka Vidhi",
      desc: "Ancient Wood-Fired Cooked",
    },
    {
      icon: <ShieldCheck className="text-gold-luxury w-5 h-5" />,
      title: "Silicone & Paraben Free",
      desc: "Zero Synthetic Chemicals",
    },
    {
      icon: <Users className="text-gold-luxury w-5 h-5" />,
      title: "500+ Happy Customers",
      desc: "Proven Hair Regrowth",
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

  const itemVars = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div className="bg-herbal-deep border-y border-gold-luxury/10 relative z-10 py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVars}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-center"
        >
          {points.map((pt, i) => (
            <motion.div
              key={i}
              variants={itemVars}
              className="flex items-center gap-3 justify-start md:justify-center p-2 group"
            >
              <div className="p-2.5 rounded-full bg-primary-bg/50 border border-gold-luxury/10 group-hover:border-gold-luxury/30 transition-colors duration-300">
                {pt.icon}
              </div>
              <div>
                <h4 className="text-cream-white text-xs md:text-sm font-semibold tracking-wider uppercase">
                  {pt.title}
                </h4>
                <p className="text-[11px] text-muted-text/80 tracking-wide mt-0.5">
                  {pt.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
