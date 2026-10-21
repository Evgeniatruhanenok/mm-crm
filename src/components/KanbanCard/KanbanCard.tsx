import * as React from "react"
import { LockIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { StageBadge } from "../StageBadge"
import type { Stage } from "../tones"

type KanbanCardProps = React.ComponentProps<"div"> & {
  stage: Stage
  dealName: string
  dealType: string
  team: string
  date: string
  /** deal is behind a Chinese Wall the viewer is not part of — lock icon, muted name */
  locked?: boolean
}

function KanbanCard({ stage, dealName, dealType, team, date, locked = false, className, ...props }: KanbanCardProps) {
  return (
    <div
      data-slot="kanban-card"
      data-stage={stage}
      data-locked={locked || undefined}
      className={cn(
        "flex w-49 flex-col gap-(--spacing-xs) rounded-md border border-border-default bg-background-card p-(--padding-xs)",
        className
      )}
      {...props}
    >
      <span className={cn("ds-title-sm flex items-start gap-(--spacing-xs)", locked ? "text-foreground-muted" : "text-foreground-default")}>
        {locked && <LockIcon className="mt-px size-3.5 shrink-0 text-icon-muted" aria-label="Restricted by a Chinese Wall" />}
        {dealName}
      </span>
      <span className="ds-meta flex gap-(--spacing-xs) text-foreground-muted">
        <span>{dealType}</span>
        <span>·</span>
        <span>{team}</span>
      </span>
      <span className="ds-meta text-foreground-muted">{date}</span>
      <StageBadge stage={stage} size="sm" />
    </div>
  )
}

export { KanbanCard }
export type { KanbanCardProps }
