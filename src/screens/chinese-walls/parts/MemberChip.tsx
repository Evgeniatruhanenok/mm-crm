import { XIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

/** Member chip inside a zone (Figma MemberChip): avatar + name · role, optional remove. Local block. */
export function MemberChip({ initials, name, role, onRemove, className }: { initials: string; name: string; role: string; onRemove?: () => void; className?: string }) {
  return (
    <div className={`group flex items-center gap-(--spacing-sm) rounded-sm bg-background-muted py-(--spacing-xs) pr-(--spacing-sm) pl-(--spacing-xs) ${className ?? ""}`}>
      <Avatar size="sm"><AvatarFallback>{initials}</AvatarFallback></Avatar>
      <span className="ds-caption text-foreground-default">{name}</span>
      <span className="ds-caption text-foreground-muted">· {role}</span>
      {onRemove && (
        <button type="button" onClick={onRemove} aria-label={`Remove ${name} from zone`}
          className="rounded-xs text-icon-muted opacity-0 transition-opacity group-hover:opacity-100 hover:text-icon-default focus-visible:opacity-100">
          <XIcon className="size-3" />
        </button>
      )}
    </div>
  )
}
