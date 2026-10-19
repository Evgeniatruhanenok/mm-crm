import type { Meta, StoryObj } from '@storybook/react-vite'
import { KanbanCard } from './KanbanCard'
import { STAGES, type Stage } from '../tones'

const DEALS: Record<Stage, { dealName: string; dealType: string; team: string; date: string }> = {
  Prospecting: { dealName: 'RosMedia acquisition', dealType: 'Buy-side', team: 'MV, DK', date: 'Jun 3, 2026' },
  'NDA Signed': { dealName: 'LogistikPro sale', dealType: 'Sell-side', team: 'MV', date: 'Jun 5, 2026' },
  'Due Diligence': { dealName: 'TechnoPark IPO prep', dealType: 'IPO', team: 'DK', date: 'Jun 12, 2026' },
  'LOI / Term Sheet': { dealName: 'LogistikPro sale', dealType: 'Sell-side', team: 'MV, DK', date: 'Jul 1, 2026' },
  Closing: { dealName: 'RosMedia acquisition', dealType: 'Buy-side', team: 'MV', date: 'Aug 20, 2026' },
}

/**
 * Deal card in a Kanban column (196px wide, auto height): name, type · team, date, compact StageBadge.
 * Variants: stage (5).
 */
const meta = {
  title: 'M&A/KanbanCard',
  component: KanbanCard,
  tags: ['autodocs'],
  args: { stage: 'Due Diligence', ...DEALS['Due Diligence'] },
  argTypes: {
    stage: { control: 'select', options: STAGES, description: 'Deal stage — drives the badge' },
    dealName: { control: 'text', description: 'Deal name' },
    dealType: { control: 'text', description: 'Deal type (Sell-side, Buy-side, IPO…)' },
    team: { control: 'text', description: 'Team initials' },
    date: { control: 'text', description: 'Last update / key date' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof KanbanCard>
export default meta
type Story = StoryObj<typeof meta>

export const Prospecting: Story = { args: { stage: 'Prospecting', ...DEALS.Prospecting } }
export const NdaSigned: Story = { args: { stage: 'NDA Signed', ...DEALS['NDA Signed'] } }
export const DueDiligence: Story = {}
export const LoiTermSheet: Story = { args: { stage: 'LOI / Term Sheet', ...DEALS['LOI / Term Sheet'] } }
export const Closing: Story = { args: { stage: 'Closing', ...DEALS.Closing } }

/** All stages side by side. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-start gap-(--spacing-lg)">
      {STAGES.map((stage) => (
        <div key={stage} className="flex flex-col gap-(--spacing-xs)">
          <code className="ds-meta text-foreground-muted">{stage}</code>
          <KanbanCard stage={stage} {...DEALS[stage]} />
        </div>
      ))}
    </div>
  ),
}
