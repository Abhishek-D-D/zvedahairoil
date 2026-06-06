import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "gold" | "green" | "glass";
  className?: string;
}

export default function Badge({
  children,
  icon,
  variant = "glass",
  className = "",
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300";

  const variants = {
    glass:
      "bg-herbal-deep/40 text-cream-white border-gold-luxury/10 hover:border-gold-luxury/30 backdrop-blur-md",
    gold: "bg-gold-luxury/10 text-gold-luxury border-gold-luxury/30 shadow-[0_0_10px_rgba(200,169,107,0.05)]",
    green:
      "bg-botanical-green/10 text-botanical-green border-botanical-green/30",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {icon && <span className="opacity-80">{icon}</span>}
      <span>{children}</span>
    </div>
  );
}
