"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CinematicLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if user has already seen the loader in this session
    const hasSeen = sessionStorage.getItem("zveda-seen-loader");
    if (hasSeen) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("zveda-seen-loader", "true");
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#0B140D] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Glowing particle radial background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,107,0.08)_0%,transparent_60%)] pointer-events-none" />

          {/* Logo container with scale-up reveal */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
            }}
            exit={{ 
              scale: 1.05, 
              opacity: 0,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }}
            className="relative flex flex-col items-center gap-6"
          >
            {/* Logo image */}
            <div className="relative w-[180px] h-[50px]">
              <Image
                src="/img/Zvedalogo.png"
                alt="Zveda Logo"
                fill
                priority
                sizes="180px"
                className="object-contain"
              />
            </div>

            {/* Subtext and golden line */}
            <div className="flex flex-col items-center space-y-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="h-[1px] bg-gold-luxury" 
              />
              <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-gold-luxury/70">
                The Parampar Essence
              </span>
            </div>
          </motion.div>

          {/* Soft circular growth border */}
          <motion.div
            initial={{ width: 280, height: 280, opacity: 0 }}
            animate={{ 
              width: 320, 
              height: 320, 
              opacity: 0.3,
              transition: { duration: 1.5, ease: "easeOut" }
            }}
            className="absolute rounded-full border border-gold-luxury/20 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
