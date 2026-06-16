import { AppShell } from "@/components/app-shell/AppShell";
import { defaultScene } from "@/data/scenes";

/** `/` opens the recommended scene as the main experience. */
export default function HomePage() {
  return <AppShell initialSlug={defaultScene.slug} />;
}
