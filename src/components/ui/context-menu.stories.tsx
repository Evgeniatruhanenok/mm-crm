import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRightIcon, CopyIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { STAGES } from '../tones'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from './context-menu'

function DealArea({ label }: { label: string }) {
  return (
    <ContextMenuTrigger className="ds-meta flex h-32 w-72 items-center justify-center rounded-md border border-dashed border-border-default text-foreground-muted">
      {label}
    </ContextMenuTrigger>
  )
}

/**
 * Right-click menu (e.g. on a Kanban card). Same item types as Dropdown Menu. No visual variants.
 * Radix ContextMenu has no `open` / `defaultOpen` — open state is only reachable by right-clicking the area.
 */
const meta = {
  title: 'Components/Context Menu',
  component: ContextMenu,
  tags: ['autodocs'],
  args: { modal: true },
  argTypes: {
    modal: { control: 'boolean', description: 'Block outside interaction while open' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <ContextMenu {...args}>
      <DealArea label="Right-click the LogistikPro sale card" />
      <ContextMenuContent className="w-60">
        <ContextMenuLabel>LogistikPro sale</ContextMenuLabel>
        <ContextMenuItem><PencilIcon /> Edit deal <ContextMenuShortcut>⌘E</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuItem><CopyIcon /> Duplicate</ContextMenuItem>
        <ContextMenuItem disabled>Archive (closed deals only)</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger><ArrowRightIcon /> Move to stage</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuRadioGroup value="Due Diligence">
              {STAGES.map((s) => <ContextMenuRadioItem key={s} value={s}>{s}</ContextMenuRadioItem>)}
            </ContextMenuRadioGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Pin to top</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive"><Trash2Icon /> Delete deal</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
} satisfies Meta<typeof ContextMenu>
export default meta
type Story = StoryObj<typeof meta>

/** Trigger-driven — right-click inside the dashed area. */
export const Default: Story = {}

/** Item types — one area per item kind; right-click each. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_auto] items-center gap-(--spacing-lg)">
      <code className="ds-meta text-foreground-muted">item / disabled / destructive</code>
      <ContextMenu>
        <DealArea label="Right-click: items" />
        <ContextMenuContent>
          <ContextMenuItem><PencilIcon /> Edit deal</ContextMenuItem>
          <ContextMenuItem disabled>Archive</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive"><Trash2Icon /> Delete deal</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <code className="ds-meta text-foreground-muted">checkbox / radio</code>
      <ContextMenu>
        <DealArea label="Right-click: checkbox / radio" />
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked>Pin to top</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value="mv">
            <ContextMenuRadioItem value="mv">Maria Volkova</ContextMenuRadioItem>
            <ContextMenuRadioItem value="dk">Dmitry Kuznetsov</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
      <code className="ds-meta text-foreground-muted">sub-menu</code>
      <ContextMenu>
        <DealArea label="Right-click: sub-menu" />
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Move to stage</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              {STAGES.map((s) => <ContextMenuItem key={s}>{s}</ContextMenuItem>)}
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
}
