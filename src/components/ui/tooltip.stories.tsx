import type { Meta, StoryObj } from '@storybook/react-vite'
import { LockIcon } from 'lucide-react'
import { Button } from './button'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

const SIDES = ['top', 'right', 'bottom', 'left'] as const

/**
 * Short hint on hover / focus. `side`: top | right | bottom | left.
 * Composed from Tooltip → TooltipTrigger + TooltipContent; TooltipProvider is a global decorator.
 */
const meta = {
  title: 'Components/Tooltip',
  component: TooltipContent,
  tags: ['autodocs'],
  args: { side: 'top', sideOffset: 0, children: 'NDA not signed — sending is blocked' },
  argTypes: {
    side: { control: 'inline-radio', options: SIDES, description: 'Placement relative to the trigger' },
    sideOffset: { control: 'number', description: 'Distance from the trigger, px' },
    children: { control: 'text', description: 'Tooltip text' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" aria-label="NDA status"><LockIcon /></Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
} satisfies Meta<typeof TooltipContent>
export default meta
type Story = StoryObj<typeof meta>

/** Trigger-driven — hover or focus the icon button. */
export const Default: Story = {}
export const Top: Story = { args: { side: 'top' } }
export const Right: Story = { args: { side: 'right' } }
export const Bottom: Story = { args: { side: 'bottom' } }
export const Left: Story = { args: { side: 'left' } }

/** Open state via `defaultOpen`. */
export const Open: Story = {
  parameters: { docs: { story: { height: '160px' } } },
  render: (args) => (
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" aria-label="NDA status"><LockIcon /></Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
}

/** Side matrix — all four tooltips open at once. */
export const AllVariants: Story = {
  parameters: { layout: 'padded', docs: { story: { height: '360px' } } },
  render: () => (
    <div className="grid grid-cols-2 place-items-center gap-(--spacing-4xl) p-(--padding-4xl)">
      {SIDES.map((side) => (
        <div key={side} className="flex flex-col items-center gap-(--spacing-sm)">
          <code className="ds-meta text-foreground-muted">side={side}</code>
          <Tooltip defaultOpen>
            <TooltipTrigger asChild>
              <Button variant="outline">LogistikPro sale</Button>
            </TooltipTrigger>
            <TooltipContent side={side}>Due Diligence</TooltipContent>
          </Tooltip>
        </div>
      ))}
    </div>
  ),
}
