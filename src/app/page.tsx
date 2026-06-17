import { AppShell } from "@/components/app-shell/AppShell";
import { defaultScene } from "@/data/scenes";

/**
 * `/` plays a short Atmos overture, then settles the address bar onto the
 * recommended scene's own URL (`/scene/<slug>`) without a remount.
 */
export default function HomePage() {
  return <AppShell initialSlug={defaultScene.slug} intro />;
}
