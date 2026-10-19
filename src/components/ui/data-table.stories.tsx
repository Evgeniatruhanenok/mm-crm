import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, SearchIcon } from 'lucide-react'
import { StageBadge } from '../StageBadge'
import type { Stage } from '../tones'
import { Button } from './button'
import { Checkbox } from './checkbox'
import { Input } from './input'
import { Skeleton } from './skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'

type Deal = { id: string; name: string; stage: Stage; owner: string; team: string; value: number; updated: string }
type SortKey = 'name' | 'value' | 'owner'
type SortDir = 'asc' | 'desc'

const DEALS: Deal[] = [
  { id: 'd1', name: 'LogistikPro sale', stage: 'Due Diligence', owner: 'M. Volkova', team: 'Team A', value: 42.0, updated: 'Jun 14, 2026' },
  { id: 'd2', name: 'TechnoPark IPO prep', stage: 'Prospecting', owner: 'D. Kuznetsov', team: 'Team B', value: 120.0, updated: 'Jun 12, 2026' },
  { id: 'd3', name: 'RosMedia acquisition', stage: 'NDA Signed', owner: 'M. Volkova', team: 'Team C', value: 18.5, updated: 'Jun 10, 2026' },
  { id: 'd4', name: 'MetallSbyt restructuring', stage: 'LOI / Term Sheet', owner: 'D. Kuznetsov', team: 'Team A', value: 64.2, updated: 'Jun 8, 2026' },
  { id: 'd5', name: 'DigitalTrade acquisition', stage: 'Due Diligence', owner: 'M. Volkova', team: 'Team B', value: 35.7, updated: 'Jun 5, 2026' },
  { id: 'd6', name: 'KapitalEnergo merger', stage: 'Closing', owner: 'D. Kuznetsov', team: 'Team C', value: 210.0, updated: 'Jun 3, 2026' },
  { id: 'd7', name: 'LogistikPro refinancing', stage: 'Prospecting', owner: 'M. Volkova', team: 'Team A', value: 27.3, updated: 'May 29, 2026' },
  { id: 'd8', name: 'RosMedia carve-out', stage: 'NDA Signed', owner: 'D. Kuznetsov', team: 'Team B', value: 9.8, updated: 'May 22, 2026' },
]

type DataTableDemoProps = {
  pageSize: number
  initialFilter: string
  initialSelected: string[]
  loading: boolean
}

/** Stateful demo: filter by deal name, sort by column, select rows, paginate. */
function DataTableDemo({ pageSize, initialFilter, initialSelected, loading }: DataTableDemoProps) {
  const [filter, setFilter] = React.useState(initialFilter)
  const [sort, setSort] = React.useState<{ key: SortKey; dir: SortDir } | null>(null)
  const [selected, setSelected] = React.useState<Set<string>>(new Set(initialSelected))
  const [page, setPage] = React.useState(0)

  const rows = React.useMemo(() => {
    const q = filter.trim().toLowerCase()
    const filtered = DEALS.filter((d) => d.name.toLowerCase().includes(q))
    if (!sort) return filtered
    return [...filtered].sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv))
      return sort.dir === 'asc' ? cmp : -cmp
    })
  }, [filter, sort])

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize))
  const safePage = Math.min(page, pageCount - 1)
  const pageRows = rows.slice(safePage * pageSize, safePage * pageSize + pageSize)
  const allOnPage = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id))
  const someOnPage = pageRows.some((r) => selected.has(r.id))

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s?.key !== key ? { key, dir: 'asc' } : s.dir === 'asc' ? { key, dir: 'desc' } : null))
  const sortIcon = (key: SortKey) =>
    sort?.key !== key ? <ArrowUpDownIcon /> : sort.dir === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />
  const toggleRow = (id: string, on: boolean) =>
    setSelected((s) => {
      const next = new Set(s)
      if (on) next.add(id)
      else next.delete(id)
      return next
    })
  const togglePage = (on: boolean) =>
    setSelected((s) => {
      const next = new Set(s)
      pageRows.forEach((r) => (on ? next.add(r.id) : next.delete(r.id)))
      return next
    })

  return (
    <div className="flex w-[760px] flex-col gap-(--spacing-md)">
      <div className="relative w-72">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-foreground-muted" />
        <Input
          placeholder="Filter deals..."
          className="pl-8"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value)
            setPage(0)
          }}
        />
      </div>
      <div className="rounded-md border border-border-default">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">
                <Checkbox
                  aria-label="Select all on page"
                  checked={allOnPage ? true : someOnPage ? 'indeterminate' : false}
                  onCheckedChange={(v) => togglePage(v === true)}
                />
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => toggleSort('name')}>Deal {sortIcon('name')}</Button>
              </TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => toggleSort('owner')}>Owner {sortIcon('owner')}</Button>
              </TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" onClick={() => toggleSort('value')}>Value {sortIcon('value')}</Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: pageSize }, (_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}><Skeleton className="h-5 w-full" /></TableCell>
                  </TableRow>
                ))
              : pageRows.length === 0
                ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-foreground-muted">No deals match “{filter}”.</TableCell>
                    </TableRow>
                  )
                : pageRows.map((d) => (
                    <TableRow key={d.id} data-state={selected.has(d.id) ? 'selected' : undefined}>
                      <TableCell>
                        <Checkbox aria-label={`Select ${d.name}`} checked={selected.has(d.id)} onCheckedChange={(v) => toggleRow(d.id, v === true)} />
                      </TableCell>
                      <TableCell className="px-(--padding-md) font-medium text-foreground">{d.name}</TableCell>
                      <TableCell><StageBadge stage={d.stage} /></TableCell>
                      <TableCell className="px-(--padding-md)">{d.owner}</TableCell>
                      <TableCell>{d.team}</TableCell>
                      <TableCell className="px-(--padding-md) text-right">${d.value.toFixed(1)}M</TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <span className="ds-meta text-foreground-muted">
          {selected.size} of {DEALS.length} deal(s) selected
        </span>
        <div className="flex items-center gap-(--spacing-sm)">
          <span className="ds-meta text-foreground-muted">Page {safePage + 1} of {pageCount}</span>
          <Button variant="outline" size="sm" disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>Previous</Button>
          <Button variant="outline" size="sm" disabled={safePage >= pageCount - 1} onClick={() => setPage(safePage + 1)}>Next</Button>
        </div>
      </div>
    </div>
  )
}

/**
 * Data Table pattern (no own component): Table + Input filter + sortable header Buttons +
 * Checkbox row selection + pagination Buttons. Sorting, filtering, selection and paging are live.
 */
const meta = {
  title: 'Components/Data Table',
  component: Table,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    className: { control: 'text', description: 'Extra classes on the `<table>` element' },
    children: { control: false, description: 'TableHeader / TableBody composed by the pattern' },
  },
  parameters: { layout: 'centered' },
  render: () => <DataTableDemo pageSize={5} initialFilter="" initialSelected={[]} loading={false} />,
} satisfies Meta<typeof Table>
export default meta
type Story = StoryObj<typeof meta>

/** Interactive: type in the filter, click column headers to sort, select rows, page through. */
export const Default: Story = {}

/** Filtered — query pre-filled with "acquisition". */
export const Filtered: Story = {
  render: () => <DataTableDemo pageSize={5} initialFilter="acquisition" initialSelected={[]} loading={false} />,
}

/** Rows selected — selected rows get `data-state="selected"`. */
export const WithSelection: Story = {
  render: () => <DataTableDemo pageSize={5} initialFilter="" initialSelected={['d1', 'd3']} loading={false} />,
}

/** Empty — filter matches nothing. */
export const Empty: Story = {
  render: () => <DataTableDemo pageSize={5} initialFilter="Nonexistent Holding" initialSelected={[]} loading={false} />,
}

/** Loading — Skeleton rows. */
export const Loading: Story = {
  render: () => <DataTableDemo pageSize={5} initialFilter="" initialSelected={[]} loading />,
}

/** State matrix: default / filtered / selected / empty / loading. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-(--spacing-xl)">
      {([
        ['default', '', [], false],
        ['filtered', 'acquisition', [], false],
        ['selected', '', ['d1', 'd3'], false],
        ['empty', 'Nonexistent Holding', [], false],
        ['loading', '', [], true],
      ] as const).map(([label, f, sel, loading]) => (
        <div key={label} className="flex flex-col gap-(--spacing-sm)">
          <code className="ds-meta text-foreground-muted">{label}</code>
          <DataTableDemo pageSize={3} initialFilter={f} initialSelected={[...sel]} loading={loading} />
        </div>
      ))}
    </div>
  ),
}
