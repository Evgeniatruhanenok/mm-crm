import * as React from "react"
import { cn } from "@/lib/utils"
import { stageTone, type Stage } from "../tones"

type StageBadgeProps = React.ComponentProps<"span"> & {
  stage: Stage
  /** sm — компактный бейдж внутри KanbanCard */
  size?: "default" | "sm"
}

function StageBadge({ stage, size = "default", className, children, ...props }: StageBadgeProps) {
  return (
    <span
      data-slot="stage-badge"
      data-stage={stage}
      className={cn(
        "inline-flex w-fit items-center rounded-sm whitespace-nowrap",
        size === "default"
          ? "ds-label-sm px-(--spacing-sm) py-(--spacing-xxs)"
          : "ds-label-2xs px-(--spacing-xs) py-(--spacing-xxs)",
        stageTone[stage],
        className
      )}
      {...props}
    >
      {children ?? stage}
    </span>
  )
}

export { StageBadge }
export type { StageBadgeProps }
