import * as React from "react"
import { CURRENT_USER, OLDER_BLOCKED, OLDER_RECORDS, seedActivities, seedAudit, seedContacts, seedDeals, seedDocuments, seedEmployees, seedZones } from "./seed"
import { delay, isoDate, isoDateTime, now, randomHash, slugify } from "./format"
import { canMoveToStage, hasErrors, validateDeal, validateZone } from "./validation"
import type { Activity, AuditEntry, Contact, Deal, DealDocument, DealInput, Employee, Result, Stage, Zone } from "./types"

/*
 * Single mock data layer for every screen. In-memory only — no backend.
 * Actions simulate network latency so screens can show loading states.
 */

type State = {
  status: "loading" | "ready"
  deals: Deal[]
  activities: Activity[]
  employees: Employee[]
  zones: Zone[]
  audit: AuditEntry[]
  syncAttempts: number
  lastZoneChange: { by: string; at: string }
  documents: DealDocument[]
  contacts: Contact[]
  /** "View as" another employee (null = Alexey Smirnov, MD: full access, manages the walls) */
  viewAs: string | null
  /** access requests sent by the acting user: "<employeeId>:<dealId>" */
  accessRequests: string[]
}

const STORAGE_KEY = "mmcrm-mock-v1"
const seedState: State = {
  status: "loading",
  deals: seedDeals,
  activities: seedActivities,
  employees: seedEmployees,
  zones: seedZones,
  audit: seedAudit,
  syncAttempts: 0,
  lastZoneChange: { by: CURRENT_USER.short, at: "2026-06-01" },
  documents: seedDocuments,
  contacts: seedContacts,
  viewAs: null,
  accessRequests: [],
}

/** Mock persistence: survives a page refresh; "Reset demo data" clears it. */
function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...seedState, ...JSON.parse(raw), status: "loading" }
  } catch { /* storage unavailable — start from seed */ }
  return seedState
}

type Patch = Partial<State> | ((s: State) => Partial<State>)
const reducer = (s: State, patch: Patch): State => ({ ...s, ...(typeof patch === "function" ? patch(s) : patch) })

const LATENCY = 500
const ok = <T,>(value: T): Result<T> => ({ ok: true, value })
const fail = (error: string): Result<never> => ({ ok: false, error })
const uid = (p: string) => `${p}-${Math.random().toString(36).slice(2, 9)}`

function useStoreValue() {
  const [state, set] = React.useReducer(reducer, undefined, loadState)
  const ref = React.useRef(state)
  ref.current = state

  React.useEffect(() => {
    const t = setTimeout(() => set({ status: "ready" }), 700)
    return () => clearTimeout(t)
  }, [])
  React.useEffect(() => {
    if (state.status !== "ready") return
    try { const { status: _s, ...rest } = state; localStorage.setItem(STORAGE_KEY, JSON.stringify(rest)) } catch { /* ignore quota / private mode */ }
  }, [state])

  const actions = React.useMemo(() => {
    /** audit records are written on behalf of the acting user ("View as") */
    const actor = () => {
      const s = ref.current
      const i = s.viewAs ? s.employees.findIndex((e) => e.id === s.viewAs) : -1
      return i < 0
        ? { label: `${CURRENT_USER.short} (${CURRENT_USER.role})`, ip: CURRENT_USER.ip }
        : { label: `${s.employees[i].name} (${s.employees[i].role})`, ip: `95.142.10.${20 + i}` }
    }
    const audit = (e: Omit<AuditEntry, "id" | "at" | "user" | "ip" | "hash">) => {
      const a = actor()
      set((s) => ({ audit: [{ id: uid("log"), at: isoDateTime(now()), user: a.label, ip: a.ip, hash: randomHash(), ...e }, ...s.audit] }))
    }
    const activity = (a: Omit<Activity, "id" | "at">) =>
      set((s) => ({ activities: [{ id: uid("act"), at: isoDateTime(now()), ...a }, ...s.activities] }))
    const touch = (id: string, patch: Partial<Deal> = {}) =>
      set((s) => ({ deals: s.deals.map((d) => (d.id === id ? { ...d, lastActivity: isoDate(now()), ...patch } : d)) }))
    const dealById = (id: string) => ref.current.deals.find((d) => d.id === id)
    const zoneOf = (empId: string, exceptZoneId?: string) =>
      ref.current.zones.find((z) => z.active && z.id !== exceptZoneId && z.memberIds.includes(empId))
    const markZoneChange = () => set({ lastZoneChange: { by: CURRENT_USER.short, at: isoDate(now()) } })

    return {
      /** Restore the original mock dataset (clears persisted changes). */
      resetDemoData() {
        try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
        set({ ...seedState, status: "ready" })
      },

      /* ── Deals ─────────────────────────────────────────────── */
      async createDeal(input: DealInput): Promise<Result<Deal>> {
        if (hasErrors(validateDeal(input, ref.current.deals))) return fail("Invalid deal")
        await delay(LATENCY)
        let id = slugify(input.name)
        while (dealById(id)) id = `${id}-2`
        const today = isoDate(now())
        const deal: Deal = { ...input, name: input.name.trim(), id, created: today, lastActivity: today, archived: false }
        set((s) => ({ deals: [deal, ...s.deals] }))
        activity({ dealId: id, type: "Note", subject: "Deal created", meta: CURRENT_USER.short })
        audit({ action: "Deal created", kind: "system", file: "— system", deal: deal.name })
        return ok(deal)
      },
      async updateDeal(id: string, input: DealInput): Promise<Result<Deal>> {
        if (hasErrors(validateDeal(input, ref.current.deals, id))) return fail("Invalid deal")
        await delay(LATENCY)
        touch(id, { ...input, name: input.name.trim() })
        activity({ dealId: id, type: "Note", subject: "Deal details updated", meta: CURRENT_USER.short })
        return ok(dealById(id)!)
      },
      /** Kanban drag-and-drop. NDA rule: no NDA → cannot leave Prospecting. */
      moveDeal(id: string, stage: Stage): Result<Deal> {
        const deal = dealById(id)
        if (!deal) return fail("Deal not found")
        if (deal.stage === stage) return ok(deal)
        const blocked = canMoveToStage(deal, stage)
        if (blocked) return fail(blocked)
        touch(id, { stage })
        activity({ dealId: id, type: "Note", subject: `Stage changed: ${deal.stage} → ${stage}`, meta: CURRENT_USER.short })
        return ok({ ...deal, stage })
      },
      async archiveDeals(ids: string[]): Promise<Result<number>> {
        await delay(LATENCY)
        set((s) => ({ deals: s.deals.map((d) => (ids.includes(d.id) ? { ...d, archived: true } : d)) }))
        return ok(ids.length)
      },
      restoreDeals(ids: string[]) {
        set((s) => ({ deals: s.deals.map((d) => (ids.includes(d.id) ? { ...d, archived: false } : d)) }))
      },
      /** Smart Paste import: rows are pre-validated by the preview; added in one update. */
      async importDeals(rows: DealInput[]): Promise<Result<number>> {
        await delay(LATENCY * 2)
        const today = isoDate(now())
        const ids = new Set(ref.current.deals.map((d) => d.id))
        const created: Deal[] = rows.map((r) => {
          let id = slugify(r.name)
          while (ids.has(id)) id = `${id}-2`
          ids.add(id)
          return { ...r, name: r.name.trim(), id, created: today, lastActivity: today, archived: false }
        })
        set((s) => ({ deals: [...created, ...s.deals] }))
        audit({ action: `Smart Paste import (${created.length})`, kind: "system", file: "— clipboard", deal: "—" })
        return ok(created.length)
      },

      /* ── NDA hard-block ────────────────────────────────────── */
      /** Share deal materials. Without NDA → blocked + audit record (NDA Hard-block). */
      async shareDeal(id: string): Promise<Result<"shared"> | { ok: false; error: "nda" }> {
        const deal = dealById(id)!
        await delay(LATENCY)
        if (!deal.nda) {
          audit({ action: "BLOCKED", kind: "blocked", file: "Deal materials (share link)", level: "highly", deal: deal.name, tone: "destructive" })
          return { ok: false, error: "nda" }
        }
        audit({ action: "Share link created", kind: "share", file: "Deal materials (share link)", level: "confidential", deal: deal.name })
        touch(id)
        return ok("shared")
      },
      async requestNda(id: string): Promise<Result> {
        const deal = dealById(id)!
        await delay(LATENCY)
        activity({ dealId: id, type: "Email Out", subject: `NDA sent for signature — ${deal.name}`, meta: `${CURRENT_USER.short} → Counterparty legal` })
        touch(id)
        return ok(undefined)
      },
      async markNdaSigned(id: string): Promise<Result> {
        const deal = dealById(id)!
        await delay(LATENCY)
        touch(id, { nda: true })
        activity({ dealId: id, type: "NDA", subject: `NDA signed — ${deal.name}`, meta: `Legal → ${deal.owner}`, preview: "Mutual NDA signed by both parties" })
        audit({ action: "NDA signed", kind: "system", file: `NDA Signed ${deal.name}.pdf`, deal: deal.name })
        return ok(undefined)
      },

      /* ── Outlook sync (edge-case: every 2nd attempt fails) ─── */
      async syncOutlook(dealId: string): Promise<Result<number>> {
        const attempt = ref.current.syncAttempts + 1
        set({ syncAttempts: attempt })
        await delay(LATENCY * 2)
        if (attempt % 2 === 0) return fail("Outlook did not respond (timeout). Check the connection and retry.")
        const deal = dealById(dealId)!
        activity({ dealId, type: "Email In", subject: `Re: ${deal.name} — follow-up`, meta: `Counterparty → ${deal.owner}`, preview: "Thanks for the materials, we will come back with comments this week." })
        touch(dealId)
        return ok(1)
      },

      /* ── Chinese Walls ─────────────────────────────────────── */
      async createZone(input: { title: string; dealIds: string[] }): Promise<Result<Zone>> {
        if (hasErrors(validateZone(input, ref.current.zones))) return fail("Invalid zone")
        await delay(LATENCY)
        const used = ref.current.zones.map((z) => z.letter)
        const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").find((l) => !used.includes(l)) ?? String(used.length + 1)
        const zone: Zone = { id: uid("zone"), letter, title: input.title.trim(), dealIds: input.dealIds, memberIds: [], activeSince: isoDate(now()), active: true }
        set((s) => ({ zones: [...s.zones, zone] }))
        markZoneChange()
        audit({ action: `C.Wall Zone ${letter} created`, kind: "system", file: "— system", deal: dealById(input.dealIds[0])?.name ?? "—" })
        return ok(zone)
      },
      async updateZone(id: string, input: { title: string; dealIds: string[] }): Promise<Result> {
        if (hasErrors(validateZone(input, ref.current.zones, id))) return fail("Invalid zone")
        await delay(LATENCY)
        set((s) => ({ zones: s.zones.map((z) => (z.id === id ? { ...z, title: input.title.trim(), dealIds: input.dealIds } : z)) }))
        markZoneChange()
        return ok(undefined)
      },
      /** Edge-case: an employee already isolated in another active zone → DENIED + audit. */
      addMember(zoneId: string, empId: string): Result {
        const zone = ref.current.zones.find((z) => z.id === zoneId)!
        const emp = ref.current.employees.find((e) => e.id === empId)!
        if (!zone.active) return fail("Zone is inactive — activate it first")
        if (zone.memberIds.includes(empId)) return fail(`${emp.name} is already in Zone ${zone.letter}`)
        const other = zoneOf(empId, zoneId)
        if (other) {
          audit({ action: "DENIED (C.Wall)", kind: "denied", file: `Zone ${zone.letter} membership`, deal: dealById(zone.dealIds[0])?.name ?? "—", tone: "destructive" })
          return fail(`Conflict of interest: ${emp.name} is already isolated in Zone ${other.letter}`)
        }
        set((s) => ({ zones: s.zones.map((z) => (z.id === zoneId ? { ...z, memberIds: [...z.memberIds, empId] } : z)) }))
        markZoneChange()
        return ok(undefined)
      },
      removeMember(zoneId: string, empId: string) {
        set((s) => ({ zones: s.zones.map((z) => (z.id === zoneId ? { ...z, memberIds: z.memberIds.filter((m) => m !== empId) } : z)) }))
        markZoneChange()
      },
      async setZoneActive(zoneId: string, active: boolean): Promise<Result> {
        await delay(LATENCY)
        const zone = ref.current.zones.find((z) => z.id === zoneId)!
        set((s) => ({ zones: s.zones.map((z) => (z.id === zoneId ? { ...z, active, memberIds: active ? z.memberIds : [], activeSince: active ? isoDate(now()) : z.activeSince } : z)) }))
        markZoneChange()
        audit({ action: `C.Wall Zone ${zone.letter} ${active ? "activated" : "deactivated"}`, kind: "system", file: "— system", deal: dealById(zone.dealIds[0])?.name ?? "—" })
        return ok(undefined)
      },

      /* ── Documents & per-recipient NDA (NDABlockModal) ─────── */
      /** Send a file to a counterparty. Confidential file + recipient without a signed NDA → blocked + audit. */
      async sendDocument(docId: string, contactId: string): Promise<Result<"sent"> | { ok: false; error: "nda" }> {
        const doc = ref.current.documents.find((d) => d.id === docId)!
        const contact = ref.current.contacts.find((c) => c.id === contactId)!
        const deal = dealById(doc.dealId)!
        await delay(LATENCY)
        if (doc.level && contact.nda !== "signed") {
          audit({ action: "BLOCKED", kind: "blocked", file: doc.name, level: doc.level, deal: deal.name, tone: "destructive" })
          return { ok: false, error: "nda" }
        }
        audit({ action: `File sent to ${contact.name}`, kind: "share", file: doc.name, level: doc.level, deal: deal.name })
        activity({ dealId: deal.id, type: "Email Out", subject: `${doc.name} sent to ${contact.name}`, meta: `${actor().label} → ${contact.name} (${contact.title})` })
        touch(deal.id)
        return ok("sent")
      },
      downloadDocument(docId: string) {
        const doc = ref.current.documents.find((d) => d.id === docId)!
        audit({ action: "Download", kind: "download", file: doc.name, level: doc.level, deal: dealById(doc.dealId)!.name })
      },
      /** "Initiate NDA" from the block modal: the NDA goes to the recipient for signature. */
      async requestContactNda(contactId: string): Promise<Result> {
        const c = ref.current.contacts.find((x) => x.id === contactId)!
        await delay(LATENCY)
        set((s) => ({ contacts: s.contacts.map((x) => (x.id === contactId ? { ...x, nda: "pending" as const } : x)) }))
        activity({ dealId: c.dealId, type: "Email Out", subject: `NDA sent for signature — ${c.name}`, meta: `${actor().label} → ${c.name} (${c.title}, ${c.company})` })
        return ok(undefined)
      },
      /** Counterparty signed (mock of the signature coming back). */
      async markContactNdaSigned(contactId: string): Promise<Result> {
        const c = ref.current.contacts.find((x) => x.id === contactId)!
        await delay(LATENCY)
        set((s) => ({ contacts: s.contacts.map((x) => (x.id === contactId ? { ...x, nda: "signed" as const } : x)) }))
        activity({ dealId: c.dealId, type: "NDA", subject: `NDA signed — ${c.name} (${c.company})`, meta: `Legal → ${dealById(c.dealId)!.owner}` })
        return ok(undefined)
      },

      /* ── Chinese Wall access ("View as") ───────────────────── */
      setViewAs(empId: string | null) { set({ viewAs: empId }) },
      /** Called once when a walled deal is opened by a non-member → DENIED in the Audit Log. */
      logDeniedAccess(dealId: string) {
        audit({ action: "DENIED (C.Wall)", kind: "denied", file: "Deal workspace", deal: dealById(dealId)?.name ?? "—", tone: "destructive" })
      },
      async requestAccess(dealId: string): Promise<Result<string>> {
        await delay(LATENCY)
        const key = `${ref.current.viewAs}:${dealId}`
        set((s) => ({ accessRequests: [...s.accessRequests, key] }))
        audit({ action: "Access requested (C.Wall)", kind: "system", file: "Deal workspace", deal: dealById(dealId)?.name ?? "—" })
        return ok(zoneOwner(ref.current, dealId)?.name ?? "the zone owner")
      },

      /* ── Audit log ─────────────────────────────────────────── */
      async exportAudit(count: number): Promise<Result<number>> {
        await delay(LATENCY * 2)
        audit({ action: "Audit export (regulator)", kind: "system", file: "audit-log.csv", deal: "—" })
        return ok(count)
      },
      async verifyIntegrity(): Promise<Result<number>> {
        await delay(LATENCY * 3)
        return ok(OLDER_RECORDS + ref.current.audit.length)
      },
    }
  }, [])

  return { state, actions }
}

type StoreValue = ReturnType<typeof useStoreValue>
const StoreContext = React.createContext<StoreValue | null>(null)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const value = useStoreValue()
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const v = React.useContext(StoreContext)
  if (!v) throw new Error("useStore must be used inside <DataProvider>")
  return v
}

/* Derived selectors */
export const auditStats = (s: State) => {
  const blocked = s.audit.filter((a) => a.kind === "blocked").length
  return {
    total: OLDER_RECORDS + s.audit.length,
    last: s.audit[0]?.at,
    violations: 0, // denials prevent violations; a violation would be access that slipped through
    blockedNda: OLDER_BLOCKED + blocked,
  }
}
export const activeDeals = (s: State) => s.deals.filter((d) => !d.archived)

/** Acting employee in "View as" mode (null = Alexey Smirnov with full access). */
export const actingEmployee = (s: State) => (s.viewAs ? s.employees.find((e) => e.id === s.viewAs) ?? null : null)
/** Active zones that wall off this deal. */
export const zonesOfDeal = (s: State, dealId: string) => s.zones.filter((z) => z.active && z.dealIds.includes(dealId))
/** Chinese Wall rule: a walled deal is visible only to members of its zone (Alexey, MD, manages the walls and sees all). */
export const canAccessDeal = (s: State, dealId: string) => {
  if (!s.viewAs) return true
  const zones = zonesOfDeal(s, dealId)
  return zones.length === 0 || zones.some((z) => z.memberIds.includes(s.viewAs!))
}
const RANK = { Partner: 0, MD: 1, VP: 2, Associate: 3, Analyst: 4 } as const
/** Most senior member of the first zone that walls the deal. */
export const zoneOwner = (s: State, dealId: string) => {
  const z = zonesOfDeal(s, dealId)[0]
  return z ? s.employees.filter((e) => z.memberIds.includes(e.id)).sort((a, b) => RANK[a.role] - RANK[b.role])[0] : undefined
}
