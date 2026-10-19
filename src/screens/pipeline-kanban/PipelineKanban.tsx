import * as React from "react"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { PlusIcon, SearchXIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KanbanCard } from "@/components/KanbanCard"
import { KanbanColumn } from "@/components/KanbanColumn"
import { STAGES, type Stage } from "@/components/tones"
import { cn } from "@/lib/utils"
import { APPEAR, useNewItems, vtName, withViewTransition } from "@/lib/motion"
import { canMoveToStage, fmtDate, pluralize, useStore } from "@/data"
import { AppShell, PageToolbar } from "../_shared/AppShell"
import { DealFormDialog } from "../_shared/DealFormDialog"
import { EmptyState } from "../_shared/EmptyState"
import { FilterSelect, VIEW_TITLE, usePipelineFilters } from "../_shared/pipelineFilters"

/** Screen/PipelineKanban (Figma 63:552) — live: data layer, filters in URL, drag-and-drop with the NDA rule. */
export default function PipelineKanban() {
  const { state, actions } = useStore()
  const navigate = useNavigate()
  const pf = usePipelineFilters()
  const [form, setForm] = React.useState<{ open: boolean; stage?: Stage }>({ open: false })
  const [dragId, setDragId] = React.useState<string | null>(null)
  const [overStage, setOverStage] = React.useState<Stage | null>(null)
  const closed = pf.filters.view === "closed"
  const isNew = useNewItems(state.deals.map((d) => d.id), state.status === "ready")

  const drop = (stage: Stage, id: string | null) => {
    setOverStage(null)
    if (!id) return
    setDragId(null)
    const deal = state.deals.find((d) => d.id === id)
    if (!deal || deal.stage === stage) return
    const blocked = canMoveToStage(deal, stage)
    if (blocked) return void toast.error("Can’t move the deal", { description: blocked })
    withViewTransition(() => actions.moveDeal(id, stage))
    toast.success(`${deal.name} → ${stage}`)
  }

  return (
    <AppShell>
      <PageToolbar title={VIEW_TITLE[pf.filters.view]}>
        <Tabs value="kanban">
          <TabsList>
            <TabsTrigger value="kanban" asChild><Link to={`/pipeline?${pf.query}`}>Kanban</Link></TabsTrigger>
            <TabsTrigger value="table" asChild><Link to={`/pipeline/table?${pf.query}`}>Table</Link></TabsTrigger>
          </TabsList>
        </Tabs>
        <FilterSelect name="owner" {...pf} />
        <FilterSelect name="stage" {...pf} />
        <Button onClick={() => setForm({ open: true })}><PlusIcon /> New deal</Button>
      </PageToolbar>

      {pf.active && state.status === "ready" && (
        <div className="ds-caption flex items-center gap-(--spacing-sm) border-b border-border-default bg-background-muted px-(--padding-lg) py-(--padding-xxs) text-foreground-muted">
          {pluralize(pf.deals.length, "deal")} match{pf.deals.length === 1 ? "es" : ""}{pf.filters.q && <> “{pf.filters.q}”</>}
          <Button variant="link" size="sm" className="h-auto px-0" onClick={pf.reset}>Reset filters</Button>
        </div>
      )}

      {state.status === "loading" ? (
        <div className="flex flex-1 gap-(--spacing-lg) p-(--padding-lg)">
          {STAGES.map((s) => <Skeleton key={s} className="h-72 w-54 shrink-0 rounded-md" />)}
        </div>
      ) : pf.deals.length === 0 && pf.active ? (
        <div className="p-(--padding-lg)">
          <EmptyState icon={SearchXIcon} title="Nothing found" description="No deals match the current filters or search." action={<Button variant="outline" onClick={pf.reset}>Reset filters</Button>} />
        </div>
      ) : (
        <div className="flex flex-1 items-stretch gap-(--spacing-lg) overflow-x-auto bg-background-default p-(--padding-lg) animate-in fade-in-0 duration-200">
          {STAGES.map((stage) => {
            const list = pf.deals.filter((d) => d.stage === stage)
            return (
              <KanbanColumn
                key={stage}
                stage={stage}
                count={list.length}
                onAdd={closed ? undefined : () => setForm({ open: true, stage })}
                className={cn("shrink-0 transition-shadow", overStage === stage && "ring-2 ring-border-primary-default", closed && "[&>button:last-child]:hidden")}
                onDragOver={(e) => { if (e.dataTransfer.types.includes("text/deal")) { e.preventDefault(); setOverStage(stage) } }}
                onDragLeave={() => setOverStage((s) => (s === stage ? null : s))}
                onDrop={(e) => { e.preventDefault(); drop(stage, e.dataTransfer.getData("text/deal") || dragId) }}
              >
                {list.length === 0 && (
                  <div className="ds-caption rounded-md border border-dashed border-border-default px-(--padding-xs) py-(--padding-sm) text-center text-foreground-muted">
                    {closed ? "No closed deals" : "No deals — drop one here"}
                  </div>
                )}
                {list.map((d) => (
                  <KanbanCard
                    key={d.id}
                    draggable={!closed}
                    onDragStart={(e) => { setDragId(d.id); e.dataTransfer.setData("text/deal", d.id); e.dataTransfer.effectAllowed = "move" }}
                    onDragEnd={() => { setDragId(null); setOverStage(null) }}
                    onClick={() => navigate(`/deals/${d.id}`)}
                    style={vtName("deal", d.id)}
                    className={cn("w-full cursor-pointer transition-[box-shadow,transform,opacity] duration-150 ease-out hover:-translate-y-px hover:shadow-md active:translate-y-0", dragId === d.id && "scale-[0.98] opacity-50", isNew(d.id) && APPEAR)}
                    stage={d.stage} dealName={d.name} dealType={d.type} team={d.team} date={fmtDate(d.lastActivity)}
                  />
                ))}
              </KanbanColumn>
            )
          })}
        </div>
      )}

      <DealFormDialog open={form.open} defaultStage={form.stage} onOpenChange={(open) => setForm((f) => ({ ...f, open }))} />
    </AppShell>
  )
}
