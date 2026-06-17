"use client";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AudioTransport } from "@/components/audio/AudioTransport";
import { BrandMark } from "@/components/brand/BrandMark";
import { SceneNavigation } from "@/components/scene/SceneNavigation";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { IconButton } from "@/components/ui/IconButton";
import { useUIStore } from "@/stores/ui-store";
import { ContextPanel } from "./ContextPanel";
import { StageControls } from "./StageControls";

/** < 1024px: full-bleed scene, minimal top bar, bottom transport, drawer nav. */
export function MobileLayout({
  onSelectScene,
}: {
  onSelectScene: (slug: string) => void;
}) {
  const drawerOpen = useUIStore((s) => s.sceneDrawerOpen);
  const setDrawer = useUIStore((s) => s.setSceneDrawer);
  const idle = useUIStore((s) => s.idle);

  const select = (slug: string) => {
    onSelectScene(slug);
    setDrawer(false);
  };

  // Focus mode hides chrome — but never the menu toggle while the drawer is open.
  const hidden = idle && !drawerOpen ? "opacity-0" : "opacity-100";
  const inert = idle && !drawerOpen ? true : undefined;

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col">
      {/* Top bar floats above the drawer (z-70) so the menu toggle + wordmark
          keep a single, fixed position and never visibly change when the drawer
          opens — the menu just slides in beneath them. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[70] flex items-center justify-between px-4 pt-4">
        {/* Left cluster: hamburger + Atmos. Stays put whether the drawer is open
            or closed; only fades with idle (when the drawer is closed). */}
        <div
          className={`pointer-events-auto flex items-center gap-2.5 transition-opacity duration-500 ${
            drawerOpen ? "opacity-100" : hidden
          }`}
          inert={drawerOpen ? undefined : inert}
        >
          <GlassPanel variant="soft" className="rounded-full p-1">
            <IconButton
              label={drawerOpen ? "シーン一覧を閉じる" : "シーン一覧"}
              onClick={() => setDrawer(!drawerOpen)}
            >
              <Menu size={18} />
            </IconButton>
          </GlassPanel>
          <BrandMark className="!text-[20px]" />
        </div>

        {!drawerOpen && (
          <div
            className={`pointer-events-auto transition-opacity duration-500 ${hidden}`}
            inert={inert}
          >
            <StageControls />
          </div>
        )}
      </div>

      <div className="relative flex-1">
        <ContextPanel />
      </div>

      {/* bottom transport */}
      <div
        className={`pointer-events-none px-3 pb-4 transition-opacity duration-500 ${hidden}`}
        inert={inert}
      >
        <AudioTransport />
      </div>

      {/* full-screen scene drawer (no inner close button — the top toggle owns it) */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="pointer-events-auto fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setDrawer(false)}
              aria-hidden
            />
            <motion.div
              className="glass-strong absolute inset-y-0 left-0 w-[84vw] max-w-[340px] p-4"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.34, ease: [0.22, 0.61, 0.36, 1] }}
              role="dialog"
              aria-label="シーン一覧"
            >
              {/* Brand is hidden here — the fixed top-bar wordmark sits in the
                  same spot, so opening the drawer doesn't visibly change it.
                  Pad the top so the list clears that fixed header. */}
              <div className="h-full pt-14">
                <SceneNavigation onSelectScene={select} showBrand={false} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
