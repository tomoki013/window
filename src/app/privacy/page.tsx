import type { Metadata } from "next";
import { PageShell } from "@/components/app-shell/PageShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = { title: "プライバシーポリシー" };

export default function PrivacyPage() {
  return (
    <PageShell
      title="プライバシーポリシー"
      subtitle="あなたのデータがどう扱われるかについて。"
      width="narrow"
    >
      <GlassPanel
        variant="soft"
        className="space-y-6 p-6 text-[14px] leading-relaxed text-[var(--text-secondary)]"
      >
        <section>
          <h2 className="mb-2 text-[15px] text-[var(--text-primary)]">
            収集する情報
          </h2>
          <p>
            {brandConfig.displayName}（以下「本アプリ」）は、アカウント登録を
            必要とせず、氏名・メールアドレス等の個人情報を収集しません。
            メモや設定などあなたが入力した内容は、すべてご利用の端末内
            （ブラウザの IndexedDB / localStorage）にのみ保存されます。
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-[15px] text-[var(--text-primary)]">
            データの送信について
          </h2>
          <p>
            本アプリはブラウザ上で完結し、入力されたメモや記録を外部の
            サーバーへ送信・保存することはありません。データは端末から
            外に出ません。
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-[15px] text-[var(--text-primary)]">
            データの削除
          </h2>
          <p>
            保存された記録は、設定画面の「すべての記録を削除」からいつでも
            消去できます。ブラウザのサイトデータを消去した場合も同様に
            削除されます。
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-[15px] text-[var(--text-primary)]">
            外部サービス
          </h2>
          <p>
            本アプリはフォント等の配信のために外部のCDNを利用する場合が
            あります。これらの通信は各提供元のポリシーに従います。
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-[15px] text-[var(--text-primary)]">改定</h2>
          <p>
            本ポリシーは予告なく改定されることがあります。重要な変更が
            ある場合は、本ページ上で告知します。
          </p>
        </section>
        <p className="text-[12px] text-[var(--text-muted)]">
          最終更新: 2026年6月
        </p>
      </GlassPanel>
    </PageShell>
  );
}
