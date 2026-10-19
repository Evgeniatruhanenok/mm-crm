import type { Deal, DealInput, Zone } from "./types"

export type FieldErrors<K extends string> = Partial<Record<K, string>>

export const NAME_MIN = 3
export const NAME_MAX = 80

/** Deal form rules: required, length bounds, unique name, NDA gate for stages beyond Prospecting. */
export function validateDeal(input: Partial<DealInput>, deals: Deal[], editingId?: string): FieldErrors<keyof DealInput> {
  const e: FieldErrors<keyof DealInput> = {}
  const name = (input.name ?? "").trim()
  if (!name) e.name = "Deal name is required"
  else if (name.length < NAME_MIN) e.name = `At least ${NAME_MIN} characters`
  else if (name.length > NAME_MAX) e.name = `At most ${NAME_MAX} characters`
  else if (deals.some((d) => !d.archived && d.id !== editingId && d.name.trim().toLowerCase() === name.toLowerCase()))
    e.name = "A deal with this name already exists"
  if (!input.type) e.type = "Pick a deal type"
  if (!input.team) e.team = "Pick a team"
  if (!input.owner) e.owner = "Pick an owner"
  if (!input.stage) e.stage = "Pick a stage"
  else if (input.stage !== "Prospecting" && !input.nda) e.stage = "NDA must be signed before moving past Prospecting"
  return e
}

export function validateZone(input: { title: string; dealIds: string[] }, zones: Zone[], editingId?: string) {
  const e: FieldErrors<"title" | "dealIds"> = {}
  const title = input.title.trim()
  if (!title) e.title = "Zone name is required"
  else if (title.length > 60) e.title = "At most 60 characters"
  else if (zones.some((z) => z.id !== editingId && z.title.trim().toLowerCase() === title.toLowerCase())) e.title = "A zone with this name already exists"
  if (input.dealIds.length === 0) e.dealIds = "Assign at least one deal"
  return e
}

export const hasErrors = (e: object) => Object.values(e).some(Boolean)
