import { MOCK_NOW } from "./seed"

const appStart = Date.now()

/** Current mock time (Jun 14, 2026 15:00 + real time elapsed since app start). */
export const now = () => new Date(MOCK_NOW.getTime() + (Date.now() - appStart))

export const isoDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
export const isoDateTime = (d: Date) =>
  `${isoDate(d)}T${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:00`

const parse = (iso: string) => new Date(iso.length === 10 ? `${iso}T00:00:00` : iso)

/** "Jun 14, 2026" */
export const fmtDate = (iso: string) =>
  parse(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

/** "Jun 14, 14:22" */
export const fmtShortDateTime = (iso: string) => {
  const d = parse(iso)
  return `${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${d.toTimeString().slice(0, 5)}`
}

/** "Jun 3, 2026, 14:22" */
export const fmtDateTime = (iso: string) => `${fmtDate(iso)}, ${parse(iso).toTimeString().slice(0, 5)}`

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "deal"

export const randomHash = () => {
  const hex = () => Math.floor(Math.random() * 0xfffff).toString(16).padStart(5, "0")
  return `${hex()}…${hex().slice(0, 3)}`
}

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const pluralize = (n: number, one: string, many = `${one}s`) => `${n.toLocaleString("en-US")} ${n === 1 ? one : many}`
