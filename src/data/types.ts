import type { ActivityType, Stage } from "@/components/tones"

export type { ActivityType, Stage }

export const DEAL_TYPES = ["Buy-side", "Sell-side", "Advisory"] as const
export type DealType = (typeof DEAL_TYPES)[number]

export const TEAMS = ["Team A", "Team B", "Team C"] as const
export type Team = (typeof TEAMS)[number]

export const OWNERS = ["M. Volkova", "D. Kuznetsov", "A. Smirnov", "E. Orlova"] as const
export type Owner = (typeof OWNERS)[number]

export type Deal = {
  id: string
  name: string
  type: DealType
  stage: Stage
  team: Team
  owner: Owner
  /** ISO date */
  created: string
  /** ISO date */
  lastActivity: string
  nda: boolean
  archived: boolean
}

export type Activity = {
  id: string
  dealId: string
  type: ActivityType
  subject: string
  meta: string
  preview?: string
  /** ISO datetime */
  at: string
}

export type Employee = {
  id: string
  initials: string
  name: string
  role: "Partner" | "MD" | "VP" | "Associate" | "Analyst"
}

export type Zone = {
  id: string
  letter: string
  title: string
  dealIds: string[]
  memberIds: string[]
  /** ISO date */
  activeSince: string
  active: boolean
}

export type AuditKind = "view" | "download" | "upload" | "share" | "blocked" | "denied" | "system"
export type ConfidentialityLevel = "highly" | "confidential"

export type AuditEntry = {
  id: string
  /** ISO datetime */
  at: string
  user: string
  action: string
  kind: AuditKind
  file: string
  level?: ConfidentialityLevel
  deal: string
  ip: string
  hash: string
  /** row tint; blocked/denied are destructive unless already reviewed */
  tone?: "destructive" | "warning"
}

export type DealDocument = {
  id: string
  dealId: string
  name: string
  level?: ConfidentialityLevel
  uploadedBy: string
  /** ISO date */
  uploaded: string
}

/** External counterparty contact on a deal; NDA is per recipient. */
export type Contact = {
  id: string
  dealId: string
  name: string
  title: string
  company: string
  nda: "signed" | "pending" | "none"
}

export type DealInput = Pick<Deal, "name" | "type" | "stage" | "team" | "owner" | "nda">

export type Result<T = void> = { ok: true; value: T } | { ok: false; error: string }
