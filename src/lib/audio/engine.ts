import type { AudioLayer } from "@/types/scene";

/**
 * Ambience engine.
 *
 * The prototype ships no audio files, so each layer is *synthesized* with the
 * Web Audio API (filtered noise, low oscillators, slow LFOs). If a layer
 * provides a real `src`, that file is streamed instead. Everything routes
 * through a master gain so crossfades and global volume are a single ramp.
 */

type LiveLayer = {
  id: string;
  gain: GainNode;
  baseVolume: number;
  /** Nodes to stop/disconnect when the layer is torn down. */
  sources: AudioScheduledSourceNode[];
  extra: AudioNode[];
};

const FADE = 1.2; // seconds for scene crossfades

export class AmbienceEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private layers: LiveLayer[] = [];
  private noiseBuffer: AudioBuffer | null = null;
  private _playing = false;
  private _masterVolume = 0.7;

  get playing() {
    return this._playing;
  }

  /** Must be called from a user gesture to satisfy autoplay policy. */
  ensureContext(): AudioContext {
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  private getNoise(): AudioBuffer {
    const ctx = this.ctx!;
    if (!this.noiseBuffer) {
      const len = ctx.sampleRate * 3;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) {
        // brown-ish noise: smoother, less harsh than pure white
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }
      this.noiseBuffer = buf;
    }
    return this.noiseBuffer;
  }

  private buildLayer(layer: AudioLayer): LiveLayer {
    const ctx = this.ctx!;
    const gain = ctx.createGain();
    gain.gain.value = layer.defaultVolume;
    gain.connect(this.master!);

    const sources: AudioScheduledSourceNode[] = [];
    const extra: AudioNode[] = [];

    if (layer.src) {
      const el = new Audio(layer.src);
      el.loop = layer.loop;
      el.crossOrigin = "anonymous";
      const node = ctx.createMediaElementSource(el);
      node.connect(gain);
      void el.play().catch(() => {});
      extra.push(node);
      // store element on extra via closure cleanup
      (gain as unknown as { _el?: HTMLAudioElement })._el = el;
    } else if (layer.synth) {
      const noise = ctx.createBufferSource();
      noise.buffer = this.getNoise();
      noise.loop = true;
      const { type, tone } = layer.synth;

      if (type === "rain" || type === "noise" || type === "cafe") {
        const bp = ctx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.value = tone;
        bp.Q.value = type === "rain" ? 0.6 : 0.8;
        noise.connect(bp).connect(gain);
        extra.push(bp);
        // gentle shimmer for rain
        if (type === "rain") {
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.value = 0.3;
          lfoGain.gain.value = tone * 0.15;
          lfo.connect(lfoGain).connect(bp.frequency);
          lfo.start();
          sources.push(lfo);
        }
      } else if (type === "wind") {
        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = tone;
        noise.connect(lp).connect(gain);
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.08;
        lfoGain.gain.value = tone * 0.5;
        lfo.connect(lfoGain).connect(lp.frequency);
        lfo.start();
        extra.push(lp, lfoGain);
        sources.push(lfo);
      } else if (type === "hum") {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = tone;
        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.value = tone * 1.5;
        const oscGain = ctx.createGain();
        oscGain.gain.value = 0.6;
        osc.connect(oscGain).connect(gain);
        osc2.connect(oscGain);
        // a touch of noise floor
        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 200;
        const nGain = ctx.createGain();
        nGain.gain.value = 0.25;
        noise.connect(lp).connect(nGain).connect(gain);
        osc.start();
        osc2.start();
        extra.push(oscGain, lp, nGain);
        sources.push(osc, osc2);
      } else if (type === "rail") {
        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = tone;
        const clack = ctx.createGain();
        clack.gain.value = 1;
        noise.connect(lp).connect(clack).connect(gain);
        // periodic rail clack via amplitude LFO
        const lfo = ctx.createOscillator();
        lfo.type = "sawtooth";
        lfo.frequency.value = 2.1;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.4;
        lfo.connect(lfoGain).connect(clack.gain);
        lfo.start();
        extra.push(lp, clack, lfoGain);
        sources.push(lfo);
      } else {
        noise.connect(gain);
      }
      noise.start();
      sources.push(noise);
    }

    return {
      id: layer.id,
      gain,
      baseVolume: layer.defaultVolume,
      sources,
      extra,
    };
  }

  private teardownLayers(immediate = false) {
    const ctx = this.ctx;
    for (const live of this.layers) {
      const stop = () => {
        for (const s of live.sources) {
          try {
            s.stop();
          } catch {
            /* already stopped */
          }
          s.disconnect();
        }
        for (const n of live.extra) n.disconnect();
        const el = (live.gain as unknown as { _el?: HTMLAudioElement })._el;
        if (el) {
          el.pause();
          el.src = "";
        }
        live.gain.disconnect();
      };
      if (immediate || !ctx) {
        stop();
      } else {
        live.gain.gain.cancelScheduledValues(ctx.currentTime);
        live.gain.gain.setTargetAtTime(0, ctx.currentTime, FADE / 3);
        window.setTimeout(stop, FADE * 1000 + 100);
      }
    }
    this.layers = [];
  }

  /** Switches ambience to a new scene with a crossfade. */
  setScene(audioLayers: AudioLayer[]) {
    if (!this.ctx) return;
    this.teardownLayers(false);
    this.layers = audioLayers.map((l) => this.buildLayer(l));
  }

  play() {
    const ctx = this.ensureContext();
    this._playing = true;
    this.master!.gain.cancelScheduledValues(ctx.currentTime);
    this.master!.gain.setTargetAtTime(
      this._masterVolume,
      ctx.currentTime,
      FADE / 3,
    );
  }

  pause() {
    if (!this.ctx) return;
    this._playing = false;
    this.master!.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master!.gain.setTargetAtTime(0, this.ctx.currentTime, FADE / 4);
  }

  setMasterVolume(v: number) {
    this._masterVolume = v;
    if (this.ctx && this._playing) {
      this.master!.gain.setTargetAtTime(v, this.ctx.currentTime, 0.2);
    }
  }

  setLayerVolume(id: string, v: number) {
    const live = this.layers.find((l) => l.id === id);
    if (live && this.ctx) {
      live.gain.gain.setTargetAtTime(v, this.ctx.currentTime, 0.2);
    }
  }

  /** Gentle fade used when a timer completes. */
  fadeOutAndStop(seconds = 8) {
    if (!this.ctx) return;
    this._playing = false;
    this.master!.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master!.gain.setTargetAtTime(0, this.ctx.currentTime, seconds / 4);
  }

  dispose() {
    this.teardownLayers(true);
    if (this.ctx) void this.ctx.close();
    this.ctx = null;
    this.master = null;
    this.noiseBuffer = null;
    this._playing = false;
  }
}

let engineSingleton: AmbienceEngine | null = null;
export function getAmbienceEngine(): AmbienceEngine {
  if (!engineSingleton) engineSingleton = new AmbienceEngine();
  return engineSingleton;
}
