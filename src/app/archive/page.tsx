import type { Metadata } from "next";
import { PageShell } from "@/components/app-shell/PageShell";
import { ReflectionList } from "@/components/reflection/ReflectionList";

export const metadata: Metadata = { title: "記録" };

export default function ArchivePage() {
  return (
    <PageShell title="記録" subtitle="そばに置いた環境と、残した言葉。">
      <ReflectionList />
    </PageShell>
  );
}
