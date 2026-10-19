import * as React from "react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DEAL_TYPES, OWNERS, TEAMS, pluralize, useStore, validateDeal, type Deal, type DealInput } from "@/data"

export const SAMPLE_TSV = [
  "Deal name\tType\tTeam\tOwner",
  "NordSteel acquisition\tBuy-side\tTeam A\tM. Volkova",
  "Baltic Ports sale\tSell-side\tTeam B\tD. Kuznetsov",
  "LogistikPro sale\tSell-side\tTeam C\tM. Volkova",
  "X\tAdvisory\tTeam C\tE. Orlova",
  "MedTech Holding IPO\tUnknown\tTeam D\tA. Smirnov",
].join("\n")

type Row = { input: DealInput; error?: string }

const pick = <T extends readonly string[]>(list: T, value: string): T[number] | undefined =>
  list.find((x) => x.toLowerCase() === value.trim().toLowerCase())

/** Parse TSV from Excel: optional header row, columns Deal name · Type · Team · Owner. */
export function parseRows(text: string, deals: Deal[]): Row[] {
  const lines = text.split(/\r?\n/).map((l) => l.trimEnd()).filter(Boolean)
  if (lines[0]?.toLowerCase().startsWith("deal name")) lines.shift()
  const seen = new Set<string>()
  return lines.map((line) => {
    const [name = "", type = "", team = "", owner = ""] = line.split("\t")
    const input: DealInput = { name: name.trim(), type: pick(DEAL_TYPES, type)!, team: pick(TEAMS, team)!, owner: pick(OWNERS, owner) ?? "A. Smirnov", stage: "Prospecting", nda: false }
    const e = validateDeal(input, deals)
    let error = e.name ?? (e.type && `Unknown type “${type}”`) ?? (e.team && `Unknown team “${team}”`) ?? undefined
    if (!error && seen.has(input.name.toLowerCase())) error = "Duplicate row in the pasted list"
    seen.add(input.name.toLowerCase())
    return { input, error }
  })
}

export function SmartPasteDialog({ text, onClose }: { text: string | null; onClose: () => void }) {
  const { state, actions } = useStore()
  const [importing, setImporting] = React.useState(false)
  const rows = React.useMemo(() => (text ? parseRows(text, state.deals) : []), [text]) // eslint-disable-line react-hooks/exhaustive-deps
  const valid = rows.filter((r) => !r.error)

  const run = async () => {
    setImporting(true)
    const res = await actions.importDeals(valid.map((r) => r.input))
    setImporting(false)
    if (!res.ok) return toast.error("Import failed", { description: res.error })
    toast.success(`${pluralize(res.value, "deal")} imported to Prospecting`, { description: rows.length - valid.length ? `${rows.length - valid.length} skipped` : undefined })
    onClose()
  }

  return (
    <Dialog open={text !== null} onOpenChange={(o) => !o && !importing && onClose()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Smart Paste — preview</DialogTitle>
          <DialogDescription>{rows.length} rows recognised · {valid.length} ready to import · columns: Deal name, Type, Team, Owner</DialogDescription>
        </DialogHeader>
        <div className="max-h-96 overflow-auto rounded-md border border-border-default">
          <Table>
            <TableHeader className="bg-background-muted">
              <TableRow><TableHead>Deal name</TableHead><TableHead>Type</TableHead><TableHead>Team</TableHead><TableHead>Owner</TableHead><TableHead>Status</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={i} className={r.error ? "bg-background-destructive-light" : undefined}>
                  <TableCell>{r.input.name || "—"}</TableCell>
                  <TableCell>{r.input.type ?? "—"}</TableCell>
                  <TableCell>{r.input.team ?? "—"}</TableCell>
                  <TableCell>{r.input.owner}</TableCell>
                  <TableCell>
                    {r.error
                      ? <span className="ds-caption text-foreground-destructive-default">{r.error}</span>
                      : <Badge variant="secondary" className="bg-background-success-light text-foreground-success-default">Ready</Badge>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button variant="secondary" disabled={importing} onClick={onClose}>Cancel</Button>
          <Button disabled={valid.length === 0} loading={importing} onClick={run}>Import {pluralize(valid.length, "deal")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
