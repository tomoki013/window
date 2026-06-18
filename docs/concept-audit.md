# Atmos Concept Audit

## Summary

- Audit date: 2026-06-18
- Final score: **99 / 120**
- Passed: **Conditional** — every criterion is met except **B (Not overly immersive)**,
  which sits at 7 (rubric wants ≥ 8). The single reason is a deliberate
  product-owner decision to keep / lengthen the brand overture (see Remaining
  Risks). It remains skippable and never invokes the Fullscreen API, so it is
  not a hard critical-NG; it is an accepted trade-off, not an oversight.
  All other gates pass (A ≥ 8, F ≥ 8, G ≥ 7, H ≥ 7, L ≥ 7; no critical NG).
- Iterations: 2 (Pass 1 audit → Pass 2 fixes → re-audit with `build` + browser preview)
- Major issues fixed:
  - Brand tagline/description rewritten away from a meditation/healing framing
    (`都市の静けさを、そっと味わう`, `気持ちを整える`) toward the concept
    (`いつもの時間に、違う景色を。` / 日常の背景を変える). This propagates to
    `<title>`, OGP, Twitter card, the root overture, and the About page.
  - About page, README, and assorted microcopy reframed from "静けさ / 心を整える"
    to "環境を選ぶ / そばに置く / 気配を流す".
  - Added a broad `category` axis to scene data (Night / Rain / Morning / Moving /
    Human Presence / Industrial) and surfaced it as grouped headers in the scene
    list, so the library no longer reads as "quiet places only".
  - Hardened white-text legibility (scene title, subtitle, wordmark) with a
    dark drop-shadow halo so it reads over **bright/daytime** scenes too, and
    added a `daylight` category — preparing the UI for forthcoming daytime
    photos (verified against the brightest current scene, dawn-rooftop).
- Remaining issues:
  - **Time-of-day bias**: all 19 scenes are night/pre-dawn. There is no true
    daytime ("Daylight") scene because that requires photo assets that don't
    ship yet. Categories now demonstrate breadth of *environment type*, but the
    *time-of-day* spread is still narrow. (Score I capped at 7.)
  - Ambient audio is synthesized, not field-recorded (`README` already notes
    this) — fine conceptually, but limits richness (K).

## Concept Definition Used

> Atmos は、日常のそばに別の景色と環境音を置く Web アプリ。

Users do not leave their current place or task; they set another environment
(scenery, light, weather, time of day, ambient sound, the presence of distant
people, the motion of a city) beside their day, inside the browser. The subject
is **環境の気配 (the presence of an environment)**, not silence. Quiet scenes are
allowed, but so are neon streets, working harbors, bright convenience stores and
airport lobbies. It is explicitly **not** a meditation, focus/productivity,
wallpaper, diary, or travel/immersion app. Auxiliary features (timer, memo,
favorites, history) stay auxiliary.

## Score

| Category | Score | Notes |
|---|---:|---|
| Concept alignment | 9 | Core copy now reads "景色と環境音で日常の背景を変える"; window metaphor kept but reframed as placing an environment beside the day, not contemplation. |
| Not overly immersive | 7 | Brand overture is intentionally long (~11s) per product-owner decision — skippable and never uses the Fullscreen API, but it leans immersive, which is why this axis is below the ≥8 gate. Otherwise restrained: chrome stays, full-screen optional, no autoplay, timer auxiliary. |
| Not only ambient audio | 9 | Every scene pairs a specific visual with matched, place-named audio layers; audio is one axis among several. |
| Not wallpaper app | 8 | Scenes animate (rain/fog/grain/parallax/moving lights) + audio + are selectable environments — not a static image gallery. |
| Not meditation/productivity | 8 | Removed `静けさ/心を整える/集中` framing. One mood **tag** "集中した" remains, but as a user-recorded emotion, not an app promise. |
| Visual/audio unity | 9 | Audio layer labels are tied to each place (雨音・遠くの車・ドラムの回転音・工場の機械音 …); sound is "what is there", not BGM. |
| Everyday texture / atmosphere | 8 | Gritty, lived-in environments (laundromat, underground parking, overpass, harbor, convenience store) with wet roads, neon bleed, fluorescent light. |
| Web app feel | 9 | URL-per-scene, History-API nav (no remount), keyboard shortcuts, shareable links, grouped category rail, no install. |
| Scene variety | 7 | Strong breadth across environment *type* (6 categories, quiet→busy, natural→industrial). Gap: no daytime scene (asset-limited). |
| Copy quality | 8 | Natural Japanese; consistent vocabulary (環境/景色/そばに置く/再生). |
| Richness | 8 | Real photos + CSS effect stack + Web Audio synthesis + parallax; audio is synthesized rather than recorded. |
| Performance design | 9 | Quality tiers (auto/high/balanced/low), reduced-motion priority, offscreen/hidden-tab rain stop, DPR cap, glass blur disabled on low tier. |

**Total: 99 / 120**

## Critical Issues

| Issue | Status | Fix |
|---|---|---|
| App described as a meditation/healing app (tagline, description, About, README) | Fixed | Rewrote `brand.ts` tagline/description; rewrote About intro + features; rewrote README intro + concept bullets. |
| Meditation/focus vocabulary in UI ("心を整える", "静けさ", "眺める時間") | Fixed | Reframed to "環境を選ぶ / そばに置く / 一言を残す / そばに置く時間". |
| "Quiet places only" perception / scene library reads narrow | Mitigated | Added `category` data + grouped, labeled scene rail spanning Night/Rain/Morning/Moving/Human Presence/Industrial. |
| First-load overture is immersion-leaning | Accepted by owner | Overture kept long (~11s) at product-owner request; mitigated by a persistent skip control and a short reduced-motion path; never uses the Fullscreen API. Trades against axis B. |
| App name hardcoded | Not present | Already driven by `brandConfig` + env vars; storage keys use the immutable `brandConfig.id` ("urban-window"). Verified. |
| Audio auto-plays on load | Not present | Playback only starts on the user gesture ("この窓をひらく" / play). Verified. |
| Real brand names / signage in scenes | Not present | Scenes are generic ("明け方の店", not a chain name). Verified. |
| All scenes night/rain/city | Partial | Locations are varied; **time of day** is still night-only (no daytime assets). Documented as a remaining risk. |

## Changes Made

### Copy
- `src/config/brand.ts` — tagline `都市の静けさを、そっと味わう時間。` → `いつもの時間に、違う景色を。`; description rewritten to the concept ("景色と環境音で日常の背景を変える…").
- `src/components/about/AboutView.tsx` — intro paragraph + all four feature cards reframed ("環境を選んで、そばに置く" / "一言を残す" / …).
- `README.md` — title, intro, and concept bullets rewritten; scene-add snippet updated with `category`.
- `src/components/timer/TimerCompletion.tsx` — "静かな時間が…" → "そばに置いた時間が…".
- `src/app/archive/page.tsx` — subtitle "あなたが見た窓の記憶。" → "そばに置いた環境と、残した言葉。".
- `src/components/reflection/ReflectionList.tsx` — empty-state copy reframed.
- `src/components/reflection/ReflectionDetail.tsx` — "…眺めました" → "…そばに置きました"; "この窓をもう一度ひらく" → "この環境をもう一度ひらく".

### UI
- Removed the full-stage "この窓をひらく" first-visit affordance (`OpenWindowAffordance`) — it covered the whole scene and forced focus-mode on open. The scene is now unobstructed; the required audio gesture lives on the transport's play button, which carries a gentle one-time accent pulse (`.animate-play-hint`) until first play. Play labels reworded to "音をオンにする / 音をオフにする".
- `src/components/app-shell/StageControls.tsx` — control labels → "一言を残す / この環境について / この環境を共有".
- `src/components/app-shell/ContextPanel.tsx` — panel titles → "一言を残す / この環境について / この環境を共有".
- `src/components/share/SharePanel.tsx` — button "シーンを共有" → "この環境を共有".
- `src/components/audio/AudioTransport.tsx` + `src/components/settings/SettingsView.tsx` — "眺める時間" → "そばに置く時間".
- `src/components/scene/SceneNavigation.tsx` — section header "シーン" → "環境"; list now grouped under category labels.
- `src/components/app-shell/MobileLayout.tsx` — drawer aria-labels "シーン一覧" → "環境一覧".

### Scene data
- `src/types/scene.ts` — added `SceneCategory` union + required `category` field.
- `src/data/scenes.ts` — categorized all 19 scenes; added `sceneCategoryOrder`, `sceneCategoryLabels`, and a `scenesByCategory` helper; revised the two most introspective subtitles (electric-window "考えを置いていく" → "都市の光が、横へ流れて消えていく。"; winter-crossing "思考を…澄ませる" → "信号と店内の光だけが灯る。").

### Layout
- `src/components/app-shell/RootIntro.tsx` — overture hold set to 11000ms (reduced-motion path unchanged at 1800ms) per product-owner preference for an unhurried intro; skip control retained.

### Daytime readiness (forthcoming photos)
- `src/types/scene.ts` / `src/data/scenes.ts` — added a `daylight` category; reordered groups chronologically (morning → daylight → night → …). Empty groups are auto-hidden, so "昼の景色" appears only once a daytime scene exists.
- `src/styles/glass.css` — strengthened the dark drop-shadow halo on `.glass-text`, `.glass-text-sub`, and `.brand-wordmark` so white UI text stays legible over bright scenes (invisible over dark ones). Verified against the brightest current scene (dawn-rooftop).
- `src/components/app-shell/BackToWindowLink.tsx` — "まどへ戻る" → "シーンへ戻る" (owner request).

### Performance / Safari glass (see below)
- `src/styles/tokens.css`, `src/styles/glass.css` — reworked the glass system to dark "black glass" with `-webkit-backdrop-filter`, mobile-denser fills, stronger fallback, and removal of the white gradient that caused iOS Safari milkiness.

### README / Metadata
- Metadata is derived from `brandConfig` (layout + per-scene `generateMetadata`), so the tagline/description rewrite flows automatically into `<title>`, OpenGraph, and Twitter cards. No hardcoded app name found.

## Remaining Risks
- **No daytime scene.** Genuine daylight environments (午後の図書館, 晴れた屋上, 夏の縁側 …) need photo assets that are not in `public/scenes/`. Until then, the time-of-day spread stays night-biased (category I capped at 7).
- **Synthesized audio.** Field recordings would raise the visual/audio realism (K).
- **Long brand overture (~11s).** Kept long by explicit product-owner decision; it is the reason axis B is below the ≥8 gate. Skippable and never full-screen-forced, so not a hard NG — but if strict concept compliance is ever wanted, shortening it to ~5–6s would lift B back to ≥8.
- **Focus mode** still dims the chrome after ~5s of inactivity (reversible, any pointer/key restores it; never enters the Fullscreen API). It is no longer forced on first open — first load now keeps the chrome visible with the scene unobstructed.
- **Daytime visual finalization** still needs the real photos. The UI is prepared (category + text legibility), but once a bright daytime image is dropped in, sanity-check its per-scene `vignetteOpacity` / `grainOpacity` / `reflectionTint` — these were tuned for night and may want lighter values so a daytime scene doesn't look heavily framed.

## Next Recommendations
1. Add 2–4 true **daytime** scenes (library, seaside platform, summer veranda) to close the time-of-day gap and lift scene variety to 9–10.
2. Swap synthesized layers for short looped field recordings per scene (`AudioLayer.src` is already supported) to raise richness.
3. Consider letting the category rail filter/scroll-to a group on large libraries.
4. Optionally make `集中した` mood tag wording more environment-neutral if the focus-app association is a concern.
