import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileTextIcon, ShieldIcon, KanbanSquareIcon } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './navigation-menu'

const DEALS = [
  { title: 'LogistikPro sale', desc: 'Sell-side · Due Diligence' },
  { title: 'TechnoPark IPO prep', desc: 'IPO readiness · Prospecting' },
]

function Items() {
  return (
    <NavigationMenuList>
      <NavigationMenuItem value="pipeline">
        <NavigationMenuTrigger>Pipeline</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="flex w-80 flex-col gap-(--spacing-xs)">
            {DEALS.map((d) => (
              <li key={d.title}>
                <NavigationMenuLink href="#" className="flex-col items-start">
                  <span className="ds-label-sm flex items-center gap-(--spacing-xs)"><KanbanSquareIcon />{d.title}</span>
                  <span className="ds-meta text-foreground-muted">{d.desc}</span>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem value="compliance">
        <NavigationMenuTrigger>Compliance</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="flex w-64 flex-col gap-(--spacing-xs)">
            <li><NavigationMenuLink href="#"><ShieldIcon />Chinese Walls</NavigationMenuLink></li>
            <li><NavigationMenuLink href="#"><FileTextIcon />Audit Log</NavigationMenuLink></li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()} active>Contacts</NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>Settings</NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  )
}

/**
 * Horizontal top-level menu with dropdown sub-menus. No variants — composed from List / Item / Trigger / Content / Link.
 * `viewport` switches between the shared animated viewport and per-item popovers.
 */
const meta = {
  title: 'Components/Navigation Menu',
  component: NavigationMenu,
  tags: ['autodocs'],
  args: { viewport: true, orientation: 'horizontal', delayDuration: 200 },
  argTypes: {
    viewport: { control: 'boolean', description: 'Render content in a shared viewport (true) or inline popovers (false)' },
    defaultValue: { control: 'inline-radio', options: ['', 'pipeline', 'compliance'], description: 'Initially open item' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'], description: 'Keyboard navigation orientation' },
    delayDuration: { control: 'number', description: 'Hover delay (ms) before opening' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <div className="h-64">
      <NavigationMenu {...args}>
        <Items />
      </NavigationMenu>
    </div>
  ),
} satisfies Meta<typeof NavigationMenu>
export default meta
type Story = StoryObj<typeof meta>

/** Closed — hover or focus a trigger. */
export const Default: Story = {}
/** "Pipeline" sub-menu open by default. */
export const Open: Story = { args: { defaultValue: 'pipeline' } }
/** Without shared viewport — each content renders as its own popover. */
export const NoViewport: Story = { args: { viewport: false, defaultValue: 'compliance' } }

/** viewport × state matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(2,auto)] items-start gap-(--spacing-lg)">
      <span />
      {['Closed', 'Open'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      <code className="ds-meta text-foreground-muted">viewport</code>
      <div className="h-64"><NavigationMenu><Items /></NavigationMenu></div>
      <div className="h-64"><NavigationMenu defaultValue="pipeline"><Items /></NavigationMenu></div>
      <code className="ds-meta text-foreground-muted">no viewport</code>
      <div className="h-64"><NavigationMenu viewport={false}><Items /></NavigationMenu></div>
      <div className="h-64"><NavigationMenu viewport={false} defaultValue="compliance"><Items /></NavigationMenu></div>
    </div>
  ),
}
