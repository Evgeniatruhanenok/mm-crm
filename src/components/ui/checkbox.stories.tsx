import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './checkbox'
import { Label } from './label'

/**
 * Checkbox for selecting one or several values. States unchecked / checked / indeterminate / disabled.
 * Error via `aria-invalid`.
 */
const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { defaultChecked: false, disabled: false, 'aria-label': 'NDA signed' },
  argTypes: {
    defaultChecked: { control: 'inline-radio', options: [false, true, 'indeterminate'], description: 'Initial state (uncontrolled)' },
    checked: { control: 'inline-radio', options: [false, true, 'indeterminate'], description: 'State (controlled)' },
    disabled: { control: 'boolean', description: 'state=disabled' },
    required: { control: 'boolean', description: 'Mark as required for forms' },
    'aria-invalid': { control: 'boolean', description: 'Error state' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Checkbox>
export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
/** Indeterminate — e.g. "select all" when only some deals are selected. */
export const Indeterminate: Story = { args: { defaultChecked: 'indeterminate' } }
export const Disabled: Story = { args: { disabled: true } }
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } }
export const Error: Story = { args: { 'aria-invalid': true } }
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center gap-(--spacing-sm)">
      <Checkbox id="nda" {...args} />
      <Label htmlFor="nda">NDA signed with LogistikPro</Label>
    </div>
  ),
}

/** State matrix (enabled / disabled rows). */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(4,auto)] items-center justify-start gap-(--spacing-lg)">
      <span />
      {['Unchecked', 'Checked', 'Indeterminate', 'Error'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {[false, true].map((dis) => (
        <div key={String(dis)} className="contents">
          <code className="ds-meta text-foreground-muted">{dis ? 'disabled' : 'enabled'}</code>
          <Checkbox aria-label="Unchecked" disabled={dis} />
          <Checkbox aria-label="Checked" defaultChecked disabled={dis} />
          <Checkbox aria-label="Indeterminate" defaultChecked="indeterminate" disabled={dis} />
          <Checkbox aria-label="Error" aria-invalid disabled={dis} />
        </div>
      ))}
      <code className="ds-meta text-foreground-muted">with label</code>
      <div className="col-span-4 flex flex-col gap-(--spacing-sm)">
        {['Prospecting', 'NDA Signed', 'Due Diligence'].map((s, i) => (
          <div key={s} className="flex items-center gap-(--spacing-sm)">
            <Checkbox id={`stage-${i}`} defaultChecked={i === 1} />
            <Label htmlFor={`stage-${i}`}>{s}</Label>
          </div>
        ))}
      </div>
    </div>
  ),
}
