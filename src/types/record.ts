export type ReflectionRecord = {
  id: string;
  sceneId: string;
  sceneSlug: string;
  text: string;
  moodTags: string[];
  viewedSeconds: number;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export type QualityTier = "high" | "balanced" | "low" | "auto";

export type UserPreferences = {
  soundEnabled: boolean;
  masterVolume: number;
  quality: QualityTier;
  reducedVisualEffects: boolean;
  defaultDuration: number | null;
  lastSceneSlug: string;
};

export const defaultPreferences: UserPreferences = {
  soundEnabled: true,
  masterVolume: 0.7,
  quality: "auto",
  reducedVisualEffects: false,
  defaultDuration: null,
  lastSceneSlug: "rainy-city-night",
};
