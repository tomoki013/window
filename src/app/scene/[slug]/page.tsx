import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell/AppShell";
import { brandConfig } from "@/config/brand";
import { getSceneBySlug, scenes } from "@/data/scenes";

export function generateStaticParams() {
  return scenes.map((s) => ({ slug: s.slug }));
}

type Params = { params: Promise<{ slug: string }> };

/** Per-scene metadata / OGP — derived from scene data, one place to extend. */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const scene = getSceneBySlug(slug);
  if (!scene) return {};
  const url = `${brandConfig.baseUrl}/scene/${scene.slug}`;
  return {
    title: scene.title,
    description: scene.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${scene.title} · ${brandConfig.displayName}`,
      description: scene.subtitle,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${scene.title} · ${brandConfig.displayName}`,
      description: scene.subtitle,
    },
  };
}

type SearchParams = { searchParams: Promise<{ duration?: string }> };

export default async function ScenePage({
  params,
  searchParams,
}: Params & SearchParams) {
  const { slug } = await params;
  const { duration } = await searchParams;
  const scene = getSceneBySlug(slug);
  if (!scene) notFound();

  const parsedDuration = duration ? parseInt(duration, 10) : undefined;

  return (
    <AppShell
      initialSlug={scene.slug}
      initialDuration={
        parsedDuration && [15, 25, 45].includes(parsedDuration)
          ? parsedDuration
          : undefined
      }
    />
  );
}
