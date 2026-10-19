import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination'

/** PaginationLink renders an `<a>`, so disabled = `aria-disabled` + no pointer events. */
const DISABLED = { 'aria-disabled': true, tabIndex: -1, className: 'pointer-events-none opacity-50' } as const

/**
 * Page navigation: Previous, page links, Ellipsis, Next.
 * Link states: default / active (`isActive`) / disabled (`aria-disabled`).
 */
const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: { 'aria-label': 'Deals pagination' },
  argTypes: {
    'aria-label': { control: 'text', description: 'Accessible name of the navigation landmark' },
    className: { control: 'text', description: 'Extra classes on `<nav>`' },
    children: { control: false, description: 'PaginationContent with items' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationNext href="#" /></PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
} satisfies Meta<typeof Pagination>
export default meta
type Story = StoryObj<typeof meta>

/** state=default — middle of the deal list. */
export const Default: Story = {}

/** state=active — current page uses `isActive` (outline button, `aria-current="page"`). */
export const Active: Story = {
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

/** state=disabled — on the first page Previous is disabled. */
export const Disabled: Story = {
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" {...DISABLED} /></PaginationItem>
        <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationNext href="#" /></PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

/** Item × state matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(3,auto)] items-center justify-start gap-(--spacing-lg)">
      <span />
      {['Default', 'Active', 'Disabled'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      <code className="ds-meta text-foreground-muted">page</code>
      <ul className="flex"><PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem></ul>
      <ul className="flex"><PaginationItem><PaginationLink href="#" isActive>4</PaginationLink></PaginationItem></ul>
      <ul className="flex"><PaginationItem><PaginationLink href="#" {...DISABLED}>4</PaginationLink></PaginationItem></ul>
      <code className="ds-meta text-foreground-muted">previous</code>
      <ul className="flex"><PaginationItem><PaginationPrevious href="#" /></PaginationItem></ul>
      <span className="ds-meta text-foreground-muted">n/a</span>
      <ul className="flex"><PaginationItem><PaginationPrevious href="#" {...DISABLED} /></PaginationItem></ul>
      <code className="ds-meta text-foreground-muted">next</code>
      <ul className="flex"><PaginationItem><PaginationNext href="#" /></PaginationItem></ul>
      <span className="ds-meta text-foreground-muted">n/a</span>
      <ul className="flex"><PaginationItem><PaginationNext href="#" {...DISABLED} /></PaginationItem></ul>
      <code className="ds-meta text-foreground-muted">ellipsis</code>
      <ul className="flex"><PaginationItem><PaginationEllipsis /></PaginationItem></ul>
      <span className="ds-meta text-foreground-muted">n/a</span>
      <span className="ds-meta text-foreground-muted">n/a</span>
    </div>
  ),
}
