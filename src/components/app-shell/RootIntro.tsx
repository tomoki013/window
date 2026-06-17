"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { brandConfig } from "@/config/brand";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

/**
 * The bare-root `/` overture. A quiet veil settles over the scene while the
 * Atmos wordmark breathes in, then the veil lifts to reveal the window beneath
 * — at which point the host settles the address bar onto the scene URL. Visual
 * only; the audio gesture still lives in OpenWindowAffordance.
 */
export function RootIntro({ onArrive }: { onArrive: () => void }) {
  const reducedMotion = useReducedMotionPreference();
  const [visible, setVisible] = useState(true);
  const hold = reducedMotion ? 600 : 2200;

  // Keep the latest onArrive without resetting the one-shot timers on re-render.
  const onArriveRef = useRef(onArrive);
  onArriveRef.current = onArrive;

  useEffect(() => {
    const arrive = window.setTimeout(
      () => onArriveRef.current(),
      Math.max(0, hold - 600),
    );
    const lift = window.setTimeout(() => setVisible(false), hold);
    return () => {
      window.clearTimeout(arrive);
      window.clearTimeout(lift);
    };
  }, [hold]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[120] grid place-items-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {/* Veil: a deep wash that lifts to uncover the live scene. */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(130% 100% at 50% 36%, rgba(20,24,52,0.86) 0%, rgba(7,10,22,0.96) 60%, #04060d 100%)",
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
          />

          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              letterSpacing: reducedMotion ? "0.14em" : "0.22em",
            }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: reducedMotion ? 0.3 : 1.4, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <span
              className="brand-wordmark select-none text-[clamp(2.6rem,9vw,4.6rem)] leading-none"
              style={{ fontFamily: "var(--font-brand)" }}
            >
              {brandConfig.displayName}
            </span>
            <motion.span
              className="glass-text-sub mt-4 text-[13px] font-light tracking-[0.18em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: reducedMotion ? 0.1 : 0.7 }}
            >
              {brandConfig.tagline}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
