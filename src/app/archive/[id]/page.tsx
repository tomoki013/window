import type { Metadata } from "next";
import { PageShell } from "@/components/app-shell/PageShell";
import { ReflectionDetail } from "@/components/reflection/ReflectionDetail";

export const metadata: Metadata = { title: "記録の詳細" };

export default async function ReflectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageShell title="記録の詳細" width="narrow">
      <ReflectionDetail id={id} />
    </PageShell>
  );
}
