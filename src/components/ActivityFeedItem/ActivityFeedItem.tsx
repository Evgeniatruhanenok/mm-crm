import * as React from "react"
import { cn } from "@/lib/utils"
import { activityTone, type ActivityType } from "../tones"

type ActivityFeedItemProps = React.ComponentProps<"div"> & {
  type: ActivityType
  subject: string
  meta: string
  preview?: string
}

function ActivityFeedItem({ type, subject, meta, preview, className, ...props }: ActivityFeedItemProps) {
  const { tone, icon } = activityTone[type]
  return (
    <div
      data-slot="activity-feed-item"
      data-type={type}
      className={cn(
        "flex w-full items-start gap-(--spacing-md) border-b border-border-default bg-background-card px-(--padding-lg) py-(--padding-sm)",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn("ds-title-sm flex size-8 shrink-0 items-center justify-center rounded-full", tone)}
      >
        {icon}
      </span>
      <div className="flex min-w-0 flex-col gap-(--spacing-xxs)">
        <span className="ds-title-sm text-foreground-default">{subject}</span>
        <span className="ds-meta text-foreground-muted">{meta}</span>
        {preview && <span className="ds-caption text-foreground-secondary-default">{preview}</span>}
      </div>
    </div>
  )
}

export { ActivityFeedItem }
export type { ActivityFeedItemProps }
