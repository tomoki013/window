"use client";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { brandConfig } from "@/config/brand";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

/**
 * The bare-root `/` overture. A fully opaque veil hides the scene while an
 * animated aurora drifts and the Atmos wordmark breathes in; the veil then
 * lifts to uncover the live window beneath, at which point the host settles the
 * address bar onto the scene URL. A low-key skip control cuts straight through.
 * On finish we nudge the idle timer so the chrome starts out visible.
 */
export function RootIntro({ onArrive }: { onArrive: () => void }) {
  const reducedMotion = useReducedMotionPreference();
  const [visible, setVisible] = useState(true);
  const hold = reducedMotion ? 1800 : 9500;

  const onArriveRef = useRef(onArrive);
  onArriveRef.current = onArrive;
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onArriveRef.current();
    setVisible(false);
    // Wake the chrome so it starts out visible after the overture, and re-arm
    // the idle countdown from now (rather than from page load).
    window.dispatchEvent(new Event("pointermove"));
  }, []);

  useEffect(() => {
    const arrive = window.setTimeout(() => onArriveRef.current(), hold - 1000);
    const lift = window.setTimeout(finish, hold);
    return () => {
      window.clearTimeout(arrive);
      window.clearTimeout(lift);
    };
  }, [hold, finish]);

  const ease = [0.22, 0.61, 0.36, 1] as const;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease }}
        >
          {/* Fully opaque base — the scene never shows through during the
              overture. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "#06080f" }}
          />

          {/* Drifting aurora blobs over the opaque base. */}
          {!reducedMotion && (
            <>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-[20%] top-[8%] h-[60vmax] w-[60vmax] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(96,86,200,0.5) 0%, transparent 62%)",
                  filter: "blur(40px)",
                }}
                initial={{ x: -60, y: -40, scale: 0.9, opacity: 0.0 }}
                animate={{
                  x: [-60, 80, -20, 60],
                  y: [-40, 30, -10, 20],
                  scale: [0.9, 1.15, 1, 1.1],
                  opacity: [0, 0.9, 0.7, 0.85],
                }}
                transition={{
                  duration: 12,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-[15%] bottom-[2%] h-[55vmax] w-[55vmax] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(214,128,120,0.4) 0%, transparent 60%)",
                  filter: "blur(50px)",
                }}
                initial={{ x: 60, y: 50, scale: 1, opacity: 0 }}
                animate={{
                  x: [60, -40, 20, -30],
                  y: [50, -10, 30, 0],
                  scale: [1, 1.2, 1.05, 1.15],
                  opacity: [0, 0.8, 0.6, 0.75],
                }}
                transition={{
                  duration: 13,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </>
          )}

          {/* A few quiet stars. */}
          {!reducedMotion &&
            STARS.map((s) => (
              <motion.span
                key={s.id}
                aria-hidden
                className="pointer-events-none absolute h-[2px] w-[2px] rounded-full bg-white"
                style={{ left: s.left, top: s.top }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.9, 0.4, 0.8], scale: 1 }}
                transition={{
                  duration: 4,
                  delay: s.delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}

          {/* Wordmark cluster with an expanding halo behind it. */}
          <div className="pointer-events-none relative flex flex-col items-center">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[34vmax] w-[34vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(150,150,255,0.18) 0%, transparent 60%)",
              }}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{
                scale: reducedMotion ? 1 : [0.3, 1, 1.08, 1],
                opacity: reducedMotion ? 0.6 : [0, 0.8, 0.45, 0.75],
              }}
              transition={{
                duration: reducedMotion ? 0.4 : 6.5,
                ease,
                repeat: reducedMotion ? 0 : Infinity,
                repeatType: "reverse",
              }}
            />

            <motion.span
              className="brand-wordmark relative select-none text-[clamp(2.8rem,9vw,4.8rem)] leading-none"
              style={{ fontFamily: "var(--font-brand)" }}
              initial={{ opacity: 0, y: 14, filter: "blur(14px)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                letterSpacing: reducedMotion ? "0.14em" : "0.26em",
              }}
              transition={{ duration: reducedMotion ? 0.4 : 2.6, ease }}
            >
              {brandConfig.displayName}
            </motion.span>

            <motion.span
              aria-hidden
              className="mt-5 block h-px bg-[linear-gradient(90deg,transparent,rgba(208,214,255,0.7),transparent)]"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "min(64vw,280px)", opacity: 1 }}
              transition={{
                duration: reducedMotion ? 0.4 : 2.8,
                delay: reducedMotion ? 0.1 : 0.7,
                ease,
              }}
            />

            <motion.span
              className="glass-text-sub mt-5 max-w-[80vw] text-center text-[13px] font-light tracking-[0.18em]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: reducedMotion ? 0.15 : 1.4 }}
            >
              {brandConfig.tagline}
            </motion.span>
          </div>

          {/* Quiet skip control, faded in after the title settles. */}
          <motion.button
            type="button"
            onClick={finish}
            className="pointer-events-auto absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-1.5 text-[12px] tracking-[0.12em] text-[var(--text-muted)] backdrop-blur-[3px] transition-colors duration-300 hover:border-[var(--border-highlight)] hover:text-[var(--text-secondary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: reducedMotion ? 0.2 : 1.8 }}
          >
            スキップ
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const STARS = [
  { id: 1, left: "22%", top: "26%", delay: 0.2 },
  { id: 2, left: "74%", top: "20%", delay: 1.1 },
  { id: 3, left: "63%", top: "70%", delay: 0.6 },
  { id: 4, left: "34%", top: "66%", delay: 1.6 },
  { id: 5, left: "82%", top: "48%", delay: 0.9 },
  { id: 6, left: "16%", top: "52%", delay: 1.9 },
];
