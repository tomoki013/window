"use client";
import { AnimatePresence, motion } from "motion/react";
import { GlassButton } from "@/components/ui/GlassButton";
import { useTimerStore } from "@/stores/timer-store";

/**
 * Shown when a timed session ends. No alarm — just a soft darkening and a
 * gentle "close this time" affordance.
 */
export function TimerCompletion() {
  const completed = useTimerStore((s) => s.completed);
  const resetCompletion = useTimerStore((s) => s.resetCompletion);

  return (
    <AnimatePresence>
      {completed && (
        <motion.div
          className="absolute inset-0 z-40 grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
        >
          <div className="absolute inset-0 bg-black/40" aria-hidden />
          <motion.div
            className="relative z-10 flex flex-col items-center gap-5 px-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <p className="text-[15px] font-light tracking-wide text-[var(--text-secondary)]">
              静かな時間が、ゆっくりと終わりました。
            </p>
            <GlassButton variant="secondary" onClick={resetCompletion}>
              この時間を閉じる
            </GlassButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
