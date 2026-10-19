import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from './select'

const STAGES = ['Prospecting', 'NDA Signed', 'Due Diligence', 'LOI', 'Term Sheet', 'Closing'] as const

function StageSelect({ size = 'default', invalid = false }: { size?: 'sm' | 'default'; invalid?: boolean }) {
  return (
    <>
      <SelectTrigger size={size} aria-invalid={invalid} className="w-48">
        <SelectValue placeholder="Select stage" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pipeline stage</SelectLabel>
          {STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
        </SelectGroup>
        <SelectSeparator />
        <SelectItem value="Lost" disabled>Lost (archived)</SelectItem>
      </SelectContent>
    </>
  )
}

/**
 * Single-choice dropdown: Trigger + Content + Item. size default | sm × state default / open / disabled.
 * Error state via `aria-invalid` on the trigger.
 */
const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: { disabled: false },
  argTypes: {
    defaultValue: { control: 'select', options: STAGES, description: 'Initial value (uncontrolled)' },
    defaultOpen: { control: 'boolean', description: 'Open on mount — state=open' },
    disabled: { control: 'boolean', description: 'state=disabled' },
    required: { control: 'boolean', description: 'Mark as required for forms' },
    name: { control: 'text', description: 'Form field name' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Select {...args}>
      <StageSelect />
    </Select>
  ),
} satisfies Meta<typeof Select>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithValue: Story = { args: { defaultValue: 'Due Diligence' } }
/** state=open — content rendered on mount. */
export const Open: Story = { args: { defaultOpen: true, defaultValue: 'LOI' }, parameters: { layout: 'padded' } }
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Closing' } }
/** size=sm trigger. */
export const Small: Story = { render: (args) => <Select {...args}><StageSelect size="sm" /></Select> }
/** Error — `aria-invalid` on the trigger. */
export const Error: Story = { render: (args) => <Select {...args}><StageSelect invalid /></Select> }

/** Size × State matrix (open state: see the `Open` story). */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(4,auto)] items-center justify-start gap-(--spacing-lg)">
      <span />
      {['Placeholder', 'Value', 'Error', 'Disabled'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {(['default', 'sm'] as const).map((sz) => (
        <div key={sz} className="contents">
          <code className="ds-meta text-foreground-muted">{sz}</code>
          <Select><StageSelect size={sz} /></Select>
          <Select defaultValue="NDA Signed"><StageSelect size={sz} /></Select>
          <Select defaultValue="Term Sheet"><StageSelect size={sz} invalid /></Select>
          <Select defaultValue="Closing" disabled><StageSelect size={sz} /></Select>
        </div>
      ))}
    </div>
  ),
}
