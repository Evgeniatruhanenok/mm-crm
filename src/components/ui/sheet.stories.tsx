import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileTextIcon } from 'lucide-react'
import { Button } from './button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet'

const SIDES = ['top', 'right', 'bottom', 'left'] as const

/**
 * Side panel sliding in from a screen edge (deal quick view, filters). `side`: top | right | bottom | left.
 * Composed from Sheet → SheetTrigger + SheetContent (SheetHeader / SheetTitle / SheetDescription / SheetFooter).
 */
const meta = {
  title: 'Components/Sheet',
  component: SheetContent,
  tags: ['autodocs'],
  args: { side: 'right', showCloseButton: true },
  argTypes: {
    side: { control: 'inline-radio', options: SIDES, description: 'Edge the panel slides in from' },
    showCloseButton: { control: 'boolean', description: 'Show the X close button in the corner' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open deal panel</Button>
      </SheetTrigger>
      <SheetContent {...args}>
        <SheetHeader>
          <SheetTitle>LogistikPro sale</SheetTitle>
          <SheetDescription>Due Diligence · Maria Volkova (VP) · Zone A</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-(--spacing-xs) px-(--padding-md)">
          <span className="ds-meta text-foreground-muted">Last activity</span>
          <span className="ds-title-sm text-foreground-default">Re: LogistikPro CIM v2 — financial model questions</span>
        </div>
        <SheetFooter>
          <Button><FileTextIcon /> Open deal</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
} satisfies Meta<typeof SheetContent>
export default meta
type Story = StoryObj<typeof meta>

/** Trigger-driven — click the button to open the panel. */
export const Default: Story = {}
export const Top: Story = { args: { side: 'top' } }
export const Right: Story = { args: { side: 'right' } }
export const Bottom: Story = { args: { side: 'bottom' } }
export const Left: Story = { args: { side: 'left' } }
export const WithoutCloseButton: Story = { args: { showCloseButton: false } }

/** Open state (`defaultOpen`). Rendered in an iframe in docs so the modal does not cover the page. */
export const Open: Story = {
  parameters: { docs: { story: { inline: false, height: '480px' } } },
  render: (args) => (
    <Sheet defaultOpen>
      <SheetTrigger asChild>
        <Button variant="outline">Open deal panel</Button>
      </SheetTrigger>
      <SheetContent {...args}>
        <SheetHeader>
          <SheetTitle>TechnoPark IPO prep</SheetTitle>
          <SheetDescription>LOI / Term Sheet · Dmitry Kuznetsov (Associate)</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}

/** Side matrix — one trigger per side. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_auto] items-center gap-(--spacing-lg)">
      {SIDES.map((side) => (
        <div key={side} className="contents">
          <code className="ds-meta text-foreground-muted">side={side}</code>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open {side}</Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>RosMedia acquisition</SheetTitle>
                <SheetDescription>Prospecting · Maria Volkova (VP)</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      ))}
    </div>
  ),
}
