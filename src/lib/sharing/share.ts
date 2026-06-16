import { brandConfig } from "@/config/brand";
import type { SceneDefinition } from "@/types/scene";

/** Builds the canonical shareable URL for a scene (no personal state). */
export function sceneUrl(
  scene: SceneDefinition,
  opts?: { duration?: number; sound?: string },
): string {
  const url = new URL(`/scene/${scene.slug}`, brandConfig.baseUrl);
  if (opts?.duration) url.searchParams.set("duration", String(opts.duration));
  if (opts?.sound) url.searchParams.set("sound", opts.sound);
  return url.toString();
}

export type ShareResult = "shared" | "copied" | "failed";

/**
 * Shares a scene via the Web Share API where available, otherwise copies the
 * link to the clipboard. Only public scene metadata is ever shared — never
 * memos, moods, settings, or any stored data.
 */
export async function shareScene(scene: SceneDefinition): Promise<ShareResult> {
  const url = sceneUrl(scene);
  const shareData = {
    title: `${scene.title} · ${brandConfig.displayName}`,
    text: scene.subtitle,
    url,
  };

  if (typeof navigator !== "undefined" && "share" in navigator) {
    try {
      await navigator.share(shareData);
      return "shared";
    } catch (err) {
      // user cancelled — not an error worth surfacing
      if (err instanceof DOMException && err.name === "AbortError") {
        return "failed";
      }
    }
  }
  return (await copyToClipboard(url)) ? "copied" : "failed";
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  return false;
}
