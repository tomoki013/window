import Dexie, { type Table } from "dexie";
import { brandConfig } from "@/config/brand";
import type { ReflectionRecord, UserPreferences } from "@/types/record";

export type PreferenceRow = UserPreferences & { id: "singleton" };

/**
 * Local-first storage. The database name is keyed off the immutable
 * `brandConfig.id` so renaming the app never orphans a user's saved data.
 */
class UrbanWindowDB extends Dexie {
  reflections!: Table<ReflectionRecord, string>;
  preferences!: Table<PreferenceRow, string>;

  constructor() {
    super(`${brandConfig.id}-db`);
    this.version(1).stores({
      reflections: "id, sceneSlug, createdAt, isFavorite",
      preferences: "id",
    });
  }
}

let _db: UrbanWindowDB | null = null;

/** Returns the singleton DB, or null if IndexedDB is unavailable. */
export function getDB(): UrbanWindowDB | null {
  if (typeof window === "undefined") return null;
  if (!("indexedDB" in window)) return null;
  if (!_db) {
    try {
      _db = new UrbanWindowDB();
    } catch {
      return null;
    }
  }
  return _db;
}
