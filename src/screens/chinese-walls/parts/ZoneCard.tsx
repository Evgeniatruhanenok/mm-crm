import * as React from "react"
import { PlusIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { fmtDate, type Deal, type Employee, type Zone } from "@/data"
import { useNewItems } from "@/lib/motion"
import { MemberChip } from "./MemberChip"

type Props = {
  zone: Zone
  deals: Deal[]
  members: Employee[]
  onEdit: () => void
  onToggleActive: () => void
  onAddMember: () => void
  onRemoveMember: (empId: string) => void
  /** drop of an employee dragged from the People panel */
  onDropMember: (empId: string) => void
  busy?: boolean
}

/** Chinese Wall zone (Figma ZoneCard/*): header + deals + team chips; drop target for employees. Local block — candidate for the base. */
export function ZoneCard({ zone, deals, members, onEdit, onToggleActive, onAddMember, onRemoveMember, onDropMember, busy }: Props) {
  const [over, setOver] = React.useState(false)
  const isNew = useNewItems(zone.memberIds)
  return (
    <Card
      size="sm"
      className={cn("gap-(--spacing-md) px-(--padding-md) transition-[box-shadow,background-color] duration-200", over && "ring-2 ring-border-primary-default", !zone.active && "bg-background-muted")}
      onDragOver={(e) => { if (zone.active && e.dataTransfer.types.includes("text/employee")) { e.preventDefault(); setOver(true) } }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); const id = e.dataTransfer.getData("text/employee"); if (id) onDropMember(id) }}
    >
      <div className="flex flex-wrap items-center gap-(--spacing-md)">
        <h2 className={cn("ds-large", zone.active ? "text-foreground-default" : "text-foreground-muted")}>Zone {zone.letter} — {zone.title}</h2>
        {zone.active
          ? <Badge variant="secondary" className="bg-background-success-light text-foreground-success-default">Active since {fmtDate(zone.activeSince)}</Badge>
          : <Badge variant="outline">Inactive</Badge>}
        <div className="ml-auto flex gap-(--spacing-sm)">
          <Button variant="outline" onClick={onEdit} disabled={!zone.active}>Edit</Button>
          <Button variant="outline" onClick={onToggleActive} loading={busy}>{zone.active ? "Deactivate" : "Activate"}</Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-(--spacing-sm)">
        <span className="ds-caption text-foreground-muted">Deals</span>
        {deals.map((d) => <Badge key={d.id} variant="outline">{d.name}</Badge>)}
      </div>
      <span className="ds-caption text-foreground-muted">Team</span>
      <div className="flex flex-wrap items-center gap-(--spacing-sm)">
        {members.map((m) => <MemberChip key={m.id} initials={m.initials} name={m.name} role={m.role} onRemove={zone.active ? () => onRemoveMember(m.id) : undefined} className={isNew(m.id) ? "animate-in fade-in-0 zoom-in-95 duration-200 ease-out" : undefined} />)}
        {zone.active
          ? <Button variant="ghost" size="sm" onClick={onAddMember}><PlusIcon /> Add member</Button>
          : <span className="ds-caption text-foreground-muted">Members were released when the zone was deactivated</span>}
      </div>
    </Card>
  )
}
