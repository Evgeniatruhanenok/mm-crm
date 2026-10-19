import type { ComponentType } from "react"
import PipelineKanban from "./pipeline-kanban/PipelineKanban"
import PipelineTable from "./pipeline-table/PipelineTable"
import DealCard from "./deal-card/DealCard"
import ChineseWalls from "./chinese-walls/ChineseWalls"
import AuditLog from "./audit-log/AuditLog"

export type ScreenEntry = {
  id: string
  name: string
  description: string
  /** link used by the index tile */
  route: string
  /** router pattern (defaults to route) */
  path?: string
  component: ComponentType
}

/** Single source of truth for routing and for the index page at `/`. */
export const screens: ScreenEntry[] = [
  { id: "pipeline-kanban", name: "Pipeline — Kanban", description: "Deal board: 5 stage columns with deal cards, filters and New deal", route: "/pipeline", component: PipelineKanban },
  { id: "pipeline-table", name: "Pipeline — Table", description: "Deals table with stages and NDA status, Smart Paste hint, pagination", route: "/pipeline/table", component: PipelineTable },
  { id: "deal-card", name: "Deal Card", description: "Deal header, meta and actions, tabs and Outlook activity feed", route: "/deals/logistikpro", path: "/deals/:dealId", component: DealCard },
  { id: "chinese-walls", name: "Chinese Walls", description: "Isolation zones with deals and teams, employees panel", route: "/compliance/chinese-walls", component: ChineseWalls },
  { id: "audit-log", name: "Audit Log", description: "Immutable access log: stats, filters, blocked actions highlighted", route: "/compliance/audit-log", component: AuditLog },
]
