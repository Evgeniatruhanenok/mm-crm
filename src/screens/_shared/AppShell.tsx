import * as React from "react"
import type { ReactNode } from "react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router"
import { toast } from "sonner"
import { ChevronDownIcon, ChevronRightIcon, DatabaseBackupIcon, EyeIcon, LayoutGridIcon, LogOutIcon, SearchIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { CURRENT_USER, actingEmployee, useStore } from "@/data"

/*
 * Shared app frame of all screens: Header (64) + Sidebar (240) + Main.
 * Navigation is live: links go to registry routes, the active item follows the URL.
 */

export type NavKey = "pipeline" | "chinese-walls" | "audit-log"

const notInScope = (label: string) => () => toast.info(`${label} is not part of the MVP prototype yet`)

function AppShell({ children }: { active?: NavKey; children: ReactNode }) {
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { state, actions } = useStore()
  const me = actingEmployee(state)
  // deep link for demos: ?as=<employeeId> switches "View as", ?as=me returns to Alexey
  const asParam = params.get("as")
  React.useEffect(() => {
    if (asParam === null) return
    const target = asParam === "me" ? null : state.employees.some((e) => e.id === asParam) ? asParam : null
    if (target !== state.viewAs) actions.setViewAs(target)
  }, [asParam]) // eslint-disable-line react-hooks/exhaustive-deps
  const zoneOfMe = me && state.zones.find((z) => z.active && z.memberIds.includes(me.id))
  const view = params.get("view") ?? "all"
  const inPipeline = pathname.startsWith("/pipeline") || pathname.startsWith("/deals")
  const inCompliance = pathname.startsWith("/compliance")
  const [complianceOpen, setComplianceOpen] = React.useState(inCompliance)
  React.useEffect(() => { if (inCompliance) setComplianceOpen(true) }, [inCompliance])

  const [q, setQ] = React.useState(params.get("q") ?? "")
  React.useEffect(() => setQ(params.get("q") ?? ""), [params])
  const search = (e: React.FormEvent) => {
    e.preventDefault()
    const target = pathname === "/pipeline" ? "/pipeline" : "/pipeline/table"
    navigate(q.trim() ? `${target}?q=${encodeURIComponent(q.trim())}` : target)
  }

  const viewLink = (v: string, label: string) => (
    <SidebarMenuItem key={v}>
      <SidebarMenuButton asChild isActive={inPipeline && !pathname.startsWith("/deals") && view === v}>
        <Link to={`/pipeline?view=${v}`}>{label}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )

  return (
    <div className="flex h-svh min-h-0 flex-col bg-background-default text-foreground-default">
      <header className="flex h-16 shrink-0 items-center justify-between gap-(--spacing-xl) border-b border-border-default px-(--padding-lg)">
        <Link to="/pipeline" className="ds-small flex h-8 w-30 items-center justify-center rounded-sm bg-background-secondary-default font-semibold">M&A CRM</Link>
        <form onSubmit={search} className="max-w-120 flex-1" role="search">
          <InputGroup>
            <InputGroupAddon><SearchIcon /></InputGroupAddon>
            <InputGroupInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search deals, contacts, files..." aria-label="Global search" />
          </InputGroup>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-(--spacing-sm) rounded-sm px-(--spacing-xs) py-(--spacing-xxs) transition-colors outline-none hover:bg-background-muted focus-visible:ring-3 focus-visible:ring-ring/50">
            <Avatar size="sm"><AvatarFallback>{me?.initials ?? CURRENT_USER.initials}</AvatarFallback></Avatar>
            <span className="ds-body text-foreground-default">{me?.name ?? CURRENT_USER.name}</span>
            <ChevronDownIcon className="size-3 text-icon-muted" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{me ? `${me.name} · ${me.role}` : `${CURRENT_USER.name} · ${CURRENT_USER.role}`}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger><EyeIcon /> View as</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={state.viewAs ?? "me"} onValueChange={(v) => actions.setViewAs(v === "me" ? null : v)}>
                  <DropdownMenuRadioItem value="me">{CURRENT_USER.name} · MD (all deals)</DropdownMenuRadioItem>
                  {state.employees.filter((e) => e.id !== "smirnov").map((e) => {
                    const z = state.zones.find((x) => x.active && x.memberIds.includes(e.id))
                    return <DropdownMenuRadioItem key={e.id} value={e.id}>{e.name} · {e.role}{z ? ` · Zone ${z.letter}` : " · no zone"}</DropdownMenuRadioItem>
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem onSelect={() => navigate("/")}><LayoutGridIcon /> All screens</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => { actions.resetDemoData(); toast.success("Demo data reset", { description: "All changes were discarded" }) }}><DatabaseBackupIcon /> Reset demo data</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toast.info("Mock session — sign-in is not part of this prototype")}><LogOutIcon /> Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {me && (
        <div className="ds-caption flex items-center justify-center gap-(--spacing-sm) border-b border-border-warning-default bg-background-warning-light px-(--padding-lg) py-(--padding-xxs) text-foreground-warning-default">
          <EyeIcon className="size-3.5" />
          Viewing as {me.name} ({me.role}){zoneOfMe ? ` · member of Zone ${zoneOfMe.letter}` : " · not in any zone"} — Chinese Wall rules apply
          <button type="button" className="font-medium underline underline-offset-4" onClick={() => actions.setViewAs(null)}>Back to {CURRENT_USER.name}</button>
        </div>
      )}
      <SidebarProvider className="min-h-0 flex-1">
        <Sidebar collapsible="none" className="w-60 border-r border-border-default">
          <SidebarContent className="gap-(--spacing-xxs) p-(--padding-sm)">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={inPipeline && (view === "all" || pathname.startsWith("/deals"))}>
                  <Link to="/pipeline">Pipeline</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton onClick={notInScope("Contacts")}>Contacts</SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="justify-between" aria-expanded={complianceOpen} onClick={() => setComplianceOpen((o) => !o)}>
                  Compliance
                  {complianceOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </SidebarMenuButton>
                {complianceOpen && (
                  <SidebarMenuSub className="border-l-0">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive={pathname === "/compliance/chinese-walls"}><Link to="/compliance/chinese-walls">Chinese Walls</Link></SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive={pathname === "/compliance/audit-log"}><Link to="/compliance/audit-log">Audit Log</Link></SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton onClick={notInScope("Settings")}>Settings</SidebarMenuButton></SidebarMenuItem>
            </SidebarMenu>
            <Separator className="my-(--spacing-xs)" />
            <SidebarMenu>
              {viewLink("mine", "My deals")}
              {viewLink("team", "Team deals")}
              {viewLink("closed", "Closed")}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="flex-row items-center gap-(--spacing-sm) p-(--padding-sm)">
            <Avatar size="sm"><AvatarFallback>{me?.initials ?? CURRENT_USER.initials}</AvatarFallback></Avatar>
            <span className="ds-caption text-foreground-muted">{me?.name ?? CURRENT_USER.short}</span>
          </SidebarFooter>
        </Sidebar>
        <main className="flex min-w-0 flex-1 flex-col overflow-auto">
          <div key={pathname} className="flex min-h-full flex-1 flex-col animate-in fade-in-0 slide-in-from-bottom-1 duration-200 ease-out">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  )
}

/** Page header row used by all screens: title on the left, actions on the right. */
function PageToolbar({ title, meta, children }: { title: ReactNode; meta?: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex min-h-12 flex-wrap items-center gap-(--spacing-md) border-b border-border-default px-(--padding-lg) py-(--padding-xxs)">
      <h1 className="ds-h4 text-foreground-default">{title}</h1>
      {meta}
      <div className="ml-auto flex flex-wrap items-center gap-(--spacing-md)">{children}</div>
    </div>
  )
}

export { AppShell, PageToolbar }
