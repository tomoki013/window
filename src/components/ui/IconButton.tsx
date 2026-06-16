"use client";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  active?: boolean;
};

/** Icon-only button. `label` is required and applied as aria-label. */
export const IconButton = forwardRef<HTMLButtonElement, Props>(
  function IconButton(
    { label, active = false, className = "", children, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        aria-pressed={active}
        className={`grid h-10 w-10 place-items-center rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-[color,background-color,border-color,transform] duration-200 ease-[var(--ease-soft)] hover:text-[var(--text-primary)] hover:bg-white/5 hover:border-[var(--border-highlight)] active:scale-95 ${
          active
            ? "!text-[var(--text-primary)] bg-[var(--accent-soft)] !border-[color:rgba(129,116,255,0.4)]"
            : ""
        } ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
