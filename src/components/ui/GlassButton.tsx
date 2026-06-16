"use client";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-medium)] px-4 py-2.5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-soft)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  // Accent is used sparingly — a soft tinted glass, not a saturated gradient.
  primary:
    "text-[var(--text-primary)] border border-[color:rgba(129,116,255,0.45)] bg-[var(--accent-soft)] hover:bg-[color:rgba(129,116,255,0.28)]",
  secondary:
    "text-[var(--text-secondary)] border border-[var(--border-subtle)] bg-white/[0.03] hover:bg-white/[0.07] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)]",
  ghost:
    "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export const GlassButton = forwardRef<HTMLButtonElement, Props>(
  function GlassButton(
    { variant = "secondary", className = "", children, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={`${base} ${variants[variant]} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
