import * as React from "react"
import { cn } from "@/lib/utils"
import { StageBadge } from "../StageBadge"
import type { Stage } from "../tones"

type KanbanCardProps = React.ComponentProps<"div"> & {
  stage: Stage
  dealName: string
  dealType: string
  team: string
  date: string
}

function KanbanCard({ stage, dealName, dealType, team, date, className, ...props }: KanbanCardProps) {
  return (
    <div
      data-slot="kanban-card"
      data-stage={stage}
      className={cn(
        "flex w-49 flex-col gap-(--spacing-xs) rounded-md border border-border-default bg-background-card p-(--padding-xs)",
        className
      )}
      {...props}
    >
      <span className="ds-title-sm text-foreground-default">{dealName}</span>
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
