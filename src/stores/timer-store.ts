import { create } from "zustand";

type TimerState = {
  /** Selected duration in minutes, or null for "no limit". */
  durationMinutes: number | null;
  remainingSeconds: number | null;
  running: boolean;
  completed: boolean;
  /** Seconds the current window has been viewed (for the reflection record). */
  viewedSeconds: number;

  setDuration: (minutes: number | null) => void;
  start: () => void;
  pause: () => void;
  tick: () => void;
  resetCompletion: () => void;
  resetViewed: () => void;
};

export const useTimerStore = create<TimerState>((set, get) => ({
  durationMinutes: null,
  remainingSeconds: null,
  running: false,
  completed: false,
  viewedSeconds: 0,

  setDuration: (minutes) =>
    set({
      durationMinutes: minutes,
      remainingSeconds: minutes !== null ? minutes * 60 : null,
      completed: false,
    }),
  start: () => set({ running: true, completed: false }),
  pause: () => set({ running: false }),
  tick: () => {
    const { running, remainingSeconds, viewedSeconds } = get();
    if (!running) return;
    const next: Partial<TimerState> = { viewedSeconds: viewedSeconds + 1 };
    if (remainingSeconds !== null) {
      const r = remainingSeconds - 1;
      if (r <= 0) {
        next.remainingSeconds = 0;
        next.running = false;
        next.completed = true;
      } else {
        next.remainingSeconds = r;
      }
    }
    set(next);
  },
  resetCompletion: () =>
    set((s) => ({
      completed: false,
      remainingSeconds:
        s.durationMinutes !== null ? s.durationMinutes * 60 : null,
    })),
  resetViewed: () => set({ viewedSeconds: 0 }),
}));
