import type { SceneDefinition } from "@/types/scene";

/**
 * Scene library.
 *
 * Each scene is backed by a full-bleed photo in `public/scenes/<slug>.jpg`,
 * painted as the base layer with the CSS effect stack (rain, glass reflection,
 * grain, vignette, parallax) composited on top. If a photo is missing, the
 * gradient `poster` shows as a graceful fallback. To add a scene, drop a photo
 * and append a definition here — no component changes needed.
 * See README → "アセットの差し替え".
 */

export const scenes: SceneDefinition[] = [
  {
    id: "scene-rainy-city-night",
    slug: "rainy-city-night",
    title: "雨の都会の夜",
    subtitle: "静かな雨が、街の音をやわらげていく。",
    description:
      "高層階の部屋から、雨に煙る都市の光を眺める。遠くを車がゆっくり過ぎていく。",
    image: "/scenes/rainy-city-night.jpg",
    thumbnail:
      "url('/scenes/rainy-city-night.jpg') center / cover, linear-gradient(160deg, #131a33 0%, #1d2347 45%, #2a1f3e 100%)",
    poster:
      "url('/scenes/rainy-city-night.jpg') center / cover, radial-gradient(120% 90% at 60% 18%, #2a2553 0%, #141a33 45%, #080c18 100%)",
    layers: [],
    movingLights: [],
    audio: [
      {
        id: "rain",
        label: "雨音",
        synth: { type: "rain", tone: 1200 },
        defaultVolume: 0.6,
        loop: true,
      },
      {
        id: "cars",
        label: "遠くの車",
        synth: { type: "noise", tone: 300 },
        defaultVolume: 0.25,
        loop: true,
      },
      {
        id: "room",
        label: "室内のノイズ",
        synth: { type: "hum", tone: 90 },
        defaultVolume: 0.3,
        loop: true,
      },
    ],
    moods: ["calm", "gentle", "night"],
    recommendedDurations: [15, 25, 45],
    defaultDuration: 25,
    visualProfile: {
      parallaxStrength: 0.6,
      rainIntensity: 0.6,
      fogIntensity: 0.18,
      lightDrift: 1,
      grainOpacity: 0.035,
      vignetteOpacity: 0.5,
    },
    reflectionTint: "rgba(140,150,220,0.14)",
  },
  {
    id: "scene-midnight-high-rise",
    slug: "midnight-high-rise",
    title: "深夜の高層階",
    subtitle: "もう少しだけ、何も決めずに夜を眺める。",
    description:
      "深い青に沈む遠景。雲がほとんど動かないほど、ゆっくりと夜が流れる。",
    image: "/scenes/midnight-high-rise.jpg",
    thumbnail:
      "url('/scenes/midnight-high-rise.jpg') center / cover, linear-gradient(160deg, #0c1430 0%, #122046 60%, #0a1228 100%)",
    poster:
      "url('/scenes/midnight-high-rise.jpg') center / cover, radial-gradient(120% 90% at 50% 24%, #16224a 0%, #0c1430 50%, #060a16 100%)",
    layers: [],
    movingLights: [],
    audio: [
      {
        id: "room",
        label: "室内のノイズ",
        synth: { type: "hum", tone: 70 },
        defaultVolume: 0.4,
        loop: true,
      },
      {
        id: "wind",
        label: "夜の風",
        synth: { type: "wind", tone: 500 },
        defaultVolume: 0.3,
        loop: true,
      },
    ],
    moods: ["quiet", "thinking", "night"],
    recommendedDurations: [25, 45],
    defaultDuration: 45,
    visualProfile: {
      parallaxStrength: 0.45,
      rainIntensity: 0,
      fogIntensity: 0.15,
      lightDrift: 0.6,
      grainOpacity: 0.03,
      vignetteOpacity: 0.4,
    },
    reflectionTint: "rgba(120,140,210,0.1)",
  },
  {
    id: "scene-quiet-office-bridge",
    slug: "quiet-office-bridge",
    title: "橋のオフィス街",
    subtitle: "雨に濡れた光が、道路と川をつなぐ。",
    description:
      "濡れた路面と橋。青い街灯と暖色の窓が、水面でやわらかくにじむ。",
    image: "/scenes/quiet-office-bridge.jpg",
    thumbnail:
      "url('/scenes/quiet-office-bridge.jpg') center / cover, linear-gradient(160deg, #0e1a30 0%, #16314f 55%, #21304a 100%)",
    poster:
      "url('/scenes/quiet-office-bridge.jpg') center / cover, radial-gradient(120% 90% at 50% 30%, #1c3354 0%, #102338 55%, #07121f 100%)",
    layers: [],
    movingLights: [],
    audio: [
      {
        id: "rain",
        label: "やさしい雨",
        synth: { type: "rain", tone: 900 },
        defaultVolume: 0.45,
        loop: true,
      },
      {
        id: "river",
        label: "川のせせらぎ",
        synth: { type: "noise", tone: 600 },
        defaultVolume: 0.3,
        loop: true,
      },
    ],
    moods: ["calm", "thinking", "gentle"],
    recommendedDurations: [15, 25, 45],
    defaultDuration: 25,
    visualProfile: {
      parallaxStrength: 0.6,
      rainIntensity: 0.4,
      fogIntensity: 0.18,
      lightDrift: 0.9,
      grainOpacity: 0.03,
      vignetteOpacity: 0.45,
    },
    reflectionTint: "rgba(150,180,220,0.1)",
  },
  {
    id: "scene-night-train-window",
    slug: "night-train-window",
    title: "電車の窓辺",
    subtitle: "流れる景色に、考えを置いていく。",
    description:
      "夜の車内。ガラスに室内が反射し、都市の光がゆっくりと横に流れていく。",
    image: "/scenes/night-train-window.jpg",
    thumbnail:
      "url('/scenes/night-train-window.jpg') center / cover, linear-gradient(160deg, #101426 0%, #1b1f3a 55%, #241a33 100%)",
    poster:
      "url('/scenes/night-train-window.jpg') center / cover, radial-gradient(120% 90% at 55% 40%, #20224a 0%, #12152e 55%, #080a16 100%)",
    layers: [],
    movingLights: [],
    audio: [
      {
        id: "rail",
        label: "レール音",
        synth: { type: "rail", tone: 120 },
        defaultVolume: 0.5,
        loop: true,
      },
      {
        id: "room",
        label: "車内の低音",
        synth: { type: "hum", tone: 85 },
        defaultVolume: 0.35,
        loop: true,
      },
    ],
    moods: ["thinking", "wistful", "night"],
    recommendedDurations: [15, 25],
    defaultDuration: 15,
    visualProfile: {
      parallaxStrength: 0.5,
      rainIntensity: 0.4,
      fogIntensity: 0.2,
      lightDrift: 1.2,
      grainOpacity: 0.035,
      vignetteOpacity: 0.5,
    },
    reflectionTint: "rgba(200,180,150,0.12)",
  },
  {
    id: "scene-winter-crossing",
    slug: "winter-crossing",
    title: "冬の交差点",
    subtitle: "冷たい空気が、思考を少しだけ澄ませる。",
    description: "人の少ない交差点。細かな雪が舞い、信号と店内の光だけが灯る。",
    image: "/scenes/winter-crossing.jpg",
    thumbnail:
      "url('/scenes/winter-crossing.jpg') center / cover, linear-gradient(160deg, #0e1426 0%, #182238 55%, #20283c 100%)",
    poster:
      "url('/scenes/winter-crossing.jpg') center / cover, radial-gradient(120% 90% at 50% 34%, #1a2440 0%, #101a30 55%, #070d18 100%)",
    layers: [],
    movingLights: [],
    audio: [
      {
        id: "wind",
        label: "静かな風",
        synth: { type: "wind", tone: 420 },
        defaultVolume: 0.4,
        loop: true,
      },
      {
        id: "room",
        label: "遠い店内",
        synth: { type: "hum", tone: 110 },
        defaultVolume: 0.22,
        loop: true,
      },
    ],
    moods: ["focused", "quiet", "calm"],
    recommendedDurations: [15, 25, 45],
    defaultDuration: 25,
    visualProfile: {
      parallaxStrength: 0.5,
      rainIntensity: 0,
      fogIntensity: 0.28,
      lightDrift: 0.7,
      grainOpacity: 0.035,
      vignetteOpacity: 0.45,
    },
    reflectionTint: "rgba(200,215,255,0.1)",
  },
  {
    id: "scene-quiet-neon-alley",
    slug: "quiet-neon-alley",
    title: "ネオンの裏通り",
    subtitle: "色のにじみだけが、夜の奥に残っている。",
    description:
      "雨上がりの裏通り。濡れた地面に、彩度を抑えたネオンが静かに映り込む。",
    image: "/scenes/quiet-neon-alley.jpg",
    thumbnail:
      "url('/scenes/quiet-neon-alley.jpg') center / cover, linear-gradient(160deg, #160f28 0%, #261a3e 55%, #2a1830 100%)",
    poster:
      "url('/scenes/quiet-neon-alley.jpg') center / cover, radial-gradient(120% 90% at 50% 40%, #2a1c44 0%, #170f28 55%, #090611 100%)",
    layers: [],
    movingLights: [],
    audio: [
      {
        id: "rain",
        label: "雨上がりの滴",
        synth: { type: "rain", tone: 700 },
        defaultVolume: 0.35,
        loop: true,
      },
      {
        id: "city",
        label: "遠い街の気配",
        synth: { type: "noise", tone: 250 },
        defaultVolume: 0.25,
        loop: true,
      },
    ],
    moods: ["wistful", "quiet", "night"],
    recommendedDurations: [15, 25],
    defaultDuration: 15,
    visualProfile: {
      parallaxStrength: 0.7,
      rainIntensity: 0.3,
      fogIntensity: 0.2,
      lightDrift: 0.9,
      grainOpacity: 0.035,
      vignetteOpacity: 0.5,
    },
    reflectionTint: "rgba(190,150,210,0.12)",
  },
];

export const scenesBySlug = new Map(scenes.map((s) => [s.slug, s]));

export const getSceneBySlug = (slug: string): SceneDefinition | undefined =>
  scenesBySlug.get(slug);

export const defaultScene = scenes[0];

export const getSceneIndex = (slug: string): number =>
  scenes.findIndex((s) => s.slug === slug);
