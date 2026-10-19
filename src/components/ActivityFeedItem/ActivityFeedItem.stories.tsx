import type { Meta, StoryObj } from '@storybook/react-vite'
import { ActivityFeedItem } from './ActivityFeedItem'
import { ACTIVITY_TYPES, type ActivityType } from '../tones'

const ITEMS: Record<ActivityType, { subject: string; meta: string; preview: string }> = {
  'Email In': {
    subject: 'Re: LogistikPro CIM v2 — financial model questions',
    meta: 'Ivan Petrov (CFO) → M. Volkova · Jun 3, 2026, 14:22',
    preview: 'Maria, could you clarify the EBITDA adjustments on tab 4 before Friday?',
  },
  'Email Out': {
    subject: 'TechnoPark IPO prep — data room access',
    meta: 'D. Kuznetsov → Ivan Petrov (CFO) · Jun 4, 2026, 09:10',
    preview: 'Access to the VDR has been granted for your team until Jun 30.',
  },
  Meeting: {
    subject: 'Management presentation — RosMedia acquisition',
    meta: 'M. Volkova, D. Kuznetsov · Jun 6, 2026, 11:00',
    preview: 'Agenda: synergies, integration plan, Q&A with the CEO.',
  },
  NDA: {
    subject: 'NDA signed — LogistikPro sale',
    meta: 'Ivan Petrov (CFO) · Jun 2, 2026, 17:45',
    preview: 'Mutual NDA v3, valid 24 months. Sending CIM is now unblocked.',
  },
  Note: {
    subject: 'Buyer shortlist updated',
    meta: 'M. Volkova · Jun 7, 2026, 16:30',
    preview: 'Removed two strategics due to Zone A conflict.',
  },
}

/**
 * Activity feed row on the deal card (full width). Variants: type (5) × with / without preview.
 * Preview is shown only when the `preview` prop is set.
 */
const meta = {
  title: 'M&A/ActivityFeedItem',
  component: ActivityFeedItem,
  tags: ['autodocs'],
  args: { type: 'Email In', subject: ITEMS['Email In'].subject, meta: ITEMS['Email In'].meta },
  argTypes: {
    type: { control: 'select', options: ACTIVITY_TYPES, description: 'Event type — drives icon and tone' },
    subject: { control: 'text', description: 'Event title (email subject, meeting name…)' },
    meta: { control: 'text', description: 'Who → whom · date, time' },
    preview: { control: 'text', description: 'Optional body excerpt; omitted = no preview line' },
  },
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-160"><Story /></div>],
} satisfies Meta<typeof ActivityFeedItem>
export default meta
type Story = StoryObj<typeof meta>

export const EmailIn: Story = {}
export const EmailInWithPreview: Story = { args: { preview: ITEMS['Email In'].preview } }
export const EmailOut: Story = { args: { type: 'Email Out', ...ITEMS['Email Out'], preview: undefined } }
export const Meeting: Story = { args: { type: 'Meeting', ...ITEMS.Meeting, preview: undefined } }
export const Nda: Story = { args: { type: 'NDA', ...ITEMS.NDA, preview: undefined } }
export const Note: Story = { args: { type: 'Note', ...ITEMS.Note } }

/** Type × preview matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(2,minmax(0,1fr))] items-start gap-(--spacing-lg)">
      <span />
      <span className="ds-label-sm text-foreground-muted">Without preview</span>
      <span className="ds-label-sm text-foreground-muted">With preview</span>
      {ACTIVITY_TYPES.map((type) => (
        <div key={type} className="contents">
          <code className="ds-meta text-foreground-muted">{type}</code>
          <ActivityFeedItem type={type} subject={ITEMS[type].subject} meta={ITEMS[type].meta} />
          <ActivityFeedItem type={type} {...ITEMS[type]} />
        </div>
      ))}
    </div>
  ),
}
