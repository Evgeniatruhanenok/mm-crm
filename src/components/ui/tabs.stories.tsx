import type { Meta, StoryObj } from '@storybook/react-vite'
import { ActivityIcon, FileTextIcon, UsersIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

const VARIANTS = ['default', 'underline'] as const

function DealTabs({ variant = 'default', defaultValue = 'activity' }: { variant?: (typeof VARIANTS)[number]; defaultValue?: string }) {
  return (
    <Tabs defaultValue={defaultValue} className="w-96">
      <TabsList variant={variant}>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="buyers" disabled>Buyer List</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

/**
 * Tabs for switching content sections. TabsList variant: default | underline.
 * Trigger states: active / inactive / disabled.
 */
const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: { defaultValue: 'activity', orientation: 'horizontal', activationMode: 'automatic', className: 'w-96' },
  argTypes: {
    defaultValue: { control: 'inline-radio', options: ['activity', 'documents', 'buyers'], description: 'Initially active tab' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'], description: 'Layout direction' },
    activationMode: { control: 'inline-radio', options: ['automatic', 'manual'], description: 'Activate on focus (automatic) or on click/Enter (manual)' },
    className: { control: 'text', description: 'Extra classes' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="activity"><ActivityIcon />Activity</TabsTrigger>
        <TabsTrigger value="documents"><FileTextIcon />Documents</TabsTrigger>
        <TabsTrigger value="buyers"><UsersIcon />Buyer List</TabsTrigger>
      </TabsList>
      <TabsContent value="activity" className="text-foreground-muted">Maria Volkova logged a call with LogistikPro CFO.</TabsContent>
      <TabsContent value="documents" className="text-foreground-muted">Teaser_v3.pdf, CIM_draft.docx</TabsContent>
      <TabsContent value="buyers" className="text-foreground-muted">12 buyers signed NDA for LogistikPro sale.</TabsContent>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>
export default meta
type Story = StoryObj<typeof meta>

/** variant=default (pill list). */
export const Default: Story = {}
/** variant=underline. */
export const Underline: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList variant="underline">
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="buyers">Buyer List</TabsTrigger>
      </TabsList>
      <TabsContent value="activity" className="text-foreground-muted">TechnoPark IPO prep — 4 new events today.</TabsContent>
      <TabsContent value="documents" className="text-foreground-muted">S-1 draft, auditor letter</TabsContent>
      <TabsContent value="buyers" className="text-foreground-muted">Not applicable for IPO mandates.</TabsContent>
    </Tabs>
  ),
}
/** Disabled trigger — "Buyer List" is blocked until NDA is signed. */
export const DisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="buyers" disabled>Buyer List</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
}
/** orientation=vertical. */
export const Vertical: Story = { args: { orientation: 'vertical' } }

/** Variant × state matrix: first tab active, second inactive, third disabled. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_auto] items-center gap-(--spacing-lg)">
      <span />
      <span className="ds-label-sm text-foreground-muted">Active · Inactive · Disabled</span>
      {VARIANTS.map((v) => (
        <div key={v} className="contents">
          <code className="ds-meta text-foreground-muted">{v}</code>
          <DealTabs variant={v} />
        </div>
      ))}
    </div>
  ),
}
