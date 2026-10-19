import * as React from "react"
import { cn } from "@/lib/utils"

type StatsMetricProps = React.ComponentProps<"div"> & {
  value: React.ReactNode
  label: string
  /** highlighted — для аномалий (жёлтый фон) */
  variant?: "default" | "highlighted"
}

function StatsMetric({ value, label, variant = "default", className, ...props }: StatsMetricProps) {
  const highlighted = variant === "highlighted"
  return (
    <div
      data-slot="stats-metric"
      data-variant={variant}
      className={cn(
        "flex min-w-55 flex-col justify-center gap-(--spacing-xxs) rounded-md px-(--padding-sm) py-(--padding-xs)",
        highlighted ? "bg-(--amber-100) text-(--amber-700)" : "bg-background-secondary-default",
        className
      )}
      {...props}
    >
      <span className={cn("ds-metric-value", !highlighted && "text-foreground-default")}>{value}</span>
      <span className={cn("ds-meta", !highlighted && "text-foreground-muted")}>{label}</span>
    </div>
  )
}

export { StatsMetric }
export type { StatsMetricProps }
