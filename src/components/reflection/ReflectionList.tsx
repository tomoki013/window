"use client";
import { useEffect, useMemo, useState } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Tag } from "@/components/ui/Tag";
import { moodTags } from "@/data/mood-tags";
import {
  deleteReflection,
  listReflections,
  toggleFavorite,
} from "@/db/reflections";
import type { ReflectionRecord } from "@/types/record";
import { ReflectionCard } from "./ReflectionCard";

type Filter = "all" | "favorite";

/** The archive: a quiet card list with all / favorite / tag filtering. */
export function ReflectionList() {
  const [records, setRecords] = useState<ReflectionRecord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const refresh = async () => {
    setRecords(await listReflections());
    setLoaded(true);
  };

  useEffect(() => {
    // Async data load on mount.
    refresh();
  }, []);

  const visible = useMemo(() => {
    return records.filter((r) => {
      if (filter === "favorite" && !r.isFavorite) return false;
      if (activeTag && !r.moodTags.includes(activeTag)) return false;
      return true;
    });
  }, [records, filter, activeTag]);

  const onToggleFavorite = async (id: string) => {
    await toggleFavorite(id);
    refresh();
  };
  const onDelete = async (id: string) => {
    if (!window.confirm("この記録を削除しますか？")) return;
    await deleteReflection(id);
    refresh();
  };

  // Only show tags that actually appear in records.
  const usedTags = useMemo(() => {
    const set = new Set(records.flatMap((r) => r.moodTags));
    return moodTags.filter((t) => set.has(t.id));
  }, [records]);

  if (loaded && records.length === 0) {
    return (
      <div className="glass-soft rounded-[var(--radius-large)] px-6 py-16 text-center">
        <p className="text-[15px] text-[var(--text-secondary)]">
          まだ記録はありません。
        </p>
        <p className="mt-2 text-[13px] text-[var(--text-muted)]">
          景色をそばに置きながら、ひとことを残してみてください。
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <SegmentedControl
          ariaLabel="絞り込み"
          size="sm"
          options={[
            { value: "all", label: "すべて" },
            { value: "favorite", label: "お気に入り" },
          ]}
          value={filter}
          onChange={(v) => setFilter(v)}
        />
        {usedTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {usedTags.map((t) => (
              <Tag
                key={t.id}
                selected={activeTag === t.id}
                onClick={() => setActiveTag(activeTag === t.id ? null : t.id)}
              >
                {t.label}
              </Tag>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {visible.map((r) => (
          <ReflectionCard
            key={r.id}
            record={r}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
          />
        ))}
      </div>

      {loaded && visible.length === 0 && (
        <p className="py-12 text-center text-[14px] text-[var(--text-muted)]">
          条件に合う記録はありません。
        </p>
      )}
    </div>
  );
}
