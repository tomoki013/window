# シーン背景画像の置き場所

ここに各シーンの背景写真を**以下の正確なファイル名**で置いてください。
置いた瞬間にアプリへ反映されます（再ビルド不要・dev中はリロードのみ）。

| ファイル名 | シーン | 内容 |
| --- | --- | --- |
| `rainy-city-night.jpg` | 雨の都会の夜 | 窓辺＋グラス、雨の都市夜景 |
| `midnight-high-rise.jpg` | 深夜の高層階 | 高層階の部屋から見る夜景 |
| `quiet-office-bridge.jpg` | 橋のオフィス街 | 橋・川・濡れた路面のオフィス街 |
| `night-train-window.jpg` | 電車の窓辺 | 夜の電車内から見る都市 |
| `winter-crossing.jpg` | 冬の交差点 | 雪の降る夜の交差点 |
| `quiet-neon-alley.jpg` | ネオンの裏通り | 雨上がりのネオン街 |
| `predawn-platform.jpg` | 始発前のホーム | 早朝・無人の駅ホーム |
| `dawn-rooftop.jpg` | 夜明けの屋上 | 夜明け前のビル屋上 |
| `after-hours-mall.jpg` | 閉店後のモール | 閉店後の商業施設の吹き抜け |
| `late-night-laundromat.jpg` | 午前二時のランドリー | 深夜の無人コインランドリー |
| `after-rain-bus-stop.jpg` | 雨上がりのバス停 | 雨上がりの夜のバス停 |
| `midnight-hotel-corridor.jpg` | 深夜のホテル | 深夜のホテルの長い廊下 |
| `last-flight-lounge.jpg` | 最終便のあと | 最終便後の空港ロビー |
| `under-the-overpass.jpg` | 高架下 | 夜の高架下の歩道 |
| `predawn-convenience-store.jpg` | 明け方の店 | 明け方の架空コンビニ（外から） |
| `foggy-harbor.jpg` | 霧の港 | 霧のかかる夜の港湾 |
| `underground-parking.jpg` | 地下三階 | 静かな地下駐車場 |
| `fire-escape-night.jpg` | 非常階段の夜 | ビル非常階段からの夜景 |

## 注意

- 拡張子は **`.jpg`** に合わせてください（別形式にする場合は
  `src/data/scenes.ts` の各シーンの `image` / `poster` / `thumbnail` のパスを変更）。
- 画像が無い場合は、`src/data/scenes.ts` のグラデーション（poster）に
  自動フォールバックするため、アプリは壊れません。
- 推奨: 横長（16:9 前後）、デスクトップ用に長辺 1920–2560px 程度。
  可能なら AVIF/WebP も用意し `image` を差し替えると軽量です。
- 6シーンすべて写真対応済みです。新しいシーンを足す場合は同様に
  `<slug>.jpg` を置き、`scenes.ts` に定義を追加してください。
