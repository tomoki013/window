"use client";
import { useEffect, useRef } from "react";
import type { ResolvedTier } from "@/hooks/usePerformanceTier";

type Props = {
  intensity: number;
  tier: ResolvedTier;
  enabled: boolean;
};

type Drop = { x: number; y: number; len: number; speed: number; alpha: number };
type Trail = { x: number; y: number; r: number; speed: number; life: number };

/**
 * Canvas rain. Two registers: fast falling streaks (the rain) and slow
 * glass-clinging droplets (the window). Never DOM nodes. Pauses when offscreen
 * or the tab is hidden, caps DPR, and sheds particles if frames run long.
 */
export function RainLayer({ intensity, tier, enabled }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled || intensity <= 0 || tier === "low") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let w = 0;
    let h = 0;

    const baseCount = tier === "high" ? 260 : 130;
    let count = Math.round(baseCount * Math.min(1, intensity + 0.2));
    const drops: Drop[] = [];
    const trails: Trail[] = [];

    const reset = () => {
      drops.length = 0;
      for (let i = 0; i < count; i++) {
        drops.push(makeDrop());
      }
    };
    const makeDrop = (): Drop => ({
      x: Math.random() * w,
      y: Math.random() * h,
      len: 8 + Math.random() * 14,
      speed: 380 + Math.random() * 460,
      alpha: 0.08 + Math.random() * 0.18,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      reset();
    };

    let raf = 0;
    let last = performance.now();
    let visible = true;
    let onScreen = true;
    let slowFrames = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // adaptive shedding: if frames consistently run long, drop particles
      if (dt > 0.032) {
        slowFrames++;
        if (slowFrames > 30 && count > 60) {
          count = Math.round(count * 0.85);
          drops.length = Math.min(drops.length, count);
          slowFrames = 0;
        }
      } else if (slowFrames > 0) {
        slowFrames--;
      }

      ctx.clearRect(0, 0, w, h);

      // streaks
      ctx.strokeStyle = "rgba(200,214,255,1)";
      ctx.lineWidth = 1;
      for (const d of drops) {
        d.y += d.speed * dt;
        d.x += d.speed * dt * 0.12; // slight wind slant
        if (d.y > h + 20) {
          d.y = -20;
          d.x = Math.random() * w;
        }
        ctx.globalAlpha = d.alpha;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.len * 0.12, d.y - d.len);
        ctx.stroke();
      }

      // glass droplets (sparser, slower) — only on higher tiers
      if (tier === "high") {
        if (trails.length < 26 && Math.random() < 0.12 * intensity) {
          trails.push({
            x: Math.random() * w,
            y: Math.random() * h * 0.7,
            r: 1.5 + Math.random() * 3,
            speed: 10 + Math.random() * 30,
            life: 1,
          });
        }
        ctx.globalAlpha = 1;
        for (let i = trails.length - 1; i >= 0; i--) {
          const t = trails[i];
          t.y += t.speed * dt;
          t.life -= dt * 0.05;
          if (t.y > h || t.life <= 0) {
            trails.splice(i, 1);
            continue;
          }
          const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.r);
          grad.addColorStop(0, "rgba(220,228,255,0.5)");
          grad.addColorStop(1, "rgba(220,228,255,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const sync = () => {
      if (visible && onScreen) start();
      else stop();
    };

    const onVis = () => {
      visible = document.visibilityState === "visible";
      sync();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.01 },
    );
    const ro = new ResizeObserver(() => resize());

    resize();
    ro.observe(canvas);
    io.observe(canvas);
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [intensity, tier, enabled]);

  if (!enabled || intensity <= 0 || tier === "low") return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
    />
  );
}
