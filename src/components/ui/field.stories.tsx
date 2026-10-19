import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from './field'
import { Input } from './input'

/**
 * Form pattern: Field + FieldLabel + Input + FieldDescription + FieldError.
 * States: default / with description / invalid (`data-invalid` + `aria-invalid`) / disabled (`data-disabled`).
 */
const meta = {
  title: 'Components/Form',
  component: Field,
  tags: ['autodocs'],
  args: { orientation: 'vertical', className: 'w-80' },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal', 'responsive'], description: 'Label/control layout' },
    className: { control: 'text', description: 'Extra classes (width)' },
    children: { control: false, description: 'FieldLabel, control, FieldDescription, FieldError' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="deal-name">Deal name</FieldLabel>
      <Input id="deal-name" placeholder="LogistikPro sale" />
      <FieldDescription>Shown on the Kanban card and in the audit log.</FieldDescription>
    </Field>
  ),
} satisfies Meta<typeof Field>
export default meta
type Story = StoryObj<typeof meta>

/** Label + input + description. */
export const Default: Story = {}

/** Invalid — `data-invalid` on Field, `aria-invalid` on the control, FieldError below. */
export const Invalid: Story = {
  render: (args) => (
    <Field {...args} data-invalid>
      <FieldLabel htmlFor="deal-value">Deal value, $M</FieldLabel>
      <Input id="deal-value" defaultValue="-5" aria-invalid />
      <FieldError>Deal value must be a positive number.</FieldError>
    </Field>
  ),
}

/** Disabled — `data-disabled` on Field, `disabled` on the control. */
export const Disabled: Story = {
  render: (args) => (
    <Field {...args} data-disabled>
      <FieldLabel htmlFor="deal-owner">Owner</FieldLabel>
      <Input id="deal-owner" defaultValue="M. Volkova" disabled />
      <FieldDescription>Locked by Chinese Wall — Team A only.</FieldDescription>
    </Field>
  ),
}

/** Horizontal orientation. */
export const Horizontal: Story = {
  args: { orientation: 'horizontal', className: 'w-96' },
}

/** Full "New deal" form with live validation on submit. */
export const NewDealForm: Story = {
  render: () => {
    function Demo() {
      const [errors, setErrors] = React.useState<Record<string, string>>({})
      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const next: Record<string, string> = {}
        if (!String(data.get('name') ?? '').trim()) next.name = 'Deal name is required.'
        const value = Number(data.get('value'))
        if (!(value > 0)) next.value = 'Deal value must be a positive number.'
        if (!String(data.get('owner') ?? '').trim()) next.owner = 'Assign an owner.'
        setErrors(next)
      }
      return (
        <form onSubmit={onSubmit} noValidate className="w-96">
          <FieldSet>
            <FieldLegend>New deal</FieldLegend>
            <FieldGroup>
              <Field data-invalid={!!errors.name || undefined}>
                <FieldLabel htmlFor="f-name">Deal name</FieldLabel>
                <Input id="f-name" name="name" placeholder="RosMedia acquisition" aria-invalid={!!errors.name || undefined} />
                <FieldError>{errors.name}</FieldError>
              </Field>
              <Field data-invalid={!!errors.value || undefined}>
                <FieldLabel htmlFor="f-value">Deal value, $M</FieldLabel>
                <Input id="f-value" name="value" type="number" placeholder="18.5" aria-invalid={!!errors.value || undefined} />
                <FieldDescription>Enterprise value, USD millions.</FieldDescription>
                <FieldError>{errors.value}</FieldError>
              </Field>
              <Field data-invalid={!!errors.owner || undefined}>
                <FieldLabel htmlFor="f-owner">Owner</FieldLabel>
                <Input id="f-owner" name="owner" placeholder="D. Kuznetsov" aria-invalid={!!errors.owner || undefined} />
                <FieldError>{errors.owner}</FieldError>
              </Field>
              <Field orientation="horizontal">
                <Button type="submit">Create deal</Button>
                <Button type="reset" variant="outline" onClick={() => setErrors({})}>Cancel</Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      )
    }
    return <Demo />
  },
}

/** State × orientation matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(2,20rem)] items-start gap-(--spacing-xl)">
      <span />
      {['vertical', 'horizontal'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {(['default', 'description', 'invalid', 'disabled'] as const).map((s) => (
        <div key={s} className="contents">
          <code className="ds-meta text-foreground-muted">{s}</code>
          {(['vertical', 'horizontal'] as const).map((o) => (
            <Field
              key={o}
              orientation={o}
              data-invalid={s === 'invalid' || undefined}
              data-disabled={s === 'disabled' || undefined}
            >
              <FieldLabel htmlFor={`${s}-${o}`}>Team</FieldLabel>
              <Input
                id={`${s}-${o}`}
                defaultValue={s === 'invalid' ? '' : 'Team A'}
                aria-invalid={s === 'invalid' || undefined}
                disabled={s === 'disabled'}
              />
              {s === 'description' && <FieldDescription>Controls Chinese Wall access.</FieldDescription>}
              {s === 'invalid' && <FieldError>Team is required.</FieldError>}
            </Field>
          ))}
        </div>
      ))}
    </div>
  ),
}
