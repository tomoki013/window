"use client";
import { Check } from "lucide-react";
import { useState } from "react";
import { GlassButton } from "@/components/ui/GlassButton";
import { createReflection } from "@/db/reflections";
import { useSceneStore } from "@/stores/scene-store";
import { useTimerStore } from "@/stores/timer-store";
import { MoodTagPicker } from "./MoodTagPicker";

const MAX_LEN = 140;

type Props = {
  onSaved?: () => void;
};

/** Compose a one-line reflection tied to the current scene. */
export function ReflectionComposer({ onSaved }: Props) {
  const scene = useSceneStore((s) => s.current)();
  const viewedSeconds = useTimerStore((s) => s.viewedSeconds);
  const [text, setText] = useState("");
  const [moods, setMoods] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await createReflection({
        sceneId: scene.id,
        sceneSlug: scene.slug,
        text: text.trim(),
        moodTags: moods,
        viewedSeconds,
      });
      setSaved(true);
      window.setTimeout(() => {
        onSaved?.();
      }, 700);
    } finally {
      setSaving(false);
    }
  };

  if (saved) {
    return (
      <div className="flex flex-col items-center gap-2 py-8">
        <span className="animate-check grid h-10 w-10 place-items-center rounded-full border border-[color:rgba(129,116,255,0.4)] bg-[var(--accent-soft)]">
          <Check size={18} className="text-[var(--accent-secondary)]" />
        </span>
        <p className="text-[13px] text-[var(--text-secondary)]">記録しました</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_LEN))}
          placeholder="いまの気持ちを、ひとことだけ。"
          rows={3}
          aria-label="ひとことメモ"
          className="w-full resize-none rounded-[var(--radius-medium)] border border-[var(--border-subtle)] bg-black/20 px-3.5 py-3 text-[15px] leading-relaxed text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[color:rgba(129,116,255,0.4)] focus:outline-none"
        />
        <div className="mt-1 text-right text-[11px] text-[var(--text-muted)]">
          {text.length}/{MAX_LEN}
        </div>
      </div>

      <MoodTagPicker selected={moods} onChange={setMoods} />

      <GlassButton
        variant="primary"
        onClick={save}
        disabled={saving}
        className="w-full"
      >
        保存する
      </GlassButton>
    </div>
  );
}
