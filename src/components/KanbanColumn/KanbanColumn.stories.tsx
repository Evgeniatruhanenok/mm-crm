import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { KanbanColumn } from './KanbanColumn'
import { KanbanCard } from '../KanbanCard'
import { STAGES, type Stage } from '../tones'

const CARDS = [
  { dealName: 'LogistikPro sale', dealType: 'Sell-side', team: 'MV', date: 'Jun 3, 2026' },
  { dealName: 'TechnoPark IPO prep', dealType: 'IPO', team: 'DK', date: 'Jun 12, 2026' },
  { dealName: 'RosMedia acquisition', dealType: 'Buy-side', team: 'MV, DK', date: 'Jul 1, 2026' },
]

function cardsFor(stage: Stage, n = CARDS.length) {
  return CARDS.slice(0, n).map((c) => <KanbanCard key={c.dealName} stage={stage} {...c} />)
}

/**
 * Kanban board column (216px): stage title + counter, a list of KanbanCard, and an add button.
 * Variants: stage (5). `count` defaults to the number of children.
 */
const meta = {
  title: 'M&A/KanbanColumn',
  component: KanbanColumn,
  tags: ['autodocs'],
  args: { stage: 'Due Diligence', onAdd: fn() },
  argTypes: {
    stage: { control: 'select', options: STAGES, description: 'Deal stage shown in the header; cards inherit it' },
    count: { control: 'number', description: 'Header counter (defaults to children count)' },
    onAdd: { action: 'add', description: 'Click on the add button' },
  },
  parameters: { layout: 'padded' },
  render: (args) => <KanbanColumn {...args}>{cardsFor(args.stage)}</KanbanColumn>,
} satisfies Meta<typeof KanbanColumn>
export default meta
type Story = StoryObj<typeof meta>

export const Prospecting: Story = { args: { stage: 'Prospecting' } }
export const NdaSigned: Story = { args: { stage: 'NDA Signed' } }
export const DueDiligence: Story = {}
export const LoiTermSheet: Story = { args: { stage: 'LOI / Term Sheet' } }
export const Closing: Story = { args: { stage: 'Closing' } }
/** Empty column — header counter shows 0. */
export const Empty: Story = { args: { stage: 'Closing' }, render: (args) => <KanbanColumn {...args} /> }
/** Explicit `count` larger than the rendered cards (virtualized / collapsed list). */
export const CustomCount: Story = { args: { count: 12 } }

/** Full pipeline — one column per stage. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex items-start gap-(--spacing-md)">
      {STAGES.map((stage, i) => (
        <div key={stage} className="flex flex-col gap-(--spacing-xs)">
          <code className="ds-meta text-foreground-muted">{stage}</code>
          <KanbanColumn stage={stage}>{cardsFor(stage, (i % 3) + 1)}</KanbanColumn>
        </div>
      ))}
    </div>
  ),
}
