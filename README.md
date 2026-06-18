# window（表示名 Atmos）— いつもの時間に、違う景色を。

景色と環境音で **日常の背景を変える** Web アプリです。雨の高層階、明け方の店、霧の港、にぎやかなネオン街——いくつもの環境から今の気分に合う景色を選び、少しずつ動く景色とその場所の音を、作業中や休憩中のそばに置いておけます。

扱うのは「静けさ」ではなく **環境の気配** です。静かな景色も、人の気配のある景色も、産業地区のような無機質な景色も含みます。別世界へ没入させるのではなく、今いる日常の横に、別の環境をそっと重ねることを目指しています。

> 表示名（仮称 Atmos / 内部名 `window`）は、設定 1 か所（`src/config/brand.ts` または環境変数）で変更できます。→ [アプリ名の変更](#アプリ名の変更)

---

## コンセプト

- 日常のそばに、別の景色と環境を置く（没入させすぎない・全画面は任意）
- 環境を選び、背景として流す体験が主役。記録・タイマー・メモは補助機能
- 静寂だけでなく、にぎやかさ・生活感・気配まで扱う（夜・雨・人の気配・産業地区など）
- 暗いが見づらくない、グラスモーフィズムが背景と自然に馴染む
- ネイティブアプリの模倣ではなく、ブラウザだから成立する Web 体験（URL 共有・キーボード操作・戻る/進む）

---

## 技術構成

| 領域 | 採用 |
| --- | --- |
| フレームワーク | Next.js 16（App Router, Turbopack） |
| 言語 | TypeScript（strict） |
| スタイル | Tailwind CSS v4 + CSS Variables デザイントークン |
| アニメーション | Motion（`motion/react`） |
| 状態管理 | Zustand |
| 保存 | IndexedDB（Dexie）+ localStorage フォールバック |
| 音声 | Web Audio API（合成環境音） |
| アイコン | lucide-react |

### 描画方針

シーンの風景は **写真画像を使わず**、複数の CSS グラデーションレイヤー＋ Canvas 雨＋ SVG ノイズ霧/グレインで構成しています。これによりバイナリ素材ゼロで「窓」を表現しています。実写へ差し替える場合は[アセット配置](#アセットの差し替え本番化)を参照してください。

レイヤー構成（背面→前面）:
背景の空 → 遠景の光（明滅）→ 中景/スカイライン → 霧 → 雨（Canvas）→ ガラス反射 → グレイン → ビネット → UI。

---

## セットアップ

```bash
npm install
npm run dev      # http://localhost:3000
```

ビルドと本番起動:

```bash
npm run build
npm run start
```

型チェック / Lint:

```bash
npx tsc --noEmit
npm run lint
```

---

## 環境変数

すべて任意です。未設定時は `src/config/brand.ts` の既定値が使われます。

```env
NEXT_PUBLIC_APP_NAME="新しい内部名"
NEXT_PUBLIC_APP_DISPLAY_NAME="新しい表示名"
NEXT_PUBLIC_APP_TAGLINE="新しいコピー"
NEXT_PUBLIC_APP_DESCRIPTION="新しい説明"
NEXT_PUBLIC_APP_BASE_URL="https://example.com"
```

---

## アプリ名の変更

アプリ名はコードへ直接ハードコードしていません。`src/config/brand.ts` の `brandConfig` か、上記の環境変数を変更するだけで、ロゴ・ページタイトル・metadata・OGP・共有文・aria-label・フッター・About にすべて反映されます。

> **注意:** 保存データの保存先キーには表示名ではなく不変の `brandConfig.id`（`"urban-window"`）を使用しています。表示名を変えても保存済みの記録は失われません。`id` は変更しないでください。

---

## シーンの追加方法

`src/data/scenes.ts` の `scenes` 配列に `SceneDefinition` を 1 つ追加するだけで、ナビ・URL（`/scene/<slug>`）・OGP・プリロード対象に自動反映されます。メインコンポーネントの修正は不要です。

```ts
{
  id: "scene-...",          // 不変ID
  slug: "your-slug",        // URL（/scene/your-slug）
  title: "シーン名",
  category: "night",     // morning | daylight | night | rain | moving | human-presence | industrial
  subtitle: "ひとことの情景説明。",
  description: "詳しい説明。",
  thumbnail: "linear-gradient(...)",  // ナビ用サムネ
  poster: "radial-gradient(...)",     // 即時表示用ポスター
  layers: [ { css: "...", depth: 0.3, blend: "screen", twinkle: true }, ... ],
  movingLights: [ { color, y, size, duration, delay } ],
  audio: [ { id, label, synth: { type, tone }, defaultVolume, loop } ],
  moods: ["calm", "night"],
  recommendedDurations: [15, 25, 45],
  defaultDuration: 25,
  visualProfile: { parallaxStrength, rainIntensity, fogIntensity, lightDrift, grainOpacity, vignetteOpacity },
  reflectionTint: "rgba(...)",
}
```

`depth` は視差の強さ（0=遠景, 1=最前景）、`blend` は合成モード、`twinkle` で明滅します。

### 気分タグの追加

`src/data/mood-tags.ts` の `moodTags` に追加します（データ構造はカスタムタグ拡張に対応）。

---

## アセットの差し替え（本番化）

現状は**仮素材ゼロ**（CSS/Canvas/合成音）で動作します。実写・実音へ置き換える場合:

- **画像**: ポスター/サムネは小さな AVIF/WebP を `public/scenes/` に置き、`poster`/`thumbnail` から参照。レイヤーを画像にする場合は `src/types/scene.ts` の `SceneLayer` に `image?: string` を足し、`SceneRenderer` の `background` を画像対応に拡張してください。
- **音声**: `AudioLayer` に `src`（音声ファイル URL）を指定すると、合成音の代わりにそのファイルがループ再生されます（`synth` は未指定で可）。ファイルは `public/audio/` 等へ配置。

差し替えが必要なファイル（本番素材）:
- 各シーンの背景/中景/前景画像・ポスター・サムネイル
- 各 `AudioLayer` の環境音ファイル（雨・風・電車・室内ノイズ 等）
- OGP 画像（現状はテキストベース。`src/app/scene/[slug]/page.tsx` の `generateMetadata` がシーン単位に分離済みなので、`openGraph.images` を足すだけ）

---

## 描画品質の仕組み

`High / Balanced / Low` の 3 段階（設定画面で変更可、既定は `自動`）。

- **High**: Canvas 雨（ガラス滴つき）、全視差レイヤー、霧、明滅、グレイン
- **Balanced**: 雨の粒子数を削減、視差簡略化
- **Low**: 雨・視差・霧を無効化、`backdrop-filter` を停止、ほぼ静止画

`自動` は端末のコア数・メモリ・省データ設定・画面幅から**開始品質**を推定します（端末を「低性能」と決めつける表示はしません）。`prefers-reduced-motion` は常に最優先で Low 相当になります。Canvas 雨は画面外・非表示タブで停止し、DPR 上限・フレーム落ち時の粒子削減も実装しています。

---

## データ保存先・プライバシー

- 記録（`ReflectionRecord`）と設定（`UserPreferences`）は **この端末の IndexedDB のみ**に保存されます（DB 名 `urban-window-db`）。IndexedDB 不可の環境では localStorage / メモリにフォールバックします。
- メモ本文・気分タグ・設定は **外部送信しません**。共有 URL にも含めません（共有されるのはシーン名・説明・URL・アプリ名のみ）。
- 設定画面から **JSON エクスポート**・**全削除**が可能です（削除前に確認します）。

---

## キーボード操作

| キー | 動作 |
| --- | --- |
| ← / → | シーン切り替え |
| Space | 再生・一時停止 |
| M | メモを開く |
| S | 共有を開く |
| Esc | パネルを閉じる |

入力欄にフォーカス中はショートカットは発火しません。

---

## ルーティング

```
/                     おすすめシーンを開いたメイン体験
/scene/[slug]         指定シーンを直接開く（同レイアウト・OGP 付き）
/archive              記録一覧（すべて / お気に入り / タグ）
/archive/[id]         記録の詳細
/about                コンセプト
/settings             音量・描画品質・動き・データ管理
```

シーン切り替えは History API で URL のみ更新（Next のページ遷移を起こさない）ため、音声エンジンや描画が**再マウントされず**途切れません。戻る/進むにも追従します。
`/scene/[slug]?duration=25` のように再生時間を共有できます（メモや気分は URL に含めません）。

---

## テスト方法

```bash
npx tsc --noEmit     # 型チェック
npm run build        # 本番ビルド（型チェック含む）
npm run lint         # ESLint
```

Vitest / Playwright は本プロトタイプには未導入です（[未実装](#未実装簡略化した箇所)参照）。導入時の対象は `src/lib`（共有 URL 生成・フォーマット）・`src/db`（記録 CRUD）・主要 E2E フロー（シーン切替 / URL / メモ保存 / アーカイブ）を想定しています。

---

## 未実装・簡略化した箇所

- **本番アセット**: 写真・実音は未同梱（CSS/Canvas/合成音で代替）。
- **OGP 画像**: 動的画像生成は未実装（metadata はシーン単位に分離済み）。
- **テスト**: Vitest / Playwright のセットアップは未導入。
- **音声レイヤー**: 合成のため、実ファイルほどの質感はありません。
