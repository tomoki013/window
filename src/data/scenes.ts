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
  {
    id: "scene-predawn-platform",
    slug: "predawn-platform",
    title: "始発前のホーム",
    subtitle: "街が動き出す前の、短い静けさ。",
    description:
      "午前4時半。誰もいない長いホームに蛍光灯だけが並ぶ。湿った線路と電光掲示板の光、遠い案内放送。",
    image: "/scenes/predawn-platform.png",
    thumbnail:
      "url('/scenes/predawn-platform.png') center / cover,linear-gradient(160deg, #0a1422 0%, #122231 55%, #0c1a24 100%)",
    poster:
      "url('/scenes/predawn-platform.png') center / cover,radial-gradient(130% 100% at 50% 78%, #16303e 0%, #0c1a26 50%, #050c12 100%)",
    layers: [
      {
        css: "linear-gradient(180deg, #060d16 0%, #0b1a26 55%, #102a36 100%)",
        depth: 0.1,
      },
      {
        css: "repeating-linear-gradient(90deg, transparent 0 120px, rgba(210,235,255,0.10) 120px 132px, transparent 132px 260px)",
        depth: 0.35,
        blend: "screen",
        opacity: 0.7,
        twinkle: true,
      },
      {
        css: "radial-gradient(60% 30% at 50% 96%, rgba(150,200,220,0.18) 0%, transparent 70%)",
        depth: 0.6,
        blend: "screen",
      },
    ],
    movingLights: [
      {
        color: "rgba(255,230,180,0.5)",
        y: 0.46,
        size: 90,
        duration: 26,
        delay: 4,
      },
    ],
    audio: [
      {
        id: "room",
        label: "ホームの低い反響",
        synth: { type: "hum", tone: 80 },
        defaultVolume: 0.34,
        loop: true,
      },
      {
        id: "wind",
        label: "かすかな風",
        synth: { type: "wind", tone: 380 },
        defaultVolume: 0.26,
        loop: true,
      },
      {
        id: "freight",
        label: "遠い貨物列車",
        synth: { type: "rail", tone: 90 },
        defaultVolume: 0.2,
        loop: true,
      },
    ],
    moods: ["quiet", "calm", "night"],
    recommendedDurations: [15, 25],
    defaultDuration: 15,
    visualProfile: {
      parallaxStrength: 0.4,
      rainIntensity: 0,
      fogIntensity: 0.2,
      lightDrift: 0.7,
      grainOpacity: 0.035,
      vignetteOpacity: 0.5,
    },
    reflectionTint: "rgba(160,200,220,0.1)",
  },
  {
    id: "scene-dawn-rooftop",
    slug: "dawn-rooftop",
    title: "夜明けの屋上",
    subtitle: "夜がほどけるまで、もう少しだけ。",
    description:
      "高層ビルの屋上から見る夜と朝の境目。濃紺から薄い水色へ。屋上のフェンス、赤い航空障害灯、弱い風。",
    image: "/scenes/dawn-rooftop.png",
    thumbnail:
      "url('/scenes/dawn-rooftop.png') center / cover,linear-gradient(180deg, #14224a 0%, #2a4a72 55%, #6a7a96 100%)",
    poster:
      "url('/scenes/dawn-rooftop.png') center / cover,linear-gradient(180deg, #101c3e 0%, #28456c 50%, #7d8198 78%, #c8a98a 100%)",
    layers: [
      {
        css: "linear-gradient(180deg, #0c163a 0%, #233f64 48%, #6f7a93 80%, #d3b08c 100%)",
        depth: 0.1,
      },
      {
        css: "radial-gradient(80% 40% at 60% 100%, rgba(255,190,140,0.35) 0%, transparent 65%)",
        depth: 0.4,
        blend: "screen",
        opacity: 0.8,
      },
      {
        css: "radial-gradient(circle at 22% 30%, rgba(255,70,70,0.7) 0 5px, transparent 6px)",
        depth: 0.7,
        blend: "screen",
        twinkle: true,
      },
    ],
    movingLights: [],
    audio: [
      {
        id: "wind",
        label: "高所の風",
        synth: { type: "wind", tone: 520 },
        defaultVolume: 0.4,
        loop: true,
      },
      {
        id: "city",
        label: "目覚める街の気配",
        synth: { type: "noise", tone: 240 },
        defaultVolume: 0.2,
        loop: true,
      },
      {
        id: "room",
        label: "低い環境音",
        synth: { type: "hum", tone: 75 },
        defaultVolume: 0.22,
        loop: true,
      },
    ],
    moods: ["gentle", "thinking", "calm"],
    recommendedDurations: [15, 25, 45],
    defaultDuration: 25,
    visualProfile: {
      parallaxStrength: 0.45,
      rainIntensity: 0,
      fogIntensity: 0.16,
      lightDrift: 0.6,
      grainOpacity: 0.03,
      vignetteOpacity: 0.32,
    },
    reflectionTint: "rgba(210,180,160,0.1)",
  },
  {
    id: "scene-after-hours-mall",
    slug: "after-hours-mall",
    title: "閉店後のモール",
    subtitle: "にぎわいの跡だけが、まだ残っている。",
    description:
      "営業時間が終わった大型商業施設。消灯した店舗、床に反射する非常灯、止まったエスカレーター、広い吹き抜け。",
    image: "/scenes/after-hours-mall.png",
    thumbnail:
      "url('/scenes/after-hours-mall.png') center / cover,linear-gradient(160deg, #0c1818 0%, #12241f 55%, #0a1614 100%)",
    poster:
      "url('/scenes/after-hours-mall.png') center / cover,radial-gradient(120% 90% at 50% 35%, #173028 0%, #0e1c19 55%, #060d0c 100%)",
    layers: [
      {
        css: "linear-gradient(180deg, #07110f 0%, #102220 55%, #0a1614 100%)",
        depth: 0.1,
      },
      {
        css: "radial-gradient(50% 60% at 50% 22%, rgba(120,210,180,0.18) 0%, transparent 70%)",
        depth: 0.35,
        blend: "screen",
        twinkle: true,
      },
      {
        css: "radial-gradient(70% 30% at 50% 98%, rgba(90,200,170,0.16) 0%, transparent 70%)",
        depth: 0.6,
        blend: "screen",
        opacity: 0.7,
      },
    ],
    movingLights: [],
    audio: [
      {
        id: "room",
        label: "空調の低音",
        synth: { type: "hum", tone: 68 },
        defaultVolume: 0.4,
        loop: true,
      },
      {
        id: "hall",
        label: "吹き抜けの残響",
        synth: { type: "noise", tone: 200 },
        defaultVolume: 0.2,
        loop: true,
      },
    ],
    moods: ["quiet", "wistful", "night"],
    recommendedDurations: [15, 25, 45],
    defaultDuration: 25,
    visualProfile: {
      parallaxStrength: 0.4,
      rainIntensity: 0,
      fogIntensity: 0.14,
      lightDrift: 0.5,
      grainOpacity: 0.04,
      vignetteOpacity: 0.52,
    },
    reflectionTint: "rgba(150,210,190,0.1)",
  },
  {
    id: "scene-late-night-laundromat",
    slug: "late-night-laundromat",
    title: "午前二時のランドリー",
    subtitle: "回る光を、ただ眺めている。",
    description:
      "ガラス越しに眺める無人のコインランドリー。白と水色の照明、緩やかに回るドラム、外は暗い住宅街、低い機械音。",
    image: "/scenes/late-night-laundromat.png",
    thumbnail:
      "url('/scenes/late-night-laundromat.png') center / cover,linear-gradient(160deg, #0a1018 0%, #16242e 55%, #0c141c 100%)",
    poster:
      "url('/scenes/late-night-laundromat.png') center / cover,radial-gradient(110% 80% at 50% 50%, #20323e 0%, #0e1820 55%, #060b10 100%)",
    layers: [
      {
        css: "linear-gradient(180deg, #070c12 0%, #0e1820 60%, #0a1018 100%)",
        depth: 0.1,
      },
      {
        css: "radial-gradient(38% 46% at 50% 50%, rgba(220,245,255,0.28) 0%, rgba(150,210,235,0.12) 55%, transparent 78%)",
        depth: 0.45,
        blend: "screen",
        twinkle: true,
      },
      {
        css: "radial-gradient(circle at 80% 78%, rgba(255,210,150,0.25) 0 14px, transparent 20px)",
        depth: 0.65,
        blend: "screen",
        opacity: 0.8,
      },
    ],
    movingLights: [],
    audio: [
      {
        id: "machine",
        label: "ドラムの低い回転音",
        synth: { type: "hum", tone: 120 },
        defaultVolume: 0.42,
        loop: true,
      },
      {
        id: "room",
        label: "店内のノイズ",
        synth: { type: "noise", tone: 320 },
        defaultVolume: 0.22,
        loop: true,
      },
      {
        id: "outside",
        label: "外の夜気",
        synth: { type: "wind", tone: 360 },
        defaultVolume: 0.16,
        loop: true,
      },
    ],
    moods: ["calm", "quiet", "tired"],
    recommendedDurations: [15, 25],
    defaultDuration: 15,
    visualProfile: {
      parallaxStrength: 0.35,
      rainIntensity: 0,
      fogIntensity: 0.12,
      lightDrift: 0.8,
      grainOpacity: 0.04,
      vignetteOpacity: 0.5,
    },
    reflectionTint: "rgba(180,225,240,0.12)",
  },
  {
    id: "scene-after-rain-bus-stop",
    slug: "after-rain-bus-stop",
    title: "雨上がりのバス停",
    subtitle: "次の光が来るまで、ここにいる。",
    description:
      "雨が止んだ直後。アクリル屋根に残る水滴、濡れた道路、オレンジ色の街灯、遠くから近づくバスの光、誰もいないベンチ。",
    image: "/scenes/after-rain-bus-stop.png",
    thumbnail:
      "url('/scenes/after-rain-bus-stop.png') center / cover,linear-gradient(160deg, #100f18 0%, #221a22 55%, #2a1e16 100%)",
    poster:
      "url('/scenes/after-rain-bus-stop.png') center / cover,radial-gradient(120% 90% at 40% 30%, #2e2118 0%, #14121c 55%, #07060c 100%)",
    layers: [
      {
        css: "linear-gradient(180deg, #0a0912 0%, #16121a 55%, #1d1712 100%)",
        depth: 0.1,
      },
      {
        css: "radial-gradient(30% 50% at 40% 26%, rgba(255,170,90,0.4) 0%, transparent 68%)",
        depth: 0.4,
        blend: "screen",
        twinkle: true,
      },
      {
        css: "radial-gradient(80% 26% at 45% 100%, rgba(255,160,80,0.22) 0%, transparent 72%)",
        depth: 0.65,
        blend: "screen",
        opacity: 0.7,
      },
    ],
    movingLights: [
      {
        color: "rgba(255,240,210,0.6)",
        y: 0.6,
        size: 80,
        duration: 22,
        delay: 6,
      },
    ],
    audio: [
      {
        id: "drip",
        label: "屋根の水滴",
        synth: { type: "rain", tone: 600 },
        defaultVolume: 0.3,
        loop: true,
      },
      {
        id: "wind",
        label: "夜の風",
        synth: { type: "wind", tone: 400 },
        defaultVolume: 0.24,
        loop: true,
      },
      {
        id: "road",
        label: "遠い車道",
        synth: { type: "noise", tone: 260 },
        defaultVolume: 0.18,
        loop: true,
      },
    ],
    moods: ["wistful", "calm", "night"],
    recommendedDurations: [15, 25],
    defaultDuration: 15,
    visualProfile: {
      parallaxStrength: 0.5,
      rainIntensity: 0.2,
      fogIntensity: 0.18,
      lightDrift: 0.9,
      grainOpacity: 0.035,
      vignetteOpacity: 0.5,
    },
    reflectionTint: "rgba(230,170,110,0.12)",
  },
  {
    id: "scene-midnight-hotel-corridor",
    slug: "midnight-hotel-corridor",
    title: "深夜のホテル",
    subtitle: "誰かの旅と、誰かの眠りの間。",
    description:
      "静かな高層ホテルの長い廊下。厚いカーペット、等間隔の扉、壁際の間接照明、突き当たりの小さな窓、空調の低音。",
    image: "/scenes/midnight-hotel-corridor.png",
    thumbnail:
      "url('/scenes/midnight-hotel-corridor.png') center / cover,linear-gradient(160deg, #160f0a 0%, #281c12 55%, #1a120c 100%)",
    poster:
      "url('/scenes/midnight-hotel-corridor.png') center / cover,radial-gradient(70% 90% at 50% 46%, #3a2a1a 0%, #1c140d 50%, #0a0705 100%)",
    layers: [
      {
        css: "radial-gradient(50% 80% at 50% 46%, #2c2014 0%, #140e09 55%, #080503 100%)",
        depth: 0.1,
      },
      {
        css: "repeating-linear-gradient(90deg, transparent 0 90px, rgba(255,200,130,0.10) 90px 100px, transparent 100px 220px)",
        depth: 0.4,
        blend: "screen",
        opacity: 0.6,
      },
      {
        css: "radial-gradient(14% 24% at 50% 44%, rgba(150,180,230,0.3) 0%, transparent 70%)",
        depth: 0.7,
        blend: "screen",
        twinkle: true,
      },
    ],
    movingLights: [],
    audio: [
      {
        id: "room",
        label: "空調の低音",
        synth: { type: "hum", tone: 64 },
        defaultVolume: 0.42,
        loop: true,
      },
      {
        id: "corridor",
        label: "廊下の静かな気配",
        synth: { type: "noise", tone: 180 },
        defaultVolume: 0.16,
        loop: true,
      },
    ],
    moods: ["quiet", "thinking", "night"],
    recommendedDurations: [25, 45],
    defaultDuration: 25,
    visualProfile: {
      parallaxStrength: 0.5,
      rainIntensity: 0,
      fogIntensity: 0.14,
      lightDrift: 0.5,
      grainOpacity: 0.04,
      vignetteOpacity: 0.56,
    },
    reflectionTint: "rgba(220,190,150,0.1)",
  },
  {
    id: "scene-last-flight-lounge",
    slug: "last-flight-lounge",
    title: "最終便のあと",
    subtitle: "行き先だけが、まだ光っている。",
    description:
      "最終便が終わったあとの空港。大きなガラス窓、滑走路の誘導灯、誰もいない椅子、消えかけの出発案内、遠くの機体。",
    image: "/scenes/last-flight-lounge.png",
    thumbnail:
      "url('/scenes/last-flight-lounge.png') center / cover,linear-gradient(160deg, #0a1322 0%, #122236 55%, #0c1826 100%)",
    poster:
      "url('/scenes/last-flight-lounge.png') center / cover,radial-gradient(130% 100% at 50% 70%, #16304a 0%, #0c1828 55%, #05090f 100%)",
    layers: [
      {
        css: "linear-gradient(180deg, #060d18 0%, #0c1828 55%, #0a1422 100%)",
        depth: 0.1,
      },
      {
        css: "radial-gradient(circle at 30% 82%, rgba(120,220,160,0.8) 0 3px, transparent 4px), radial-gradient(circle at 50% 84%, rgba(120,220,160,0.7) 0 3px, transparent 4px), radial-gradient(circle at 70% 82%, rgba(255,180,90,0.7) 0 3px, transparent 4px)",
        depth: 0.45,
        blend: "screen",
        twinkle: true,
      },
      {
        css: "radial-gradient(60% 24% at 50% 100%, rgba(120,170,210,0.16) 0%, transparent 72%)",
        depth: 0.65,
        blend: "screen",
        opacity: 0.7,
      },
    ],
    movingLights: [
      {
        color: "rgba(255,240,210,0.45)",
        y: 0.78,
        size: 70,
        duration: 34,
        delay: 8,
      },
    ],
    audio: [
      {
        id: "terminal",
        label: "ターミナルの低音",
        synth: { type: "hum", tone: 72 },
        defaultVolume: 0.38,
        loop: true,
      },
      {
        id: "distant",
        label: "遠い機体の気配",
        synth: { type: "noise", tone: 220 },
        defaultVolume: 0.2,
        loop: true,
      },
      {
        id: "air",
        label: "ガラス越しの空気",
        synth: { type: "wind", tone: 440 },
        defaultVolume: 0.16,
        loop: true,
      },
    ],
    moods: ["wistful", "thinking", "calm"],
    recommendedDurations: [15, 25, 45],
    defaultDuration: 25,
    visualProfile: {
      parallaxStrength: 0.5,
      rainIntensity: 0,
      fogIntensity: 0.16,
      lightDrift: 0.9,
      grainOpacity: 0.03,
      vignetteOpacity: 0.46,
    },
    reflectionTint: "rgba(150,190,220,0.12)",
  },
  {
    id: "scene-under-the-overpass",
    slug: "under-the-overpass",
    title: "高架下",
    subtitle: "街の音が、頭上を通り過ぎる。",
    description:
      "都市の高架下にある少し暗い歩道。頭上を通過する電車、コンクリートの柱、自販機、小さな飲食店の明かり、遠くの信号。",
    image: "/scenes/under-the-overpass.png",
    thumbnail:
      "url('/scenes/under-the-overpass.png') center / cover,linear-gradient(160deg, #0e0e12 0%, #1a1820 55%, #201610 100%)",
    poster:
      "url('/scenes/under-the-overpass.png') center / cover,radial-gradient(120% 90% at 50% 60%, #241c1a 0%, #131218 55%, #07060a 100%)",
    layers: [
      {
        css: "linear-gradient(180deg, #08080c 0%, #131218 55%, #15110e 100%)",
        depth: 0.1,
      },
      {
        css: "linear-gradient(90deg, #050507 0 16%, transparent 16% 30%, #050507 30% 40%, transparent 40% 60%, #050507 60% 70%, transparent 70% 84%, #050507 84%)",
        depth: 0.55,
        opacity: 0.5,
      },
      {
        css: "radial-gradient(circle at 72% 66%, rgba(255,150,80,0.4) 0 18px, transparent 26px), radial-gradient(circle at 12% 60%, rgba(255,60,60,0.6) 0 4px, transparent 6px)",
        depth: 0.7,
        blend: "screen",
        twinkle: true,
      },
    ],
    movingLights: [],
    audio: [
      {
        id: "rail",
        label: "頭上を通る電車",
        synth: { type: "rail", tone: 140 },
        defaultVolume: 0.5,
        loop: true,
      },
      {
        id: "room",
        label: "高架下の反響",
        synth: { type: "hum", tone: 78 },
        defaultVolume: 0.3,
        loop: true,
      },
      {
        id: "city",
        label: "遠い街の音",
        synth: { type: "noise", tone: 260 },
        defaultVolume: 0.2,
        loop: true,
      },
    ],
    moods: ["thinking", "wistful", "night"],
    recommendedDurations: [15, 25],
    defaultDuration: 15,
    visualProfile: {
      parallaxStrength: 0.55,
      rainIntensity: 0,
      fogIntensity: 0.2,
      lightDrift: 0.8,
      grainOpacity: 0.045,
      vignetteOpacity: 0.54,
    },
    reflectionTint: "rgba(230,160,110,0.1)",
  },
  {
    id: "scene-predawn-convenience-store",
    slug: "predawn-convenience-store",
    title: "明け方の店",
    subtitle: "眠らない光が、ひとつだけ残っている。",
    description:
      "外から眺める明け方の店。白く明るい店内、暗い駐車場、ガラスへの反射、一人だけの店員、コーヒーマシンの音、遠くの配送トラック。",
    image: "/scenes/predawn-convenience-store.png",
    thumbnail:
      "url('/scenes/predawn-convenience-store.png') center / cover,linear-gradient(160deg, #0a0f14 0%, #14202a 55%, #0c151c 100%)",
    poster:
      "url('/scenes/predawn-convenience-store.png') center / cover,radial-gradient(110% 80% at 52% 46%, #243440 0%, #0e1820 55%, #060a0e 100%)",
    layers: [
      {
        css: "linear-gradient(180deg, #06090e 0%, #0c151c 60%, #0a0f14 100%)",
        depth: 0.1,
      },
      {
        css: "radial-gradient(40% 42% at 54% 44%, rgba(235,250,255,0.32) 0%, rgba(170,215,235,0.12) 58%, transparent 80%)",
        depth: 0.45,
        blend: "screen",
        twinkle: true,
      },
      {
        css: "radial-gradient(70% 28% at 52% 100%, rgba(200,235,250,0.16) 0%, transparent 72%)",
        depth: 0.62,
        blend: "screen",
        opacity: 0.6,
      },
    ],
    movingLights: [
      {
        color: "rgba(255,235,200,0.5)",
        y: 0.72,
        size: 76,
        duration: 28,
        delay: 10,
      },
    ],
    audio: [
      {
        id: "store",
        label: "店内の電気音",
        synth: { type: "hum", tone: 100 },
        defaultVolume: 0.36,
        loop: true,
      },
      {
        id: "coffee",
        label: "コーヒーマシン",
        synth: { type: "cafe", tone: 700 },
        defaultVolume: 0.2,
        loop: true,
      },
      {
        id: "lot",
        label: "駐車場の夜気",
        synth: { type: "wind", tone: 360 },
        defaultVolume: 0.16,
        loop: true,
      },
    ],
    moods: ["tired", "calm", "quiet"],
    recommendedDurations: [15, 25],
    defaultDuration: 15,
    visualProfile: {
      parallaxStrength: 0.4,
      rainIntensity: 0,
      fogIntensity: 0.14,
      lightDrift: 0.7,
      grainOpacity: 0.04,
      vignetteOpacity: 0.5,
    },
    reflectionTint: "rgba(200,235,250,0.12)",
  },
  {
    id: "scene-foggy-harbor",
    slug: "foggy-harbor",
    title: "霧の港",
    subtitle: "遠い機械音だけが、夜を動かしている。",
    description:
      "コンテナとクレーンが並ぶ夜の港。低い霧、水面の光、赤い警告灯、遠くの貨物船、無人の道路、工場の低い機械音。",
    image: "/scenes/foggy-harbor.png",
    thumbnail:
      "url('/scenes/foggy-harbor.png') center / cover,linear-gradient(160deg, #0a1218 0%, #141f26 55%, #101a1e 100%)",
    poster:
      "url('/scenes/foggy-harbor.png') center / cover,radial-gradient(130% 100% at 50% 66%, #1a2a32 0%, #0d171d 55%, #060c0f 100%)",
    layers: [
      {
        css: "linear-gradient(180deg, #070d12 0%, #0d171d 55%, #0f191d 100%)",
        depth: 0.1,
      },
      {
        css: "radial-gradient(circle at 26% 52%, rgba(255,60,60,0.7) 0 4px, transparent 6px), radial-gradient(circle at 74% 48%, rgba(255,70,70,0.6) 0 3px, transparent 5px)",
        depth: 0.5,
        blend: "screen",
        twinkle: true,
      },
      {
        css: "radial-gradient(90% 30% at 50% 100%, rgba(120,170,190,0.18) 0%, transparent 72%)",
        depth: 0.66,
        blend: "screen",
        opacity: 0.7,
      },
    ],
    movingLights: [
      {
        color: "rgba(220,200,160,0.4)",
        y: 0.4,
        size: 100,
        duration: 40,
        delay: 6,
      },
    ],
    audio: [
      {
        id: "factory",
        label: "工場の機械音",
        synth: { type: "hum", tone: 58 },
        defaultVolume: 0.42,
        loop: true,
      },
      {
        id: "water",
        label: "水面のさざ波",
        synth: { type: "noise", tone: 300 },
        defaultVolume: 0.22,
        loop: true,
      },
      {
        id: "wind",
        label: "港の風",
        synth: { type: "wind", tone: 480 },
        defaultVolume: 0.26,
        loop: true,
      },
    ],
    moods: ["quiet", "wistful", "night"],
    recommendedDurations: [25, 45],
    defaultDuration: 25,
    visualProfile: {
      parallaxStrength: 0.45,
      rainIntensity: 0,
      fogIntensity: 0.42,
      lightDrift: 0.6,
      grainOpacity: 0.035,
      vignetteOpacity: 0.5,
    },
    reflectionTint: "rgba(150,190,200,0.1)",
  },
  {
    id: "scene-underground-parking",
    slug: "underground-parking",
    title: "地下三階",
    subtitle: "街の下にも、夜は続いている。",
    description:
      "広く静かな地下駐車場。数台だけ残った車、コンクリート柱、緑色の非常灯、濡れたタイヤ跡、換気扇の音、遠くの出口表示。",
    image: "/scenes/underground-parking.png",
    thumbnail:
      "url('/scenes/underground-parking.png') center / cover,linear-gradient(160deg, #0c1110 0%, #16201c 55%, #0e1412 100%)",
    poster:
      "url('/scenes/underground-parking.png') center / cover,radial-gradient(120% 90% at 50% 50%, #1a2620 0%, #0f1614 55%, #070b0a 100%)",
    layers: [
      {
        css: "linear-gradient(180deg, #080c0b 0%, #0f1614 60%, #0c110f 100%)",
        depth: 0.1,
      },
      {
        css: "repeating-linear-gradient(90deg, transparent 0 140px, rgba(120,255,200,0.08) 140px 150px, transparent 150px 300px)",
        depth: 0.4,
        blend: "screen",
        opacity: 0.5,
      },
      {
        css: "radial-gradient(circle at 84% 40%, rgba(80,230,150,0.45) 0 14px, transparent 22px)",
        depth: 0.7,
        blend: "screen",
        twinkle: true,
      },
    ],
    movingLights: [],
    audio: [
      {
        id: "fan",
        label: "換気扇の低音",
        synth: { type: "hum", tone: 74 },
        defaultVolume: 0.44,
        loop: true,
      },
      {
        id: "echo",
        label: "地下の反響",
        synth: { type: "noise", tone: 160 },
        defaultVolume: 0.18,
        loop: true,
      },
    ],
    moods: ["quiet", "focused", "night"],
    recommendedDurations: [15, 25, 45],
    defaultDuration: 25,
    visualProfile: {
      parallaxStrength: 0.4,
      rainIntensity: 0,
      fogIntensity: 0.16,
      lightDrift: 0.5,
      grainOpacity: 0.05,
      vignetteOpacity: 0.56,
    },
    reflectionTint: "rgba(120,210,170,0.1)",
  },
  {
    id: "scene-fire-escape-night",
    slug: "fire-escape-night",
    title: "非常階段の夜",
    subtitle: "誰にも見つからない高さで、街を眺める。",
    description:
      "高層ビルの外階段の踊り場から見る街。金属の手すり、コンクリートの壁、狭く切り取られた夜景、風に揺れる非常口表示、下を走る車。",
    image: "/scenes/fire-escape-night.png",
    thumbnail:
      "url('/scenes/fire-escape-night.png') center / cover,linear-gradient(160deg, #0b0f16 0%, #161d28 55%, #10141c 100%)",
    poster:
      "url('/scenes/fire-escape-night.png') center / cover,radial-gradient(120% 90% at 64% 50%, #1a2433 0%, #0e141e 55%, #06090e 100%)",
    layers: [
      {
        css: "linear-gradient(180deg, #07090f 0%, #0e141e 55%, #0c1016 100%)",
        depth: 0.1,
      },
      {
        css: "radial-gradient(46% 70% at 78% 50%, rgba(150,190,230,0.22) 0%, transparent 70%)",
        depth: 0.4,
        blend: "screen",
        twinkle: true,
      },
      {
        css: "radial-gradient(circle at 30% 66%, rgba(80,230,150,0.5) 0 8px, transparent 12px)",
        depth: 0.72,
        blend: "screen",
      },
    ],
    movingLights: [
      {
        color: "rgba(255,235,200,0.4)",
        y: 0.86,
        size: 60,
        duration: 24,
        delay: 5,
      },
    ],
    audio: [
      {
        id: "wind",
        label: "高所の風",
        synth: { type: "wind", tone: 540 },
        defaultVolume: 0.42,
        loop: true,
      },
      {
        id: "city",
        label: "下を走る車",
        synth: { type: "noise", tone: 240 },
        defaultVolume: 0.22,
        loop: true,
      },
      {
        id: "room",
        label: "都市の低い環境音",
        synth: { type: "hum", tone: 70 },
        defaultVolume: 0.2,
        loop: true,
      },
    ],
    moods: ["thinking", "quiet", "night"],
    recommendedDurations: [15, 25],
    defaultDuration: 15,
    visualProfile: {
      parallaxStrength: 0.55,
      rainIntensity: 0,
      fogIntensity: 0.16,
      lightDrift: 0.8,
      grainOpacity: 0.04,
      vignetteOpacity: 0.54,
    },
    reflectionTint: "rgba(150,190,230,0.1)",
  },
];

export const scenesBySlug = new Map(scenes.map((s) => [s.slug, s]));

export const getSceneBySlug = (slug: string): SceneDefinition | undefined =>
  scenesBySlug.get(slug);

export const defaultScene = scenes[0];

export const getSceneIndex = (slug: string): number =>
  scenes.findIndex((s) => s.slug === slug);
