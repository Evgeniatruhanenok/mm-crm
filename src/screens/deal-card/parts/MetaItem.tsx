/** Deal meta pair "Label: value" (Figma DealHeader › MetaRow). Local block of the DealCard screen. */
export function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="ds-caption flex gap-(--spacing-xs)">
      <dt className="text-foreground-muted">{label}:</dt>
      <dd className="font-medium text-foreground-default">{value}</dd>
    </div>
  )
}
