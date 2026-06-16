"use client";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
  /** Render as a static label (non-interactive). */
  asLabel?: boolean;
};

/**
 * Mood tag chip. Selection is shown through border + soft light + a small dot
 * — never a saturated fill, and never colour alone (the dot + ring + aria
 * convey state together).
 */
export function Tag({
  selected = false,
  asLabel = false,
  className = "",
  children,
  ...rest
}: Props) {
  const visual = `inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] leading-none transition-all duration-200 ease-[var(--ease-soft)] ${
    selected
      ? "border-[color:rgba(129,116,255,0.5)] bg-[var(--accent-soft)] text-[var(--text-primary)] shadow-[0_0_18px_-4px_rgba(129,116,255,0.5)]"
      : "border-[var(--border-subtle)] text-[var(--text-secondary)]"
  } ${className}`;

  if (asLabel) {
    return (
      <span className={visual}>
        {selected && <Dot />}
        {children}
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`${visual} hover:border-[var(--border-highlight)] hover:text-[var(--text-primary)] active:scale-95`}
      {...rest}
    >
      {selected && <Dot />}
      {children}
    </button>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="h-1.5 w-1.5 rounded-full bg-[var(--accent-secondary)]"
    />
  );
}
