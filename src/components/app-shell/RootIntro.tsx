"use client";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { brandConfig } from "@/config/brand";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

/**
 * The bare-root `/` overture. A quiet veil settles over the scene while the
 * Atmos wordmark breathes in, then the veil lifts to reveal the window beneath
 * — at which point the host settles the address bar onto the scene URL. A
 * low-key skip control lets impatient visitors cut straight through. Visual
 * only; the audio gesture still lives in OpenWindowAffordance.
 */
export function RootIntro({ onArrive }: { onArrive: () => void }) {
  const reducedMotion = useReducedMotionPreference();
  const [visible, setVisible] = useState(true);
  const hold = reducedMotion ? 1500 : 6500;

  // Keep the latest onArrive without resetting the one-shot timers on re-render.
  const onArriveRef = useRef(onArrive);
  onArriveRef.current = onArrive;
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onArriveRef.current();
    setVisible(false);
  }, []);

  useEffect(() => {
    // Settle the URL a beat before the veil finishes lifting, so the scene is
    // already "real" as it is uncovered.
    const arrive = window.setTimeout(() => onArriveRef.current(), hold - 900);
    const lift = window.setTimeout(finish, hold);
    return () => {
      window.clearTimeout(arrive);
      window.clearTimeout(lift);
    };
  }, [hold, finish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {/* Veil: a deep wash that slowly drifts, then lifts to uncover the
              live scene. */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(130% 100% at 50% 36%, rgba(20,24,52,0.88) 0%, rgba(7,10,22,0.97) 60%, #04060d 100%)",
            }}
            initial={{ opacity: 1, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              scale: { duration: reducedMotion ? 0.4 : 7, ease: "linear" },
              opacity: { duration: 1.1, ease: [0.22, 0.61, 0.36, 1] },
            }}
          />

          <motion.div
            className="pointer-events-none relative flex flex-col items-center"
            initial={{ opacity: 0, y: 12, filter: "blur(12px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              letterSpacing: reducedMotion ? "0.14em" : "0.24em",
            }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{
              duration: reducedMotion ? 0.4 : 2.4,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            <span
              className="brand-wordmark select-none text-[clamp(2.6rem,9vw,4.6rem)] leading-none"
              style={{ fontFamily: "var(--font-brand)" }}
            >
              {brandConfig.displayName}
            </span>

            {/* A hairline that draws itself out beneath the wordmark. */}
            <motion.span
              aria-hidden
              className="mt-5 block h-px bg-[linear-gradient(90deg,transparent,rgba(208,214,255,0.6),transparent)]"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "min(60vw,260px)", opacity: 1 }}
              transition={{
                duration: reducedMotion ? 0.4 : 2.6,
                delay: reducedMotion ? 0.1 : 0.6,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            />

            <motion.span
              className="glass-text-sub mt-5 max-w-[80vw] text-center text-[13px] font-light tracking-[0.18em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: reducedMotion ? 0.15 : 1.2 }}
            >
              {brandConfig.tagline}
            </motion.span>
          </motion.div>

          {/* Quiet skip control, faded in after the title settles. */}
          <motion.button
            type="button"
            onClick={finish}
            className="pointer-events-auto absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-1.5 text-[12px] tracking-[0.12em] text-[var(--text-muted)] backdrop-blur-[3px] transition-colors duration-300 hover:border-[var(--border-highlight)] hover:text-[var(--text-secondary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: reducedMotion ? 0.2 : 1.6 }}
          >
            スキップ
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
