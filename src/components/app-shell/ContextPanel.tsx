"use client";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ReflectionComposer } from "@/components/reflection/ReflectionComposer";
import { SceneInfoPanel } from "@/components/scene/SceneInfoPanel";
import { SharePanel } from "@/components/share/SharePanel";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { IconButton } from "@/components/ui/IconButton";
import { useUIStore } from "@/stores/ui-store";

const titles = {
  memo: "ひとことを置いていく",
  info: "シーンについて",
  share: "シーンを共有",
} as const;

/**
 * A floating glass panel that slides in over the right side of the stage —
 * not a centered modal. The window beneath is never abruptly resized.
 */
export function ContextPanel() {
  const activePanel = useUIStore((s) => s.activePanel);
  const closePanel = useUIStore((s) => s.closePanel);

  return (
    <AnimatePresence>
      {activePanel && (
        <>
          {/* Transparent outside-click catcher — closes without darkening the
              window (this is a floating panel, not a modal). */}
          <button
            type="button"
            aria-label="パネルを閉じる"
            tabIndex={-1}
            className="pointer-events-auto absolute inset-0 z-20 cursor-default"
            onClick={closePanel}
          />
          <motion.div
            key={activePanel}
            className="pointer-events-auto absolute right-4 top-4 z-30 w-[min(92vw,360px)] sm:right-6 sm:top-6"
            initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
            transition={{ duration: 0.34, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <GlassPanel variant="strong" className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[15px] font-medium text-[var(--text-primary)]">
                  {titles[activePanel]}
                </h2>
                <IconButton label="閉じる" onClick={closePanel}>
                  <X size={18} />
                </IconButton>
              </div>

              {activePanel === "memo" && (
                <ReflectionComposer onSaved={closePanel} />
              )}
              {activePanel === "info" && <SceneInfoPanel />}
              {activePanel === "share" && <SharePanel />}
            </GlassPanel>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
