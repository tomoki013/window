"use client";
import { Info, NotebookPen, Pause, Play, Share2 } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { IconButton } from "@/components/ui/IconButton";
import { useAudioControls } from "@/hooks/useAudioControls";
import { useUIStore } from "@/stores/ui-store";

/** Compact top-right controls: sound, memo, scene info, share. */
export function StageControls() {
  const activePanel = useUIStore((s) => s.activePanel);
  const togglePanel = useUIStore((s) => s.togglePanel);
  const { isPlaying, toggle } = useAudioControls();

  return (
    <GlassPanel
      variant="soft"
      className="pointer-events-auto flex items-center gap-1 rounded-full p-1"
    >
      <IconButton
        label={isPlaying ? "音をオフにする" : "音をオンにする"}
        active={isPlaying}
        onClick={toggle}
      >
        {isPlaying ? <Pause size={17} /> : <Play size={17} />}
      </IconButton>
      <IconButton
        label="一言を残す"
        active={activePanel === "memo"}
        onClick={() => togglePanel("memo")}
      >
        <NotebookPen size={17} />
      </IconButton>
      <IconButton
        label="この環境について"
        active={activePanel === "info"}
        onClick={() => togglePanel("info")}
      >
        <Info size={17} />
      </IconButton>
      <IconButton
        label="この環境を共有"
        active={activePanel === "share"}
        onClick={() => togglePanel("share")}
      >
        <Share2 size={17} />
      </IconButton>
    </GlassPanel>
  );
}
