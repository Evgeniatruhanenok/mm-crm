import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './skeleton'

/**
 * Loading placeholder with a pulse animation. No variants — size and shape via `className`.
 */
const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: { className: 'h-4 w-48' },
  argTypes: {
    className: { control: 'text', description: 'Size / shape classes (e.g. `h-4 w-48`, `size-10 rounded-full`)' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Skeleton>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
/** Circle — avatar placeholder. */
export const Circle: Story = { args: { className: 'size-10 rounded-full' } }
/** Kanban deal card while loading. */
export const DealCard: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-(--spacing-sm) rounded-md border border-border-default p-(--padding-md)">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-3 w-24" />
      <div className="flex items-center gap-(--spacing-sm)">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  ),
}
/** Table rows while loading. */
export const TableRows: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-(--spacing-sm)">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-(--spacing-md)">
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  ),
}

/** Shapes overview. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_auto] items-center justify-start gap-(--spacing-lg)">
      <code className="ds-meta text-foreground-muted">line</code>
      <Skeleton className="h-4 w-48" />
      <code className="ds-meta text-foreground-muted">circle</code>
      <Skeleton className="size-10 rounded-full" />
      <code className="ds-meta text-foreground-muted">block</code>
      <Skeleton className="h-24 w-48" />
      <code className="ds-meta text-foreground-muted">card</code>
      <div className="flex w-72 flex-col gap-(--spacing-sm) rounded-md border border-border-default p-(--padding-md)">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
}
