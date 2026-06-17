import type { Metadata } from "next";
import { AboutView } from "@/components/about/AboutView";
import { PageShell } from "@/components/app-shell/PageShell";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = { title: "このアプリについて" };

export default function AboutPage() {
  return (
    <PageShell title={brandConfig.displayName} subtitle={brandConfig.tagline}>
      <AboutView />
    </PageShell>
  );
}
