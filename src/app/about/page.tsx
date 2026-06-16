import { Eye, Lock, NotebookPen, Share2 } from "lucide-react";
import type { Metadata } from "next";
import { PageShell } from "@/components/app-shell/PageShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = { title: "このアプリについて" };

const features = [
  {
    icon: Eye,
    title: "窓をひらいて眺める",
    body: "都市の静けさをテーマにした複数の窓から、今の気分に合う景色を選べます。",
  },
  {
    icon: NotebookPen,
    title: "ひとことを置いていく",
    body: "気持ちを短い言葉にすることで、心を少しだけ整えられます。",
  },
  {
    icon: Lock,
    title: "プライベートで安心",
    body: "メモや記録は、この端末の中だけに保存されます。外部へは送信されません。",
  },
  {
    icon: Share2,
    title: "共有もかんたん",
    body: "お気に入りの窓は、リンクひとつでやさしく共有できます。",
  },
];

export default function AboutPage() {
  return (
    <PageShell title={brandConfig.displayName} subtitle={brandConfig.tagline}>
      <GlassPanel variant="soft" className="mb-8 p-6">
        <p className="max-w-2xl text-[15px] leading-relaxed text-[var(--text-secondary)]">
          {brandConfig.displayName} は、都市の情景と環境音で心を整えるための
          Webアプリです。そのときの気分や状況に合わせて、あなただけの“窓”を
          ひらいてみてください。ブラウザだけで完結し、URLを共有すれば、
          ログインなしで同じ景色をひらけます。
        </p>
      </GlassPanel>

      <div className="grid gap-3 sm:grid-cols-2">
        {features.map((f) => (
          <GlassPanel key={f.title} variant="soft" className="flex gap-4 p-5">
            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-medium)] border border-[var(--border-subtle)] bg-white/[0.03] text-[var(--accent-secondary)]">
              <f.icon size={18} />
            </span>
            <div>
              <h3 className="text-[15px] text-[var(--text-primary)]">
                {f.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                {f.body}
              </p>
            </div>
          </GlassPanel>
        ))}
      </div>
    </PageShell>
  );
}
