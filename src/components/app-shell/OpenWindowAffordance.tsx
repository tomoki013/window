"use client";
import { Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useAudioControls } from "@/hooks/useAudioControls";
import { useUIStore } from "@/stores/ui-store";

/**
 * First-visit affordance, shown directly beneath the scene title (inside the
 * centered title stack, so the two always stay aligned). Selecting it starts
 * the ambience (the required user gesture) and slips into focus mode; it is
 * then replaced by the transport controls.
 */
export function OpenWindowAffordance() {
  const hasOpened = useUIStore((s) => s.hasOpenedWindow);
  const markOpened = useUIStore((s) => s.markWindowOpened);
  const setIdle = useUIStore((s) => s.setIdle);
  const { play } = useAudioControls();

  const open = () => {
    play();
    markOpened();
    // Slip straight into focus mode: chrome fades away so only the window
    // remains. Any pointer move / key press brings the UI back.
    setIdle(true);
  };

  return (
    <AnimatePresence>
      {!hasOpened && (
        <motion.button
          type="button"
          onClick={open}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pointer-events-auto group mt-6 inline-flex items-center gap-3 rounded-full border border-[var(--border-highlight)] bg-[var(--surface-strong)] px-6 py-3.5 text-[15px] text-[var(--text-primary)] backdrop-blur-md transition-colors duration-300 hover:border-[color:rgba(129,116,255,0.5)]"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full border border-[color:rgba(129,116,255,0.5)] bg-[var(--accent-soft)]">
            <Play size={13} className="ml-0.5 text-[var(--accent-secondary)]" />
          </span>
          この窓をひらく
        </motion.button>
      )}
    </AnimatePresence>
  );
}
