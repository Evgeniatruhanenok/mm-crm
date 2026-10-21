import * as React from "react"
import { toast } from "sonner"
import { DownloadIcon, FileTextIcon, SendIcon } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fmtDate, useStore, type Contact, type DealDocument } from "@/data"
import { EmptyState } from "../../_shared/EmptyState"

const LEVEL = {
  highly: { label: "Highly Conf.", className: "bg-background-destructive-light text-foreground-destructive-default" },
  confidential: { label: "Confidential", className: "bg-background-warning-light text-foreground-warning-default" },
} as const
const LEVEL_TEXT = { highly: "Highly Confidential", confidential: "Confidential" } as const
const NDA_LABEL: Record<Contact["nda"], string> = { signed: "NDA signed", pending: "NDA pending signature", none: "No NDA" }

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
            <TableRow><TableHead>File</TableHead><TableHead>Level</TableHead><TableHead>Uploaded by</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {docs.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.level ? <Badge variant="secondary" className={LEVEL[d.level].className}>{LEVEL[d.level].label}</Badge> : <span className="text-foreground-muted">—</span>}</TableCell>
                <TableCell>{d.uploadedBy}</TableCell>
                <TableCell>{fmtDate(d.uploaded)}</TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex gap-(--spacing-xs)">
                    <Button size="sm" variant="ghost" onClick={() => { actions.downloadDocument(d.id); toast.success(`${d.name} downloaded`, { description: "Download recorded in the Audit Log" }) }}><DownloadIcon /> Download</Button>
                    <Button size="sm" variant="outline" onClick={() => setSending(d)}><SendIcon /> Send</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <SendDialog doc={sending} contacts={contacts} onClose={() => setSending(null)} onBlocked={(doc, contact) => { setSending(null); setBlocked({ doc, contact }) }} />
      <NdaFileBlockModal blocked={blocked} onClose={() => setBlocked(null)} />
    </>
  )
}

function SendDialog({ doc, contacts, onClose, onBlocked }: { doc: DealDocument | null; contacts: Contact[]; onClose: () => void; onBlocked: (doc: DealDocument, c: Contact) => void }) {
  const { actions } = useStore()
  const [contactId, setContactId] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [busy, setBusy] = React.useState<"send" | "sign" | null>(null)
  React.useEffect(() => { setContactId(contacts.find((c) => c.nda !== "signed")?.id ?? contacts[0]?.id ?? ""); setError(null) }, [doc]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!doc) return null
  const contact = contacts.find((c) => c.id === contactId)

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contact) return setError("Pick a recipient")
    setBusy("send")
    const res = await actions.sendDocument(doc.id, contact.id)
    setBusy(null)
    if (!res.ok) return onBlocked(doc, contact)
    toast.success(`${doc.name} sent to ${contact.name}`, { description: "Delivery recorded in the Audit Log" })
    onClose()
  }
  const markSigned = async () => {
    if (!contact) return
    setBusy("sign")
    await actions.markContactNdaSigned(contact.id)
    setBusy(null)
    toast.success(`NDA signed by ${contact.name}`)
  }

  return (
    <Dialog open onOpenChange={(o) => !o && !busy && onClose()}>
      <DialogContent>
        <form onSubmit={send} noValidate className="flex flex-col gap-(--spacing-xl)">
          <DialogHeader>
            <DialogTitle>Send “{doc.name}”</DialogTitle>
            <DialogDescription>{doc.level ? `${LEVEL_TEXT[doc.level]} — the recipient must have a signed NDA.` : "Public document — no NDA required."}</DialogDescription>
          </DialogHeader>
          <Field data-invalid={error ? true : undefined}>
            <FieldLabel>Recipient</FieldLabel>
            {contacts.length === 0 ? (
              <FieldDescription>No counterparty contacts on this deal yet.</FieldDescription>
            ) : (
              <Select value={contactId} onValueChange={(v) => { setContactId(v); setError(null) }}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Select recipient" /></SelectTrigger>
                <SelectContent>
                  {contacts.map((c) => <SelectItem key={c.id} value={c.id}>{c.name} · {c.title}, {c.company} — {NDA_LABEL[c.nda]}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
            {error && <FieldError>{error}</FieldError>}
            {contact?.nda === "pending" && (
              <FieldDescription>
                NDA was sent to {contact.name} and is waiting for signature.{" "}
                <Button type="button" variant="link" size="sm" className="h-auto px-0" loading={busy === "sign"} onClick={markSigned}>Mark as signed</Button>
              </FieldDescription>
            )}
          </Field>
          <DialogFooter>
            <Button type="button" variant="secondary" disabled={!!busy} onClick={onClose}>Cancel</Button>
            <Button type="submit" loading={busy === "send"} disabled={!contact}>Send</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/** NDABlockModal (Figma Screen/NDABlockModal) — library Alert dialog with the copy from the mockup. */
function NdaFileBlockModal({ blocked, onClose }: { blocked: { doc: DealDocument; contact: Contact } | null; onClose: () => void }) {
  const { actions } = useStore()
  const [busy, setBusy] = React.useState(false)
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
              <AlertDialogAction disabled={busy || blocked.contact.nda === "pending"} onClick={initiate}>
                {busy ? "Sending…" : blocked.contact.nda === "pending" ? "NDA already sent" : "Initiate NDA"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
