"use client";
import { Pause, Play, SlidersHorizontal, Timer, Volume2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { DurationPicker } from "@/components/timer/DurationPicker";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { IconButton } from "@/components/ui/IconButton";
import { useAudioControls } from "@/hooks/useAudioControls";
import { formatClock } from "@/lib/format";
import { useAudioStore } from "@/stores/audio-store";
import { useTimerStore } from "@/stores/timer-store";
import { AudioLayerMixer } from "./AudioLayerMixer";
import { VolumeControl } from "./VolumeControl";

/**
 * The quiet bottom transport: play/pause, current ambience name, master volume,
 * remaining time, and a disclosure for the advanced per-layer mixer + duration.
 */
export function AudioTransport() {
  const { isPlaying, toggle, setMasterVolume } = useAudioControls();
  const masterVolume = useAudioStore((s) => s.masterVolume);
  const currentLabel = useAudioStore((s) => s.currentLabel);
  const remaining = useTimerStore((s) => s.remainingSeconds);
  const [expanded, setExpanded] = useState(false);

  return (
    <GlassPanel
      variant="strong"
      className="pointer-events-auto w-full max-w-[640px] overflow-hidden"
    >
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="space-y-5 border-b border-[var(--border-subtle)] p-5">
              <div>
                <p className="mb-2.5 text-[12px] text-[var(--text-muted)]">
                  眺める時間
                </p>
                <DurationPicker />
              </div>
              <div>
                <p className="mb-2.5 text-[12px] text-[var(--text-muted)]">
                  音のバランス
                </p>
                <AudioLayerMixer />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 px-3 py-2.5 sm:gap-4 sm:px-4">
        <IconButton
          label={isPlaying ? "一時停止" : "音をひらく"}
          active={isPlaying}
          onClick={toggle}
          className="!h-11 !w-11"
        >
          {isPlaying ? (
            <Pause size={18} />
          ) : (
            <Play size={18} className="ml-0.5" />
          )}
        </IconButton>

        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-[13px] text-[var(--text-primary)]">
            {currentLabel || "環境音"}
          </p>
          <p className="text-[11px] text-[var(--text-muted)]">
            {isPlaying ? "再生中" : "停止中"}
          </p>
        </div>

        <div className="flex flex-1 items-center gap-2">
          <Volume2 size={16} className="shrink-0 text-[var(--text-muted)]" />
          <VolumeControl
            label="全体の音量"
            value={masterVolume}
            onChange={setMasterVolume}
          />
        </div>

        {remaining !== null && (
          <span className="hidden items-center gap-1.5 text-[12px] tabular-nums text-[var(--text-secondary)] sm:flex">
            <Timer size={14} className="text-[var(--text-muted)]" />
            {formatClock(remaining)}
          </span>
        )}

        <IconButton
          label="詳細設定"
          active={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          <SlidersHorizontal size={17} />
        </IconButton>
      </div>
    </GlassPanel>
  );
}
