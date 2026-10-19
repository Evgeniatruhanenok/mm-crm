import * as React from "react"
import { toast } from "sonner"
import { Loader2Icon, RefreshCwIcon, TriangleAlertIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/data"

type SyncState = { kind: "idle"; label: string } | { kind: "syncing" } | { kind: "error"; message: string }

/** Outlook auto-capture status. Click to sync; edge-case: the mock fails every 2nd attempt → Retry. */
export function OutlookSync({ dealId }: { dealId: string }) {
  const { actions } = useStore()
  const [s, setS] = React.useState<SyncState>({ kind: "idle", label: "2 min ago" })

  const sync = async () => {
    setS({ kind: "syncing" })
    const res = await actions.syncOutlook(dealId)
    if (res.ok) {
      setS({ kind: "idle", label: "just now" })
      toast.success("Outlook synced", { description: `${res.value} new email captured` })
    } else {
      setS({ kind: "error", message: res.error })
      toast.error("Outlook sync failed", { description: res.error })
    }
  }

  if (s.kind === "syncing")
    return <span className="ds-caption ml-auto inline-flex items-center gap-(--spacing-xs) text-foreground-muted"><Loader2Icon className="size-3 animate-spin" /> Syncing Outlook…</span>
  if (s.kind === "error")
    return (
      <span className="ds-caption ml-auto inline-flex items-center gap-(--spacing-sm) text-foreground-destructive-default">
        <TriangleAlertIcon className="size-3" /> Sync failed
        <Button size="xs" variant="outline" onClick={sync}><RefreshCwIcon /> Retry</Button>
      </span>
    )
  return (
    <button type="button" onClick={sync} title="Sync now"
      className="ds-caption ml-auto inline-flex items-center gap-(--spacing-xs) rounded-xs text-foreground-success-default transition-opacity hover:opacity-80">
      Outlook synced · {s.label} <RefreshCwIcon className="size-3" />
    </button>
  )
}
