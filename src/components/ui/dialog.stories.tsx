import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import { Input } from './input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'

/** "New deal" form dialog body. */
function NewDealContent({ showCloseButton = true }: { showCloseButton?: boolean }) {
  return (
    <DialogContent showCloseButton={showCloseButton}>
      <DialogHeader>
        <DialogTitle>New deal</DialogTitle>
        <DialogDescription>Create a deal card in the Pipeline. Lead banker: Maria Volkova.</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-(--spacing-sm)">
        <label className="ds-label-sm" htmlFor="deal-name">Deal name</label>
        <Input id="deal-name" defaultValue="LogistikPro sale" />
      </div>
      <DialogFooter>
        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
        <Button>Create deal</Button>
      </DialogFooter>
    </DialogContent>
  )
}

/**
 * Modal dialog that blocks the background. No variants — composed from Content, Header, Footer, Title, Description.
 * `DialogContent` can hide the close (×) button via `showCloseButton={false}`.
 */
const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: { modal: true },
  argTypes: {
    defaultOpen: { control: 'boolean', description: 'Initial open state (uncontrolled)' },
    open: { control: 'boolean', description: 'Controlled open state' },
    modal: { control: 'boolean', description: 'Block interaction outside and trap focus' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild><Button>New deal</Button></DialogTrigger>
      <NewDealContent />
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>
export default meta
type Story = StoryObj<typeof meta>

/** Closed — click the trigger to open. */
export const WithTrigger: Story = {}
/** Opened by default (`defaultOpen`) so the content is visible in docs. */
export const Open: Story = { args: { defaultOpen: true } }
/** Without the corner close (×) button. */
export const NoCloseButton: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild><Button>New deal</Button></DialogTrigger>
      <NewDealContent showCloseButton={false} />
    </Dialog>
  ),
}
/** Read-only info dialog with a footer close button (`DialogFooter showCloseButton`). */
export const Informational: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild><Button variant="outline">Deal details</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>TechnoPark IPO prep</DialogTitle>
          <DialogDescription>IPO readiness mandate · Prospecting · Owner: Maria Volkova</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  ),
}

/** Triggers for each configuration — click to open. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_auto] items-center gap-(--spacing-lg)">
      <code className="ds-meta text-foreground-muted">form + close (×)</code>
      <Dialog>
        <DialogTrigger asChild><Button>New deal</Button></DialogTrigger>
        <NewDealContent />
      </Dialog>
      <code className="ds-meta text-foreground-muted">no close button</code>
      <Dialog>
        <DialogTrigger asChild><Button variant="secondary">New deal</Button></DialogTrigger>
        <NewDealContent showCloseButton={false} />
      </Dialog>
      <code className="ds-meta text-foreground-muted">footer close</code>
      <Dialog>
        <DialogTrigger asChild><Button variant="outline">Deal details</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>TechnoPark IPO prep</DialogTitle>
            <DialogDescription>IPO readiness mandate · Prospecting</DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </div>
  ),
}
