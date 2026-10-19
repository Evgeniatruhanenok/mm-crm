import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArchiveIcon, ChevronDownIcon, CopyIcon, PencilIcon, ShareIcon, Trash2Icon } from 'lucide-react'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu'

function DealMenuContent() {
  const [showArchived, setShowArchived] = React.useState(false)
  const [showNda, setShowNda] = React.useState(true)
  const [owner, setOwner] = React.useState('mv')
  return (
    <DropdownMenuContent className="w-60" align="start">
      <DropdownMenuLabel>LogistikPro sale</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuItem><PencilIcon /> Edit deal <DropdownMenuShortcut>⌘E</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem><CopyIcon /> Duplicate</DropdownMenuItem>
        <DropdownMenuItem disabled><ArchiveIcon /> Archive (closed deals only)</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger><ShareIcon /> Share with</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Maria Volkova (VP)</DropdownMenuItem>
            <DropdownMenuItem>Dmitry Kuznetsov (Associate)</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Zone A members</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Show in feed</DropdownMenuLabel>
      <DropdownMenuCheckboxItem checked={showNda} onCheckedChange={setShowNda}>NDA events</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>Archived emails</DropdownMenuCheckboxItem>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Deal owner</DropdownMenuLabel>
      <DropdownMenuRadioGroup value={owner} onValueChange={setOwner}>
        <DropdownMenuRadioItem value="mv">Maria Volkova</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dk">Dmitry Kuznetsov</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive"><Trash2Icon /> Delete deal</DropdownMenuItem>
    </DropdownMenuContent>
  )
}

/**
 * Menu opened from a button: items, checkbox items, radio items, sub-menu, separators, shortcuts, disabled and destructive items.
 * Composed from DropdownMenu → DropdownMenuTrigger + DropdownMenuContent.
 */
const meta = {
  title: 'Components/Dropdown Menu',
  component: DropdownMenu,
  tags: ['autodocs'],
  args: { defaultOpen: false, modal: false },
  argTypes: {
    defaultOpen: { control: 'boolean', description: 'Initial open state (uncontrolled)' },
    modal: { control: 'boolean', description: 'Block outside interaction while open' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Deal actions <ChevronDownIcon /></Button>
      </DropdownMenuTrigger>
      <DealMenuContent />
    </DropdownMenu>
  ),
} satisfies Meta<typeof DropdownMenu>
export default meta
type Story = StoryObj<typeof meta>

/** Trigger-driven — click to open. */
export const Default: Story = {}
/** Open state via `defaultOpen` (non-modal so docs stay scrollable). */
export const Open: Story = { args: { defaultOpen: true }, parameters: { docs: { story: { height: '520px' } } } }

/** Item types side by side — each menu open. */
export const AllVariants: Story = {
  parameters: { layout: 'padded', docs: { story: { height: '360px' } } },
  render: () => (
    <div className="grid grid-cols-4 items-start gap-(--spacing-4xl)">
      <div className="flex flex-col gap-(--spacing-sm)">
        <code className="ds-meta text-foreground-muted">item / disabled / destructive</code>
        <DropdownMenu defaultOpen modal={false}>
          <DropdownMenuTrigger asChild><Button variant="outline">Items</Button></DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem><PencilIcon /> Edit deal</DropdownMenuItem>
            <DropdownMenuItem disabled><ArchiveIcon /> Archive</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive"><Trash2Icon /> Delete deal</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-(--spacing-sm)">
        <code className="ds-meta text-foreground-muted">checkbox</code>
        <DropdownMenu defaultOpen modal={false}>
          <DropdownMenuTrigger asChild><Button variant="outline">Checkbox</Button></DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuCheckboxItem checked>NDA events</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={false}>Archived emails</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-(--spacing-sm)">
        <code className="ds-meta text-foreground-muted">radio</code>
        <DropdownMenu defaultOpen modal={false}>
          <DropdownMenuTrigger asChild><Button variant="outline">Radio</Button></DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuRadioGroup value="mv">
              <DropdownMenuRadioItem value="mv">Maria Volkova</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dk">Dmitry Kuznetsov</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-(--spacing-sm)">
        <code className="ds-meta text-foreground-muted">sub-menu</code>
        <DropdownMenu defaultOpen modal={false}>
          <DropdownMenuTrigger asChild><Button variant="outline">Sub-menu</Button></DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger><ShareIcon /> Share with</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Maria Volkova (VP)</DropdownMenuItem>
                <DropdownMenuItem>Zone A members</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
}
