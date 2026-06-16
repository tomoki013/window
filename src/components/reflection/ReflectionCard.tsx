"use client";
import { Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { moodTagById } from "@/data/mood-tags";
import { getSceneBySlug } from "@/data/scenes";
import { formatDateTime, formatDuration } from "@/lib/format";
import type { ReflectionRecord } from "@/types/record";

type Props = {
  record: ReflectionRecord;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
};

export function ReflectionCard({ record, onToggleFavorite, onDelete }: Props) {
  const scene = getSceneBySlug(record.sceneSlug);

  return (
    <div className="group glass-soft flex gap-4 rounded-[var(--radius-large)] p-4 transition-colors duration-300 hover:bg-white/[0.05]">
      <Link
        href={`/archive/${record.id}`}
        aria-label={`${scene?.title ?? "記録"}の詳細`}
        className="relative h-20 w-28 shrink-0 overflow-hidden rounded-[var(--radius-medium)] border border-[var(--border-subtle)]"
        style={{ background: scene?.thumbnail }}
      >
        {/* a faint drift on hover, only for this card */}
        <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:[animation:lightDrift_6s_ease-in-out_infinite] bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/archive/${record.id}`} className="min-w-0">
            <h3 className="truncate text-[15px] text-[var(--text-primary)]">
              {scene?.title ?? "記録"}
            </h3>
          </Link>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => onToggleFavorite(record.id)}
              aria-label={
                record.isFavorite ? "お気に入りを外す" : "お気に入りに追加"
              }
              aria-pressed={record.isFavorite}
              className="grid h-8 w-8 place-items-center rounded-full text-[var(--text-muted)] transition-colors hover:text-[var(--accent-secondary)]"
            >
              <Star
                size={16}
                className={
                  record.isFavorite
                    ? "fill-[var(--accent-secondary)] text-[var(--accent-secondary)]"
                    : ""
                }
              />
            </button>
            <button
              type="button"
              onClick={() => onDelete(record.id)}
              aria-label="この記録を削除"
              className="grid h-8 w-8 place-items-center rounded-full text-[var(--text-muted)] opacity-0 transition-all hover:text-[#e08a8a] group-hover:opacity-100 focus-visible:opacity-100"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        {record.text && (
          <p className="mt-1 line-clamp-2 text-[13px] text-[var(--text-secondary)]">
            {record.text}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2.5">
          {record.moodTags.map((id) => {
            const tag = moodTagById(id);
            return tag ? (
              <Tag key={id} asLabel selected>
                {tag.label}
              </Tag>
            ) : null;
          })}
          <span className="ml-auto text-[11px] text-[var(--text-muted)]">
            {formatDateTime(record.createdAt)} ·{" "}
            {formatDuration(record.viewedSeconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
