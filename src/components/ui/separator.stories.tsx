import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from './separator'

const ORIENTATIONS = ['horizontal', 'vertical'] as const

/**
 * Thin horizontal or vertical divider. `decorative` hides it from assistive tech.
 */
const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  args: { orientation: 'horizontal', decorative: true },
  argTypes: {
    orientation: { control: 'inline-radio', options: ORIENTATIONS, description: 'Direction' },
    decorative: { control: 'boolean', description: 'Purely visual (role="none") vs. semantic separator' },
    className: { control: 'text', description: 'Extra classes' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <div
      className={
        args.orientation === 'vertical'
          ? 'flex h-6 items-center gap-(--spacing-md) ds-small'
          : 'flex w-80 flex-col gap-(--spacing-md) ds-small'
      }
    >
      <span>Pipeline</span>
      <Separator {...args} />
      <span>Contacts</span>
      <Separator {...args} />
      <span>Compliance</span>
    </div>
  ),
} satisfies Meta<typeof Separator>
export default meta
type Story = StoryObj<typeof meta>

/** orientation=horizontal. */
export const Horizontal: Story = {}
/** orientation=vertical — inline nav. */
export const Vertical: Story = { args: { orientation: 'vertical' } }

/** Orientation matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_auto] items-center gap-(--spacing-lg)">
      <code className="ds-meta text-foreground-muted">horizontal</code>
      <div className="flex w-80 flex-col gap-(--spacing-sm) ds-small">
        <span className="ds-label-sm">LogistikPro sale</span>
        <Separator />
        <span className="text-foreground-muted">Sell-side · EV $48M</span>
      </div>
      <code className="ds-meta text-foreground-muted">vertical</code>
      <div className="flex h-6 items-center gap-(--spacing-md) ds-small">
        <span>Activity</span>
        <Separator orientation="vertical" />
        <span>Documents</span>
        <Separator orientation="vertical" />
        <span>Buyer List</span>
      </div>
    </div>
  ),
}
