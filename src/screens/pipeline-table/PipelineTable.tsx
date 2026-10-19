import * as React from "react"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { ArchiveIcon, ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, CheckIcon, ClipboardPasteIcon, InboxIcon, PlusIcon, RotateCcwIcon, SearchXIcon } from "lucide-react"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StageBadge } from "@/components/StageBadge"
import { STAGES } from "@/components/tones"
import { fmtDate, pluralize, useStore, type Deal } from "@/data"
import { AppShell, PageToolbar } from "../_shared/AppShell"
import { DealFormDialog } from "../_shared/DealFormDialog"
import { EmptyState } from "../_shared/EmptyState"
import { FilterSelect, VIEW_TITLE, usePipelineFilters } from "../_shared/pipelineFilters"
import { SAMPLE_TSV, SmartPasteDialog } from "./parts/SmartPasteDialog"

const PAGE_SIZE = 10
type SortKey = "name" | "type" | "stage" | "team" | "owner" | "created" | "lastActivity" | "nda"
const COLUMNS: [SortKey, string][] = [["name", "Deal name"], ["type", "Type"], ["stage", "Stage"], ["team", "Team"], ["owner", "Owner"], ["created", "Created"], ["lastActivity", "Last activity"], ["nda", "NDA"]]
const sortValue = (d: Deal, k: SortKey) => (k === "stage" ? STAGES.indexOf(d.stage) : k === "nda" ? Number(d.nda) : d[k])

/** Screen/PipelineTable (Figma 63:970) — live: filters, sort, selection + bulk archive, pagination, Smart Paste. */
export default function PipelineTable() {
  const { state, actions } = useStore()
  const navigate = useNavigate()
  const pf = usePipelineFilters()
  const closed = pf.filters.view === "closed"
  const [sort, setSort] = React.useState<{ key: SortKey; dir: 1 | -1 }>({ key: "lastActivity", dir: -1 })
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [page, setPage] = React.useState(1)
  const [formOpen, setFormOpen] = React.useState(false)
  const [paste, setPaste] = React.useState<string | null>(null)
  const [busy, setBusy] = React.useState(false)

  React.useEffect(() => { setPage(1); setSelected(new Set()) }, [pf.query])

  // Smart Paste: Ctrl+V anywhere on the screen (except inside text fields)
  React.useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const el = e.target as HTMLElement
      if (el.closest("input, textarea, [contenteditable=true]")) return
      const text = e.clipboardData?.getData("text") ?? ""
      if (!text.includes("\t") && !text.includes("\n")) return void toast.error("Nothing to import", { description: "Copy rows from Excel (Deal name · Type · Team · Owner) and press Ctrl+V" })
      setPaste(text)
    }
    window.addEventListener("paste", onPaste)
    return () => window.removeEventListener("paste", onPaste)
  }, [])

  const sorted = [...pf.deals].sort((a, b) => {
    const x = sortValue(a, sort.key), y = sortValue(b, sort.key)
    return (x < y ? -1 : x > y ? 1 : 0) * sort.dir
  })
  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const rows = sorted.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const allOnPage = rows.length > 0 && rows.every((r) => selected.has(r.id))

  const toggle = (id: string) => setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  const toggleAll = () => setSelected((s) => { const n = new Set(s); rows.forEach((r) => (allOnPage ? n.delete(r.id) : n.add(r.id))); return n })

  const bulk = async () => {
    const ids = [...selected]
    setBusy(true)
    if (closed) { actions.restoreDeals(ids); toast.success(`${pluralize(ids.length, "deal")} restored`) }
    else {
      await actions.archiveDeals(ids)
      toast.success(`${pluralize(ids.length, "deal")} archived`, { action: { label: "Undo", onClick: () => actions.restoreDeals(ids) } })
    }
    setBusy(false)
    setSelected(new Set())
  }

  const SortIcon = ({ k }: { k: SortKey }) => sort.key !== k ? <ArrowUpDownIcon className="size-3" /> : sort.dir === 1 ? <ArrowUpIcon className="size-3" /> : <ArrowDownIcon className="size-3" />

  return (
    <AppShell>
      <PageToolbar title={VIEW_TITLE[pf.filters.view]}>
        <Tabs value="table">
          <TabsList>
            <TabsTrigger value="kanban" asChild><Link to={`/pipeline?${pf.query}`}>Kanban</Link></TabsTrigger>
            <TabsTrigger value="table" asChild><Link to={`/pipeline/table?${pf.query}`}>Table</Link></TabsTrigger>
          </TabsList>
        </Tabs>
        <FilterSelect name="stage" {...pf} />
        <FilterSelect name="team" {...pf} />
        <FilterSelect name="type" {...pf} />
        <Button onClick={() => setFormOpen(true)}><PlusIcon /> New deal</Button>
      </PageToolbar>

      <section className="flex flex-col gap-(--spacing-lg) px-(--padding-lg) pt-(--padding-sm) pb-(--padding-lg)">
        <Alert variant="warning">
          <ClipboardPasteIcon />
          <AlertTitle>Smart Paste</AlertTitle>
          <AlertDescription>Press Ctrl+V to paste a long list from Excel — columns are detected automatically</AlertDescription>
          <AlertAction><Button size="sm" variant="outline" onClick={() => setPaste(SAMPLE_TSV)}>Try a sample</Button></AlertAction>
        </Alert>

        {selected.size > 0 && (
          <div className="flex items-center gap-(--spacing-md) rounded-md bg-background-muted px-(--padding-sm) py-(--padding-xxs)">
            <span className="ds-small">{pluralize(selected.size, "deal")} selected</span>
            <Button size="sm" variant={closed ? "outline" : "destructive"} loading={busy} onClick={bulk}>
              {closed ? <><RotateCcwIcon /> Restore</> : <><ArchiveIcon /> Archive</>}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}>Clear selection</Button>
          </div>
        )}

        {state.status === "loading" ? (
          <div className="flex flex-col gap-(--spacing-sm)">{Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
        ) : sorted.length === 0 ? (
          pf.active
            ? <EmptyState icon={SearchXIcon} title="Nothing found" description="No deals match the current filters or search." action={<Button variant="outline" onClick={pf.reset}>Reset filters</Button>} />
            : <EmptyState icon={InboxIcon} title={closed ? "No closed deals" : "No deals yet"} description={closed ? "Archived deals appear here." : "Create a deal or paste a list from Excel."}
                action={!closed && <Button onClick={() => setFormOpen(true)}><PlusIcon /> New deal</Button>} />
        ) : (
          <>
            <div className="overflow-x-auto rounded-md border border-border-default">
              <Table>
                <TableHeader className="bg-background-muted">
                  <TableRow>
                    <TableHead className="w-10"><Checkbox aria-label="Select all on page" checked={allOnPage} onCheckedChange={toggleAll} /></TableHead>
                    {COLUMNS.map(([k, label]) => (
                      <TableHead key={k} aria-sort={sort.key === k ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
                        <button type="button" className="inline-flex items-center gap-(--spacing-xs) rounded-xs transition-colors hover:text-foreground-default"
                          onClick={() => setSort((s) => ({ key: k, dir: s.key === k ? (s.dir === 1 ? -1 : 1) : 1 }))}>
                          {label}<SortIcon k={k} />
                        </button>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((d) => (
                    <TableRow key={d.id} data-state={selected.has(d.id) ? "selected" : undefined} className="cursor-pointer" onClick={() => navigate(`/deals/${d.id}`)}>
                      <TableCell onClick={(e) => e.stopPropagation()}><Checkbox aria-label={`Select ${d.name}`} checked={selected.has(d.id)} onCheckedChange={() => toggle(d.id)} /></TableCell>
                      <TableCell>{d.name}</TableCell>
                      <TableCell>{d.type}</TableCell>
                      <TableCell><StageBadge stage={d.stage} /></TableCell>
                      <TableCell>{d.team}</TableCell>
                      <TableCell>{d.owner}</TableCell>
                      <TableCell>{fmtDate(d.created)}</TableCell>
                      <TableCell>{fmtDate(d.lastActivity)}</TableCell>
                      <TableCell>
                        {d.nda
                          ? <Badge variant="secondary" className="bg-background-success-light text-foreground-success-default"><CheckIcon /> Signed</Badge>
                          : <span className="text-foreground-muted">—</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow><TableCell colSpan={9}>{pluralize(sorted.length, "deal")}</TableCell></TableRow>
                </TableFooter>
              </Table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-(--spacing-md)">
              <Pagination className="mx-0 w-auto justify-start">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" aria-disabled={current === 1} className={current === 1 ? "pointer-events-none opacity-50" : undefined}
                      onClick={(e) => { e.preventDefault(); setPage(current - 1) }} />
                  </PaginationItem>
                  {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                    <PaginationItem key={n}><PaginationLink href="#" isActive={n === current} onClick={(e) => { e.preventDefault(); setPage(n) }}>{n}</PaginationLink></PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext href="#" aria-disabled={current === pages} className={current === pages ? "pointer-events-none opacity-50" : undefined}
                      onClick={(e) => { e.preventDefault(); setPage(current + 1) }} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <span className="ds-caption text-foreground-muted">Showing {rows.length} of {pluralize(sorted.length, "deal")}</span>
            </div>
          </>
        )}
      </section>

      <DealFormDialog open={formOpen} onOpenChange={setFormOpen} />
      <SmartPasteDialog text={paste} onClose={() => setPaste(null)} />
    </AppShell>
  )
}
