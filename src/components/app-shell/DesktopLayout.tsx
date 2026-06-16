"use client";
import { AudioTransport } from "@/components/audio/AudioTransport";
import { SceneNavigation } from "@/components/scene/SceneNavigation";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useUIStore } from "@/stores/ui-store";
import { ContextPanel } from "./ContextPanel";
import { StageControls } from "./StageControls";

/** ≥1024px: left rail · central window · floating context panel. */
export function DesktopLayout({
  onSelectScene,
}: {
  onSelectScene: (slug: string) => void;
}) {
  const idle = useUIStore((s) => s.idle);
  // Focus mode: when idle, chrome fades out completely and becomes inert so
  // only the window remains. Pointer move / keypress brings it all back.
  const hidden = idle ? "opacity-0" : "opacity-100";
  const inert = idle || undefined;

  return (
    <div className="pointer-events-none absolute inset-0 flex p-4 lg:p-5">
      {/* Left navigation rail */}
      <GlassPanel
        variant="panel"
        inert={inert}
        className={`pointer-events-auto flex w-[256px] shrink-0 flex-col p-3 transition-opacity duration-700 xl:w-[280px] ${hidden}`}
      >
        <SceneNavigation onSelectScene={onSelectScene} />
      </GlassPanel>

      {/* Central column holds the floating chrome above the stage */}
      <div className="relative flex-1">
        <div
          inert={inert}
          className={`pointer-events-none absolute right-0 top-0 z-30 transition-opacity duration-700 ${hidden}`}
        >
          <StageControls />
        </div>

        <ContextPanel />

        <div
          inert={inert}
          className={`pointer-events-none absolute bottom-0 left-1/2 z-30 flex w-full -translate-x-1/2 justify-center px-4 transition-opacity duration-700 ${hidden}`}
        >
          <AudioTransport />
        </div>
      </div>
    </div>
  );
}
