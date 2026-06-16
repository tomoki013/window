"use client";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { useUIStore } from "@/stores/ui-store";
import { SettingsView } from "./SettingsView";

/**
 * Settings as a modal layered over the immersive screen. URL-synced via the
 * `#settings` hash (handled in AppShell), so the address bar reads like
 * `/scene/...#settings` and browser-back closes it. Closes on outside click
 * and Esc.
 */
export function SettingsModal({ onClose }: { onClose: () => void }) {
  const open = useUIStore((s) => s.settingsOpen);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement;
    panelRef.current
      ?.querySelector<HTMLElement>(
        "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])",
      )
      ?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>(
        "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])",
      );
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
            aria-label="設定"
            className="glass-strong relative z-10 flex max-h-[88dvh] w-full max-w-[640px] flex-col overflow-hidden rounded-[var(--radius-large)]"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-6 py-4">
              <div>
                <h2 className="text-[17px] font-medium text-[var(--text-primary)]">
                  設定
                </h2>
                <p className="text-[12px] text-[var(--text-muted)]">
                  音・描画・データの管理。
                </p>
              </div>
              <IconButton label="閉じる" onClick={onClose}>
                <X size={18} />
              </IconButton>
            </div>
            <div className="overflow-y-auto px-6 py-6">
              <SettingsView />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
