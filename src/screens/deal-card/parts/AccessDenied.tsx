import * as React from "react"
import { Link } from "react-router"
import { toast } from "sonner"
import { ShieldBanIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { actingEmployee, useStore, zoneOwner, zonesOfDeal, type Deal } from "@/data"

/** Figma Screen/AccessDenied: a walled deal opened by a non-member. Logs DENIED (C.Wall) once per visit. */
export function AccessDenied({ deal }: { deal: Deal }) {
  const { state, actions } = useStore()
  const me = actingEmployee(state)
  const zones = zonesOfDeal(state, deal.id)
  const owner = zoneOwner(state, deal.id)
  const compliance = state.employees.find((e) => e.role === "Partner")
  const requested = state.accessRequests.includes(`${state.viewAs}:${deal.id}`)
  const [busy, setBusy] = React.useState(false)

  // one DENIED record per visit (StrictMode runs effects twice on the same instance)
  const logged = React.useRef<string | null>(null)
  React.useEffect(() => {
    const key = `${state.viewAs}:${deal.id}`
    if (logged.current === key) return
    logged.current = key
    actions.logDeniedAccess(deal.id)
  }, [deal.id, state.viewAs]) // eslint-disable-line react-hooks/exhaustive-deps

  const request = async () => {
    setBusy(true)
    const res = await actions.requestAccess(deal.id)
    setBusy(false)
    if (res.ok) toast.success("Access request sent", { description: `${res.value} will review it` })
  }

  const zoneLabel = zones.map((z) => `Zone ${z.letter}`).join(", ")
  return (
    <div className="flex flex-1 items-center justify-center p-(--padding-xl)">
      <div className="flex w-120 flex-col items-center gap-(--spacing-lg) text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-background-destructive-light text-icon-destructive-default">
          <ShieldBanIcon className="size-7" />
        </span>
        <div className="flex flex-col gap-(--spacing-sm)">
          <h1 className="ds-h3 text-foreground-default">Access denied</h1>
          <p className="ds-body text-foreground-muted">
            “{deal.name}” is protected by a Chinese Wall. {me ? `${me.name} is` : "You are"} not a member of {zoneLabel}, so the deal, its documents and activity are hidden.
          </p>
        </div>
        <div className="flex flex-col items-center gap-(--spacing-xs)">
          <Badge variant="secondary" className="bg-background-destructive-light text-foreground-destructive-default">DENIED (C.Wall) · recorded in the Audit Log</Badge>
          <p className="ds-caption text-foreground-muted">
            {zoneLabel} owner: {owner ? `${owner.name} (${owner.role})` : "—"}{compliance ? ` · Compliance: ${compliance.name} (${compliance.role})` : ""}
          </p>
        </div>
        <div className="flex gap-(--spacing-sm)">
          <Button asChild variant="outline"><Link to="/pipeline">Back to Pipeline</Link></Button>
          <Button loading={busy} disabled={requested} onClick={request}>{requested ? "Access requested" : "Request access"}</Button>
        </div>
      </div>
    </div>
  )
}
