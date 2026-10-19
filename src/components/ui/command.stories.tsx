import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { BriefcaseIcon, FileSignatureIcon, PlusIcon, SearchIcon, UserIcon } from 'lucide-react'
import { Button } from './button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './command'

function PaletteBody() {
  return (
    <>
      <CommandInput placeholder="Search deals, contacts, actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Deals">
          <CommandItem><BriefcaseIcon /> LogistikPro sale</CommandItem>
          <CommandItem><BriefcaseIcon /> TechnoPark IPO prep</CommandItem>
          <CommandItem><BriefcaseIcon /> RosMedia acquisition</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Contacts">
          <CommandItem><UserIcon /> Maria Volkova <CommandShortcut>VP</CommandShortcut></CommandItem>
          <CommandItem><UserIcon /> Dmitry Kuznetsov <CommandShortcut>Associate</CommandShortcut></CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem><PlusIcon /> New deal <CommandShortcut>⌘N</CommandShortcut></CommandItem>
          <CommandItem disabled><FileSignatureIcon /> Send NDA (blocked) <CommandShortcut>⌘E</CommandShortcut></CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  )
}

/**
 * Command palette (⌘K) with search, groups, separators, shortcuts and disabled items. No visual variants.
 * Inline `Command` and modal `CommandDialog`.
 */
const meta = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
  args: { loop: false, shouldFilter: true },
  argTypes: {
    loop: { control: 'boolean', description: 'Wrap arrow-key navigation from last to first item' },
    shouldFilter: { control: 'boolean', description: 'Filter items by the input value automatically' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Command {...args} className="w-96 rounded-md border border-border-default">
      <PaletteBody />
    </Command>
  ),
} satisfies Meta<typeof Command>
export default meta
type Story = StoryObj<typeof meta>

/** Inline palette. */
export const Default: Story = {}

/** Empty state — no item matches the query. */
export const Empty: Story = {
  render: (args) => (
    <Command {...args} className="w-96 rounded-md border border-border-default">
      <CommandInput placeholder="Search deals…" value="NordGrain" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Deals">
          <CommandItem>LogistikPro sale</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

/** CommandDialog — trigger-driven modal palette. */
export const Dialog: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}><SearchIcon /> Search <CommandShortcut>⌘K</CommandShortcut></Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <PaletteBody />
          </Command>
        </CommandDialog>
      </>
    )
  },
}

/** CommandDialog open state (`defaultOpen`). Rendered in an iframe in docs so the modal does not cover the page. */
export const DialogOpen: Story = {
  parameters: { docs: { story: { inline: false, height: '480px' } } },
  render: () => (
    <CommandDialog defaultOpen>
      <Command>
        <PaletteBody />
      </Command>
    </CommandDialog>
  ),
}

/** Item state matrix: default, selected (first item auto-highlighted), disabled, with shortcut, empty. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_auto] items-start gap-(--spacing-lg)">
      <code className="ds-meta text-foreground-muted">populated</code>
      <Command className="w-96 rounded-md border border-border-default">
        <PaletteBody />
      </Command>
      <code className="ds-meta text-foreground-muted">empty</code>
      <Command className="w-96 rounded-md border border-border-default">
        <CommandInput placeholder="Search deals…" value="NordGrain" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandItem>LogistikPro sale</CommandItem>
        </CommandList>
      </Command>
    </div>
  ),
}
