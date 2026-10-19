import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemberRow } from './MemberRow'

/**
 * Chinese Wall zone member row: initials avatar + name + role, optional zone chip.
 * state: default (no `zone`) | in-zone (`zone` set).
 */
const meta = {
  title: 'M&A/MemberRow',
  component: MemberRow,
  tags: ['autodocs'],
  args: { initials: 'MV', name: 'Maria Volkova', role: 'VP' },
  argTypes: {
    initials: { control: 'text', description: 'Avatar initials' },
    name: { control: 'text', description: 'Full name' },
    role: { control: 'text', description: 'Role (VP / Associate / Analyst)' },
    zone: { control: 'text', description: 'Zone chip — set to switch to state=in-zone' },
  },
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof MemberRow>
export default meta
type Story = StoryObj<typeof meta>

/** state=default. */
export const Default: Story = {}
/** state=in-zone. */
export const InZone: Story = { args: { initials: 'DK', name: 'Dmitry Kuznetsov', role: 'Associate', zone: 'Zone A' } }

/** State matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid w-fit grid-cols-[auto_20rem] items-center gap-x-(--spacing-lg)">
      <code className="ds-meta text-foreground-muted">default</code>
      <MemberRow initials="MV" name="Maria Volkova" role="VP" />
      <code className="ds-meta text-foreground-muted">default</code>
      <MemberRow initials="AS" name="Anna Sokolova" role="Analyst" />
      <code className="ds-meta text-foreground-muted">in-zone</code>
      <MemberRow initials="DK" name="Dmitry Kuznetsov" role="Associate" zone="Zone A" />
    </div>
  ),
}
