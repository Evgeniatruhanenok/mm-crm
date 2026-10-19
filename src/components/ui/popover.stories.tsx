import type { Meta, StoryObj } from '@storybook/react-vite'
import { FilterIcon } from 'lucide-react'
import { Button } from './button'
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from './popover'

const SIDES = ['top', 'right', 'bottom', 'left'] as const

/**
 * Small floating panel anchored to a trigger (quick filters, inline details). No visual variants.
 * Composed from Popover → PopoverTrigger + PopoverContent (PopoverHeader / PopoverTitle / PopoverDescription).
 */
const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  args: { defaultOpen: false, modal: false },
  argTypes: {
    defaultOpen: { control: 'boolean', description: 'Initial open state (uncontrolled)' },
    modal: { control: 'boolean', description: 'Trap focus and block outside interaction' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline"><FilterIcon /> Filter deals</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Pipeline filter</PopoverTitle>
          <PopoverDescription>Showing 3 deals owned by Maria Volkova (VP) in Zone A.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
} satisfies Meta<typeof Popover>
export default meta
type Story = StoryObj<typeof meta>

/** Trigger-driven — click to open. */
export const Default: Story = {}
/** Open state via `defaultOpen`. */
export const Open: Story = { args: { defaultOpen: true }, parameters: { docs: { story: { height: '240px' } } } }

/** Placement matrix — all four sides open at once. */
export const AllVariants: Story = {
  parameters: { layout: 'padded', docs: { story: { height: '520px' } } },
  render: () => (
    <div className="grid grid-cols-2 place-items-center gap-(--spacing-4xl) p-(--padding-4xl)">
      {SIDES.map((side) => (
        <div key={side} className="flex flex-col items-center gap-(--spacing-sm)">
          <code className="ds-meta text-foreground-muted">side={side}</code>
          <Popover defaultOpen>
            <PopoverTrigger asChild>
              <Button variant="outline">RosMedia acquisition</Button>
            </PopoverTrigger>
            <PopoverContent side={side} className="w-56">
              <PopoverTitle>Prospecting</PopoverTitle>
              <PopoverDescription>Owner: Dmitry Kuznetsov (Associate)</PopoverDescription>
            </PopoverContent>
          </Popover>
        </div>
      ))}
    </div>
  ),
}
