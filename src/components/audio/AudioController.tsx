"use client";
import { useEffect, useRef } from "react";
import { getAmbienceEngine } from "@/lib/audio/engine";
import { useAudioStore } from "@/stores/audio-store";
import { useSceneStore } from "@/stores/scene-store";

/**
 * Headless bridge between the scene/audio stores and the Web Audio engine.
 * Handles scene-change crossfades and tears the engine down on unmount.
 * Never starts audio on its own — playback always begins from a user gesture
 * in the transport.
 */
export function AudioController() {
  const slug = useSceneStore((s) => s.currentSlug);
  const current = useSceneStore((s) => s.current);
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const setCurrentLabel = useAudioStore((s) => s.setCurrentLabel);
  const initLayerVolumes = useAudioStore((s) => s.initLayerVolumes);
  const startedRef = useRef(false);

  // Reflect the primary layer label + seed mixer volumes whenever the scene changes.
  useEffect(() => {
    const scene = current();
    setCurrentLabel(scene.audio[0]?.label ?? "");
    initLayerVolumes(
      Object.fromEntries(scene.audio.map((l) => [l.id, l.defaultVolume])),
    );
  }, [slug, current, setCurrentLabel, initLayerVolumes]);

  // Crossfade ambience to the new scene, but only once audio has been started.
  useEffect(() => {
    const engine = getAmbienceEngine();
    if (isPlaying && startedRef.current) {
      engine.setScene(current().audio);
    }
  }, [slug, isPlaying, current]);

  useEffect(() => {
    if (isPlaying) startedRef.current = true;
  }, [isPlaying]);

  useEffect(() => {
    return () => getAmbienceEngine().dispose();
  }, []);

  return null;
}
