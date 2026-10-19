import type { Meta, StoryObj } from '@storybook/react-vite'
import { BoldIcon, LockIcon } from 'lucide-react'
import { Toggle } from './toggle'

const VARIANTS = ['default', 'outline'] as const
const SIZES = ['sm', 'default', 'lg'] as const

/**
 * Two-state toggle button for toolbars and mode switches (e.g. "Show NDA-locked deals").
 * 2 variants × 3 sizes × states default / hover / active (pressed) / disabled. Hover is native `:hover`.
 */
const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { variant: 'default', size: 'default', children: <><LockIcon /> NDA only</>, disabled: false, defaultPressed: false },
  argTypes: {
    variant: { control: 'inline-radio', options: VARIANTS, description: 'Visual variant' },
    size: { control: 'inline-radio', options: SIZES, description: 'Size' },
    defaultPressed: { control: 'boolean', description: 'Initial pressed state (uncontrolled) — state=active' },
    pressed: { control: 'boolean', description: 'Pressed state (controlled)' },
    disabled: { control: 'boolean', description: 'state=disabled' },
    children: { control: 'text', description: 'Content (icon and/or label)' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Toggle>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Outline: Story = { args: { variant: 'outline' } }
/** state=active — pressed (`aria-pressed=true`). */
export const Active: Story = { args: { defaultPressed: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Small: Story = { args: { size: 'sm' } }
export const Large: Story = { args: { size: 'lg' } }
/** Icon-only toggle — always pass `aria-label`. */
export const IconOnly: Story = { args: { 'aria-label': 'Bold', children: <BoldIcon /> } }

/** Variant × State matrix, plus sizes. Hover any toggle to see the live state. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(3,auto)] items-center justify-start gap-(--spacing-lg)">
      <span />
      {['Default', 'Active', 'Disabled'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {VARIANTS.map((v) => (
        <div key={v} className="contents">
          <code className="ds-meta text-foreground-muted">{v}</code>
          <Toggle variant={v}><LockIcon /> NDA only</Toggle>
          <Toggle variant={v} defaultPressed><LockIcon /> NDA only</Toggle>
          <Toggle variant={v} disabled><LockIcon /> NDA only</Toggle>
        </div>
      ))}
      <code className="ds-meta text-foreground-muted">sizes</code>
      {SIZES.map((s) => <Toggle key={s} size={s} variant="outline">Size {s}</Toggle>)}
    </div>
  ),
}
