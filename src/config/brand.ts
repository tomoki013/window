export const brandConfig = {
  /**
   * Immutable identifier. Used for storage keys (IndexedDB / localStorage) so a
   * display-name change never orphans saved data. Do not change this value.
   */
  id: "urban-window",
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "window",
  displayName: process.env.NEXT_PUBLIC_APP_DISPLAY_NAME ?? "window",
  tagline:
    process.env.NEXT_PUBLIC_APP_TAGLINE ?? "都市の静けさを、そっと味わう時間。",
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ??
    "静かな都市の風景と環境音を眺めながら、気持ちを整えるWebアプリ。",
  baseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL ?? "http://localhost:3000",
  locale: "ja",
} as const;

export type BrandConfig = typeof brandConfig;
