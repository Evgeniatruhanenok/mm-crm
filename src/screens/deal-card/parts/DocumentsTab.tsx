import * as React from "react"
import { toast } from "sonner"
import { DownloadIcon, FileTextIcon, SendIcon } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { fmtDate, useStore, type Contact, type DealDocument } from "@/data"
import { EmptyState } from "../../_shared/EmptyState"

const LEVEL = {
  highly: { label: "Highly Conf.", className: "bg-background-destructive-light text-foreground-destructive-default" },
  confidential: { label: "Confidential", className: "bg-background-warning-light text-foreground-warning-default" },
} as const
const LEVEL_TEXT = { highly: "Highly Confidential", confidential: "Confidential" } as const

/** Can this recipient receive this file? Public files go to anyone; confidential ones need a signed NDA. */
type Eligibility = "ok" | "pending" | "blocked"
const eligibility = (doc: DealDocument, c: Contact): Eligibility => (!doc.level || c.nda === "signed" ? "ok" : c.nda === "pending" ? "pending" : "blocked")
const STATUS: Record<Eligibility, { label: string; className: string }> = {
  ok: { label: "Can receive", className: "bg-background-success-light text-foreground-success-default" },
  pending: { label: "NDA pending", className: "bg-background-warning-light text-foreground-warning-default" },
  blocked: { label: "Blocked · no NDA", className: "bg-background-destructive-light text-foreground-destructive-default" },
}

/** Deal documents (flow nda-hard-block): Download / Send. Sending a confidential file to a recipient without NDA → NDABlockModal. */
export function DocumentsTab({ dealId }: { dealId: string }) {
  const { state, actions } = useStore()
  const docs = state.documents.filter((d) => d.dealId === dealId)
  const contacts = state.contacts.filter((c) => c.dealId === dealId)
  const [sending, setSending] = React.useState<DealDocument | null>(null)
  const [blocked, setBlocked] = React.useState<{ doc: DealDocument; contact: Contact } | null>(null)

  if (docs.length === 0)
    return <EmptyState icon={FileTextIcon} title="No documents yet" description="CIM, teaser and NDA files attached to this deal will appear here." />

  return (
    <>
      <div className="overflow-x-auto rounded-md border border-border-default">
        <Table>
          <TableHeader className="bg-background-muted">
            <TableRow><TableHead>File</TableHead><TableHead>Level</TableHead><TableHead>Can be sent to</TableHead><TableHead>Uploaded by</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {docs.map((d) => {
              const okCount = contacts.filter((c) => eligibility(d, c) === "ok").length
              return (
                <TableRow key={d.id}>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.level ? <Badge variant="secondary" className={LEVEL[d.level].className}>{LEVEL[d.level].label}</Badge> : <span className="text-foreground-muted">—</span>}</TableCell>
                  <TableCell className={cn(okCount < contacts.length && "text-foreground-muted")}>{d.level ? `${okCount} of ${contacts.length} recipients` : "Anyone"}</TableCell>
                  <TableCell>{d.uploadedBy}</TableCell>
                  <TableCell>{fmtDate(d.uploaded)}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-(--spacing-xs)">
                      <Button size="sm" variant="ghost" onClick={() => { actions.downloadDocument(d.id); toast.success(`${d.name} downloaded`, { description: "Download recorded in the Audit Log" }) }}><DownloadIcon /> Download</Button>
                      <Button size="sm" variant="outline" onClick={() => setSending(d)}><SendIcon /> Send</Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <SendDialog doc={sending} contacts={contacts} onClose={() => setSending(null)} onBlocked={(doc, contact) => { setSending(null); setBlocked({ doc, contact }) }} />
      <NdaFileBlockModal blocked={blocked} onClose={() => setBlocked(null)} />
    </>
  )
}

/** Recipient list with per-file eligibility visible up front, plus inline NDA actions. */
function SendDialog({ doc, contacts, onClose, onBlocked }: { doc: DealDocument | null; contacts: Contact[]; onClose: () => void; onBlocked: (doc: DealDocument, c: Contact) => void }) {
  const { actions } = useStore()
  const [contactId, setContactId] = React.useState("")
  const [busy, setBusy] = React.useState<string | null>(null)
  React.useEffect(() => {
    if (!doc) return
    setContactId(contacts.find((c) => eligibility(doc, c) === "ok")?.id ?? "")
  }, [doc]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!doc) return null
  // only recipients who can receive the file are selectable
  const contact = contacts.find((c) => c.id === contactId && eligibility(doc, c) === "ok")
  const okCount = contacts.filter((c) => eligibility(doc, c) === "ok").length

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contact) return
    setBusy("send")
    const res = await actions.sendDocument(doc.id, contact.id)
    setBusy(null)
    if (!res.ok) return onBlocked(doc, contact)
    toast.success(`${doc.name} sent to ${contact.name}`, { description: "Delivery recorded in the Audit Log" })
    onClose()
  }
  // a recipient who can't receive the file isn't selectable — clicking explains why (attempt is recorded, NDABlockModal)
  const explainBlocked = async (c: Contact) => {
    if (busy) return
    setBusy(c.id)
    await actions.sendDocument(doc.id, c.id)
    setBusy(null)
    onBlocked(doc, c)
  }
  const initiate = async (c: Contact) => {
    setBusy(c.id)
    await actions.requestContactNda(c.id)
    setBusy(null)
    toast.success(`NDA sent to ${c.name} for signature`)
  }
  const markSigned = async (c: Contact) => {
    setBusy(c.id)
    await actions.markContactNdaSigned(c.id)
    setBusy(null)
    toast.success(`NDA signed by ${c.name}`, { description: "They can receive confidential files now" })
  }

  return (
    <Dialog open onOpenChange={(o) => !o && !busy && onClose()}>
      <DialogContent className="sm:max-w-140">
        <form onSubmit={send} noValidate className="flex flex-col gap-(--spacing-xl)">
          <DialogHeader>
            <DialogTitle>Send “{doc.name}”</DialogTitle>
            <DialogDescription>
              {doc.level
                ? `${LEVEL_TEXT[doc.level]} — only recipients with a signed NDA can receive it. ${okCount} of ${contacts.length} can receive it now.`
                : "Public document — no NDA required, anyone can receive it."}
            </DialogDescription>
          </DialogHeader>

          {contacts.length === 0 ? (
            <p className="ds-body text-foreground-muted">No counterparty contacts on this deal yet.</p>
          ) : (
            <RadioGroup value={contactId} onValueChange={setContactId} className="gap-(--spacing-sm)" aria-label="Recipient">
              {contacts.map((c) => {
                const el = eligibility(doc, c)
                const disabled = el !== "ok"
                return (
                  <label key={c.id} htmlFor={`rcpt-${c.id}`} data-disabled={disabled || undefined} onClick={disabled ? () => explainBlocked(c) : undefined}
                    className={cn("flex items-center gap-(--spacing-md) rounded-md border px-(--padding-sm) py-(--padding-xs) transition-colors",
                      disabled ? "cursor-help border-border-default" : contactId === c.id ? "cursor-pointer border-border-primary-default bg-background-muted" : "cursor-pointer border-border-default hover:bg-background-muted")}>
                    <RadioGroupItem id={`rcpt-${c.id}`} value={c.id} disabled={disabled} />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className={cn("ds-body", disabled ? "text-foreground-muted" : "text-foreground-default")}>{c.name}</span>
                      <span className="ds-caption text-foreground-muted">{c.title}, {c.company}</span>
                    </span>
                    <Badge variant="secondary" className={STATUS[el].className}>{STATUS[el].label}</Badge>
                    {el === "blocked" && <Button type="button" size="xs" variant="outline" loading={busy === c.id} onClick={(e) => { e.preventDefault(); e.stopPropagation(); initiate(c) }}>Initiate NDA</Button>}
                    {el === "pending" && <Button type="button" size="xs" variant="outline" loading={busy === c.id} onClick={(e) => { e.preventDefault(); e.stopPropagation(); markSigned(c) }}>Mark as signed</Button>}
                  </label>
                )
              })}
            </RadioGroup>
          )}

          {contacts.length > 0 && okCount === 0 && (
            <p className="ds-caption text-foreground-muted">No one can receive this file yet — initiate an NDA first.</p>
          )}

          <DialogFooter>
            <Button type="button" variant="secondary" disabled={!!busy} onClick={onClose}>Cancel</Button>
            <Button type="submit" loading={busy === "send"} disabled={!contact || (!!busy && busy !== "send")}>Send</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/** NDABlockModal (Figma Screen/NDABlockModal) — library Alert dialog with the copy from the mockup. */
function NdaFileBlockModal({ blocked, onClose }: { blocked: { doc: DealDocument; contact: Contact } | null; onClose: () => void }) {
  const { state, actions } = useStore()
  const [busy, setBusy] = React.useState(false)
  const current = blocked && state.contacts.find((c) => c.id === blocked.contact.id)
  const initiate = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!blocked) return
    setBusy(true)
    await actions.requestContactNda(blocked.contact.id)
    setBusy(false)
    toast.success(`NDA sent to ${blocked.contact.name} for signature`, { description: "Send the file again once it is signed" })
    onClose()
  }
  return (
    <AlertDialog open={!!blocked} onOpenChange={(o) => !o && !busy && onClose()}>
      <AlertDialogContent className="sm:max-w-120">
        {blocked && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Sending blocked</AlertDialogTitle>
              <AlertDialogDescription>
                “{blocked.doc.name}” is marked {LEVEL_TEXT[blocked.doc.level ?? "confidential"]}. There is no signed NDA with the recipient {blocked.contact.name} ({blocked.contact.company}). Sign an NDA before sending confidential materials — this attempt was recorded in the Audit Log.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel>
              <AlertDialogAction disabled={busy || current?.nda === "pending"} onClick={initiate}>
                {busy ? "Sending…" : current?.nda === "pending" ? "NDA already sent" : "Initiate NDA"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
