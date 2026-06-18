"use client";
import { Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Tag } from "@/components/ui/Tag";
import { moodTagById } from "@/data/mood-tags";
import { getSceneBySlug } from "@/data/scenes";
import {
  deleteReflection,
  getReflection,
  toggleFavorite,
} from "@/db/reflections";
import { formatDateTime, formatDuration } from "@/lib/format";
import type { ReflectionRecord } from "@/types/record";

export function ReflectionDetail({ id }: { id: string }) {
  const router = useRouter();
  const [record, setRecord] = useState<ReflectionRecord | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getReflection(id).then((r) => {
      setRecord(r ?? null);
      setLoaded(true);
    });
  }, [id]);

  if (loaded && !record) {
    return (
      <GlassPanel variant="soft" className="px-6 py-16 text-center">
        <p className="text-[15px] text-[var(--text-secondary)]">
          記録が見つかりませんでした。
        </p>
        <Link
          href="/archive"
          className="mt-4 inline-block text-[13px] text-[var(--accent-secondary)]"
        >
          記録一覧へ戻る
        </Link>
      </GlassPanel>
    );
  }
  if (!record) return null;

  const scene = getSceneBySlug(record.sceneSlug);

  const onToggle = async () => {
    await toggleFavorite(record.id);
    setRecord({ ...record, isFavorite: !record.isFavorite });
  };
  const onDelete = async () => {
    if (!window.confirm("この記録を削除しますか？")) return;
    await deleteReflection(record.id);
    router.push("/archive");
  };

  return (
    <GlassPanel variant="panel" className="overflow-hidden">
      <div
        className="h-44 w-full"
        style={{ background: scene?.poster }}
        aria-hidden
      />
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[20px] font-medium text-[var(--text-primary)]">
              {scene?.title ?? "記録"}
            </h2>
            <p className="mt-1 text-[13px] text-[var(--text-muted)]">
              {formatDateTime(record.createdAt)} ·{" "}
              {formatDuration(record.viewedSeconds)} そばに置きました
            </p>
          </div>
          <button
            type="button"
            onClick={onToggle}
            aria-label={
              record.isFavorite ? "お気に入りを外す" : "お気に入りに追加"
            }
            aria-pressed={record.isFavorite}
            className="grid h-10 w-10 place-items-center rounded-full text-[var(--text-muted)] hover:text-[var(--accent-secondary)]"
          >
            <Star
              size={18}
              className={
                record.isFavorite
                  ? "fill-[var(--accent-secondary)] text-[var(--accent-secondary)]"
                  : ""
              }
            />
          </button>
        </div>

        {record.text && (
          <p className="mt-5 text-[16px] leading-relaxed text-[var(--text-primary)]">
            {record.text}
          </p>
        )}

        {record.moodTags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {record.moodTags.map((tid) => {
              const tag = moodTagById(tid);
              return tag ? (
                <Tag key={tid} asLabel selected>
                  {tag.label}
                </Tag>
              ) : null;
            })}
          </div>
        )}

        <div className="mt-8 flex items-center gap-3">
          {scene && (
            <Link href={`/scene/${scene.slug}`}>
              <GlassButton variant="primary">
                この環境をもう一度ひらく
              </GlassButton>
            </Link>
          )}
          <GlassButton variant="ghost" onClick={onDelete}>
            <Trash2 size={15} />
            削除
          </GlassButton>
        </div>
      </div>
    </GlassPanel>
  );
}
