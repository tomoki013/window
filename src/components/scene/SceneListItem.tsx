"use client";
import type { SceneDefinition } from "@/types/scene";

type Props = {
  scene: SceneDefinition;
  active: boolean;
  onSelect: () => void;
};

export function SceneListItem({ scene, active, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      className={`group flex w-full items-center gap-3 rounded-[var(--radius-medium)] border px-2.5 py-2.5 text-left transition-all duration-200 ease-[var(--ease-soft)] ${
        active
          ? "border-[color:rgba(129,116,255,0.32)] bg-white/[0.06]"
          : "border-transparent hover:bg-white/[0.035] hover:border-[var(--border-subtle)]"
      }`}
    >
      <span
        aria-hidden
        className="h-11 w-14 shrink-0 overflow-hidden rounded-[10px] border border-[var(--border-subtle)]"
        style={{ background: scene.thumbnail }}
      />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span
            className={`truncate text-[14px] ${
              active
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
            }`}
          >
            {scene.title}
          </span>
          {active && (
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-secondary)] shadow-[0_0_8px_2px_rgba(169,139,250,0.6)]"
            />
          )}
        </span>
        <span className="mt-0.5 block truncate text-[12px] text-[var(--text-muted)]">
          {scene.subtitle}
        </span>
      </span>
    </button>
  );
}
