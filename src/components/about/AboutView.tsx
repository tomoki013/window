import { Eye, Lock, NotebookPen, Share2 } from "lucide-react";
import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { brandConfig } from "@/config/brand";

const features = [
  {
    icon: Eye,
    title: "環境を選んで、そばに置く",
    body: "雨の高層階から明け方の店、霧の港、にぎやかな裏通りまで。今の気分に合う環境を選び、作業中や休憩中の背景として流しておけます。",
  },
  {
    icon: NotebookPen,
    title: "一言を残す",
    body: "そのとき見ていた景色に、短い言葉を添えておけます。あくまで補助的な機能です。",
  },
  {
    icon: Lock,
    title: "プライベートで安心",
    body: "メモや記録は、この端末の中だけに保存されます。外部へは送信されません。",
  },
  {
    icon: Share2,
    title: "共有もかんたん",
    body: "気に入った環境は、リンクひとつで共有できます。",
  },
];

/** Shared "about" content, used by both the standalone page and the modal. */
export function AboutView() {
  return (
    <>
      <GlassPanel variant="soft" className="mb-8 p-6">
        <p className="max-w-2xl text-[15px] leading-relaxed text-[var(--text-secondary)]">
          {brandConfig.displayName} は、景色と環境音で日常の背景をそっと変える
          Webアプリです。今いる場所や作業を離れず、ブラウザの中に別の環境を
          置いておく——そんな使い方を想定しています。静かな景色も、にぎやかな
          景色もあります。ブラウザだけで完結し、URLを共有すれば、ログイン
          なしで同じ環境をひらけます。
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

      {/* Quiet legal footer — intentionally low-key. */}
      <footer className="mt-12 flex flex-col items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
        <div className="flex items-center gap-3">
          <Link
            href="/privacy"
            className="transition-colors hover:text-[var(--text-secondary)]"
          >
            プライバシーポリシー
          </Link>
          <span aria-hidden>·</span>
          <Link
            href="/terms"
            className="transition-colors hover:text-[var(--text-secondary)]"
          >
            利用規約
          </Link>
        </div>
        <p>
          © {new Date().getFullYear()} {brandConfig.displayName}
        </p>
      </footer>
    </>
  );
}
