import type { MoodTag } from "@/types/scene";

/** Initial mood tags. Structured as data so custom tags can be added later. */
export const moodTags: MoodTag[] = [
  { id: "calm", label: "落ち着いた" },
  { id: "thinking", label: "考えごと" },
  { id: "gentle", label: "やさしい" },
  { id: "focused", label: "集中した" },
  { id: "quiet", label: "静か" },
  { id: "wistful", label: "しんみり" },
  { id: "tired", label: "少し疲れた" },
  { id: "night", label: "夜におすすめ" },
];

export const moodTagById = (id: string) => moodTags.find((m) => m.id === id);

/** Maximum mood tags selectable per reflection. */
export const MAX_MOOD_TAGS = 3;
