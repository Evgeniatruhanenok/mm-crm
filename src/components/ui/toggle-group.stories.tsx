import type { Meta, StoryObj } from '@storybook/react-vite'
import { KanbanIcon, ListIcon, TableIcon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from './toggle-group'

const VARIANTS = ['default', 'outline'] as const
const SIZES = ['sm', 'default', 'lg'] as const
const STAGES = ['Prospecting', 'NDA Signed', 'Due Diligence', 'LOI'] as const

/**
 * Group of toggles — switch between options (e.g. Kanban / Table / List view of the pipeline).
 * type: single | multiple × variant: default | outline; `spacing={0}` renders a joined segmented control.
 */
const meta = {
  title: 'Components/Toggle Group',
  component: ToggleGroup,
  tags: ['autodocs'],
  args: { type: 'single', variant: 'outline', size: 'default', spacing: 0, orientation: 'horizontal', disabled: false, defaultValue: 'kanban' },
  argTypes: {
    type: { control: 'inline-radio', options: ['single', 'multiple'], description: 'Selection mode' },
    variant: { control: 'inline-radio', options: VARIANTS, description: 'Visual variant (applied to all items)' },
    size: { control: 'inline-radio', options: SIZES, description: 'Size (applied to all items)' },
    spacing: { control: 'number', description: 'Gap between items in spacing units; 0 = joined segmented control' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'], description: 'Layout direction' },
    disabled: { control: 'boolean', description: 'Disable the whole group' },
    defaultValue: { control: 'object', description: 'Initial value: string for single, string[] for multiple' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="kanban" aria-label="Kanban"><KanbanIcon /> Kanban</ToggleGroupItem>
      <ToggleGroupItem value="table" aria-label="Table"><TableIcon /> Table</ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List"><ListIcon /> List</ToggleGroupItem>
    </ToggleGroup>
  ),
} satisfies Meta<typeof ToggleGroup>
export default meta
type Story = StoryObj<typeof meta>

/** Single select, outline, joined — pipeline view switcher. */
export const Default: Story = {}
export const DefaultVariant: Story = { args: { variant: 'default', spacing: 1 } }
/** type=multiple — stage filter, several can be on. */
export const Multiple: Story = {
  args: { type: 'multiple', defaultValue: ['NDA Signed', 'Due Diligence'] },
  render: (args) => (
    <ToggleGroup {...args}>
      {STAGES.map((s) => <ToggleGroupItem key={s} value={s}>{s}</ToggleGroupItem>)}
    </ToggleGroup>
  ),
}
export const Disabled: Story = { args: { disabled: true } }
export const Vertical: Story = { args: { orientation: 'vertical' } }
export const Small: Story = { args: { size: 'sm' } }

/** type × variant matrix (joined and spaced). */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(3,auto)] items-center justify-start gap-(--spacing-lg)">
      <span />
      {['single', 'multiple', 'disabled'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {VARIANTS.flatMap((v) => [0, 1].map((sp) => (
        <div key={`${v}-${sp}`} className="contents">
          <code className="ds-meta text-foreground-muted">{v} · spacing={sp}</code>
          <ToggleGroup type="single" variant={v} spacing={sp} defaultValue="kanban">
            <ToggleGroupItem value="kanban" aria-label="Kanban"><KanbanIcon /></ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Table"><TableIcon /></ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List"><ListIcon /></ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="multiple" variant={v} spacing={sp} defaultValue={['NDA Signed', 'LOI']}>
            {STAGES.map((s) => <ToggleGroupItem key={s} value={s}>{s}</ToggleGroupItem>)}
          </ToggleGroup>
          <ToggleGroup type="single" variant={v} spacing={sp} defaultValue="kanban" disabled>
            <ToggleGroupItem value="kanban" aria-label="Kanban"><KanbanIcon /></ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Table"><TableIcon /></ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List"><ListIcon /></ToggleGroupItem>
          </ToggleGroup>
        </div>
      )))}
      <code className="ds-meta text-foreground-muted">sizes</code>
      {SIZES.map((s) => (
        <ToggleGroup key={s} type="single" variant="outline" spacing={0} size={s} defaultValue="kanban">
          <ToggleGroupItem value="kanban">Kanban</ToggleGroupItem>
          <ToggleGroupItem value="table">Table</ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  ),
}
