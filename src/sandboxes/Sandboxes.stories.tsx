import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { toast } from 'sonner'
import { ArchiveIcon, ArrowUpDownIcon, PencilIcon, PlusIcon, Share2Icon } from 'lucide-react'

import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { Checkbox } from '../components/ui/checkbox'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '../components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip'
import { Toaster } from '../components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../components/ui/navigation-menu'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { StageBadge } from '../components/StageBadge'
import { KanbanCard } from '../components/KanbanCard'
import { KanbanColumn } from '../components/KanbanColumn'
import { ActivityFeedItem } from '../components/ActivityFeedItem'
import { STAGES, type Stage } from '../components/tones'

/**
 * Sandboxes — components from the base composed into real product blocks,
 * to see how they behave together (not one by one).
 */
const meta = {
  title: 'Sandboxes',
  parameters: { layout: 'padded' },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const DEALS: { name: string; type: string; stage: Stage; team: string; owner: string; nda: boolean }[] = [
  { name: 'RosMedia acquisition', type: 'Buy-side', stage: 'Prospecting', team: 'Team A', owner: 'M. Volkova', nda: false },
  { name: 'LogistikPro sale', type: 'Sell-side', stage: 'NDA Signed', team: 'Team C', owner: 'M. Volkova', nda: true },
  { name: 'StroyKapital acquisition', type: 'Buy-side', stage: 'NDA Signed', team: 'Team A', owner: 'A. Smirnov', nda: true },
  { name: 'TechnoPark IPO prep', type: 'Advisory', stage: 'Due Diligence', team: 'Team B', owner: 'D. Kuznetsov', nda: true },
  { name: 'DigitalTrade acquisition', type: 'Buy-side', stage: 'LOI / Term Sheet', team: 'Team A', owner: 'A. Smirnov', nda: true },
  { name: 'KapitalEnergo merger', type: 'Sell-side', stage: 'Closing', team: 'Team B', owner: 'D. Kuznetsov', nda: true },
]

/** Modal — Dialog with title, Inputs, Badge and secondary + primary buttons. Submit validates, then closes and toasts. */
export const Modal: Story = {
  render: function ModalSandbox() {
    const [open, setOpen] = React.useState(true)
    const [name, setName] = React.useState('')
    const [stage, setStage] = React.useState<Stage>('Prospecting')
    const [touched, setTouched] = React.useState(false)
    const invalid = touched && name.trim().length < 3
    const submit = () => {
      setTouched(true)
      if (name.trim().length < 3) return
      setOpen(false)
      toast.success(`Deal “${name}” created`, { description: `Stage: ${stage}` })
      setName(''); setTouched(false)
    }
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><PlusIcon /> New deal</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-(--spacing-sm)">New deal <StageBadge stage={stage} /></DialogTitle>
              <DialogDescription>Visible only to members of the deal's Chinese Wall zone.</DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field data-invalid={invalid || undefined}>
                <FieldLabel htmlFor="deal-name">Deal name</FieldLabel>
                <Input id="deal-name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={invalid || undefined} placeholder="LogistikPro sale" />
                {invalid ? <FieldError>At least 3 characters</FieldError> : <FieldDescription>Shown on the Kanban card</FieldDescription>}
              </Field>
              <Field>
                <FieldLabel>Stage</FieldLabel>
                <Select value={stage} onValueChange={(v) => setStage(v as Stage)}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
              <Button onClick={submit}>Create deal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Toaster theme="light" />
      </>
    )
  },
}

/** Form — Input / Select / Dropdown / Textarea / Checkbox with submit + cancel and validation errors. */
export const Form: Story = {
  render: function FormSandbox() {
    const empty = { name: '', email: '', team: '', note: '', nda: false }
    const [v, setV] = React.useState(empty)
    const [role, setRole] = React.useState('Analyst')
    const [submitted, setSubmitted] = React.useState(false)
    const errors = {
      name: !v.name.trim() ? 'Name is required' : '',
      email: !/^\S+@\S+\.\S+$/.test(v.email) ? 'Enter a valid email' : '',
      team: !v.team ? 'Pick a team' : '',
      nda: !v.nda ? 'NDA must be signed before access' : '',
    }
    const show = (k: keyof typeof errors) => submitted && errors[k]
    const ok = Object.values(errors).every((e) => !e)
    return (
      <form
        className="flex w-120 flex-col gap-(--spacing-xl) rounded-md border border-border-default bg-background-card p-(--padding-lg)"
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); if (ok) { toast.success('Member added to Zone A'); setV(empty); setSubmitted(false) } }}
        onReset={() => { setV(empty); setSubmitted(false) }}
      >
        <h3 className="ds-h4 text-foreground-default">Add member to Chinese Wall</h3>
        <FieldGroup>
          <Field data-invalid={show('name') ? true : undefined}>
            <FieldLabel htmlFor="f-name">Full name</FieldLabel>
            <Input id="f-name" value={v.name} aria-invalid={show('name') ? true : undefined} onChange={(e) => setV({ ...v, name: e.target.value })} placeholder="Maria Volkova" />
            {show('name') && <FieldError>{errors.name}</FieldError>}
          </Field>
          <Field data-invalid={show('email') ? true : undefined}>
            <FieldLabel htmlFor="f-email">Work email</FieldLabel>
            <Input id="f-email" value={v.email} aria-invalid={show('email') ? true : undefined} onChange={(e) => setV({ ...v, email: e.target.value })} placeholder="m.volkova@boutique.com" />
            {show('email') && <FieldError>{errors.email}</FieldError>}
          </Field>
          <div className="grid grid-cols-2 gap-(--spacing-lg)">
            <Field data-invalid={show('team') ? true : undefined}>
              <FieldLabel>Team</FieldLabel>
              <Select value={v.team} onValueChange={(t) => setV({ ...v, team: t })}>
                <SelectTrigger className="w-full" aria-invalid={show('team') ? true : undefined}><SelectValue placeholder="Select team" /></SelectTrigger>
                <SelectContent>{['Team A', 'Team B', 'Team C'].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
              {show('team') && <FieldError>{errors.team}</FieldError>}
            </Field>
            <Field>
              <FieldLabel>Role</FieldLabel>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="outline" className="w-full justify-between">{role} <ArrowUpDownIcon /></Button></DropdownMenuTrigger>
                <DropdownMenuContent>{['Partner', 'MD', 'VP', 'Associate', 'Analyst'].map((r) => <DropdownMenuItem key={r} onSelect={() => setRole(r)}>{r}</DropdownMenuItem>)}</DropdownMenuContent>
              </DropdownMenu>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="f-note">Note</FieldLabel>
            <Textarea id="f-note" value={v.note} onChange={(e) => setV({ ...v, note: e.target.value })} placeholder="Joins LogistikPro sale due diligence" />
          </Field>
          <Field data-invalid={show('nda') ? true : undefined}>
            <Label className="gap-(--spacing-sm)"><Checkbox checked={v.nda} onCheckedChange={(c) => setV({ ...v, nda: c === true })} aria-invalid={show('nda') ? true : undefined} /> NDA signed</Label>
            {show('nda') && <FieldError>{errors.nda}</FieldError>}
          </Field>
        </FieldGroup>
        <div className="flex justify-end gap-(--spacing-sm)">
          <Button type="reset" variant="secondary">Cancel</Button>
          <Button type="submit">Add member</Button>
        </div>
        <Toaster theme="light" />
      </form>
    )
  },
}

/** Navigation — top Navbar + Breadcrumb + Tabs + Pagination in one page context. All parts are interactive. */
export const Navigation: Story = {
  parameters: { layout: 'fullscreen' },
  render: function NavigationSandbox() {
    const [section, setSection] = React.useState('Pipeline')
    const [tab, setTab] = React.useState('activity')
    const [page, setPage] = React.useState(1)
    const pages = 3
    return (
      <div className="flex min-h-120 flex-col bg-background-default text-foreground-default">
        <header className="flex items-center gap-(--spacing-xl) border-b border-border-default px-(--padding-lg) py-(--padding-xs)">
          <span className="ds-large">M&A CRM</span>
          <NavigationMenu>
            <NavigationMenuList>
              {['Pipeline', 'Contacts', 'Compliance', 'Settings'].map((s) => (
                <NavigationMenuItem key={s}>
                  <NavigationMenuLink href="#" active={section === s} onClick={(e) => { e.preventDefault(); setSection(s) }}>{s}</NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Avatar className="ml-auto"><AvatarFallback>AS</AvatarFallback></Avatar>
        </header>
        <main className="flex flex-col gap-(--spacing-lg) p-(--padding-lg)">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">{section}</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>LogistikPro sale</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-(--spacing-md)">
            <h2 className="ds-h3">LogistikPro sale</h2>
            <StageBadge stage="NDA Signed" />
          </div>
          <Tabs value={tab} onValueChange={(t) => { setTab(t); setPage(1) }}>
            <TabsList variant="underline">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="buyers">Buyer List</TabsTrigger>
            </TabsList>
            <TabsContent value={tab} className="ds-body pt-(--padding-sm) text-foreground-muted">
              {tab === 'activity' ? 'Activity feed' : tab === 'documents' ? 'Data room documents' : 'Buyer list'} — page {page} of {pages}
            </TabsContent>
          </Tabs>
          <Pagination className="justify-start">
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)) }} aria-disabled={page === 1} className={page === 1 ? 'pointer-events-none opacity-50' : undefined} /></PaginationItem>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <PaginationItem key={n}><PaginationLink href="#" isActive={n === page} onClick={(e) => { e.preventDefault(); setPage(n) }}>{n}</PaginationLink></PaginationItem>
              ))}
              <PaginationItem><PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(pages, p + 1)) }} aria-disabled={page === pages} className={page === pages ? 'pointer-events-none opacity-50' : undefined} /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    )
  },
}

/** Data & feedback — Table + Tooltip on row actions + Toast on action. Click the column header to sort. */
export const DataFeedback: Story = {
  name: 'Data & Feedback',
  render: function DataSandbox() {
    const [asc, setAsc] = React.useState(true)
    const [rows, setRows] = React.useState(DEALS)
    const sorted = [...rows].sort((a, b) => (asc ? 1 : -1) * a.name.localeCompare(b.name))
    const action = (label: string, deal: string, Icon: typeof PencilIcon, onClick: () => void) => (
      <Tooltip>
        <TooltipTrigger asChild><Button variant="ghost" size="icon-sm" aria-label={`${label} ${deal}`} onClick={onClick}><Icon /></Button></TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    )
    return (
      <div className="w-200 rounded-md border border-border-default">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Button variant="ghost" size="sm" onClick={() => setAsc(!asc)}>Deal <ArrowUpDownIcon /></Button></TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>NDA</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((d) => (
              <TableRow key={d.name}>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.type}</TableCell>
                <TableCell><StageBadge stage={d.stage} /></TableCell>
                <TableCell>{d.owner}</TableCell>
                <TableCell>{d.nda ? <Badge variant="secondary">Signed</Badge> : <Badge variant="outline">Pending</Badge>}</TableCell>
                <TableCell className="text-right">
                  {action('Edit', d.name, PencilIcon, () => toast(`Editing “${d.name}”`))}
                  {action('Share', d.name, Share2Icon, () => d.nda ? toast.success(`Link to “${d.name}” copied`) : toast.error('Blocked: NDA not signed', { description: d.name }))}
                  {action('Archive', d.name, ArchiveIcon, () => { setRows((r) => r.filter((x) => x.name !== d.name)); toast.warning(`“${d.name}” archived`) })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Toaster theme="light" />
      </div>
    )
  },
}

/** Pipeline — KanbanColumn × KanbanCard × StageBadge + ActivityFeedItem: click a card to see its latest activity. */
export const Pipeline: Story = {
  parameters: { layout: 'fullscreen' },
  render: function PipelineSandbox() {
    const [selected, setSelected] = React.useState(DEALS[1].name)
    const deal = DEALS.find((d) => d.name === selected)!
    return (
      <div className="flex flex-col gap-(--spacing-xl) bg-background-default p-(--padding-lg)">
        <div className="flex gap-(--spacing-lg) overflow-x-auto">
          {STAGES.map((s) => {
            const list = DEALS.filter((d) => d.stage === s)
            return (
              <KanbanColumn key={s} stage={s} onAdd={() => toast(`New deal in ${s}`)}>
                {list.map((d) => (
                  <KanbanCard
                    key={d.name} stage={s} dealName={d.name} dealType={d.type} team={d.team} date="Jun 14, 2026"
                    onClick={() => setSelected(d.name)}
                    className={d.name === selected ? 'cursor-pointer ring-2 ring-border-primary-default' : 'cursor-pointer transition-shadow hover:shadow-md'}
                  />
                ))}
              </KanbanColumn>
            )
          })}
        </div>
        <div className="max-w-3xl overflow-hidden rounded-md border border-border-default">
          <ActivityFeedItem type="Email In" subject={`Re: ${deal.name} — financial model questions`} meta={`Ivan Petrov (CFO) → ${deal.owner} · Jun 3, 2026, 14:22`} preview="We have a few clarifying questions on section 4 of the financial model..." />
          <ActivityFeedItem type={deal.nda ? 'NDA' : 'Note'} subject={deal.nda ? `NDA signed — ${deal.name}` : 'NDA pending'} meta={`Legal → ${deal.owner} · May 28, 2026, 09:45`} />
        </div>
        <Toaster theme="light" />
      </div>
    )
  },
}
