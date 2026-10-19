import * as React from "react"
import { PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Stage } from "../tones"

type KanbanColumnProps = React.ComponentProps<"div"> & {
  stage: Stage
  count?: number
  onAdd?: () => void
}

/** Kanban board column: stage header + count badge, KanbanCard list, “+ Add deal”. */
function KanbanColumn({ stage, count, onAdd, className, children, ...props }: KanbanColumnProps) {
  return (
    <div
      data-slot="kanban-column"
      data-stage={stage}
      className={cn(
        "flex w-54 flex-col gap-(--spacing-sm) rounded-md border border-border-default bg-background-muted p-(--padding-xxs)",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-start gap-(--spacing-sm) px-(--spacing-xs)">
        <span className="ds-title-sm text-foreground-default">{stage}</span>
        <Badge variant="outline" className="bg-background-default">{count ?? React.Children.count(children)}</Badge>
      </div>
      {children}
      <Button variant="ghost" size="sm" className="justify-start text-foreground-muted" onClick={onAdd}>
        <PlusIcon />
        Add deal
      </Button>
    </div>
  )
}

export { KanbanColumn }
export type { KanbanColumnProps }
