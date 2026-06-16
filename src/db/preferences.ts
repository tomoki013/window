import { brandConfig } from "@/config/brand";
import { defaultPreferences, type UserPreferences } from "@/types/record";
import { getDB, type PreferenceRow } from "./database";

const LS_KEY = `${brandConfig.id}-prefs`;

/** Loads preferences from IndexedDB, falling back to localStorage. */
export async function loadPreferences(): Promise<UserPreferences> {
  const db = getDB();
  if (db) {
    try {
      const row = await db.preferences.get("singleton");
      if (row) {
        const { id, ...prefs } = row;
        void id;
        return { ...defaultPreferences, ...prefs };
      }
    } catch {
      /* fall through to localStorage */
    }
  }
  if (typeof localStorage !== "undefined") {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        return { ...defaultPreferences, ...JSON.parse(raw) };
      } catch {
        /* ignore */
      }
    }
  }
  return defaultPreferences;
}

export async function savePreferences(prefs: UserPreferences): Promise<void> {
  const db = getDB();
  if (db) {
    const row: PreferenceRow = { id: "singleton", ...prefs };
    try {
      await db.preferences.put(row);
      return;
    } catch {
      /* fall through */
    }
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(LS_KEY, JSON.stringify(prefs));
  }
}
