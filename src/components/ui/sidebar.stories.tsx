import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { BriefcaseIcon, KanbanSquareIcon, SettingsIcon, ShieldIcon, UsersIcon } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from './sidebar'

const COLLAPSIBLE = ['offcanvas', 'icon', 'none'] as const
const SIDES = ['left', 'right'] as const

type SidebarProps = ComponentProps<typeof Sidebar>

/** Sidebar body: header, nav with active item, Compliance sub-menu, footer. */
function NavContent() {
  return (
    <>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <BriefcaseIcon />
              <span className="ds-label-sm">Volkova Partners</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Pipeline">
                  <KanbanSquareIcon />
                  <span>Pipeline</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>12</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Contacts">
                  <UsersIcon />
                  <span>Contacts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Compliance">
                  <ShieldIcon />
                  <span>Compliance</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="#" isActive>
                      <span>Chinese Walls</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="#">
                      <span>Audit Log</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <SettingsIcon />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}

/**
 * Sidebar inside a bounded box: `SidebarProvider` is constrained to `h-120`,
 * the sidebar container is switched from viewport-fixed to `absolute` so it stays inside the frame.
 */
function Frame({
  defaultOpen = true,
  frameClassName = 'h-120',
  className,
  ...sidebar
}: SidebarProps & { defaultOpen?: boolean; frameClassName?: string }) {
  const isNone = sidebar.collapsible === 'none'
  const bar = (
    <Sidebar {...sidebar} className={isNone ? className : `absolute h-full ${className ?? ''}`}>
      <NavContent />
    </Sidebar>
  )
  return (
    <SidebarProvider defaultOpen={defaultOpen} className={`relative min-h-0 overflow-hidden rounded-md border ${frameClassName}`}>
      {sidebar.side !== 'right' && bar}
      <SidebarInset>
        <header className="flex items-center gap-(--spacing-sm) border-b p-(--padding-sm)">
          <SidebarTrigger />
          <span className="ds-label-sm">Pipeline</span>
        </header>
        <div className="flex flex-col gap-(--spacing-sm) p-(--padding-md) ds-small">
          <span>LogistikPro sale — Due Diligence</span>
          <span className="text-foreground-muted">TechnoPark IPO prep — Prospecting</span>
        </div>
      </SidebarInset>
      {sidebar.side === 'right' && bar}
    </SidebarProvider>
  )
}

/**
 * Vertical app navigation with groups and nested sub-menus.
 * collapsible: offcanvas | icon | none; side: left | right. Toggle with the trigger or Ctrl/Cmd+B.
 */
const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  args: { collapsible: 'offcanvas', side: 'left', variant: 'sidebar' },
  argTypes: {
    collapsible: { control: 'inline-radio', options: COLLAPSIBLE, description: 'Collapse mode: slide off-canvas, shrink to icons, or static' },
    side: { control: 'inline-radio', options: SIDES, description: 'Screen edge' },
    variant: { control: 'inline-radio', options: ['sidebar', 'floating', 'inset'], description: 'Visual container style' },
    className: { control: 'text', description: 'Extra classes for the sidebar container' },
  },
  parameters: { layout: 'fullscreen' },
  render: (args) => <Frame {...args} />,
} satisfies Meta<typeof Sidebar>
export default meta
type Story = StoryObj<typeof meta>

/** collapsible=offcanvas, side=left — expanded with active "Pipeline" and Compliance sub-menu. */
export const Default: Story = {}
/** collapsible=icon — expanded; press the trigger to shrink to icons. */
export const Icon: Story = { args: { collapsible: 'icon' } }
/** collapsible=icon in the collapsed state (icons only, sub-menu hidden). */
export const IconCollapsed: Story = {
  args: { collapsible: 'icon' },
  render: (args) => <Frame {...args} defaultOpen={false} />,
}
/** collapsible=offcanvas in the collapsed state — sidebar hidden off-canvas. */
export const OffcanvasCollapsed: Story = {
  render: (args) => <Frame {...args} defaultOpen={false} />,
}
/** collapsible=none — static, cannot be collapsed. */
export const NonCollapsible: Story = { args: { collapsible: 'none' } }
/** side=right. */
export const Right: Story = { args: { side: 'right' } }

/** Collapsible × side matrix (+ collapsed state). */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_1fr_1fr_1fr] items-start gap-(--spacing-lg)">
      <span />
      {['Left', 'Right', 'Collapsed (left)'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {COLLAPSIBLE.map((c) => (
        <div key={c} className="contents">
          <code className="ds-meta text-foreground-muted">{c}</code>
          <Frame collapsible={c} side="left" frameClassName="h-96" />
          <Frame collapsible={c} side="right" frameClassName="h-96" />
          <Frame collapsible={c} side="left" defaultOpen={false} frameClassName="h-96" />
        </div>
      ))}
    </div>
  ),
}
