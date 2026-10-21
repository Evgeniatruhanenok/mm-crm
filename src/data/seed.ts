import type { Activity, AuditEntry, Contact, Deal, DealDocument, Employee, Zone } from "./types"

/* Mock dataset — mirrors the content of the Figma screens. No backend. */

export const CURRENT_USER = { name: "Alexey Smirnov", short: "A. Smirnov", initials: "AS", role: "MD", ip: "95.142.10.10" } as const

/** Mock clock: the product "today" is Jun 14, 2026 15:00 and moves forward in real time. */
export const MOCK_NOW = new Date("2026-06-14T15:00:00")

export const seedDeals: Deal[] = [
  { id: "rosmedia", name: "RosMedia acquisition", type: "Buy-side", stage: "Prospecting", team: "Team A", owner: "M. Volkova", created: "2026-06-10", lastActivity: "2026-06-14", nda: false, archived: false },
  { id: "agroholding-south", name: "AgroHolding South sale", type: "Sell-side", stage: "Prospecting", team: "Team B", owner: "D. Kuznetsov", created: "2026-06-08", lastActivity: "2026-06-12", nda: false, archived: false },
  { id: "fintech-group", name: "FinTech Group merger", type: "Buy-side", stage: "Prospecting", team: "Team A", owner: "M. Volkova", created: "2026-06-05", lastActivity: "2026-06-10", nda: false, archived: false },
  { id: "logistikpro", name: "LogistikPro sale", type: "Sell-side", stage: "NDA Signed", team: "Team C", owner: "M. Volkova", created: "2026-04-15", lastActivity: "2026-06-05", nda: true, archived: false },
  { id: "stroykapital", name: "StroyKapital acquisition", type: "Buy-side", stage: "NDA Signed", team: "Team A", owner: "A. Smirnov", created: "2026-04-10", lastActivity: "2026-06-01", nda: true, archived: false },
  { id: "technopark", name: "TechnoPark IPO prep", type: "Advisory", stage: "Due Diligence", team: "Team B", owner: "D. Kuznetsov", created: "2026-03-01", lastActivity: "2026-05-28", nda: true, archived: false },
  { id: "metallsbyt", name: "MetallSbyt restructuring", type: "Advisory", stage: "Due Diligence", team: "Team C", owner: "E. Orlova", created: "2026-02-15", lastActivity: "2026-05-20", nda: true, archived: false },
  { id: "digitaltrade", name: "DigitalTrade acquisition", type: "Buy-side", stage: "LOI / Term Sheet", team: "Team A", owner: "A. Smirnov", created: "2026-01-01", lastActivity: "2026-05-15", nda: true, archived: false },
  { id: "kapitalenergo", name: "KapitalEnergo merger", type: "Sell-side", stage: "Closing", team: "Team B", owner: "D. Kuznetsov", created: "2025-12-01", lastActivity: "2026-05-02", nda: true, archived: false },
]

export const seedActivities: Activity[] = [
  { id: "a1", dealId: "logistikpro", type: "Email In", subject: "Re: LogistikPro CIM v2 — financial model questions", meta: "Ivan Petrov (CFO) → M. Volkova", preview: "Good afternoon, we have a few clarifying questions on section 4 of the financial model...", at: "2026-06-03T14:22:00" },
  { id: "a2", dealId: "logistikpro", type: "Meeting", subject: "Call with LogistikPro management team", meta: "M. Volkova, I. Petrov, D. Kuznetsov · 60 min", preview: "Discussed Q1 2026 operating KPIs and the due diligence plan", at: "2026-06-01T11:00:00" },
  { id: "a3", dealId: "logistikpro", type: "NDA", subject: "NDA signed — LogistikPro", meta: "Legal → M. Volkova", preview: "Mutual NDA between our firm and LogistikPro signed by both parties", at: "2026-05-28T09:45:00" },
  { id: "a4", dealId: "logistikpro", type: "Email Out", subject: "Initial CIM request", meta: "M. Volkova → Ivan Petrov", preview: "Dear Ivan, we are interested in receiving the CIM...", at: "2026-05-25T16:10:00" },
  { id: "a5", dealId: "logistikpro", type: "Email In", subject: "Re: Introduction — LogistikPro deal", meta: "S. Novikov → M. Volkova", preview: "Maria, we're adding you to this mandate...", at: "2026-05-20T10:30:00" },
  { id: "a6", dealId: "logistikpro", type: "Note", subject: "Mandate letter drafted", meta: "M. Volkova", preview: "Fee structure: 1.5% success fee, retainer credited", at: "2026-05-18T17:05:00" },
  { id: "a7", dealId: "logistikpro", type: "Meeting", subject: "Kick-off with Sell-side team", meta: "M. Volkova, S. Novikov · 30 min", at: "2026-05-15T10:00:00" },
  { id: "a8", dealId: "logistikpro", type: "Email In", subject: "LogistikPro — teaser for review", meta: "S. Novikov → M. Volkova", preview: "Please review the one-page teaser before we go out to buyers", at: "2026-05-14T09:20:00" },
  { id: "b1", dealId: "technopark", type: "Email In", subject: "IPO prospectus draft v3", meta: "TechnoPark CFO → D. Kuznetsov", preview: "Attached is v3 with updated risk factors", at: "2026-05-28T12:10:00" },
  { id: "b2", dealId: "technopark", type: "NDA", subject: "NDA signed — TechnoPark", meta: "Legal → D. Kuznetsov", at: "2026-03-02T10:00:00" },
  { id: "c1", dealId: "rosmedia", type: "Note", subject: "First contact with RosMedia founders", meta: "M. Volkova", preview: "Interested in a strategic buyer; NDA to be sent", at: "2026-06-14T10:15:00" },
  { id: "d1", dealId: "digitaltrade", type: "Email Out", subject: "LOI draft sent", meta: "A. Smirnov → DigitalTrade board", at: "2026-05-15T18:00:00" },
  { id: "e1", dealId: "kapitalenergo", type: "Meeting", subject: "SPA negotiation round 2", meta: "D. Kuznetsov, KapitalEnergo legal · 90 min", at: "2026-05-02T15:00:00" },
]

export const seedEmployees: Employee[] = [
  { id: "novikov", initials: "SN", name: "Sergey Novikov", role: "Partner" },
  { id: "fedorova", initials: "OF", name: "Olga Fedorova", role: "Analyst" },
  { id: "volkova", initials: "MV", name: "Maria Volkova", role: "VP" },
  { id: "kuznetsov", initials: "DK", name: "Dmitry Kuznetsov", role: "Associate" },
  { id: "orlova", initials: "EO", name: "Elena Orlova", role: "Analyst" },
  { id: "belyaev", initials: "IB", name: "Igor Belyaev", role: "MD" },
  { id: "sokolova", initials: "AS", name: "Anna Sokolova", role: "Associate" },
  { id: "smirnov", initials: "AS", name: "Alexey Smirnov", role: "MD" },
]

export const seedZones: Zone[] = [
  { id: "zone-a", letter: "A", title: "LogistikPro deal", dealIds: ["logistikpro", "metallsbyt"], memberIds: ["volkova", "kuznetsov", "orlova"], activeSince: "2026-04-15", active: true },
  { id: "zone-b", letter: "B", title: "TechnoPark IPO", dealIds: ["technopark"], memberIds: ["belyaev", "sokolova"], activeSince: "2026-03-01", active: true },
  { id: "zone-c", letter: "C", title: "DigitalTrade", dealIds: ["digitaltrade"], memberIds: ["smirnov"], activeSince: "2026-01-01", active: true },
]

export const seedAudit: AuditEntry[] = [
  { id: "l1", at: "2026-06-14T14:22:00", user: "Maria Volkova (VP)", action: "File view", kind: "view", file: "CIM LogistikPro v2.pdf", level: "highly", deal: "LogistikPro sale", ip: "95.142.10.31", hash: "a3f9d…c12" },
  { id: "l2", at: "2026-06-14T13:47:00", user: "Dm. Kuznetsov", action: "BLOCKED", kind: "blocked", file: "CIM LogistikPro v2.pdf", level: "highly", deal: "LogistikPro sale", ip: "95.142.10.44", hash: "7bc2e…f08", tone: "destructive" },
  { id: "l3", at: "2026-06-14T11:05:00", user: "Dm. Kuznetsov", action: "Download", kind: "download", file: "Financial Model Q1.xlsx", level: "confidential", deal: "LogistikPro sale", ip: "95.142.10.44", hash: "2de1a…b74" },
  { id: "l4", at: "2026-06-13T17:30:00", user: "Igor Belyaev (MD)", action: "File view", kind: "view", file: "IPO Prospectus Draft v3.pdf", level: "highly", deal: "TechnoPark IPO", ip: "178.66.5.20", hash: "9fa4c…e33" },
  { id: "l5", at: "2026-06-13T16:10:00", user: "S. Novikov (Partner)", action: "DENIED (C.Wall)", kind: "denied", file: "IPO Prospectus Draft v3.pdf", level: "highly", deal: "TechnoPark IPO", ip: "95.142.10.11", hash: "4cd7f…a91", tone: "destructive" },
  { id: "l6", at: "2026-06-13T09:55:00", user: "Anna Sokolova", action: "File upload", kind: "upload", file: "Mgmt Presentation v1.pptx", level: "confidential", deal: "TechnoPark IPO", ip: "178.66.5.31", hash: "1fb8d…c55" },
  { id: "l7", at: "2026-06-12T15:22:00", user: "Maria Volkova (VP)", action: "File view", kind: "view", file: "NDA Signed LogistikPro.pdf", deal: "LogistikPro sale", ip: "95.142.10.31", hash: "8ea3b…d20" },
  { id: "l8", at: "2026-06-12T14:48:00", user: "A. Smirnov (MD)", action: "C.Wall Zone C created", kind: "system", file: "— system", deal: "DigitalTrade acquisition", ip: "95.142.10.10", hash: "3bc9a…f77" },
  { id: "l9", at: "2026-06-05T09:12:00", user: "Dm. Kuznetsov", action: "BLOCKED", kind: "blocked", file: "CIM LogistikPro v2.pdf", level: "highly", deal: "LogistikPro sale", ip: "95.142.10.44", hash: "c5d2e…b19", tone: "warning" },
]

export const seedDocuments: DealDocument[] = [
  { id: "doc-cim-lp", dealId: "logistikpro", name: "CIM LogistikPro v2.pdf", level: "highly", uploadedBy: "Maria Volkova", uploaded: "2026-06-02" },
  { id: "doc-fm-lp", dealId: "logistikpro", name: "Financial Model Q1 2026.xlsx", level: "confidential", uploadedBy: "Dmitry Kuznetsov", uploaded: "2026-05-25" },
  { id: "doc-nda-lp", dealId: "logistikpro", name: "NDA Signed LogistikPro.pdf", uploadedBy: "Legal", uploaded: "2026-05-28" },
  { id: "doc-prosp-tp", dealId: "technopark", name: "IPO Prospectus Draft v3.pdf", level: "highly", uploadedBy: "Igor Belyaev", uploaded: "2026-05-28" },
  { id: "doc-mgmt-tp", dealId: "technopark", name: "Mgmt Presentation v1.pptx", level: "confidential", uploadedBy: "Anna Sokolova", uploaded: "2026-06-13" },
  { id: "doc-teaser-rm", dealId: "rosmedia", name: "RosMedia Teaser.pdf", level: "confidential", uploadedBy: "Maria Volkova", uploaded: "2026-06-12" },
]

export const seedContacts: Contact[] = [
  { id: "c-petrov", dealId: "logistikpro", name: "Ivan Petrov", title: "CFO", company: "LogistikPro", nda: "none" },
  { id: "c-lp-legal", dealId: "logistikpro", name: "Olga Lebedeva", title: "General Counsel", company: "LogistikPro", nda: "signed" },
  { id: "c-tp-cfo", dealId: "technopark", name: "Pavel Orlov", title: "CFO", company: "TechnoPark", nda: "signed" },
  { id: "c-rm-ceo", dealId: "rosmedia", name: "Dmitry Sokolov", title: "CEO", company: "RosMedia", nda: "none" },
]

/** Records older than the visible seed (the log is 1,247 records long in the mockup). */
export const OLDER_RECORDS = 1247 - seedAudit.length
/** Blocked NDA sends that happened before the visible seed (mockup shows 3). */
export const OLDER_BLOCKED = 1
