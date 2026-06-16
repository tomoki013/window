import type { Metadata } from "next";
import { PageShell } from "@/components/app-shell/PageShell";
import { SettingsView } from "@/components/settings/SettingsView";

export const metadata: Metadata = { title: "設定" };

export default function SettingsPage() {
  return (
    <PageShell title="設定" subtitle="音・描画・データの管理。" width="narrow">
      <SettingsView />
    </PageShell>
  );
}
