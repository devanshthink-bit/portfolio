"use client";
// The navigation the app runs on. One stack per tab, plus modal screens and sheets, with the
// animations iOS actually uses: push from the right with the screen under it sliding and dimming,
// a drag from the left edge to go back, sheets that come up and can be dragged down.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type Route = { key: string; props?: Record<string, unknown> };

type Anim = "push" | "modal" | "fade" | "none";

type Entry = Route & { id: number; anim: Anim };

export type SheetSpec = { key: string; props?: Record<string, unknown> };

type NavState = {
  stack: Entry[];
  leaving: (Entry & { anim: Anim }) | null;
  sheet: (SheetSpec & { id: number }) | null;
  sheetLeaving: boolean;
};

export type NavApi = {
  stack: Entry[];
  leaving: NavState["leaving"];
  sheet: NavState["sheet"];
  sheetLeaving: boolean;
  /** The screen on top. */
  top: Entry;
  push: (key: string, props?: Record<string, unknown>) => void;
  /** Full-screen modal: comes up from the bottom. */
  present: (key: string, props?: Record<string, unknown>) => void;
  pop: () => void;
  /** Throw the whole stack away and start again — login → app, or Log out. */
  reset: (key: string, props?: Record<string, unknown>, anim?: Anim) => void;
  openSheet: (key: string, props?: Record<string, unknown>) => void;
  closeSheet: () => void;
  canGoBack: boolean;
};

const NavCtx = createContext<NavApi | null>(null);
export const useNav = () => {
  const v = useContext(NavCtx);
  if (!v) throw new Error("useNav outside NavProvider");
  return v;
};

let seq = 1;

export function useNavStack(initial: string): NavApi {
  const [state, setState] = useState<NavState>({
    stack: [{ key: initial, id: seq++, anim: "none" }],
    leaving: null,
    sheet: null,
    sheetLeaving: false,
  });
  // one timer per animation, cleared on unmount so a fast tap can't leave a ghost screen
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms) as unknown as number);
  };

  const push = useCallback((key: string, props?: Record<string, unknown>) => {
    setState((s) => ({ ...s, stack: [...s.stack, { key, props, id: seq++, anim: "push" }] }));
  }, []);

  const present = useCallback((key: string, props?: Record<string, unknown>) => {
    setState((s) => ({ ...s, stack: [...s.stack, { key, props, id: seq++, anim: "modal" }] }));
  }, []);

  const pop = useCallback(() => {
    setState((s) => {
      if (s.stack.length < 2) return s;
      const going = s.stack[s.stack.length - 1];
      later(() => setState((t) => (t.leaving && t.leaving.id === going.id ? { ...t, leaving: null } : t)), 420);
      return { ...s, stack: s.stack.slice(0, -1), leaving: going };
    });
  }, []);

  const reset = useCallback((key: string, props?: Record<string, unknown>, anim: Anim = "fade") => {
    setState((s) => {
      const going = s.stack[s.stack.length - 1];
      later(() => setState((t) => ({ ...t, leaving: null })), 420);
      return { stack: [{ key, props, id: seq++, anim }], leaving: going, sheet: null, sheetLeaving: false };
    });
  }, []);

  const openSheet = useCallback((key: string, props?: Record<string, unknown>) => {
    setState((s) => ({ ...s, sheet: { key, props, id: seq++ }, sheetLeaving: false }));
  }, []);

  const closeSheet = useCallback(() => {
    setState((s) => (s.sheet ? { ...s, sheetLeaving: true } : s));
    later(() => setState((s) => ({ ...s, sheet: null, sheetLeaving: false })), 320);
  }, []);

  return useMemo(
    () => ({
      ...state,
      top: state.stack[state.stack.length - 1],
      push,
      present,
      pop,
      reset,
      openSheet,
      closeSheet,
      canGoBack: state.stack.length > 1,
    }),
    [state, push, present, pop, reset, openSheet, closeSheet]
  );
}

export const NavProvider = NavCtx.Provider;
