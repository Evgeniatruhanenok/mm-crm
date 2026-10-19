import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopyIcon, DollarSignIcon, MailIcon, SearchIcon, SendIcon } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from './input-group'

const ALIGNS = ['inline-start', 'inline-end', 'block-start', 'block-end'] as const

/**
 * Input with addons (icons, text, buttons) on any side. Addon align: inline-start | inline-end | block-start | block-end.
 * Focus / error (`aria-invalid` on the control) / disabled states are propagated to the group border.
 */
const meta = {
  title: 'Components/Input Group',
  component: InputGroup,
  tags: ['autodocs'],
  args: { className: 'w-72' },
  argTypes: {
    className: { control: 'text', description: 'Extra classes (width etc.)' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="Search deals, contacts…" />
      <InputGroupAddon><SearchIcon /></InputGroupAddon>
      <InputGroupAddon align="inline-end"><InputGroupText>12 results</InputGroupText></InputGroupAddon>
    </InputGroup>
  ),
} satisfies Meta<typeof InputGroup>
export default meta
type Story = StoryObj<typeof meta>

/** Search icon at inline-start, result count at inline-end. */
export const Default: Story = {}
/** Currency prefix/suffix — deal EV. */
export const TextAddons: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon><DollarSignIcon /></InputGroupAddon>
      <InputGroupInput defaultValue="120" inputMode="decimal" />
      <InputGroupAddon align="inline-end"><InputGroupText>M EV</InputGroupText></InputGroupAddon>
    </InputGroup>
  ),
}
/** Inline button addon. */
export const WithButton: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput readOnly defaultValue="dataroom.logistikpro.deal/team-a" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="Copy link"><CopyIcon /></InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}
/** Textarea with block-end toolbar. */
export const WithTextarea: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupTextarea placeholder="Note for Maria Volkova…" />
      <InputGroupAddon align="block-end">
        <InputGroupText className="ds-meta">Visible to Team A</InputGroupText>
        <InputGroupButton variant="default" size="sm" className="ml-auto">Send <SendIcon /></InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}
export const Error: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon><MailIcon /></InputGroupAddon>
      <InputGroupInput defaultValue="dmitry.kuznetsov@" aria-invalid />
    </InputGroup>
  ),
}
/** Set `data-disabled` on the group to dim addons. */
export const Disabled: Story = {
  render: (args) => (
    <InputGroup {...args} data-disabled>
      <InputGroupAddon><MailIcon /></InputGroupAddon>
      <InputGroupInput defaultValue="maria.volkova@boutique.com" disabled />
    </InputGroup>
  ),
}

/** Addon align × state matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(3,16rem)] items-center gap-(--spacing-lg)">
      <span />
      {['Default', 'Error', 'Disabled'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {ALIGNS.map((a) => (
        <div key={a} className="contents">
          <code className="ds-meta text-foreground-muted">{a}</code>
          {(['default', 'error', 'disabled'] as const).map((st) => (
            <InputGroup key={st} data-disabled={st === 'disabled' || undefined}>
              <InputGroupInput defaultValue="RosMedia acquisition" aria-invalid={st === 'error' || undefined} disabled={st === 'disabled'} />
              <InputGroupAddon align={a}>
                {a.startsWith('block') ? <InputGroupText>Deal name</InputGroupText> : <SearchIcon />}
              </InputGroupAddon>
            </InputGroup>
          ))}
        </div>
      ))}
      <code className="ds-meta text-foreground-muted">button sizes</code>
      {(['xs', 'icon-xs', 'icon-sm'] as const).map((s) => (
        <InputGroup key={s}>
          <InputGroupInput placeholder="Invite by email" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size={s} aria-label="Send invite">{s === 'xs' ? <>Invite <SendIcon /></> : <SendIcon />}</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      ))}
    </div>
  ),
}
