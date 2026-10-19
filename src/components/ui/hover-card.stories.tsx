import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from './avatar'
import { Button } from './button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card'

const SIDES = ['top', 'right', 'bottom', 'left'] as const

function ContactCard() {
  return (
    <div className="flex gap-(--spacing-md)">
      <Avatar size="lg">
        <AvatarFallback>MV</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-(--spacing-xxs)">
        <span className="ds-title-sm text-foreground-default">Maria Volkova</span>
        <span className="ds-meta text-foreground-muted">VP · Zone A · 3 active deals</span>
        <span className="ds-meta flex items-center gap-(--spacing-xs) text-foreground-muted">
          <CalendarIcon className="size-3" /> Last contact Jun 3, 2026
        </span>
      </div>
    </div>
  )
}

/**
 * Preview card shown on hover over a link or name (contact, deal). No visual variants.
 * Composed from HoverCard → HoverCardTrigger + HoverCardContent.
 */
const meta = {
  title: 'Components/Hover Card',
  component: HoverCard,
  tags: ['autodocs'],
  args: { defaultOpen: false, openDelay: 300, closeDelay: 200 },
  argTypes: {
    defaultOpen: { control: 'boolean', description: 'Initial open state (uncontrolled)' },
    openDelay: { control: 'number', description: 'Delay before opening, ms' },
    closeDelay: { control: 'number', description: 'Delay before closing, ms' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <Button variant="link">@Maria Volkova</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <ContactCard />
      </HoverCardContent>
    </HoverCard>
  ),
} satisfies Meta<typeof HoverCard>
export default meta
type Story = StoryObj<typeof meta>

/** Trigger-driven — hover the link. */
export const Default: Story = {}
/** Open state via `defaultOpen`. */
export const Open: Story = { args: { defaultOpen: true }, parameters: { docs: { story: { height: '220px' } } } }

/** Placement matrix — all four sides open at once. */
export const AllVariants: Story = {
  parameters: { layout: 'padded', docs: { story: { height: '560px' } } },
  render: () => (
    <div className="grid grid-cols-2 place-items-center gap-(--spacing-4xl) p-(--padding-4xl)">
      {SIDES.map((side) => (
        <div key={side} className="flex flex-col items-center gap-(--spacing-sm)">
          <code className="ds-meta text-foreground-muted">side={side}</code>
          <HoverCard defaultOpen>
            <HoverCardTrigger asChild>
              <Button variant="link">@Maria Volkova</Button>
            </HoverCardTrigger>
            <HoverCardContent side={side} className="w-80">
              <ContactCard />
            </HoverCardContent>
          </HoverCard>
        </div>
      ))}
    </div>
  ),
}
