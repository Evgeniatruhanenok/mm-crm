import type { Meta, StoryObj } from '@storybook/react-vite'
import { ShieldAlertIcon, Trash2Icon } from 'lucide-react'
import { Button } from './button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog'

const SIZES = ['default', 'sm'] as const

/** NDA hard-block: access to the deal data room is blocked until the NDA is signed. */
function NdaBlockContent({ size = 'default', media = true }: { size?: (typeof SIZES)[number]; media?: boolean }) {
  return (
    <AlertDialogContent size={size}>
      <AlertDialogHeader>
        {media && <AlertDialogMedia><ShieldAlertIcon /></AlertDialogMedia>}
        <AlertDialogTitle>NDA not signed</AlertDialogTitle>
        <AlertDialogDescription>
          Atlas Capital has not signed the NDA for LogistikPro sale. Documents and the Buyer List stay locked until it is signed.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Request NDA</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

/**
 * Blocking confirmation that requires an explicit choice (no outside-click dismiss).
 * Content size: default | sm; optional media icon; Action can use any Button variant (e.g. destructive).
 */
const meta = {
  title: 'Components/Alert Dialog',
  component: AlertDialog,
  tags: ['autodocs'],
  args: { defaultOpen: false },
  argTypes: {
    defaultOpen: { control: 'boolean', description: 'Initial open state (uncontrolled)' },
    open: { control: 'boolean', description: 'Controlled open state' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild><Button variant="outline">Open data room</Button></AlertDialogTrigger>
      <NdaBlockContent />
    </AlertDialog>
  ),
} satisfies Meta<typeof AlertDialog>
export default meta
type Story = StoryObj<typeof meta>

/** NDA hard-block behind a trigger. */
export const WithTrigger: Story = {}
/** NDA hard-block opened by default so the content is visible in docs. */
export const NdaHardBlock: Story = { args: { defaultOpen: true } }
/** Compact `size="sm"` — stacked, centered layout with 2-column footer. */
export const Small: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild><Button variant="outline">Open data room</Button></AlertDialogTrigger>
      <NdaBlockContent size="sm" />
    </AlertDialog>
  ),
}
/** Destructive confirmation. */
export const Destructive: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild><Button variant="destructive"><Trash2Icon />Delete deal</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete TechnoPark IPO prep?</AlertDialogTitle>
          <AlertDialogDescription>The deal is archived; the Audit Log entry stays immutable.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete deal</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/** Triggers for each size × media configuration — click to open. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(2,auto)] items-center gap-(--spacing-lg)">
      <span />
      {['With media', 'Text only'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {SIZES.map((s) => (
        <div key={s} className="contents">
          <code className="ds-meta text-foreground-muted">{s}</code>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="outline">NDA block</Button></AlertDialogTrigger>
            <NdaBlockContent size={s} />
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="outline">NDA block</Button></AlertDialogTrigger>
            <NdaBlockContent size={s} media={false} />
          </AlertDialog>
        </div>
      ))}
    </div>
  ),
}
