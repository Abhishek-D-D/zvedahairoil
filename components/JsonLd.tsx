/**
 * components/JsonLd.tsx
 *
 * Phase 10: Tiny helper that emits a `<script type="application/ld+json">`
 * block. Use one per structured-data entity (Organization, Product, FAQPage…).
 *
 * Safe by construction:
 *   - JSON.stringify escapes user-supplied strings.
 *   - We replace `</` to prevent any pathological closing-script-tag breakout.
 */

interface JsonLdProps {
  /** Any valid schema.org JSON-LD object. */
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // Required: schema markup must be raw JSON in the DOM.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
