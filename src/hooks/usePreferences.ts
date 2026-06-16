"use client";
import { useCallback, useEffect, useState } from "react";
import { loadPreferences, savePreferences } from "@/db/preferences";
import { getAmbienceEngine } from "@/lib/audio/engine";
import { useAudioStore } from "@/stores/audio-store";
import { useTimerStore } from "@/stores/timer-store";
import { useUIStore } from "@/stores/ui-store";
import { defaultPreferences, type UserPreferences } from "@/types/record";

/**
 * Loads persisted preferences once, mirrors them into the runtime stores and
 * the document root (for CSS), and returns a setter that persists changes.
 */
export function usePreferences() {
  const [prefs, setPrefs] = useState<UserPreferences>(defaultPreferences);
  const [loaded, setLoaded] = useState(false);

  const setQuality = useUIStore((s) => s.setQuality);
  const setReducedMotion = useUIStore((s) => s.setReducedMotion);
  const setMasterVolumeState = useAudioStore((s) => s.setMasterVolume);
  const setDuration = useTimerStore((s) => s.setDuration);

  // Apply preferences to runtime stores + document attributes.
  const apply = useCallback(
    (p: UserPreferences) => {
      setQuality(p.quality);
      setReducedMotion(p.reducedVisualEffects);
      setMasterVolumeState(p.masterVolume);
      getAmbienceEngine().setMasterVolume(p.masterVolume);
      if (p.defaultDuration !== null) setDuration(p.defaultDuration);
      const root = document.documentElement;
      root.dataset.reducedMotion = String(p.reducedVisualEffects);
    },
    [setQuality, setReducedMotion, setMasterVolumeState, setDuration],
  );

  useEffect(() => {
    let active = true;
    loadPreferences().then((p) => {
      if (!active) return;
      setPrefs(p);
      apply(p);
      setLoaded(true);
    });
    return () => {
      active = false;
    };
  }, [apply]);

  const update = useCallback(
    (patch: Partial<UserPreferences>) => {
      setPrefs((prev) => {
        const next = { ...prev, ...patch };
        apply(next);
        void savePreferences(next);
        return next;
      });
    },
    [apply],
  );

  return { prefs, loaded, update };
}
