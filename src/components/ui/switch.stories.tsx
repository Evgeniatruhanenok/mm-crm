import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './label'
import { Switch } from './switch'

const SIZES = ['sm', 'default'] as const

/**
 * On/off switch for binary settings (e.g. Outlook auto-capture). States unchecked / checked / disabled; sizes default / sm.
 */
const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { size: 'default', defaultChecked: false, disabled: false, 'aria-label': 'Outlook auto-capture' },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES, description: 'Size' },
    defaultChecked: { control: 'boolean', description: 'Initial state (uncontrolled)' },
    checked: { control: 'boolean', description: 'State (controlled)' },
    disabled: { control: 'boolean', description: 'state=disabled' },
    'aria-invalid': { control: 'boolean', description: 'Error state' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Switch>
export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } }
export const Small: Story = { args: { size: 'sm', defaultChecked: true } }
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center gap-(--spacing-sm)">
      <Switch id="auto-capture" {...args} />
      <Label htmlFor="auto-capture">Outlook auto-capture</Label>
    </div>
  ),
}

/** Size × State matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(4,auto)] items-center justify-start gap-(--spacing-lg)">
      <span />
      {['Unchecked', 'Checked', 'Disabled', 'Disabled checked'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {SIZES.map((s) => (
        <div key={s} className="contents">
          <code className="ds-meta text-foreground-muted">{s}</code>
          <Switch size={s} aria-label="Unchecked" />
          <Switch size={s} aria-label="Checked" defaultChecked />
          <Switch size={s} aria-label="Disabled" disabled />
          <Switch size={s} aria-label="Disabled checked" disabled defaultChecked />
        </div>
      ))}
    </div>
  ),
}
