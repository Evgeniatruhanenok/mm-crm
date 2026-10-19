import type { Meta, StoryObj } from '@storybook/react-vite'
import { StageBadge } from './StageBadge'
import { STAGES } from '../tones'

const SIZES = ['default', 'sm'] as const

/**
 * Colored deal-stage badge for Kanban, tables and the deal header. 5 stages × 2 sizes (`sm` is used inside KanbanCard).
 * Colors: Prospecting→Zinc, NDA Signed→Emerald, Due Diligence→Blue, LOI→Violet, Closing→Amber.
 */
const meta = {
  title: 'M&A/StageBadge',
  component: StageBadge,
  tags: ['autodocs'],
  args: { stage: 'Prospecting', size: 'default' },
  argTypes: {
    stage: { control: 'select', options: STAGES, description: 'Deal stage — drives color and default label' },
    size: { control: 'inline-radio', options: SIZES, description: 'default — standalone; sm — compact inside KanbanCard' },
    children: { control: 'text', description: 'Custom label (defaults to the stage name)' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof StageBadge>
export default meta
type Story = StoryObj<typeof meta>

export const Prospecting: Story = {}
export const NdaSigned: Story = { args: { stage: 'NDA Signed' } }
export const DueDiligence: Story = { args: { stage: 'Due Diligence' } }
export const LoiTermSheet: Story = { args: { stage: 'LOI / Term Sheet' } }
export const Closing: Story = { args: { stage: 'Closing' } }
/** Compact size used inside KanbanCard. */
export const Small: Story = { args: { stage: 'Due Diligence', size: 'sm' } }

/** Stage × size matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(2,auto)] items-center justify-start gap-(--spacing-lg)">
      <span />
      {SIZES.map((s) => <code key={s} className="ds-meta text-foreground-muted">size={s}</code>)}
      {STAGES.map((stage) => (
        <div key={stage} className="contents">
          <code className="ds-meta text-foreground-muted">{stage}</code>
          {SIZES.map((s) => <StageBadge key={s} stage={stage} size={s} />)}
        </div>
      ))}
    </div>
  ),
}
