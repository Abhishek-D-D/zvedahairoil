"use client";

/**
 * components/dashboard/ProfileForm.tsx
 *
 * Editable profile form for the account page.
 * Fields: display name, email, phone (read-only — auth source of truth).
 * Saves to Supabase user_metadata via updateUser().
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, Save, CheckCircle } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { fadeUp } from "@/animations/variants";
import { cn } from "@/utils/cn";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface ProfileFormProps {
  user: SupabaseUser;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [fullName, setFullName] = useState(
    user.user_metadata?.full_name ?? ""
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hydrate from metadata when user prop changes
  useEffect(() => {
    setFullName(user.user_metadata?.full_name ?? "");
  }, [user]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    setSaved(false);

    const supabase = supabaseBrowser();
    const { error: updateError } = await supabase.auth.updateUser({
      data: { full_name: fullName.trim() },
    });

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const authMethod = user.phone ? "phone" : "email";

  return (
    <motion.form
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      onSubmit={handleSave}
      className="glass-panel rounded-2xl p-6 border border-gold-luxury/10 space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gold-luxury/10 border border-gold-luxury/20 flex items-center justify-center">
          <User size={18} className="text-gold-luxury" />
        </div>
        <h2 className="text-cream-white font-semibold text-base">
          Personal Information
        </h2>
      </div>

      {/* Full name — editable */}
      <div className="space-y-2">
        <label
          htmlFor="full-name"
          className="text-xs font-semibold tracking-wider uppercase text-gold-luxury"
        >
          Full Name
        </label>
        <input
          id="full-name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Amit Sharma"
          className={cn(
            "w-full bg-primary-bg/50 border rounded-xl px-4 py-3 text-sm text-cream-white",
            "placeholder:text-muted-text/50 outline-none transition-colors",
            "border-gold-luxury/20 focus:border-gold-luxury/60"
          )}
        />
      </div>

      {/* Phone — read-only (auth source) */}
      <div className="space-y-2">
        <label className="text-xs font-semibold tracking-wider uppercase text-gold-luxury flex items-center gap-1.5">
          <Phone size={11} /> Mobile Number
        </label>
        <div className="flex items-center gap-3 bg-primary-bg/30 border border-gold-luxury/10 rounded-xl px-4 py-3">
          <span className="text-sm text-cream-white font-mono">
            {user.phone ?? "—"}
          </span>
          {user.phone && (
            <span className="ml-auto text-xs text-green-400 font-semibold">
              ✓ Verified
            </span>
          )}
        </div>
        <p className="text-xs text-muted-text">
          Mobile number is your login identity and cannot be changed here.
        </p>
      </div>

      {/* Email — read-only */}
      <div className="space-y-2">
        <label className="text-xs font-semibold tracking-wider uppercase text-gold-luxury flex items-center gap-1.5">
          <Mail size={11} /> Email Address
        </label>
        <div className="flex items-center gap-3 bg-primary-bg/30 border border-gold-luxury/10 rounded-xl px-4 py-3">
          <span className="text-sm text-cream-white">
            {user.email ?? "—"}
          </span>
          {user.email && user.email_confirmed_at && (
            <span className="ml-auto text-xs text-green-400 font-semibold">
              ✓ Verified
            </span>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {/* Save button */}
      <div className="flex items-center gap-4 pt-2">
        <motion.button
          type="submit"
          disabled={saving || !fullName.trim()}
          whileHover={{ scale: saving ? 1 : 1.01 }}
          whileTap={{ scale: saving ? 1 : 0.98 }}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold",
            "bg-gold-luxury text-primary-bg transition-all duration-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "shadow-[0_4px_16px_rgba(200,169,107,0.2)]"
          )}
        >
          <Save size={14} />
          {saving ? "Saving…" : "Save Changes"}
        </motion.button>

        <AnimatePresence>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-green-400 text-sm font-semibold"
            >
              <CheckCircle size={14} /> Saved!
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}
