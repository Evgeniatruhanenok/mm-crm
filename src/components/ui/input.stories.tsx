import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './input'
import { Label } from './label'

const TYPES = ['text', 'email', 'number', 'password', 'search', 'file'] as const

/**
 * Single-line text field. States default / focus / error (`aria-invalid`) / disabled.
 * Size sm is achieved via `className="h-8"` (no size prop in code).
 */
const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { type: 'text', placeholder: 'e.g. LogistikPro sale', disabled: false, 'aria-invalid': false },
  argTypes: {
    type: { control: 'select', options: TYPES, description: 'Native input type' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    defaultValue: { control: 'text', description: 'Initial value (uncontrolled)' },
    disabled: { control: 'boolean', description: 'state=disabled' },
    'aria-invalid': { control: 'boolean', description: 'state=error — destructive border + ring' },
    autoFocus: { control: 'boolean', description: 'Focus on mount (state=focus)' },
    className: { control: 'text', description: 'Extra classes, e.g. `h-8` for size sm' },
  },
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
} satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Filled: Story = { args: { defaultValue: 'TechnoPark IPO prep' } }
/** state=focus — focused on mount, shows the ring. */
export const Focus: Story = { args: { autoFocus: true, defaultValue: 'RosMedia acquisition' } }
/** state=error — set `aria-invalid`. */
export const Error: Story = { args: { 'aria-invalid': true, type: 'email', defaultValue: 'maria.volkova@' } }
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Team A' } }
/** size=sm — `h-8`. */
export const Small: Story = { args: { className: 'h-8' } }
/** With label and helper text. */
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-col gap-(--spacing-sm)">
      <Label htmlFor="deal-name">Deal name</Label>
      <Input id="deal-name" {...args} />
      <p className="ds-meta text-foreground-muted">Shown on the Kanban card.</p>
    </div>
  ),
}

/** State × size matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(4,16rem)] items-center gap-(--spacing-lg)">
      <span />
      {['Default', 'Filled', 'Error', 'Disabled'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {[{ name: 'default', cls: '' }, { name: 'sm', cls: 'h-8' }].map(({ name, cls }) => (
        <div key={name} className="contents">
          <code className="ds-meta text-foreground-muted">{name}</code>
          <Input className={cls} placeholder="Deal name" />
          <Input className={cls} defaultValue="LogistikPro sale" />
          <Input className={cls} defaultValue="maria.volkova@" aria-invalid />
          <Input className={cls} defaultValue="Team A" disabled />
        </div>
      ))}
    </div>
  ),
}
