import type { Meta, StoryObj } from '@storybook/react-vite'
import { MoreHorizontalIcon } from 'lucide-react'
import { Button } from './button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { StageBadge } from '../StageBadge'

const SIZES = ['default', 'sm'] as const

/**
 * Universal container composed of Header (Title, Description, Action), Content and Footer.
 * No visual variants — only a `size` density (default | sm).
 */
const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: { size: 'default', className: 'w-80' },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES, description: 'Density — inner spacing (default / sm)' },
    className: { control: 'text', description: 'Extra classes (e.g. width)' },
    children: { control: false, description: 'Card sub-components' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>LogistikPro sale</CardTitle>
        <CardDescription>Sell-side · EV $48M · Lead: Maria Volkova</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="Deal actions"><MoreHorizontalIcon /></Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <StageBadge stage="Due Diligence" />
        <p className="text-foreground-muted">12 buyers in data room, 3 IOIs received.</p>
      </CardContent>
      <CardFooter className="gap-(--spacing-sm)">
        <Button size="sm">Open deal</Button>
        <Button size="sm" variant="outline">Share</Button>
      </CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>

/** Full card: header with action, content, footer. */
export const Default: Story = {}
/** Compact density (`size="sm"`). */
export const Small: Story = { args: { size: 'sm' } }
/** Header only — title + description. */
export const HeaderOnly: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>TechnoPark IPO prep</CardTitle>
        <CardDescription>Buy-side advisory · Prospecting</CardDescription>
      </CardHeader>
    </Card>
  ),
}
/** Header and footer separated by borders. */
export const WithBorders: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader className="border-b">
        <CardTitle>TechnoPark IPO prep</CardTitle>
        <CardDescription>Updated 2h ago by Maria Volkova</CardDescription>
      </CardHeader>
      <CardContent>
        <StageBadge stage="LOI / Term Sheet" />
      </CardContent>
      <CardFooter className="border-t">
        <Button size="sm" variant="secondary">View timeline</Button>
      </CardFooter>
    </Card>
  ),
}

/** Size × composition matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(2,auto)] items-start gap-(--spacing-lg)">
      <span />
      {['Full', 'Header only'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {SIZES.map((s) => (
        <div key={s} className="contents">
          <code className="ds-meta text-foreground-muted">{s}</code>
          <Card size={s} className="w-80">
            <CardHeader>
              <CardTitle>LogistikPro sale</CardTitle>
              <CardDescription>Sell-side · EV $48M</CardDescription>
            </CardHeader>
            <CardContent><StageBadge stage="Due Diligence" /></CardContent>
            <CardFooter><Button size="sm">Open deal</Button></CardFooter>
          </Card>
          <Card size={s} className="w-80">
            <CardHeader>
              <CardTitle>TechnoPark IPO prep</CardTitle>
              <CardDescription>Buy-side advisory</CardDescription>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  ),
}
