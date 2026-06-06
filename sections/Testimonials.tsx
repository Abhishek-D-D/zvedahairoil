"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Badge from "@/components/Badge";
import GlassCard from "@/components/GlassCard";
import { Play, Star, X } from "lucide-react";

interface VideoTestimonial {
  name: string;
  role: string;
  headline: string;
  youtubeId: string;
  thumbnail: string;
}

interface TextTestimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export default function Testimonials() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const videoReviews: VideoTestimonial[] = [
    {
      name: "Chethan G R",
      role: "Bangalore",
      headline: "Scalp Saved: Itch-Free Hair, Thanks to Zveda!",
      youtubeId: "8G8nH9rNhnA",
      thumbnail: "/img/chetan-review-thumbnail.jpg",
    },
    {
      name: "Akshay Acharya",
      role: "Software Professional",
      headline: "Stress to Success: Hair Fall Stopped, Confidence Back",
      youtubeId: "oUziiqxXRf8",
      thumbnail: "/img/akshaya-review-thumbnail.jpg",
    },
    {
      name: "Shruti Singh",
      role: "Beauty Blogger",
      headline: "Tried Everything? Zveda Regrew Her Hair in Weeks!",
      youtubeId: "vcDRIEQUJiA",
      thumbnail: "/img/shrutireviewthumb.png",
    },
  ];

  const textReviews: TextTestimonial[] = [
    {
      name: "Akshay",
      role: "Software Developer",
      content: "I was losing so much hair, but after just a few weeks of using Zveda, the hair fall has significantly reduced! My hair feels stronger and I can already see new growth. This oil truly works wonders!",
      avatar: "/img/akshaya.jpeg",
    },
    {
      name: "Vinay",
      role: "Mechanical Engineer",
      content: "Initially skeptical, I'm now a believer! Zveda Hair Oil stopped my hair loss and my scalp feels so much healthier. The natural ingredients make all the difference. My hair looks visibly thicker in just 6 weeks!",
      avatar: "/img/vini.jpeg",
    },
  ];

  return (
    <section className="relative py-24 bg-primary-bg overflow-hidden z-10">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-herbal-deep/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <Badge variant="gold">Proven Results</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-cream-white">
            Real People. <br />
            <span className="gold-text-glow font-editorial italic font-light">Real Hair Transformed</span>
          </h2>
          <p className="text-muted-text text-sm md:text-base">
            Watch the video reviews or browse early user transformations to see how Zveda brings hair follicles back to life.
          </p>
        </motion.div>

        {/* Video Testimonials Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {videoReviews.map((vid, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
                },
              }}
              className="h-full"
            >
              <GlassCard
                className="p-0 border border-gold-luxury/10 hover:border-gold-luxury/35 overflow-hidden flex flex-col h-full group transition-all duration-500"
              >
                {/* Thumbnail with overlay play */}
                <button
                  type="button"
                  className="relative aspect-video w-full cursor-pointer overflow-hidden bg-primary-bg"
                  onClick={() => setActiveVideoId(vid.youtubeId)}
                  aria-label={`Play video testimonial from ${vid.name}`}
                >
                  <Image
                    src={vid.thumbnail}
                    alt={vid.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary-bg/25 flex items-center justify-center group-hover:bg-primary-bg/40 transition-colors duration-300">
                    <div className="p-3.5 rounded-full bg-gold-luxury text-primary-bg scale-90 group-hover:scale-115 transition-transform duration-300 shadow-md">
                      <Play size={20} className="fill-current ml-0.5" aria-hidden="true" />
                    </div>
                  </div>
                </button>

                {/* Detail Content */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="flex items-center gap-1 text-gold-luxury">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-cream-white leading-snug">
                    &ldquo;{vid.headline}&rdquo;
                  </h3>
                  <div className="border-t border-gold-luxury/5 pt-3">
                    <p className="font-semibold text-sm text-cream-white">{vid.name}</p>
                    <p className="text-xs text-muted-text">{vid.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Before / After Transformation Grid */}
        <div className="border-t border-gold-luxury/10 pt-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto mb-12 space-y-3"
          >
            <Badge variant="gold">Visual Transformations</Badge>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-cream-white">
              The Path to Recovery
            </h3>
            <p className="text-muted-text text-sm">
              Real recovery results compiled from clinical case monitors tracking scalp and hair follicle progress.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Temporal Hairline",
                duration: "6 Weeks Ritual",
                beforeText: "Receded hairline edges with inactive and miniaturized follicles.",
                afterText: "Emergence of active thick shafts and fully restored temple margins.",
                pct: "94% Fall Reduction",
                actives: "Rosemary & Brahmi Infusion",
              },
              {
                title: "Crown Density",
                duration: "8 Weeks Ritual",
                beforeText: "Significant thinning and scalp showing under direct overhead light.",
                afterText: "Denser crown coverage and fortified structural hair thickness.",
                pct: "88% Density Multiplier",
                actives: "Copper Brewed Jatamansi",
              },
              {
                title: "Dandruff & Flaking",
                duration: "2 Weeks Ritual",
                beforeText: "Dry scalp flakes, continuous itch, and inflamed hair roots.",
                afterText: "Moisturized scalp surface, zero flakes, and fully calm follicles.",
                pct: "100% Scalp Clearance",
                actives: "Purified Neem & Tea Tree",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
                  },
                }}
                className="h-full"
              >
                <GlassCard className="border border-gold-luxury/10 hover:border-gold-luxury/30 transition-all duration-500 p-6 flex flex-col justify-between h-full bg-herbal-deep/5">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gold-luxury/10 pb-3">
                      <h4 className="font-heading font-bold text-cream-white text-base">{card.title}</h4>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gold-luxury bg-gold-luxury/5 border border-gold-luxury/20 px-2 py-0.5 rounded">
                        {card.duration}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-red-400 font-bold">Before:</span>
                        <p className="text-muted-text leading-relaxed">{card.beforeText}</p>
                      </div>
                      <div className="space-y-1 border-l border-gold-luxury/10 pl-4">
                        <span className="text-[9px] uppercase tracking-wider text-green-400 font-bold">After:</span>
                        <p className="text-cream-white leading-relaxed">{card.afterText}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gold-luxury/5 pt-4 mt-6 flex justify-between items-center">
                    <span className="text-[10px] text-muted-text italic">
                      🌱 {card.actives}
                    </span>
                    <span className="text-[10px] font-bold text-gold-luxury font-sans uppercase tracking-wider">
                      {card.pct}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Text Testimonials Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gold-luxury/10 pt-16"
        >
          {textReviews.map((review, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
                },
              }}
              className="h-full"
            >
              <GlassCard
                className="p-8 border border-gold-luxury/10 relative flex flex-col justify-between h-full"
                hoverEffect={true}
              >
                {/* Quotes decoration */}
                <span className="absolute top-4 right-6 text-6xl font-serif text-gold-luxury/15 pointer-events-none">
                  &ldquo;
                </span>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-1 text-gold-luxury mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-sm md:text-base text-cream-white/90 italic leading-relaxed">
                    &ldquo;{review.content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-6 border-t border-gold-luxury/5 pt-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold-luxury/20">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-cream-white">{review.name}</h4>
                    <p className="text-xs text-muted-text">{review.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Trust Statistics Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-herbal-deep/20 border border-gold-luxury/10 rounded-2xl p-8 mt-16"
        >
          <div className="space-y-1">
            <h4 className="text-3xl md:text-4xl font-bold text-gold-luxury font-heading animate-pulse">500+</h4>
            <p className="text-[10px] uppercase tracking-widest text-muted-text font-semibold">Bottles Handcrafted</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl md:text-4xl font-bold text-gold-luxury font-heading">96%</h4>
            <p className="text-[10px] uppercase tracking-widest text-muted-text font-semibold">Anti-Hairfall Success</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl md:text-4xl font-bold text-gold-luxury font-heading">4.9/5</h4>
            <p className="text-[10px] uppercase tracking-widest text-muted-text font-semibold">Star Rating (42 Reviews)</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl md:text-4xl font-bold text-gold-luxury font-heading">72%</h4>
            <p className="text-[10px] uppercase tracking-widest text-muted-text font-semibold">Repeat Buyer Rate</p>
          </div>
        </motion.div>
      </div>

      {/* Video Lightbox Modal */}
      {activeVideoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-bg/95 backdrop-blur-sm p-4">
          <button
            className="absolute top-6 right-6 text-cream-white hover:text-gold-luxury transition-colors p-2"
            onClick={() => setActiveVideoId(null)}
            aria-label="Close video"
          >
            <X size={32} />
          </button>
          <div className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative">
            <iframe
              className="w-full h-full border-0"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
