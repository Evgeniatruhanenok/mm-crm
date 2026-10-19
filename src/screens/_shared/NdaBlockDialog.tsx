import * as React from "react"
import { ShieldAlertIcon } from "lucide-react"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useStore, type Deal } from "@/data"

/** NDA Hard-block: shown when a share is blocked. "Request NDA" sends the NDA for signature. */
export function NdaBlockDialog({ deal, open, onOpenChange }: { deal: Deal; open: boolean; onOpenChange: (o: boolean) => void }) {
  const { actions } = useStore()
  const [sending, setSending] = React.useState(false)
  const request = async (e: React.MouseEvent) => {
    e.preventDefault()
    setSending(true)
    await actions.requestNda(deal.id)
    setSending(false)
    onOpenChange(false)
    toast.success("NDA request sent", { description: `${deal.name} — waiting for counterparty signature` })
  }
  return (
    <AlertDialog open={open} onOpenChange={(o) => !sending && onOpenChange(o)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-(--spacing-sm)">
            <ShieldAlertIcon className="size-5 text-icon-destructive-default" /> NDA not signed
          </AlertDialogTitle>
          <AlertDialogDescription>
            Materials of “{deal.name}” can’t be shared until an NDA is signed. The attempt was recorded in the Audit Log.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={sending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={request} disabled={sending}>{sending ? "Sending…" : "Request NDA"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
