import * as React from "react"
import { cn } from "@/lib/utils"

type MemberRowProps = React.ComponentProps<"div"> & {
  initials: string
  name: string
  role: string
  /** state=in-zone — показывает чип зоны Chinese Wall */
  zone?: string
}

function MemberRow({ initials, name, role, zone, className, ...props }: MemberRowProps) {
  return (
    <div
      data-slot="member-row"
      data-state={zone ? "in-zone" : "default"}
      className={cn("flex w-full items-center gap-(--spacing-md) py-(--spacing-sm)", className)}
      {...props}
    >
      <span className="ds-label-xs flex size-8 shrink-0 items-center justify-center rounded-full bg-(--blue-100) text-(--blue-700)">
        {initials}
      </span>
      <div className="flex flex-1 flex-col gap-(--spacing-xxs)">
        <span className="ds-title-sm text-foreground-default">{name}</span>
        <span className="ds-meta text-foreground-muted">{role}</span>
      </div>
      {zone && (
        <span className="ds-label-xs rounded-full bg-(--emerald-100) px-(--spacing-sm) py-(--spacing-xxs) text-(--emerald-700)">
          {zone}
        </span>
      )}
    </div>
  )
}

export { MemberRow }
export type { MemberRowProps }
