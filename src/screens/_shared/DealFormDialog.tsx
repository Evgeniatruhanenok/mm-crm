import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { STAGES } from "@/components/tones"
import { DEAL_TYPES, NAME_MAX, OWNERS, TEAMS, hasErrors, useStore, validateDeal, type Deal, type DealInput } from "@/data"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** edit mode when a deal is passed */
  deal?: Deal
  /** create mode: preset stage (e.g. "+ Add deal" in a Kanban column) */
  defaultStage?: DealInput["stage"]
  onSaved?: (deal: Deal) => void
}

const empty = (stage: DealInput["stage"] = "Prospecting"): Partial<DealInput> => ({ name: "", type: undefined, team: undefined, owner: "A. Smirnov", stage, nda: false })

/** New / Edit deal form: validation (required, length, duplicate name, NDA gate) + loading + toast. */
export function DealFormDialog({ open, onOpenChange, deal, defaultStage, onSaved }: Props) {
  const { state, actions } = useStore()
  const [v, setV] = React.useState<Partial<DealInput>>(empty(defaultStage))
  const [touched, setTouched] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    setV(deal ? { name: deal.name, type: deal.type, team: deal.team, owner: deal.owner, stage: deal.stage, nda: deal.nda } : empty(defaultStage))
    setTouched(false)
  }, [open, deal, defaultStage])

  const errors = validateDeal(v, state.deals, deal?.id)
  const err = (k: keyof DealInput) => (touched ? errors[k] : undefined)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (hasErrors(errors)) return
    setSaving(true)
    const res = deal ? await actions.updateDeal(deal.id, v as DealInput) : await actions.createDeal(v as DealInput)
    setSaving(false)
    if (!res.ok) return toast.error("Could not save the deal", { description: res.error })
    toast.success(deal ? "Deal updated" : `Deal “${res.value.name}” created`, { description: `Stage: ${res.value.stage}` })
    onOpenChange(false)
    onSaved?.(res.value)
  }

  const select = (k: "type" | "team" | "owner" | "stage", label: string, options: readonly string[], placeholder: string) => (
    <Field data-invalid={err(k) ? true : undefined}>
      <FieldLabel>{label}</FieldLabel>
      <Select value={v[k] ?? ""} onValueChange={(x) => setV({ ...v, [k]: x })}>
        <SelectTrigger className="w-full" aria-invalid={err(k) ? true : undefined}><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent>{options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
      </Select>
      {err(k) && <FieldError>{err(k)}</FieldError>}
    </Field>
  )

  return (
    <Dialog open={open} onOpenChange={(o) => !saving && onOpenChange(o)}>
      <DialogContent>
        <form onSubmit={submit} noValidate className="flex flex-col gap-(--spacing-xl)">
          <DialogHeader>
            <DialogTitle>{deal ? "Edit deal" : "New deal"}</DialogTitle>
            <DialogDescription>{deal ? "Changes are logged in the deal activity." : "The deal appears on the Pipeline immediately."}</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field data-invalid={err("name") ? true : undefined}>
              <FieldLabel htmlFor="deal-name">Deal name</FieldLabel>
              <Input id="deal-name" autoFocus value={v.name} maxLength={NAME_MAX + 20} aria-invalid={err("name") ? true : undefined}
                onChange={(e) => setV({ ...v, name: e.target.value })} placeholder="e.g. LogistikPro sale" />
              {err("name") ? <FieldError>{err("name")}</FieldError> : <FieldDescription>{(v.name ?? "").length}/{NAME_MAX}</FieldDescription>}
            </Field>
            <div className="grid grid-cols-2 gap-(--spacing-lg)">
              {select("type", "Type", DEAL_TYPES, "Select type")}
              {select("team", "Team", TEAMS, "Select team")}
              {select("owner", "Owner", OWNERS, "Select owner")}
              {select("stage", "Stage", STAGES, "Select stage")}
            </div>
            <Label className="gap-(--spacing-sm)">
              <Checkbox checked={!!v.nda} onCheckedChange={(c) => setV({ ...v, nda: c === true })} /> NDA signed
            </Label>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="secondary" disabled={saving} onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>{deal ? "Save changes" : "Create deal"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
