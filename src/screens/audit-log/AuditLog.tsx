import * as React from "react"
import { toast } from "sonner"
import type { DateRange } from "react-day-picker"
import { ArrowDownIcon, CalendarIcon, SearchXIcon, ShieldCheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatsMetric } from "@/components/StatsMetric"
import { auditStats, fmtDate, fmtShortDateTime, isoDate, now, useStore, type AuditEntry, type AuditKind } from "@/data"
import { cn } from "@/lib/utils"
import { APPEAR, useNewItems } from "@/lib/motion"
import { AppShell, PageToolbar } from "../_shared/AppShell"
import { EmptyState } from "../_shared/EmptyState"
import { ActionCell, FileCell } from "./parts/LogCells"

const PAGE = 9
const COLUMNS = ["Time", "User", "Action", "File / Document", "Deal", "IP address", "Hash"]
const TONE = { destructive: "bg-background-destructive-light", warning: "bg-background-warning-light" } as const
const KINDS: Record<AuditKind, string> = { view: "File views", download: "Downloads", upload: "Uploads", share: "Shares", blocked: "Blocked (NDA)", denied: "Denied (C.Wall)", system: "System" }
const defaultRange = (): DateRange => ({ from: new Date("2026-06-01T00:00:00"), to: now() })

const toCsv = (rows: AuditEntry[]) =>
  [["Time", "User", "Action", "File", "Level", "Deal", "IP", "Hash"], ...rows.map((r) => [r.at, r.user, r.action, r.file, r.level ?? "", r.deal, r.ip, r.hash])]
    .map((cols) => cols.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n")

/** Screen/AuditLog (Figma 65:1411) — live: append-only log from the data layer, filters, export, integrity check. */
export default function AuditLog() {
  const { state, actions } = useStore()
  const stats = auditStats(state)
  const [range, setRange] = React.useState<DateRange | undefined>(defaultRange)
  const [user, setUser] = React.useState("all")
  const [kind, setKind] = React.useState("all")
  const [deal, setDeal] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const [busy, setBusy] = React.useState<"export" | "verify" | null>(null)
  const isNew = useNewItems(state.audit.map((a) => a.id), state.status === "ready")

  React.useEffect(() => setPage(1), [range, user, kind, deal])

  const users = [...new Set(state.audit.map((a) => a.user))]
  const deals = [...new Set(state.audit.map((a) => a.deal).filter((d) => d !== "—"))]
  const inRange = (a: AuditEntry) => {
    if (!range?.from) return true
    const day = a.at.slice(0, 10)
    return day >= isoDate(range.from) && day <= isoDate(range.to ?? range.from)
  }
  const filtered = state.audit.filter((a) => inRange(a) && (user === "all" || a.user === user) && (kind === "all" || a.kind === kind) && (deal === "all" || a.deal === deal))
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE))
  const current = Math.min(page, pages)
  const rows = filtered.slice((current - 1) * PAGE, current * PAGE)
  const filtersOn = user !== "all" || kind !== "all" || deal !== "all" || range?.from?.getTime() !== defaultRange().from?.getTime()
  const reset = () => { setRange(defaultRange()); setUser("all"); setKind("all"); setDeal("all") }

  const exportCsv = async () => {
    setBusy("export")
    const res = await actions.exportAudit(filtered.length)
    setBusy(null)
    if (!res.ok) return toast.error("Export failed")
    const url = URL.createObjectURL(new Blob([toCsv(filtered)], { type: "text/csv" }))
    const a = Object.assign(document.createElement("a"), { href: url, download: `audit-log-${isoDate(now())}.csv` })
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Export ready for the regulator", { description: `${res.value} records · audit-log-${isoDate(now())}.csv` })
  }
  const verify = async () => {
    setBusy("verify")
    const res = await actions.verifyIntegrity()
    setBusy(null)
    if (res.ok) toast.success("Integrity verified", { description: `Hash chain intact · ${res.value.toLocaleString("en-US")} records` })
  }

  return (
    <AppShell>
      <PageToolbar title="Audit Log" meta={<span className="ds-caption text-foreground-muted">append-only · immutable</span>}>
        <Button variant="outline" loading={busy === "export"} onClick={exportCsv}>Export for regulator <ArrowDownIcon /></Button>
        <Button variant="outline" loading={busy === "verify"} onClick={verify}><ShieldCheckIcon /> Verify integrity</Button>
      </PageToolbar>

      <div className="grid grid-cols-2 gap-(--spacing-lg) border-b border-border-default px-(--padding-lg) py-(--padding-xs) xl:grid-cols-4">
        <StatsMetric value={stats.total.toLocaleString("en-US")} label="Total records" />
        <StatsMetric value={stats.last ? fmtDate(stats.last) : "—"} label="Last record" />
        <StatsMetric value={stats.violations} label="Chinese Wall violations" />
        <StatsMetric value={stats.blockedNda} label="Blocked NDA sends" variant="highlighted" />
      </div>

      <div className="flex flex-wrap items-center gap-(--spacing-sm) border-b border-border-default px-(--padding-lg) py-(--padding-xxs)">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-80 justify-start font-normal" aria-label="Date range">
              <CalendarIcon />
              {range?.from ? `${fmtDate(isoDate(range.from)).replace(/, \d{4}$/, "")} — ${fmtDate(isoDate(range.to ?? range.from))}` : "All dates"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="range" selected={range} onSelect={setRange} defaultMonth={range?.from} numberOfMonths={2} />
          </PopoverContent>
        </Popover>
        <Select value={user} onValueChange={setUser}>
          <SelectTrigger className="w-45" aria-label="User"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All users</SelectItem>{users.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={kind} onValueChange={setKind}>
          <SelectTrigger className="w-45" aria-label="Type"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All types</SelectItem>{Object.entries(KINDS).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={deal} onValueChange={setDeal}>
          <SelectTrigger className="w-45" aria-label="Deal"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All deals</SelectItem>{deals.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
        </Select>
        <Button variant="ghost" className="ml-auto" disabled={!filtersOn} onClick={reset}>Reset</Button>
      </div>

      <section className="flex flex-col gap-(--spacing-lg) px-(--padding-lg) pt-(--padding-sm) pb-(--padding-lg)">
        {state.status === "loading" ? (
          <div className="flex flex-col gap-(--spacing-sm)">{Array.from({ length: 7 }, (_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={SearchXIcon} title="No records match the filters" description="Change the period, user, type or deal." action={<Button variant="outline" onClick={reset}>Reset filters</Button>} />
        ) : (
          <>
            <div className="overflow-x-auto rounded-md border border-border-default animate-in fade-in-0 duration-200">
              <Table>
                <TableHeader className="bg-background-muted">
                  <TableRow>{COLUMNS.map((c) => <TableHead key={c}>{c}</TableHead>)}</TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.id} className={cn(isNew(r.id) && APPEAR, r.tone && TONE[r.tone])}>
                      <TableCell>{fmtShortDateTime(r.at)}</TableCell>
                      <TableCell>{r.user}</TableCell>
                      <TableCell><ActionCell entry={r} /></TableCell>
                      <TableCell><FileCell file={r.file} level={r.level} /></TableCell>
                      <TableCell>{r.deal}</TableCell>
                      <TableCell>{r.ip}</TableCell>
                      <TableCell>{r.hash}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-(--spacing-md)">
              <Pagination className="mx-0 w-auto justify-start">
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" aria-disabled={current === 1} className={current === 1 ? "pointer-events-none opacity-50" : undefined} onClick={(e) => { e.preventDefault(); setPage(current - 1) }} /></PaginationItem>
                  {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                    <PaginationItem key={n}><PaginationLink href="#" isActive={n === current} onClick={(e) => { e.preventDefault(); setPage(n) }}>{n}</PaginationLink></PaginationItem>
                  ))}
                  <PaginationItem><PaginationNext href="#" aria-disabled={current === pages} className={current === pages ? "pointer-events-none opacity-50" : undefined} onClick={(e) => { e.preventDefault(); setPage(current + 1) }} /></PaginationItem>
                </PaginationContent>
              </Pagination>
              <span className="ds-caption text-foreground-muted">Showing {rows.length} of {filtered.length.toLocaleString("en-US")} records</span>
            </div>
          </>
        )}
      </section>
    </AppShell>
  )
}
