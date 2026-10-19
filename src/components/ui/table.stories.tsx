import type { Meta, StoryObj } from '@storybook/react-vite'
import { StageBadge } from '../StageBadge'
import type { Stage } from '../tones'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

const DEALS: { name: string; stage: Stage; owner: string; team: string; value: string; updated: string }[] = [
  { name: 'LogistikPro sale', stage: 'Due Diligence', owner: 'M. Volkova', team: 'Team A', value: '$42.0M', updated: 'Jun 14, 2026' },
  { name: 'TechnoPark IPO prep', stage: 'Prospecting', owner: 'D. Kuznetsov', team: 'Team B', value: '$120.0M', updated: 'Jun 12, 2026' },
  { name: 'RosMedia acquisition', stage: 'NDA Signed', owner: 'M. Volkova', team: 'Team C', value: '$18.5M', updated: 'Jun 10, 2026' },
  { name: 'MetallSbyt restructuring', stage: 'LOI / Term Sheet', owner: 'D. Kuznetsov', team: 'Team A', value: '$64.2M', updated: 'Jun 8, 2026' },
  { name: 'KapitalEnergo merger', stage: 'Closing', owner: 'M. Volkova', team: 'Team B', value: '$210.0M', updated: 'Jun 3, 2026' },
]

/**
 * Base table atoms: Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption.
 * No variants — rows support hover and `data-state="selected"`.
 */
const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  args: { className: 'w-[720px]' },
  argTypes: {
    className: { control: 'text', description: 'Extra classes on the `<table>` element' },
    children: { control: false, description: 'TableHeader / TableBody / TableFooter / TableCaption' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Table {...args}>
      <TableCaption>Active mandates — Q2 2026</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Deal</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Team</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DEALS.map((d) => (
          <TableRow key={d.name}>
            <TableCell className="font-medium text-foreground">{d.name}</TableCell>
            <TableCell><StageBadge stage={d.stage} /></TableCell>
            <TableCell>{d.owner}</TableCell>
            <TableCell>{d.team}</TableCell>
            <TableCell className="text-right">{d.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
} satisfies Meta<typeof Table>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** With footer totals. */
export const WithFooter: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Deal</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DEALS.map((d) => (
          <TableRow key={d.name}>
            <TableCell className="font-medium text-foreground">{d.name}</TableCell>
            <TableCell>{d.owner}</TableCell>
            <TableCell className="text-right">{d.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total pipeline</TableCell>
          <TableCell className="text-right">$454.7M</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

/** Empty state — single full-width cell. */
export const Empty: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Deal</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>Owner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="h-24 text-center text-foreground-muted">No deals in this stage.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

/** Row states: default / hover (native, hover the row) / selected (`data-state="selected"`). */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Row state</TableHead>
          <TableHead>Deal</TableHead>
          <TableHead>Stage</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DEALS.slice(0, 3).map((d, i) => {
          const state = ['default', 'hover (native)', 'selected'][i]
          return (
            <TableRow key={d.name} data-state={state === 'selected' ? 'selected' : undefined}>
              <TableCell><code className="ds-meta text-foreground-muted">{state}</code></TableCell>
              <TableCell className="font-medium text-foreground">{d.name}</TableCell>
              <TableCell><StageBadge stage={d.stage} /></TableCell>
              <TableCell>{d.owner}</TableCell>
              <TableCell>{d.updated}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  ),
}
