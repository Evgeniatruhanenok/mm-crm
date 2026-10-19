import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/** Empty / nothing-found state built on tokens. Local shared block — candidate for the base. */
export function EmptyState({ icon: Icon, title, description, action, className }: {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-(--spacing-sm) rounded-md border border-dashed border-border-default px-(--padding-lg) py-(--padding-xl) text-center", className)}>
      <span className="flex size-10 items-center justify-center rounded-full bg-background-muted text-icon-muted"><Icon className="size-5" /></span>
      <p className="ds-body font-medium text-foreground-default">{title}</p>
      {description && <p className="ds-caption max-w-sm text-foreground-muted">{description}</p>}
      {action && <div className="pt-(--spacing-xs)">{action}</div>}
    </div>
  )
}
