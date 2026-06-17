"use client";
import { Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useAudioControls } from "@/hooks/useAudioControls";
import { useUIStore } from "@/stores/ui-store";

/**
 * First-visit affordance. Rather than a solid panel parked over the centre of
 * the scene (which hid the very view it invites you into), the whole stage is a
 * transparent target and only a light, low-set hint is drawn — so the window
 * stays the hero. Selecting it starts the ambience (the required user gesture)
 * and slips into focus mode; the hint then fades and the transport takes over.
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
          aria-label="この窓をひらく"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
          transition={{ duration: 0.9 }}
          className="group absolute inset-0 z-[9] flex cursor-pointer items-end justify-center pb-[20vh] focus:outline-none"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-highlight)] bg-[var(--surface-soft)] px-5 py-2.5 text-[14px] text-[var(--text-secondary)] backdrop-blur-[3px] transition-colors duration-300 group-hover:border-[color:rgba(129,116,255,0.5)] group-hover:text-[var(--text-primary)] group-focus-visible:border-[color:rgba(129,116,255,0.5)]"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full border border-[color:rgba(129,116,255,0.45)] bg-[var(--accent-soft)]">
              <Play
                size={11}
                className="ml-0.5 text-[var(--accent-secondary)]"
              />
            </span>
            この窓をひらく
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
