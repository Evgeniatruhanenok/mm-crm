import * as React from "react"
import { flushSync } from "react-dom"

/*
 * Motion helpers (directive wire, phase 5). Durations 150–250ms, ease-out.
 * Everything degrades gracefully: no View Transitions API or reduced motion → instant update.
 */

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Run a state update inside a View Transition so elements with `view-transition-name`
 * glide to their new position (e.g. a Kanban card moving to another column).
 */
export function withViewTransition(update: () => void): void {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
  if (!doc.startViewTransition || reducedMotion()) return update()
  // the callback runs asynchronously — validate before calling, update only inside
  doc.startViewTransition(() => flushSync(update))
}

/** `view-transition-name` must be a valid CSS ident. */
export const vtName = (prefix: string, id: string) => ({ viewTransitionName: `${prefix}-${id.replace(/[^a-zA-Z0-9_-]/g, "_")}` }) as React.CSSProperties

export const APPEAR = "animate-in fade-in-0 slide-in-from-top-1 duration-200 ease-out"

/**
 * Remembers which ids existed when the data first became ready; returns `isNew(id)` for
 * items added afterwards (new deal, new log row, new zone member). Only those animate,
 * so lists don't "flash" on page load.
 */
export function useNewItems(ids: string[], ready = true) {
  const known = React.useRef<Set<string> | null>(null)
  if (ready && known.current === null) known.current = new Set(ids)
  return React.useCallback((id: string) => known.current !== null && !known.current.has(id), [])
}
