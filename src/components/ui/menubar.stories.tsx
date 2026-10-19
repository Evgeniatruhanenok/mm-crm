import type { Meta, StoryObj } from '@storybook/react-vite'
import { FilePlusIcon, Trash2Icon } from 'lucide-react'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from './menubar'

function Menus() {
  return (
    <>
      <MenubarMenu value="deal">
        <MenubarTrigger>Deal</MenubarTrigger>
        <MenubarContent>
          <MenubarItem><FilePlusIcon />New deal <MenubarShortcut>Ctrl+N</MenubarShortcut></MenubarItem>
          <MenubarItem>Smart Paste from Excel <MenubarShortcut>Ctrl+V</MenubarShortcut></MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Move to stage</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>NDA Signed</MenubarItem>
              <MenubarItem>Due Diligence</MenubarItem>
              <MenubarItem>Closing</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem disabled>Export to PDF</MenubarItem>
          <MenubarItem variant="destructive"><Trash2Icon />Delete deal</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="view">
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Show closed deals</MenubarCheckboxItem>
          <MenubarCheckboxItem>Show Chinese Walls</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarLabel inset>Group by</MenubarLabel>
          <MenubarRadioGroup value="stage">
            <MenubarRadioItem value="stage">Stage</MenubarRadioItem>
            <MenubarRadioItem value="owner">Owner</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu value="compliance">
        <MenubarTrigger>Compliance</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Chinese Walls</MenubarItem>
          <MenubarItem>Audit Log</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </>
  )
}

/**
 * Desktop-style horizontal menu bar. No variants — composed from menus with items,
 * checkbox / radio items, sub-menus, shortcuts. Item states: default / disabled / destructive.
 */
const meta = {
  title: 'Components/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  args: { loop: true },
  argTypes: {
    defaultValue: { control: 'inline-radio', options: ['', 'deal', 'view', 'compliance'], description: 'Initially open menu' },
    loop: { control: 'boolean', description: 'Keyboard focus wraps around' },
    dir: { control: 'inline-radio', options: ['ltr', 'rtl'], description: 'Reading direction' },
    className: { control: 'text', description: 'Extra classes' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Menubar {...args}>
      <Menus />
    </Menubar>
  ),
} satisfies Meta<typeof Menubar>
export default meta
type Story = StoryObj<typeof meta>

/** All menus closed. */
export const Default: Story = {}
/** "Deal" menu open: items, shortcut, sub-menu, disabled and destructive items. */
export const OpenDeal: Story = { args: { defaultValue: 'deal' } }
/** "View" menu open: checkbox and radio items. */
export const OpenView: Story = { args: { defaultValue: 'view' } }

/** State matrix — closed and each menu open. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_auto] items-start gap-(--spacing-lg)">
      <code className="ds-meta text-foreground-muted">closed</code>
      <Menubar><Menus /></Menubar>
      <code className="ds-meta text-foreground-muted">open</code>
      <Menubar defaultValue="view"><Menus /></Menubar>
    </div>
  ),
}
