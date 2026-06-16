"use client";
import { Tag } from "@/components/ui/Tag";
import { MAX_MOOD_TAGS, moodTags } from "@/data/mood-tags";

type Props = {
  selected: string[];
  onChange: (next: string[]) => void;
};

/** Pick up to MAX_MOOD_TAGS mood tags. */
export function MoodTagPicker({ selected, onChange }: Props) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else if (selected.length < MAX_MOOD_TAGS) {
      onChange([...selected, id]);
    }
  };

  return (
    <div>
      <p className="mb-2 text-[12px] text-[var(--text-muted)]">
        気分タグ（最大{MAX_MOOD_TAGS}つ）
      </p>
      <div className="flex flex-wrap gap-2">
        {moodTags.map((tag) => {
          const isSelected = selected.includes(tag.id);
          const disabled = !isSelected && selected.length >= MAX_MOOD_TAGS;
          return (
            <Tag
              key={tag.id}
              selected={isSelected}
              onClick={() => toggle(tag.id)}
              disabled={disabled}
              className={disabled ? "opacity-35" : ""}
            >
              {tag.label}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
