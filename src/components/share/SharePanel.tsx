"use client";
import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { GlassButton } from "@/components/ui/GlassButton";
import { copyToClipboard, sceneUrl, shareScene } from "@/lib/sharing/share";
import { useSceneStore } from "@/stores/scene-store";

/** Scene sharing surface: native share + copy-link fallback. */
export function SharePanel() {
  const scene = useSceneStore((s) => s.current)();
  const [copied, setCopied] = useState(false);
  const url = sceneUrl(scene);

  const onCopy = async () => {
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  const onShare = async () => {
    const result = await shareScene(scene);
    if (result === "copied") {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-[15px] text-[var(--text-primary)]">{scene.title}</p>
        <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
          {scene.subtitle}
        </p>
      </div>

      <p className="text-[12px] text-[var(--text-muted)]">
        この景色をリンクで共有できます。メモや気分は含まれません。
      </p>

      <div className="flex items-center gap-2 rounded-[var(--radius-medium)] border border-[var(--border-subtle)] bg-black/20 px-3 py-2">
        <span className="flex-1 truncate text-[12px] text-[var(--text-secondary)]">
          {url}
        </span>
        <button
          type="button"
          onClick={onCopy}
          aria-label="リンクをコピー"
          className="grid h-7 w-7 place-items-center rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          {copied ? (
            <Check size={15} className="text-[var(--accent-secondary)]" />
          ) : (
            <Copy size={15} />
          )}
        </button>
      </div>

      <GlassButton variant="primary" onClick={onShare} className="w-full">
        <Share2 size={16} />
        この環境を共有
      </GlassButton>
    </div>
  );
}
