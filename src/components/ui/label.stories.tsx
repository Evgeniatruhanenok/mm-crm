import type { Meta, StoryObj } from '@storybook/react-vite'
import { LockIcon } from 'lucide-react'
import { Checkbox } from './checkbox'
import { Input } from './input'
import { Label } from './label'

/**
 * Accessible form label (Radix). Dims automatically when the paired `peer` control is disabled.
 */
const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  args: { children: 'Deal name', htmlFor: 'deal-name' },
  argTypes: {
    children: { control: 'text', description: 'Label text / content' },
    htmlFor: { control: 'text', description: 'id of the associated control' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Label>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithIcon: Story = { args: { children: <><LockIcon /> NDA required</> } }
/** Paired with an input. */
export const WithInput: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-(--spacing-sm)">
      <Label {...args} />
      <Input id="deal-name" placeholder="LogistikPro sale" />
    </div>
  ),
}
/** Next to a disabled peer checkbox — label dims via `peer-disabled`. */
export const DisabledPeer: Story = {
  args: { htmlFor: 'locked', children: 'Share with Team A' },
  render: (args) => (
    <div className="flex items-center gap-(--spacing-sm)">
      <Checkbox id="locked" disabled />
      <Label {...args} />
    </div>
  ),
}

/** Label states side by side. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_auto] items-center justify-start gap-(--spacing-lg)">
      <code className="ds-meta text-foreground-muted">default</code>
      <Label>Deal name</Label>
      <code className="ds-meta text-foreground-muted">with icon</code>
      <Label><LockIcon /> NDA required</Label>
      <code className="ds-meta text-foreground-muted">peer enabled</code>
      <div className="flex items-center gap-(--spacing-sm)">
        <Checkbox id="lbl-on" defaultChecked />
        <Label htmlFor="lbl-on">Assigned to Maria Volkova</Label>
      </div>
      <code className="ds-meta text-foreground-muted">peer disabled</code>
      <div className="flex items-center gap-(--spacing-sm)">
        <Checkbox id="lbl-off" disabled />
        <Label htmlFor="lbl-off">Assigned to Dmitry Kuznetsov</Label>
      </div>
    </div>
  ),
}
