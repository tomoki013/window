export type MoodTag = {
  id: string;
  label: string;
};

/**
 * Broad environmental grouping used to organize the scene list. Deliberately
 * spans more than "quiet places" — busy, moving, industrial and human-presence
 * environments are first-class, not edge cases.
 */
export type SceneCategory =
  | "night"
  | "morning"
  | "daylight"
  | "rain"
  | "moving"
  | "human-presence"
  | "industrial";

export type AudioLayer = {
  id: string;
  label: string;
  /** Optional real asset. When absent, a synthesized tone is generated. */
  src?: string;
  /** Synth profile used when `src` is not provided (placeholder audio). */
  synth?: SynthProfile;
  defaultVolume: number;
  loop: boolean;
};

export type SynthProfile = {
  /** Broad character of the generated ambience. */
  type: "rain" | "noise" | "hum" | "wind" | "rail" | "cafe";
  /** Center frequency for filtered noise / hum, in Hz. */
  tone: number;
};

export type SceneVisualProfile = {
  parallaxStrength: number;
  rainIntensity: number;
  fogIntensity: number;
  lightDrift: number;
  grainOpacity: number;
  vignetteOpacity: number;
};

/**
 * A renderable layer of the window. Because the prototype ships without photo
 * assets, scenes are described as composable CSS gradient layers + effect flags
 * rather than image URLs. Swapping in real imagery later only means giving a
 * layer an `image` URL.
 */
export type SceneLayer = {
  /** CSS background value (gradients). */
  css: string;
  /** Relative parallax depth, 0 = static, 1 = strongest foreground motion. */
  depth: number;
  /** blend mode for compositing reflections / lights. */
  blend?: "screen" | "soft-light" | "overlay" | "normal";
  opacity?: number;
  /** When true, the layer slowly drifts in brightness (city lights). */
  twinkle?: boolean;
};

export type SceneDefinition = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  /** Broad environmental grouping for the scene list. */
  category: SceneCategory;
  /**
   * Optional full-bleed background photo (e.g. /scenes/<slug>.jpg). When set it
   * is painted as the base layer (with parallax) beneath the CSS effect layers.
   * If the file is missing, `poster`/`layers` still render as a fallback.
   */
  image?: string;
  /** Short thumbnail (gradient, or an image url via `url(...)`) for the nav list. */
  thumbnail: string;
  /** Poster shown instantly before the full stage mounts. */
  poster: string;
  /** Layered composition, painted back-to-front (atop `image` when present). */
  layers: SceneLayer[];
  /** Optional moving point lights (e.g. distant cars). */
  movingLights?: MovingLight[];
  audio: AudioLayer[];
  moods: string[];
  recommendedDurations: number[];
  defaultDuration: number;
  visualProfile: SceneVisualProfile;
  /** Rough scene direction used by the reflection overlay tint. */
  reflectionTint: string;
  isLocked?: boolean;
};

export type MovingLight = {
  color: string;
  /** vertical position 0..1 */
  y: number;
  size: number;
  /** seconds for a full traverse */
  duration: number;
  delay: number;
};
