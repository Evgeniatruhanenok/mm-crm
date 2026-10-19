import * as React from "react"
import { toast } from "sonner"
import { PlusIcon, ShieldIcon } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { MemberRow } from "@/components/MemberRow"
import { fmtDate, pluralize, useStore, type Employee, type Zone } from "@/data"
import { AppShell, PageToolbar } from "../_shared/AppShell"
import { EmptyState } from "../_shared/EmptyState"
import { ZoneCard } from "./parts/ZoneCard"
import { AddMemberDialog, ZoneFormDialog } from "./parts/ZoneDialogs"

/** Screen/ChineseWalls (Figma 65:1134) — live: zones from the data layer, drag-and-drop isolation, conflict checks. */
export default function ChineseWalls() {
  const { state, actions } = useStore()
  const [form, setForm] = React.useState<{ open: boolean; zone?: Zone }>({ open: false })
  const [addTo, setAddTo] = React.useState<Zone | null>(null)
  const [deactivate, setDeactivate] = React.useState<Zone | null>(null)
  const [busyZone, setBusyZone] = React.useState<string | null>(null)

  const active = state.zones.filter((z) => z.active)
  const zoneOf = (id: string) => active.find((z) => z.memberIds.includes(id))
  const outside = state.employees.filter((e) => !zoneOf(e.id))
  const inside = state.employees.filter((e) => zoneOf(e.id))
  const allActive = active.length === state.zones.length

  const addMember = (zone: Zone, emp: Employee) => {
    const res = actions.addMember(zone.id, emp.id)
    if (res.ok) toast.success(`${emp.name} isolated in Zone ${zone.letter}`)
    else toast.error("Access denied", { description: res.error })
  }
  const setActive = async (zone: Zone, value: boolean) => {
    setBusyZone(zone.id)
    await actions.setZoneActive(zone.id, value)
    setBusyZone(null)
    setDeactivate(null)
    toast.success(`Zone ${zone.letter} ${value ? "activated" : "deactivated"}`, { description: value ? "Add members to isolate them again" : "Members moved to “Outside zones”" })
  }

  return (
    <AppShell>
      <div className="flex min-h-full flex-1 flex-wrap">
        <section className="flex min-w-0 flex-1 basis-160 flex-col">
          <PageToolbar title="Chinese Walls" meta={<Badge variant="secondary">{pluralize(active.length, "active zone")}</Badge>}>
            <Button onClick={() => setForm({ open: true })}><PlusIcon /> Create zone</Button>
          </PageToolbar>
          <p className="ds-caption bg-background-muted px-(--padding-lg) py-(--padding-xxs) text-foreground-muted">
            Last change: {state.lastZoneChange.by}, {fmtDate(state.lastZoneChange.at)} · {allActive ? "All zones active" : `${state.zones.length - active.length} inactive`} · {pluralize(outside.length, "employee")} outside zones
          </p>
          <div className="flex flex-col gap-(--spacing-lg) p-(--padding-lg)">
            {state.status === "loading" ? (
              [0, 1, 2].map((i) => <Skeleton key={i} className="h-44 w-full rounded-md" />)
            ) : state.zones.length === 0 ? (
              <EmptyState icon={ShieldIcon} title="No zones yet" description="Create a zone to isolate the team of a sensitive deal." action={<Button onClick={() => setForm({ open: true })}><PlusIcon /> Create zone</Button>} />
            ) : (
              state.zones.map((zone) => (
                <ZoneCard
                  key={zone.id}
                  zone={zone}
                  deals={state.deals.filter((d) => zone.dealIds.includes(d.id))}
                  members={state.employees.filter((e) => zone.memberIds.includes(e.id))}
                  busy={busyZone === zone.id}
                  onEdit={() => setForm({ open: true, zone })}
                  onToggleActive={() => (zone.active ? setDeactivate(zone) : setActive(zone, true))}
                  onAddMember={() => setAddTo(zone)}
                  onRemoveMember={(id) => { actions.removeMember(zone.id, id); toast.success(`Removed from Zone ${zone.letter}`) }}
                  onDropMember={(id) => addMember(zone, state.employees.find((e) => e.id === id)!)}
                />
              ))
            )}
          </div>
        </section>

        <aside className="flex w-80 shrink-0 grow flex-col gap-(--spacing-lg) border-l border-border-default px-(--padding-sm) py-(--padding-lg) lg:grow-0">
          <div className="flex flex-col gap-(--spacing-xs)">
            <h2 className="ds-large text-foreground-default">Employees</h2>
            <p className="ds-caption text-foreground-muted">Drag into a zone to isolate</p>
          </div>
          <div className="flex flex-col gap-(--spacing-xs)">
            <span className="ds-caption text-foreground-muted">Outside zones ({outside.length})</span>
            {outside.length === 0 && <p className="ds-caption py-(--spacing-sm) text-foreground-muted">Everyone is isolated in a zone</p>}
            {outside.map((e) => (
              <MemberRow key={e.id} draggable onDragStart={(ev) => ev.dataTransfer.setData("text/employee", e.id)}
                className="cursor-grab rounded-sm transition-colors hover:bg-background-muted active:cursor-grabbing" initials={e.initials} name={e.name} role={e.role} />
            ))}
          </div>
          <Separator />
          <div className="flex flex-col gap-(--spacing-xs)">
            <span className="ds-caption text-foreground-muted">In zones ({inside.length})</span>
            {inside.map((e) => (
              <MemberRow key={e.id} draggable onDragStart={(ev) => ev.dataTransfer.setData("text/employee", e.id)}
                className="cursor-grab rounded-sm transition-colors hover:bg-background-muted active:cursor-grabbing" initials={e.initials} name={e.name} role={e.role} zone={`Zone ${zoneOf(e.id)!.letter}`} />
            ))}
          </div>
        </aside>
      </div>

      <ZoneFormDialog open={form.open} zone={form.zone} onOpenChange={(open) => setForm((f) => ({ ...f, open }))} />
      <AddMemberDialog zone={addTo} onOpenChange={(o) => !o && setAddTo(null)} />
      <AlertDialog open={!!deactivate} onOpenChange={(o) => !o && !busyZone && setDeactivate(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Zone {deactivate?.letter}?</AlertDialogTitle>
            <AlertDialogDescription>
              {deactivate && `${pluralize(deactivate.memberIds.length, "member")} will be released and lose isolation for ${deactivate.title}. The change is recorded in the Audit Log.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={!!busyZone}>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={!!busyZone} onClick={(e) => { e.preventDefault(); if (deactivate) setActive(deactivate, false) }}>{busyZone ? "Deactivating…" : "Deactivate"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  )
}
