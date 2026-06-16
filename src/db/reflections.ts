import type { ReflectionRecord } from "@/types/record";
import { getDB } from "./database";

const memoryStore = new Map<string, ReflectionRecord>();

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `r_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export type NewReflection = {
  sceneId: string;
  sceneSlug: string;
  text: string;
  moodTags: string[];
  viewedSeconds: number;
  isFavorite?: boolean;
};

export async function createReflection(
  input: NewReflection,
): Promise<ReflectionRecord> {
  const now = new Date().toISOString();
  const record: ReflectionRecord = {
    id: uid(),
    sceneId: input.sceneId,
    sceneSlug: input.sceneSlug,
    text: input.text,
    moodTags: input.moodTags,
    viewedSeconds: input.viewedSeconds,
    isFavorite: input.isFavorite ?? false,
    createdAt: now,
    updatedAt: now,
  };
  const db = getDB();
  if (db) {
    await db.reflections.add(record);
  } else {
    memoryStore.set(record.id, record);
  }
  return record;
}

export async function listReflections(): Promise<ReflectionRecord[]> {
  const db = getDB();
  const items = db
    ? await db.reflections.toArray()
    : Array.from(memoryStore.values());
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getReflection(
  id: string,
): Promise<ReflectionRecord | undefined> {
  const db = getDB();
  if (db) return db.reflections.get(id);
  return memoryStore.get(id);
}

export async function updateReflection(
  id: string,
  patch: Partial<Omit<ReflectionRecord, "id" | "createdAt">>,
): Promise<void> {
  const updatedAt = new Date().toISOString();
  const db = getDB();
  if (db) {
    await db.reflections.update(id, { ...patch, updatedAt });
  } else {
    const existing = memoryStore.get(id);
    if (existing) memoryStore.set(id, { ...existing, ...patch, updatedAt });
  }
}

export async function toggleFavorite(id: string): Promise<void> {
  const record = await getReflection(id);
  if (!record) return;
  await updateReflection(id, { isFavorite: !record.isFavorite });
}

export async function deleteReflection(id: string): Promise<void> {
  const db = getDB();
  if (db) {
    await db.reflections.delete(id);
  } else {
    memoryStore.delete(id);
  }
}

export async function deleteAllReflections(): Promise<void> {
  const db = getDB();
  if (db) {
    await db.reflections.clear();
  } else {
    memoryStore.clear();
  }
}

export async function exportData(): Promise<string> {
  const reflections = await listReflections();
  return JSON.stringify(
    { exportedAt: new Date().toISOString(), reflections },
    null,
    2,
  );
}
