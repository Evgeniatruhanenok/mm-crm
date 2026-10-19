import type { Meta, StoryObj } from '@storybook/react-vite'
import { MailIcon, PlusIcon } from 'lucide-react'
import { Button } from './button'

const VARIANTS = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
const SIZES = ['sm', 'default', 'lg'] as const

/**
 * Primary action button. 6 visual variants × 3 sizes (+ icon sizes) × states default / hover / disabled / loading.
 * Hover and pressed are native (`:hover` / `:active`) with a 150ms transition.
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { variant: 'default', size: 'default', children: 'New deal', disabled: false, loading: false },
  argTypes: {
    variant: { control: 'inline-radio', options: VARIANTS, description: 'Visual variant' },
    size: { control: 'inline-radio', options: [...SIZES, 'xs', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'], description: 'Size' },
    disabled: { control: 'boolean', description: 'state=disabled' },
    loading: { control: 'boolean', description: 'state=loading — spinner + blocked' },
    asChild: { control: 'boolean', description: 'Render as the child element (Radix Slot)' },
    children: { control: 'text', description: 'Label' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Destructive: Story = { args: { variant: 'destructive', children: 'Delete deal' } }
export const Outline: Story = { args: { variant: 'outline', children: 'Export' } }
export const Secondary: Story = { args: { variant: 'secondary', children: 'Share' } }
export const Ghost: Story = { args: { variant: 'ghost', children: 'Cancel' } }
export const Link: Story = { args: { variant: 'link', children: 'Learn more' } }
export const Disabled: Story = { args: { disabled: true } }
export const Loading: Story = { args: { loading: true, children: 'Syncing Outlook' } }
/** Icon-only button — always pass `aria-label`. */
export const Icon: Story = { args: { size: 'icon', 'aria-label': 'Email', children: <MailIcon /> } }
export const WithIcon: Story = { args: { children: <><PlusIcon /> New deal</> } }

/** Variant × State matrix — hover any button to see the live transition. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(4,auto)] items-center gap-(--spacing-lg)">
      <span />
      {['Default', 'Disabled', 'Loading', 'With icon'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {VARIANTS.map((v) => (
        <div key={v} className="contents">
          <code className="ds-meta text-foreground-muted">{v}</code>
          <Button variant={v}>New deal</Button>
          <Button variant={v} disabled>New deal</Button>
          <Button variant={v} loading>New deal</Button>
          <Button variant={v}><PlusIcon /> New deal</Button>
        </div>
      ))}
      <code className="ds-meta text-foreground-muted">sizes</code>
      {SIZES.map((s) => <Button key={s} size={s}>Size {s}</Button>)}
      <Button size="icon" aria-label="Email"><MailIcon /></Button>
    </div>
  ),
}
