import type { Meta, StoryObj } from '@storybook/react-vite'
import { SendIcon } from 'lucide-react'
import { Button } from './button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer'

const DIRECTIONS = ['bottom', 'top', 'left', 'right'] as const

/**
 * Mobile-first bottom panel (vaul). No visual variants in the DS; `direction` is a vaul prop shown for completeness.
 * Composed from Drawer → DrawerTrigger + DrawerContent (DrawerHeader / DrawerTitle / DrawerDescription / DrawerFooter).
 */
const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  args: { direction: 'bottom', modal: true },
  argTypes: {
    direction: { control: 'inline-radio', options: DIRECTIONS, description: 'Edge the drawer slides in from (default bottom)' },
    defaultOpen: { control: 'boolean', description: 'Initial open state (uncontrolled)' },
    modal: { control: 'boolean', description: 'Block interaction with the page behind' },
    shouldScaleBackground: { control: 'boolean', description: 'Scale page background while open' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Send NDA</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Send NDA — LogistikPro sale</DrawerTitle>
          <DrawerDescription>Recipient: Ivan Petrov (CFO). NDA status is checked before sending.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button><SendIcon /> Send</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
} satisfies Meta<typeof Drawer>
export default meta
type Story = StoryObj<typeof meta>

/** Trigger-driven — click the button to open. */
export const Default: Story = {}

/** Open state (`defaultOpen`). Rendered in an iframe in docs so the modal does not cover the page. */
export const Open: Story = {
  args: { defaultOpen: true },
  parameters: { docs: { story: { inline: false, height: '420px' } } },
}

/** Direction matrix — one trigger per edge. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_auto] items-center gap-(--spacing-lg)">
      {DIRECTIONS.map((d) => (
        <div key={d} className="contents">
          <code className="ds-meta text-foreground-muted">direction={d}</code>
          <Drawer direction={d}>
            <DrawerTrigger asChild>
              <Button variant="outline">Open {d}</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>TechnoPark IPO prep</DrawerTitle>
                <DrawerDescription>LOI / Term Sheet · Dmitry Kuznetsov (Associate)</DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </div>
      ))}
    </div>
  ),
}
