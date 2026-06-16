"use client";
import { useEffect } from "react";
import { getAmbienceEngine } from "@/lib/audio/engine";
import { useAudioStore } from "@/stores/audio-store";
import { useTimerStore } from "@/stores/timer-store";

/**
 * Headless ticking driver. The viewed-seconds counter advances whenever audio
 * is playing (a proxy for "actively viewing"); the countdown advances when a
 * duration is set. On completion the ambience fades out gently.
 */
export function QuietTimer() {
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const running = useTimerStore((s) => s.running);
  const completed = useTimerStore((s) => s.completed);
  const start = useTimerStore((s) => s.start);
  const pause = useTimerStore((s) => s.pause);
  const tick = useTimerStore((s) => s.tick);

  // Keep the timer's running flag in step with playback.
  useEffect(() => {
    if (isPlaying) start();
    else pause();
  }, [isPlaying, start, pause]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => tick(), 1000);
    return () => window.clearInterval(id);
  }, [running, tick]);

  useEffect(() => {
    if (completed) getAmbienceEngine().fadeOutAndStop(8);
  }, [completed]);

  return null;
}
