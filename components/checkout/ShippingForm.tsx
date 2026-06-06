"use client";

/**
 * components/checkout/ShippingForm.tsx
 *
 * Delivery information form card.
 * Pure controlled component — all state lives in the parent checkout page.
 *
 * Phase 5: extracted from app/checkout/page.tsx for reuse and isolation.
 */

import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import type { ShippingFormData } from "@/utils/validators";

export type ShippingField = keyof ShippingFormData;

interface ShippingFormProps {
  data: ShippingFormData;
  onChange: (field: ShippingField, value: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

interface FieldConfig {
  id: ShippingField;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  placeholder: string;
  maxLength?: number;
  fullWidth?: boolean;
}

const FIELDS: FieldConfig[] = [
  { id: "name",    label: "Full Name",         type: "text",     placeholder: "Amit Sharma" },
  { id: "phone",   label: "Phone Number",      type: "tel",      placeholder: "9876543210", maxLength: 10 },
  { id: "email",   label: "Email Address",     type: "email",    placeholder: "amit@gmail.com", fullWidth: true },
  { id: "address", label: "Full Address",      type: "textarea", placeholder: "Flat No, Building, Street Name, Landmark", fullWidth: true },
  { id: "city",    label: "City / Town",       type: "text",     placeholder: "Bengaluru" },
  { id: "pincode", label: "Postal Code (Pincode)", type: "text", placeholder: "560001", maxLength: 6 },
];

const inputClass =
  "w-full bg-primary-bg/50 border border-gold-luxury/20 rounded-xl px-4 py-3 text-sm focus:border-gold-luxury focus:outline-none transition-colors text-cream-white";

const labelClass = "text-xs uppercase tracking-widest font-semibold text-muted-text";

export default function ShippingForm({ data, onChange, onSubmit }: ShippingFormProps) {
  const row1 = FIELDS.filter(f => !f.fullWidth).slice(0, 2);
  const fullWidthFields = FIELDS.filter(f => f.fullWidth);
  const row2 = FIELDS.filter(f => !f.fullWidth).slice(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <GlassCard className="border border-gold-luxury/10" hoverEffect={false}>
        <h2 className="text-xl font-bold text-cream-white border-b border-gold-luxury/10 pb-4 mb-6 flex items-center gap-2">
          <span>1.</span> Delivery Information
        </h2>

        <form className="space-y-6" onSubmit={onSubmit} noValidate>
          {/* Name + Phone row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {row1.map(field => (
              <FieldInput
                key={field.id}
                config={field}
                value={data[field.id]}
                onChange={v => onChange(field.id, v)}
              />
            ))}
          </div>

          {/* Email + Address (full-width) */}
          {fullWidthFields.map(field => (
            <FieldInput
              key={field.id}
              config={field}
              value={data[field.id]}
              onChange={v => onChange(field.id, v)}
            />
          ))}

          {/* City + Pincode row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {row2.map(field => (
              <FieldInput
                key={field.id}
                config={field}
                value={data[field.id]}
                onChange={v => onChange(field.id, v)}
              />
            ))}
          </div>
        </form>
      </GlassCard>
    </motion.div>
  );
}

// ─── Single field renderer ─────────────────────────────────────────────────────

interface FieldInputProps {
  config: FieldConfig;
  value: string;
  onChange: (value: string) => void;
}

function FieldInput({ config, value, onChange }: FieldInputProps) {
  const { id, label, type, placeholder, maxLength } = config;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={inputClass}
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          type={type}
          id={id}
          maxLength={maxLength}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={inputClass}
          placeholder={placeholder}
          required
        />
      )}
    </div>
  );
}
