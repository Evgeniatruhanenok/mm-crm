import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './progress'

/**
 * Horizontal progress indicator (Radix Progress). No variants — only `value` 0–100.
 * Used e.g. for due diligence checklist completion.
 */
const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: { value: 60, max: 100, className: 'w-72' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, description: 'Current value (0–max)' },
    max: { control: 'number', description: 'Maximum value' },
    className: { control: 'text', description: 'Extra classes (width)' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Progress>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Empty: Story = { args: { value: 0 } }
export const Complete: Story = { args: { value: 100 } }
/** With label — DD checklist completion for a deal. */
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex w-72 flex-col gap-(--spacing-xs)">
      <div className="flex justify-between">
        <span className="ds-label-sm text-foreground">RosMedia acquisition — DD checklist</span>
        <span className="ds-meta text-foreground-muted">{args.value}%</span>
      </div>
      <Progress {...args} className="w-full" />
    </div>
  ),
}

/** Value range overview. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid w-96 grid-cols-[auto_1fr] items-center gap-(--spacing-md)">
      {[0, 25, 50, 75, 100].map((v) => (
        <div key={v} className="contents">
          <code className="ds-meta text-foreground-muted">value={v}</code>
          <Progress value={v} />
        </div>
      ))}
    </div>
  ),
}
