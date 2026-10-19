import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { activeDeals, hasErrors, useStore, validateZone, type Zone } from "@/data"

/** Create / edit a zone: name (required, unique) + at least one deal. */
export function ZoneFormDialog({ open, onOpenChange, zone }: { open: boolean; onOpenChange: (o: boolean) => void; zone?: Zone }) {
  const { state, actions } = useStore()
  const [title, setTitle] = React.useState("")
  const [dealIds, setDealIds] = React.useState<string[]>([])
  const [touched, setTouched] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  React.useEffect(() => { if (open) { setTitle(zone?.title ?? ""); setDealIds(zone?.dealIds ?? []); setTouched(false) } }, [open, zone])

  const errors = validateZone({ title, dealIds }, state.zones, zone?.id)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (hasErrors(errors)) return
    setSaving(true)
    const res = zone ? await actions.updateZone(zone.id, { title, dealIds }) : await actions.createZone({ title, dealIds })
    setSaving(false)
    if (!res.ok) return toast.error("Could not save the zone", { description: res.error })
    toast.success(zone ? "Zone updated" : `Zone ${(res.value as Zone).letter} created`, { description: zone ? undefined : "Drag employees into it to isolate them" })
    onOpenChange(false)
  }
  const toggle = (id: string) => setDealIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))

  return (
    <Dialog open={open} onOpenChange={(o) => !saving && onOpenChange(o)}>
      <DialogContent>
        <form onSubmit={submit} noValidate className="flex flex-col gap-(--spacing-xl)">
          <DialogHeader>
            <DialogTitle>{zone ? `Edit Zone ${zone.letter}` : "Create zone"}</DialogTitle>
            <DialogDescription>A zone isolates the people who work on its deals from everyone else.</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field data-invalid={touched && errors.title ? true : undefined}>
              <FieldLabel htmlFor="zone-title">Zone name</FieldLabel>
              <Input id="zone-title" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. NordSteel deal" aria-invalid={touched && errors.title ? true : undefined} />
              {touched && errors.title && <FieldError>{errors.title}</FieldError>}
            </Field>
            <Field data-invalid={touched && errors.dealIds ? true : undefined}>
              <FieldLabel>Deals</FieldLabel>
              <div className="flex max-h-48 flex-col gap-(--spacing-sm) overflow-auto rounded-md border border-border-default p-(--padding-xs)">
                {activeDeals(state).map((d) => (
                  <Label key={d.id} className="gap-(--spacing-sm) font-normal"><Checkbox checked={dealIds.includes(d.id)} onCheckedChange={() => toggle(d.id)} /> {d.name}</Label>
                ))}
              </div>
              {touched && errors.dealIds && <FieldError>{errors.dealIds}</FieldError>}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="secondary" disabled={saving} onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>{zone ? "Save changes" : "Create zone"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/** Add an employee to a zone. Edge-case: already isolated in another zone → conflict error (+ DENIED in Audit Log). */
export function AddMemberDialog({ zone, onOpenChange }: { zone: Zone | null; onOpenChange: (o: boolean) => void }) {
  const { state, actions } = useStore()
  const [empId, setEmpId] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  React.useEffect(() => { setEmpId(""); setError(null) }, [zone])
  if (!zone) return null
  const candidates = state.employees.filter((e) => !zone.memberIds.includes(e.id))
  const zoneOf = (id: string) => state.zones.find((z) => z.active && z.memberIds.includes(id))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!empId) return setError("Pick an employee")
    const res = actions.addMember(zone.id, empId)
    if (!res.ok) { setError(res.error); toast.error("Access denied", { description: "The attempt was recorded in the Audit Log" }); return }
    toast.success(`${state.employees.find((x) => x.id === empId)?.name} added to Zone ${zone.letter}`)
    onOpenChange(false)
  }

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={submit} noValidate className="flex flex-col gap-(--spacing-xl)">
          <DialogHeader>
            <DialogTitle>Add member to Zone {zone.letter}</DialogTitle>
            <DialogDescription>{zone.title}</DialogDescription>
          </DialogHeader>
          <Field data-invalid={error ? true : undefined}>
            <FieldLabel>Employee</FieldLabel>
            <Select value={empId} onValueChange={(v) => { setEmpId(v); setError(null) }}>
              <SelectTrigger className="w-full" aria-invalid={error ? true : undefined}><SelectValue placeholder="Select employee" /></SelectTrigger>
              <SelectContent>
                {candidates.map((c) => {
                  const z = zoneOf(c.id)
                  return <SelectItem key={c.id} value={c.id}>{c.name} · {c.role}{z ? ` — in Zone ${z.letter}` : ""}</SelectItem>
                })}
              </SelectContent>
            </Select>
            {error && <FieldError>{error}</FieldError>}
          </Field>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Add member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
