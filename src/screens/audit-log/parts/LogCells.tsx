import { Badge } from "@/components/ui/badge"
import type { AuditEntry, ConfidentialityLevel } from "@/data"

export type Level = ConfidentialityLevel

const LEVEL = {
  highly: { label: "Highly Conf.", className: "bg-background-destructive-light text-foreground-destructive-default" },
  confidential: { label: "Confidential", className: "bg-background-warning-light text-foreground-warning-default" },
} as const

/** Action cell: plain text, or a blocked badge (BLOCKED / DENIED). Local block of the AuditLog screen. */
export function ActionCell({ entry }: { entry: AuditEntry }) {
  if (entry.kind !== "blocked" && entry.kind !== "denied") return <>{entry.action}</>
  return <Badge variant="secondary" className={LEVEL.highly.className}>{entry.action}</Badge>
}

/** File cell: file name + confidentiality level badge. Local block of the AuditLog screen. */
export function FileCell({ file, level }: { file: string; level?: Level }) {
  if (!level) return <>{file}</>
  return (
    <div className="flex flex-col items-start gap-(--spacing-xxs)">
      <span className="ds-caption">{file}</span>
      <Badge variant="secondary" className={LEVEL[level].className}>{LEVEL[level].label}</Badge>
    </div>
  )
}
