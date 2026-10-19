import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatsMetric } from './StatsMetric'

const VARIANTS = ['default', 'highlighted'] as const

/**
 * Metric tile in a StatsBar (Audit Log, Dashboard). `variant`: default | highlighted (amber — for anomalies).
 */
const meta = {
  title: 'M&A/StatsMetric',
  component: StatsMetric,
  tags: ['autodocs'],
  args: { value: '1,247', label: 'Total records', variant: 'default' },
  argTypes: {
    value: { control: 'text', description: 'Metric value' },
    label: { control: 'text', description: 'Metric caption' },
    variant: { control: 'inline-radio', options: VARIANTS, description: 'highlighted — anomaly, amber background' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof StatsMetric>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
/** Anomaly — draws attention. */
export const Highlighted: Story = { args: { value: '3', label: 'Blocked NDA sends', variant: 'highlighted' } }

/** Variant matrix as it appears in a StatsBar row. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(3,auto)] items-center justify-start gap-(--spacing-lg)">
      <code className="ds-meta text-foreground-muted">default</code>
      <StatsMetric value="1,247" label="Total records" />
      <StatsMetric value="18" label="Active deals" />
      <StatsMetric value="42" label="Emails captured today" />
      <code className="ds-meta text-foreground-muted">highlighted</code>
      <StatsMetric value="3" label="Blocked NDA sends" variant="highlighted" />
      <StatsMetric value="2" label="Chinese Wall conflicts" variant="highlighted" />
      <span />
    </div>
  ),
}
