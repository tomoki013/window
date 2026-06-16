"use client";
import { useEffect, useState } from "react";
import type { QualityTier } from "@/types/record";

export type ResolvedTier = "high" | "balanced" | "low";

/**
 * Resolves the effective render tier from the user's setting. When set to
 * "auto" it makes a *gentle* guess from device hints — it never labels the
 * device as "low performance" in the UI, it only picks a starting quality.
 */
export function usePerformanceTier(
  setting: QualityTier,
  reducedMotion: boolean,
): ResolvedTier {
  const [auto, setAuto] = useState<ResolvedTier>("balanced");

  useEffect(() => {
    if (setting !== "auto") return;
    const cores = navigator.hardwareConcurrency ?? 4;
    const mem = (navigator as unknown as { deviceMemory?: number })
      .deviceMemory;
    const saveData = (
      navigator as unknown as { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    const narrow = window.matchMedia("(max-width: 760px)").matches;

    let tier: ResolvedTier = "high";
    if (cores <= 4 || (mem !== undefined && mem <= 4) || narrow) {
      tier = "balanced";
    }
    if (cores <= 2 || saveData || (mem !== undefined && mem <= 2)) {
      tier = "low";
    }
    // One-shot device probe: must run after mount (navigator is unavailable
    // during SSR), so a post-mount setState is the correct pattern here.
    setAuto(tier);
  }, [setting]);

  if (reducedMotion) return "low";
  if (setting === "auto") return auto;
  return setting;
}
