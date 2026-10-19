import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

const TYPES = ['single', 'multiple'] as const

const SECTIONS = [
  { value: 'overview', title: 'Deal overview', body: 'LogistikPro sale — sell-side mandate, EV $48M, lead banker Maria Volkova.' },
  { value: 'buyers', title: 'Buyer List', body: '24 strategic and 11 financial buyers contacted; 12 signed NDA.' },
  { value: 'compliance', title: 'Compliance', body: 'Chinese Wall active between LogistikPro sale and TechnoPark IPO prep teams.' },
]

function Items({ disabledLast = false }: { disabledLast?: boolean }) {
  return SECTIONS.map((s, i) => (
    <AccordionItem key={s.value} value={s.value} disabled={disabledLast && i === SECTIONS.length - 1}>
      <AccordionTrigger>{s.title}</AccordionTrigger>
      <AccordionContent>{s.body}</AccordionContent>
    </AccordionItem>
  ))
}

/**
 * Expandable list of sections. `type="single"` keeps one section open, `type="multiple"` allows several.
 * Each item is collapsed | expanded.
 */
const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: { type: 'single', collapsible: true, className: 'w-96' },
  argTypes: {
    type: { control: 'inline-radio', options: TYPES, description: 'single — one open item; multiple — several' },
    collapsible: { control: 'boolean', description: 'type=single only: allow closing the open item' },
    disabled: { control: 'boolean', description: 'Disable all items' },
    defaultValue: { control: 'object', description: 'Initially expanded item(s): string for single, string[] for multiple' },
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'], description: 'Keyboard navigation orientation' },
    className: { control: 'text', description: 'Extra classes (e.g. width)' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Accordion {...args}>
      <Items />
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>
export default meta
type Story = StoryObj<typeof meta>

/** All items collapsed. */
export const Collapsed: Story = {}
/** First item expanded (`defaultValue`). */
export const Expanded: Story = { args: { type: 'single', defaultValue: 'overview' } }
/** Several items expanded at once. */
export const Multiple: Story = { render: () => <Accordion type="multiple" defaultValue={['overview', 'buyers']} className="w-96"><Items /></Accordion> }
/** Item-level disabled state. */
export const DisabledItem: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Items disabledLast />
    </Accordion>
  ),
}

/** Type × state matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(2,auto)] items-start gap-(--spacing-lg)">
      <span />
      {['Collapsed', 'Expanded'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      <code className="ds-meta text-foreground-muted">single</code>
      <Accordion type="single" collapsible className="w-80"><Items /></Accordion>
      <Accordion type="single" collapsible defaultValue="overview" className="w-80"><Items /></Accordion>
      <code className="ds-meta text-foreground-muted">multiple</code>
      <Accordion type="multiple" className="w-80"><Items /></Accordion>
      <Accordion type="multiple" defaultValue={['overview', 'buyers']} className="w-80"><Items /></Accordion>
    </div>
  ),
}
