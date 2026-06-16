"use client";
import { Tag } from "@/components/ui/Tag";
import { moodTagById } from "@/data/mood-tags";
import { useSceneStore } from "@/stores/scene-store";

/** Read-only details about the current scene, shown in the context panel. */
export function SceneInfoPanel() {
  const scene = useSceneStore((s) => s.current)();
  return (
    <div className="space-y-4">
      <div
        className="h-28 w-full rounded-[var(--radius-medium)] border border-[var(--border-subtle)]"
        style={{ background: scene.thumbnail }}
        aria-hidden
      />
      <div>
        <h3 className="text-[15px] text-[var(--text-primary)]">
          {scene.title}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-secondary)]">
          {scene.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {scene.moods.map((id) => {
          const tag = moodTagById(id);
          return tag ? (
            <Tag key={id} asLabel>
              {tag.label}
            </Tag>
          ) : null;
        })}
      </div>
    </div>
  );
}
