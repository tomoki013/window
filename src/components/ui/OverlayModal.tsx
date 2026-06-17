"use client";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { IconButton } from "./IconButton";

const FOCUSABLE =
  "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  /** Accessible label for the dialog; defaults to `title`. */
  ariaLabel?: string;
  children: React.ReactNode;
};

/**
 * A quiet, scrollable overlay sheet layered over the immersive screen. Handles
 * focus trapping, focus restoration, Esc-to-close, and outside-click. Used for
 * settings, the archive, and the about panel — each URL-synced via its own hash
 * in AppShell so browser-back closes it.
 */
export function OverlayModal({
  open,
  onClose,
  title,
  subtitle,
  ariaLabel,
  children,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement;
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel ?? title}
            className="glass-strong relative z-10 flex max-h-[88dvh] w-full max-w-[640px] flex-col overflow-hidden rounded-[var(--radius-large)]"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-6 py-4">
              <div>
                <h2 className="text-[17px] font-medium text-[var(--text-primary)]">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-[12px] text-[var(--text-muted)]">
                    {subtitle}
                  </p>
                )}
              </div>
              <IconButton label="閉じる" onClick={onClose}>
                <X size={18} />
              </IconButton>
            </div>
            <div className="overflow-y-auto px-6 py-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
