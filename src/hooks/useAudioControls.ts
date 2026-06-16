"use client";
import { useCallback } from "react";
import { getAmbienceEngine } from "@/lib/audio/engine";
import { useAudioStore } from "@/stores/audio-store";
import { useSceneStore } from "@/stores/scene-store";

/** User-facing audio actions, all routed through the singleton engine. */
export function useAudioControls() {
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const setPlaying = useAudioStore((s) => s.setPlaying);
  const setReady = useAudioStore((s) => s.setReady);
  const masterVolume = useAudioStore((s) => s.masterVolume);
  const setMasterVolumeState = useAudioStore((s) => s.setMasterVolume);
  const setLayerVolumeState = useAudioStore((s) => s.setLayerVolume);
  const current = useSceneStore((s) => s.current);

  const play = useCallback(() => {
    const engine = getAmbienceEngine();
    engine.ensureContext(); // must be inside the gesture
    engine.setScene(current().audio);
    engine.setMasterVolume(masterVolume);
    engine.play();
    setPlaying(true);
    setReady(true);
  }, [current, masterVolume, setPlaying, setReady]);

  const pause = useCallback(() => {
    getAmbienceEngine().pause();
    setPlaying(false);
  }, [setPlaying]);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const setMasterVolume = useCallback(
    (v: number) => {
      setMasterVolumeState(v);
      getAmbienceEngine().setMasterVolume(v);
    },
    [setMasterVolumeState],
  );

  const setLayerVolume = useCallback(
    (id: string, v: number) => {
      setLayerVolumeState(id, v);
      getAmbienceEngine().setLayerVolume(id, v);
    },
    [setLayerVolumeState],
  );

  return { isPlaying, toggle, play, pause, setMasterVolume, setLayerVolume };
}
