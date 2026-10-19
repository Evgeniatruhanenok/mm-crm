import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './avatar'

const SIZES = ['sm', 'md', 'lg', 'xl'] as const

/**
 * User avatar — image or initials fallback. `size`: sm | md | lg | xl (`md` = `default`).
 * The image fallback flow: stories use `AvatarImage` with an empty `src` (no external assets in the catalog),
 * so Radix shows `AvatarFallback`; with a real URL the photo replaces the initials once loaded.
 */
const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: [...SIZES, 'default'], description: 'Size: sm 24 / md 32 / lg 40 / xl 48' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>MV</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>
export default meta
type Story = StoryObj<typeof meta>

/** fallback=initials. */
export const Initials: Story = {}
export const Small: Story = { args: { size: 'sm' } }
export const Large: Story = { args: { size: 'lg' } }
export const ExtraLarge: Story = { args: { size: 'xl' } }

/** fallback=image — `AvatarImage` with an empty src, so the initials fallback is rendered (no network assets). */
export const Image: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="" alt="Dmitry Kuznetsov" />
      <AvatarFallback>DK</AvatarFallback>
    </Avatar>
  ),
}

/** Stacked group with an overflow counter (deal team). */
export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar><AvatarFallback>MV</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>DK</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>IP</AvatarFallback></Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
}

/** Size × fallback matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(4,auto)] items-center gap-(--spacing-lg)">
      <span />
      {SIZES.map((s) => <code key={s} className="ds-meta text-foreground-muted">{s}</code>)}
      <code className="ds-meta text-foreground-muted">initials</code>
      {SIZES.map((s) => (
        <Avatar key={s} size={s}><AvatarFallback>MV</AvatarFallback></Avatar>
      ))}
      <code className="ds-meta text-foreground-muted">image (empty src → fallback)</code>
      {SIZES.map((s) => (
        <Avatar key={s} size={s}>
          <AvatarImage src="" alt="Dmitry Kuznetsov" />
          <AvatarFallback>DK</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}
