/*
 * Цвета стадий и типов событий M&A (ds/custom-components-code.js).
 * ⚠ Semantic-токенов под них в foundation.md нет — компоненты ссылаются
 *   на примитивы. По CONTRACT нужно завести Tokens в Figma
 *   (например, `Background/Stage/nda`) и переключить сюда.
 */

export const STAGES = [
  "Prospecting",
  "NDA Signed",
  "Due Diligence",
  "LOI / Term Sheet",
  "Closing",
] as const

export type Stage = (typeof STAGES)[number]

export const stageTone: Record<Stage, string> = {
  Prospecting: "bg-(--zinc-100) text-(--zinc-600)",
  "NDA Signed": "bg-(--emerald-100) text-(--emerald-700)",
  "Due Diligence": "bg-(--blue-100) text-(--blue-700)",
  "LOI / Term Sheet": "bg-(--violet-100) text-(--violet-700)",
  Closing: "bg-(--amber-100) text-(--amber-700)",
}

export const ACTIVITY_TYPES = [
  "Email In",
  "Email Out",
  "Meeting",
  "NDA",
  "Note",
] as const

export type ActivityType = (typeof ACTIVITY_TYPES)[number]

export const activityTone: Record<ActivityType, { tone: string; icon: string }> = {
  "Email In": { tone: "bg-(--blue-100) text-(--blue-700)", icon: "↓" },
  "Email Out": { tone: "bg-(--zinc-100) text-(--zinc-600)", icon: "↑" },
  Meeting: { tone: "bg-(--emerald-100) text-(--emerald-700)", icon: "◉" },
  NDA: { tone: "bg-(--emerald-100) text-(--emerald-700)", icon: "✓" },
  Note: { tone: "bg-(--yellow-100) text-(--amber-700)", icon: "✎" },
}
