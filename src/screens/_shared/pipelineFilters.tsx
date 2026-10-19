import * as React from "react"
import { useSearchParams } from "react-router"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { STAGES } from "@/components/tones"
import { CURRENT_USER, DEAL_TYPES, OWNERS, TEAMS, activeDeals, useStore, type Deal } from "@/data"

/*
 * Pipeline filters live in the URL (?owner=&stage=&team=&type=&q=&view=), so Kanban and Table
 * share them, links are shareable, and Back/Forward restore the previous filter set.
 */

export type PipelineView = "all" | "mine" | "team" | "closed"
const KEYS = ["owner", "stage", "team", "type", "q", "view"] as const
type Key = (typeof KEYS)[number]

export function usePipelineFilters() {
  const [params, setParams] = useSearchParams()
  const { state } = useStore()
  const get = (k: Key) => params.get(k) ?? ""
  const filters = { owner: get("owner"), stage: get("stage"), team: get("team"), type: get("type"), q: get("q"), view: (get("view") || "all") as PipelineView }

  const set = (k: Key, value: string) => {
    const next = new URLSearchParams(params)
    if (!value || value === "all") next.delete(k)
    else next.set(k, value)
    setParams(next)
  }
  const reset = () => setParams(new URLSearchParams())
  const active = KEYS.some((k) => k !== "view" && params.get(k))

  const deals = React.useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    const myTeams = new Set(state.deals.filter((d) => d.owner === CURRENT_USER.short).map((d) => d.team))
    const base = filters.view === "closed" ? state.deals.filter((d) => d.archived) : activeDeals(state)
    return base.filter((d: Deal) =>
      (filters.view !== "mine" || d.owner === CURRENT_USER.short) &&
      (filters.view !== "team" || myTeams.has(d.team)) &&
      (!filters.owner || d.owner === filters.owner) &&
      (!filters.stage || d.stage === filters.stage) &&
      (!filters.team || d.team === filters.team) &&
      (!filters.type || d.type === filters.type) &&
      (!q || [d.name, d.owner, d.team, d.type, d.stage].some((f) => f.toLowerCase().includes(q))))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.deals, params])

  return { filters, set, reset, active, deals, query: params.toString() }
}

const ALL: Record<string, string> = { owner: "All bankers", stage: "All stages", team: "All teams", type: "All types" }
const OPTIONS = { owner: OWNERS, stage: STAGES, team: TEAMS, type: DEAL_TYPES } as const

/** Filter select bound to a URL param. */
export function FilterSelect({ name, filters, set }: { name: keyof typeof OPTIONS } & Pick<ReturnType<typeof usePipelineFilters>, "filters" | "set">) {
  return (
    <Select value={filters[name] || "all"} onValueChange={(v) => set(name, v)}>
      <SelectTrigger className="w-45" aria-label={ALL[name]}><SelectValue /></SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{ALL[name]}</SelectItem>
        {OPTIONS[name].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}

export const VIEW_TITLE: Record<PipelineView, string> = { all: "Pipeline", mine: "My deals", team: "Team deals", closed: "Closed deals" }
