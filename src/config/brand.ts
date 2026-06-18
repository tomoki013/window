export const brandConfig = {
  /**
   * Immutable identifier. Used for storage keys (IndexedDB / localStorage) so a
   * display-name change never orphans saved data. Do not change this value.
   */
  id: "urban-window",
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "Atmos",
  displayName: process.env.NEXT_PUBLIC_APP_DISPLAY_NAME ?? "Atmos",
  tagline:
    process.env.NEXT_PUBLIC_APP_TAGLINE ?? "いつもの時間に、違う景色を。",
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ??
    "景色と環境音で日常の背景を変えるWebアプリ。雨の高層階、明け方の店、霧の港、光のあふれる繁華街。少しずつ動く景色とその場所の音を、作業中や休憩中のそばに置けます。",
  /**
   * Public origin used to build shareable links and OG metadata. Override per
   * environment with `NEXT_PUBLIC_APP_BASE_URL` (e.g. a custom domain). The
   * fallback is the current tentative deployment URL.
   */
  baseUrl:
    process.env.NEXT_PUBLIC_APP_BASE_URL ?? "https://window-fawn.vercel.app",
  locale: "ja",
} as const;

export type BrandConfig = typeof brandConfig;
