"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import GlassCard from "@/components/GlassCard";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 pb-20 bg-primary-bg min-h-screen relative z-10 text-muted-text">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-luxury hover:text-cream-white transition-colors mb-8"
          >
            ← Back to Ritual
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info (lg: 5) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                <Badge variant="gold">Support Desk</Badge>
                <h1 className="text-3xl md:text-5xl font-bold text-cream-white font-heading">
                  Get in Touch
                </h1>
                <p className="text-sm leading-relaxed">
                  Have questions about our Ayurvedic preparation process, shipping timelines, or starting your custom hair care routine? Drop us a line.
                </p>
              </div>

              <div className="space-y-4">
                <GlassCard className="border border-gold-luxury/10 p-6 flex gap-4" hoverEffect={false}>
                  <Mail className="text-gold-luxury flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-sm text-cream-white">Email Address</h4>
                    <p className="text-xs text-muted-text mt-1">zvedaoils@gmail.com</p>
                  </div>
                </GlassCard>

                <GlassCard className="border border-gold-luxury/10 p-6 flex gap-4" hoverEffect={false}>
                  <Phone className="text-gold-luxury flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-sm text-cream-white">Phone Support</h4>
                    <p className="text-xs text-muted-text mt-1">+91 73535 53693 / +91 73383 48401</p>
                  </div>
                </GlassCard>

                <GlassCard className="border border-gold-luxury/10 p-6 flex gap-4" hoverEffect={false}>
                  <MapPin className="text-gold-luxury flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-sm text-cream-white">Head Office</h4>
                    <p className="text-xs text-muted-text mt-1">Bengaluru, Karnataka, India</p>
                  </div>
                </GlassCard>

                <GlassCard className="border border-gold-luxury/10 p-6 flex gap-4" hoverEffect={false}>
                  <Clock className="text-gold-luxury flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-sm text-cream-white">Working Hours</h4>
                    <p className="text-xs text-muted-text mt-1">Mon - Sat: 10:00 AM - 6:00 PM IST</p>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Right: Message Form (lg: 7) */}
            <div className="lg:col-span-7">
              <GlassCard className="border border-gold-luxury/10 p-8" hoverEffect={false}>
                {submitted ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-16 h-16 rounded-full bg-gold-luxury/10 text-gold-luxury flex items-center justify-center mx-auto">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-cream-white font-heading">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm text-muted-text max-w-sm mx-auto">
                      Thank you for contacting Zveda. Our Ayurvedic support consultants will review your inquiry and respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs uppercase tracking-widest text-gold-luxury hover:text-cream-white font-semibold pt-4"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-xl font-bold text-cream-white border-b border-gold-luxury/10 pb-4 mb-4">
                      Send a Message
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs uppercase tracking-widest font-semibold text-muted-text">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-primary-bg/50 border border-gold-luxury/20 rounded-xl px-4 py-3 text-sm focus:border-gold-luxury focus:outline-none transition-colors"
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs uppercase tracking-widest font-semibold text-muted-text">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-primary-bg/50 border border-gold-luxury/20 rounded-xl px-4 py-3 text-sm focus:border-gold-luxury focus:outline-none transition-colors"
                          placeholder="yourname@gmail.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs uppercase tracking-widest font-semibold text-muted-text">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-primary-bg/50 border border-gold-luxury/20 rounded-xl px-4 py-3 text-sm focus:border-gold-luxury focus:outline-none transition-colors"
                        placeholder="Inquiry Topic"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs uppercase tracking-widest font-semibold text-muted-text">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-primary-bg/50 border border-gold-luxury/20 rounded-xl px-4 py-3 text-sm focus:border-gold-luxury focus:outline-none transition-colors"
                        placeholder="Write your query here..."
                        required
                      />
                    </div>

                    <Button
                      disabled={isSubmitting}
                      variant="gold"
                      className="w-full h-12 flex items-center justify-center font-bold tracking-wider"
                    >
                      {isSubmitting ? "Sending message..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
