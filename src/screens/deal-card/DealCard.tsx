import * as React from "react"
import { Link, useNavigate, useParams } from "react-router"
import { toast } from "sonner"
import { ArchiveRestoreIcon, FileTextIcon, FileXIcon, FilterXIcon, ShieldAlertIcon, UsersIcon } from "lucide-react"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityFeedItem } from "@/components/ActivityFeedItem"
import { StageBadge } from "@/components/StageBadge"
import { ACTIVITY_TYPES } from "@/components/tones"
import { delay, fmtDate, fmtDateTime, now, useStore } from "@/data"
import { AppShell } from "../_shared/AppShell"
import { DealFormDialog } from "../_shared/DealFormDialog"
import { EmptyState } from "../_shared/EmptyState"
import { NdaBlockDialog } from "../_shared/NdaBlockDialog"
import { MetaItem } from "./parts/MetaItem"
import { OutlookSync } from "./parts/OutlookSync"

const PAGE = 5
const PERIODS = { all: "Any time", "7": "Last 7 days", "30": "Last 30 days" } as const

/** Screen/DealCard (Figma 65:706) — live: deal from the data layer, actions, NDA hard-block, activity feed. */
export default function DealCard() {
  const { dealId = "" } = useParams()
  const navigate = useNavigate()
  const { state, actions } = useStore()
  const deal = state.deals.find((d) => d.id === dealId)

  const [editOpen, setEditOpen] = React.useState(false)
  const [archiveOpen, setArchiveOpen] = React.useState(false)
  const [ndaOpen, setNdaOpen] = React.useState(false)
  const [busy, setBusy] = React.useState<"share" | "archive" | "nda" | "request" | "more" | null>(null)
  const [type, setType] = React.useState("all")
  const [who, setWho] = React.useState("all")
  const [period, setPeriod] = React.useState<keyof typeof PERIODS>("all")
  const [visible, setVisible] = React.useState(PAGE)

  React.useEffect(() => setVisible(PAGE), [dealId, type, who, period])

  const feed = state.activities.filter((a) => a.dealId === dealId).sort((a, b) => b.at.localeCompare(a.at))
  const people = [...new Set(feed.flatMap((a) => a.meta.split(/→|,|·/).map((p) => p.trim())).filter((p) => /^[A-Z]/.test(p) && !/\d/.test(p)))]
  const since = period === "all" ? null : new Date(now().getTime() - Number(period) * 864e5)
  const filtered = feed.filter((a) => (type === "all" || a.type === type) && (who === "all" || a.meta.includes(who)) && (!since || new Date(a.at) >= since))
  const shown = filtered.slice(0, visible)
  const resetFeed = () => { setType("all"); setWho("all"); setPeriod("all") }

  if (state.status === "loading")
    return <AppShell><div className="flex flex-col gap-(--spacing-md) p-(--padding-lg)"><Skeleton className="h-5 w-48" /><Skeleton className="h-8 w-80" /><Skeleton className="h-4 w-120" /><Skeleton className="mt-(--spacing-xl) h-64 w-full" /></div></AppShell>

  if (!deal)
    return (
      <AppShell>
        <div className="p-(--padding-lg)">
          <EmptyState icon={FileXIcon} title="Deal not found" description={`There is no deal “${dealId}”. It may have been removed or the link is wrong.`}
            action={<Button asChild variant="outline"><Link to="/pipeline">Back to Pipeline</Link></Button>} />
        </div>
      </AppShell>
    )

  const share = async () => {
    setBusy("share")
    const res = await actions.shareDeal(deal.id)
    setBusy(null)
    if (!res.ok) return setNdaOpen(true)
    await navigator.clipboard?.writeText(`${location.origin}/deals/${deal.id}?share=1`).catch(() => {})
    toast.success("Share link copied", { description: "Access is recorded in the Audit Log" })
  }
  const archive = async () => {
    setBusy("archive")
    await actions.archiveDeals([deal.id])
    setBusy(null)
    setArchiveOpen(false)
    navigate("/pipeline")
    toast.success(`“${deal.name}” archived`, { action: { label: "Undo", onClick: () => actions.restoreDeals([deal.id]) } })
  }
  const signNda = async () => {
    setBusy("nda")
    await actions.markNdaSigned(deal.id)
    setBusy(null)
    toast.success("NDA marked as signed", { description: "Sharing and stage changes are unlocked" })
  }
  const requestNda = async () => {
    setBusy("request")
    await actions.requestNda(deal.id)
    setBusy(null)
    toast.success("NDA request sent", { description: `${deal.name} — waiting for counterparty signature` })
  }
  const loadMore = async () => {
    setBusy("more")
    await delay(600)
    setVisible((v) => v + PAGE)
    setBusy(null)
  }

  return (
    <AppShell>
      <header className="flex flex-wrap items-start justify-between gap-(--spacing-lg) border-b border-border-default px-(--padding-lg) py-(--padding-xs)">
        <div className="flex min-w-0 flex-col gap-(--spacing-sm)">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to={deal.archived ? "/pipeline?view=closed" : "/pipeline"}>{deal.archived ? "Closed" : "Pipeline"}</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{deal.name}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-wrap items-center gap-(--spacing-md)">
            <h1 className="ds-h3 break-words text-foreground-default">{deal.name}</h1>
            <StageBadge stage={deal.stage} />
            {deal.archived && <Badge variant="outline">Archived</Badge>}
          </div>
          <dl className="flex flex-wrap gap-x-(--spacing-xl) gap-y-(--spacing-xs)">
            <MetaItem label="Type" value={deal.type} />
            <MetaItem label="Team" value={deal.team} />
            <MetaItem label="Owner" value={deal.owner} />
            <MetaItem label="Created" value={fmtDate(deal.created)} />
          </dl>
        </div>
        <div className="flex flex-wrap gap-(--spacing-sm)">
          {deal.archived ? (
            <Button variant="outline" onClick={() => { actions.restoreDeals([deal.id]); toast.success("Deal restored to Pipeline") }}><ArchiveRestoreIcon /> Restore</Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => setEditOpen(true)}>Edit</Button>
              <Button variant="outline" loading={busy === "share"} onClick={share}>Share</Button>
              <Button variant="outline" onClick={() => setArchiveOpen(true)}>Archive</Button>
            </>
          )}
        </div>
      </header>

      {!deal.nda && !deal.archived && (
        <div className="px-(--padding-lg) pt-(--padding-sm)">
          <Alert variant="warning">
            <ShieldAlertIcon />
            <AlertTitle>NDA not signed</AlertTitle>
            <AlertDescription>Sharing materials and moving the deal past Prospecting are blocked until the NDA is signed.</AlertDescription>
            <AlertAction className="flex gap-(--spacing-sm)">
              <Button size="sm" variant="outline" loading={busy === "request"} onClick={requestNda}>Request NDA</Button>
              <Button size="sm" loading={busy === "nda"} onClick={signNda}>Mark as signed</Button>
            </AlertAction>
          </Alert>
        </div>
      )}

      <Tabs defaultValue="activity" className="flex-1 gap-0">
        <div className="mt-(--spacing-sm) border-y border-border-default bg-background-muted px-(--padding-lg) py-(--padding-xxs)">
          <TabsList>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="buyers">Buyer List</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="activity" className="flex flex-col px-(--padding-lg)">
          <div className="flex flex-wrap items-center gap-(--spacing-sm) py-(--padding-xs)">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-45" aria-label="Activity type"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="all">All types</SelectItem>{ACTIVITY_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={who} onValueChange={setWho}>
              <SelectTrigger className="w-45" aria-label="Participant"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="all">All participants</SelectItem>{people.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={period} onValueChange={(v) => setPeriod(v as keyof typeof PERIODS)}>
              <SelectTrigger className="w-45" aria-label="Period"><SelectValue /></SelectTrigger>
              <SelectContent>{Object.entries(PERIODS).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}</SelectContent>
            </Select>
            <OutlookSync dealId={deal.id} />
          </div>

          {filtered.length === 0 ? (
            <EmptyState className="my-(--spacing-lg)" icon={FilterXIcon} title={feed.length ? "No activity matches the filters" : "No activity yet"}
              description={feed.length ? "Try another type, participant or period." : "Emails from Outlook appear here automatically."}
              action={feed.length ? <Button variant="outline" onClick={resetFeed}>Reset filters</Button> : undefined} />
          ) : (
            <>
              {shown.map((a) => (
                <ActivityFeedItem key={a.id} className="px-0 animate-in fade-in-0 slide-in-from-top-1 duration-200" type={a.type} subject={a.subject} meta={`${a.meta} · ${fmtDateTime(a.at)}`} preview={a.preview} />
              ))}
              {visible < filtered.length
                ? <Button variant="ghost" className="my-(--spacing-sm) self-center" loading={busy === "more"} onClick={loadMore}>Load more</Button>
                : <p className="ds-caption my-(--spacing-sm) self-center text-foreground-muted">All activity loaded</p>}
            </>
          )}
        </TabsContent>
        <TabsContent value="documents" className="p-(--padding-lg)">
          <EmptyState icon={FileTextIcon} title="No documents yet" description="CIM, teaser and NDA files attached to this deal will appear here." />
        </TabsContent>
        <TabsContent value="buyers" className="p-(--padding-lg)">
          <EmptyState icon={UsersIcon} title="Buyer list is empty" description={deal.nda ? "Add potential buyers to start outreach." : "Available after the NDA is signed."} />
        </TabsContent>
      </Tabs>

      <DealFormDialog open={editOpen} onOpenChange={setEditOpen} deal={deal} />
      <NdaBlockDialog deal={deal} open={ndaOpen} onOpenChange={setNdaOpen} />
      <AlertDialog open={archiveOpen} onOpenChange={(o) => busy !== "archive" && setArchiveOpen(o)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive “{deal.name}”?</AlertDialogTitle>
            <AlertDialogDescription>The deal leaves the Pipeline and moves to Closed. You can restore it later.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busy === "archive"}>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={busy === "archive"} onClick={(e) => { e.preventDefault(); archive() }}>{busy === "archive" ? "Archiving…" : "Archive"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  )
}
