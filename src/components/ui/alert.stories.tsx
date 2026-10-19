import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircleCheckIcon, InfoIcon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react'
import { Alert, AlertAction, AlertDescription, AlertTitle } from './alert'
import { Button } from './button'

const VARIANTS = ['default', 'destructive', 'success', 'warning'] as const

const CONTENT = {
  default: { icon: <InfoIcon />, title: 'Outlook sync running', text: '1,247 Total records captured from Maria Volkova’s mailbox.' },
  destructive: { icon: <OctagonXIcon />, title: 'NDA send blocked', text: 'TechnoPark IPO prep has no signed NDA. 3 Blocked NDA sends this week.' },
  success: { icon: <CircleCheckIcon />, title: 'NDA signed', text: 'LogistikPro sale moved to NDA Signed by Dmitry Kuznetsov.' },
  warning: { icon: <TriangleAlertIcon />, title: 'Chinese Wall conflict', text: 'RosMedia acquisition overlaps with a deal in Zone A.' },
} as const

/**
 * Inline message block inside a page. `variant`: default | destructive | success | warning.
 * Composed from Alert + optional lucide icon, AlertTitle, AlertDescription, AlertAction.
 */
const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: { variant: 'default' },
  argTypes: {
    variant: { control: 'inline-radio', options: VARIANTS, description: 'Message type' },
  },
  parameters: { layout: 'centered' },
  render: (args) => {
    const c = CONTENT[args.variant ?? 'default']
    return (
      <Alert {...args} className="w-96">
        {c.icon}
        <AlertTitle>{c.title}</AlertTitle>
        <AlertDescription>{c.text}</AlertDescription>
      </Alert>
    )
  },
} satisfies Meta<typeof Alert>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Destructive: Story = { args: { variant: 'destructive' } }
export const Success: Story = { args: { variant: 'success' } }
export const Warning: Story = { args: { variant: 'warning' } }

/** Title only, no icon. */
export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args} className="w-96">
      <AlertTitle>Outlook sync completed</AlertTitle>
    </Alert>
  ),
}

/** With an action button in the top-right corner. */
export const WithAction: Story = {
  args: { variant: 'destructive' },
  render: (args) => (
    <Alert {...args} className="w-96">
      <OctagonXIcon />
      <AlertTitle>NDA send blocked</AlertTitle>
      <AlertDescription>TechnoPark IPO prep has no signed NDA.</AlertDescription>
      <AlertAction>
        <Button size="xs" variant="outline">Request NDA</Button>
      </AlertAction>
    </Alert>
  ),
}

/** Variant × content matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(2,24rem)] items-start gap-(--spacing-lg)">
      <span />
      <span className="ds-label-sm text-foreground-muted">Icon + title + description</span>
      <span className="ds-label-sm text-foreground-muted">Title only</span>
      {VARIANTS.map((v) => (
        <div key={v} className="contents">
          <code className="ds-meta text-foreground-muted">{v}</code>
          <Alert variant={v}>
            {CONTENT[v].icon}
            <AlertTitle>{CONTENT[v].title}</AlertTitle>
            <AlertDescription>{CONTENT[v].text}</AlertDescription>
          </Alert>
          <Alert variant={v}>
            <AlertTitle>{CONTENT[v].title}</AlertTitle>
          </Alert>
        </div>
      ))}
    </div>
  ),
}
