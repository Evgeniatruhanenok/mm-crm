import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollArea, ScrollBar } from './scroll-area'
import { Separator } from './separator'

const EVENTS = [
  'Maria Volkova sent teaser to Atlas Capital',
  'NDA signed — Nordic Freight Group',
  'LogistikPro sale moved to Due Diligence',
  'Data room opened for 12 buyers',
  'IOI received from Baltic Partners',
  'Chinese Wall updated: TechnoPark IPO prep',
  'Call logged with CFO, LogistikPro',
  'Audit Log export requested',
  'Buyer List updated: 3 new strategics',
  'Management presentation scheduled',
  'LOI draft shared with counsel',
  'TechnoPark IPO prep kick-off meeting',
]
const BUYERS = ['Atlas Capital', 'Nordic Freight', 'Baltic Partners', 'Helios PE', 'Vector Logistics', 'Orion Holdings', 'Sigma Ventures']

/**
 * Container with a custom thin scrollbar. No variants — wrapper only.
 * Vertical by default; add `<ScrollBar orientation="horizontal" />` for horizontal scrolling.
 */
const meta = {
  title: 'Components/Scroll Area',
  component: ScrollArea,
  tags: ['autodocs'],
  args: { type: 'hover', className: 'h-72 w-80 rounded-md border' },
  argTypes: {
    type: { control: 'inline-radio', options: ['auto', 'always', 'scroll', 'hover'], description: 'Scrollbar visibility behaviour' },
    scrollHideDelay: { control: 'number', description: 'Delay (ms) before hiding the scrollbar (type=hover|scroll)' },
    dir: { control: 'inline-radio', options: ['ltr', 'rtl'], description: 'Reading direction' },
    className: { control: 'text', description: 'Size and border classes — the area needs a fixed height/width' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="flex flex-col p-(--padding-md)">
        <span className="ds-label-sm pb-(--padding-sm)">Activity — LogistikPro sale</span>
        {EVENTS.map((e) => (
          <div key={e}>
            <div className="ds-small py-(--padding-xs)">{e}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
} satisfies Meta<typeof ScrollArea>
export default meta
type Story = StoryObj<typeof meta>

/** Vertical scrolling activity feed. */
export const Vertical: Story = {}
/** Scrollbar always visible. */
export const AlwaysVisible: Story = { args: { type: 'always' } }
/** Horizontal scrolling — buyer cards row. */
export const Horizontal: Story = {
  args: { className: 'w-96 rounded-md border whitespace-nowrap' },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="flex w-max gap-(--spacing-md) p-(--padding-md)">
        {BUYERS.map((b) => (
          <div key={b} className="w-40 rounded-md border p-(--padding-sm) ds-small">{b}</div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}

/** Orientation matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_auto] items-start gap-(--spacing-lg)">
      <code className="ds-meta text-foreground-muted">vertical</code>
      <ScrollArea type="always" className="h-48 w-80 rounded-md border">
        <div className="flex flex-col p-(--padding-md)">
          {EVENTS.map((e) => <div key={e} className="ds-small py-(--padding-xs)">{e}</div>)}
        </div>
      </ScrollArea>
      <code className="ds-meta text-foreground-muted">horizontal</code>
      <ScrollArea type="always" className="w-96 rounded-md border whitespace-nowrap">
        <div className="flex w-max gap-(--spacing-md) p-(--padding-md)">
          {BUYERS.map((b) => <div key={b} className="w-40 rounded-md border p-(--padding-sm) ds-small">{b}</div>)}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  ),
}
