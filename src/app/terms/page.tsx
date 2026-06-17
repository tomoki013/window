import type { Metadata } from "next";
import { PageShell } from "@/components/app-shell/PageShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = { title: "利用規約" };

export default function TermsPage() {
  return (
    <PageShell
      title="利用規約"
      subtitle="本アプリをご利用いただく前に。"
      width="narrow"
    >
      <GlassPanel
        variant="soft"
        className="space-y-6 p-6 text-[14px] leading-relaxed text-[var(--text-secondary)]"
      >
        <section>
          <h2 className="mb-2 text-[15px] text-[var(--text-primary)]">
            第1条（適用）
          </h2>
          <p>
            本規約は、{brandConfig.displayName}（以下「本アプリ」）の利用に
            関する条件を定めるものです。利用者は本アプリを利用することで
            本規約に同意したものとみなされます。
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-[15px] text-[var(--text-primary)]">
            第2条（利用）
          </h2>
          <p>
            本アプリは個人的・非商業的な利用を想定しています。法令または
            公序良俗に反する目的での利用、本アプリの運営を妨げる行為は
            禁止します。
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-[15px] text-[var(--text-primary)]">
            第3条（免責）
          </h2>
          <p>
            本アプリは現状有姿で提供され、特定目的への適合性や継続的な
            提供を保証しません。本アプリの利用または利用不能により生じた
            いかなる損害についても、運営者は責任を負いません。端末内に
            保存されたデータの消失についても同様です。
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-[15px] text-[var(--text-primary)]">
            第4条（知的財産）
          </h2>
          <p>
            本アプリおよび関連するコンテンツに関する権利は、運営者または
            正当な権利者に帰属します。
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-[15px] text-[var(--text-primary)]">
            第5条（改定）
          </h2>
          <p>
            運営者は、必要に応じて本規約を改定できるものとします。改定後の
            規約は本ページに掲載した時点で効力を生じます。
          </p>
        </section>
        <p className="text-[12px] text-[var(--text-muted)]">
          最終更新: 2026年6月
        </p>
      </GlassPanel>
    </PageShell>
  );
}
