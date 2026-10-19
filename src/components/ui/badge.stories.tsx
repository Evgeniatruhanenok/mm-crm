import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckIcon, ShieldAlertIcon } from 'lucide-react'
import { Badge } from './badge'

const VARIANTS = ['default', 'secondary', 'destructive', 'outline'] as const

/**
 * Small label for statuses, tags and counters. 4 variants from the DS matrix
 * (`ghost` / `link` exist in code as extras).
 */
const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { variant: 'default', children: 'Active', asChild: false },
  argTypes: {
    variant: { control: 'inline-radio', options: [...VARIANTS, 'ghost', 'link'], description: 'Visual variant' },
    asChild: { control: 'boolean', description: 'Render as the child element (Radix Slot), e.g. a link' },
    children: { control: 'text', description: 'Label' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Secondary: Story = { args: { variant: 'secondary', children: 'Team B' } }
/** Destructive — e.g. NDA hard-block. */
export const Destructive: Story = { args: { variant: 'destructive', children: 'NDA missing' } }
export const Outline: Story = { args: { variant: 'outline', children: 'Sell-side' } }
/** Icon inside the badge — mark it with `data-icon="inline-start"`. */
export const WithIcon: Story = { args: { children: <><CheckIcon data-icon="inline-start" /> NDA Signed</> } }
/** Counter badge. */
export const Counter: Story = { args: { variant: 'secondary', children: '12' } }

/** Variant × content matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(3,auto)] items-center justify-start gap-(--spacing-lg)">
      <span />
      {['Text', 'With icon', 'Counter'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {VARIANTS.map((v) => (
        <div key={v} className="contents">
          <code className="ds-meta text-foreground-muted">{v}</code>
          <Badge variant={v}>Due Diligence</Badge>
          <Badge variant={v}><ShieldAlertIcon data-icon="inline-start" /> Chinese Wall</Badge>
          <Badge variant={v}>8</Badge>
        </div>
      ))}
    </div>
  ),
}
