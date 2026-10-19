import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import type { DateRange } from "react-day-picker"
import {
  ArrowUpDownIcon,
  BoldIcon,
  CalendarIcon,
  ChevronsUpDownIcon,
  InfoIcon,
  ItalicIcon,
  KanbanIcon,
  LayoutListIcon,
  MailIcon,
  ShieldIcon,
  TriangleAlertIcon,
  UnderlineIcon,
  UsersIcon,
} from "lucide-react"

import {
  // Действия
  Button,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  // Ввод
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Slider,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Calendar,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Label,
  // Отображение данных
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Progress,
  Skeleton,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  // Контейнеры
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Separator,
  ScrollArea,
  // Навигация
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  // Оверлеи
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  // Меню
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  // Фидбэк
  Alert,
  AlertDescription,
  AlertTitle,

  // Профиль
  Avatar,
  AvatarFallback,
  // M&A
  STAGES,
  ACTIVITY_TYPES,
  StageBadge,
  KanbanCard,
  KanbanColumn,
  ActivityFeedItem,
  StatsMetric,
  MemberRow,
} from "@/components"

/* ─────────────────────────── Данные токенов ─────────────────────────── */

const SEMANTIC: Record<string, string[]> = {
  Foreground: [
    "foreground-default",
    "foreground-accent",
    "foreground-secondary-default",
    "foreground-muted",
    "foreground-disabled-default",
    "foreground-primary-default",
    "foreground-destructive-default",
    "foreground-success-default",
    "foreground-warning-default",
  ],
  Background: [
    "background-default",
    "background-card",
    "background-popover",
    "background-secondary-default",
    "background-muted",
    "background-accent",
    "background-input",
    "background-primary-default",
    "background-primary-light",
    "background-destructive-default",
    "background-success-default",
    "background-warning-default",
    "background-disabled-default",
  ],
  Border: [
    "border-default",
    "border-primary-default",
    "border-destructive-default",
    "border-success-default",
    "border-warning-default",
  ],
  Icon: [
    "icon-default",
    "icon-accent",
    "icon-secondary-default",
    "icon-muted",
    "icon-disabled-default",
    "icon-primary-default",
    "icon-destructive-default",
    "icon-success-default",
    "icon-warning-default",
  ],
}

const ZINC = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
const FUNCTIONAL = [
  "red-500", "red-600", "emerald-100", "emerald-600", "emerald-700",
  "yellow-100", "yellow-500", "yellow-600", "yellow-700", "neutral-400",
  "blue-100", "blue-700", "violet-100", "violet-700", "amber-100", "amber-700",
  "primary-50", "primary-900", "chart-1", "chart-2", "chart-3", "chart-4", "chart-5",
]
const RADII = ["none", "xs", "sm", "md", "lg", "xl", "xxl", "full"]
const SPACING = ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl", "3xl", "4xl"]
const PADDING = ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl", "3xl", "4xl"]
const SHADOWS = ["sm", "md", "lg"]

const TEXT_STYLES = [
  ["ds-h1", "Заголовок H1 — Pipeline"],
  ["ds-h2", "Заголовок H2 — Сделки"],
  ["ds-h3", "Заголовок H3 — Due Diligence"],
  ["ds-h4", "Заголовок H4 — Участники"],
  ["ds-lead", "Lead — вводный текст раздела"],
  ["ds-large", "Large — акцентная строка"],
  ["ds-p", "Paragraph — основной текст. Съешь же ещё этих мягких французских булок."],
  ["ds-body", "Body — текст интерфейса 14px"],
  ["ds-small", "Small — подписи и лейблы"],
  ["ds-caption", "Caption — превью письма, 12px"],
  ["ds-metric-value", "1 247"],
  ["ds-title-sm", "Title sm — название сделки, 13 Medium"],
  ["ds-label-sm", "Label sm — бейдж стадии, 12 Medium"],
  ["ds-meta", "Meta — Мария Волкова · 14 июня 2026"],
  ["ds-label-xs", "Label xs — чип зоны, 11 Medium"],
  ["ds-label-2xs", "Label 2xs — бейдж в карточке, 10 Medium"],
]

const chartData = [
  { month: "Янв", deals: 12, closed: 4 },
  { month: "Фев", deals: 18, closed: 6 },
  { month: "Мар", deals: 15, closed: 9 },
  { month: "Апр", deals: 22, closed: 7 },
  { month: "Май", deals: 19, closed: 11 },
]
const chartConfig = {
  deals: { label: "Сделки", color: "var(--chart-1)" },
  closed: { label: "Закрыто", color: "var(--chart-2)" },
} satisfies ChartConfig

const COMBO_ITEMS = ["Альфа Капитал", "Бета Холдинг", "Гамма Групп", "Дельта Партнёрс"]

/* ─────────────────────────── Раскладка ─────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-(--spacing-xl)">
      <h2 className="ds-h3 text-foreground-default">{title}</h2>
      {children}
    </section>
  )
}

function Demo({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-(--spacing-md) rounded-md border border-border-default bg-background-card p-(--padding-lg)">
      <span className="ds-label-sm text-foreground-muted">{name}</span>
      <div className="flex flex-wrap items-start gap-(--spacing-lg)">{children}</div>
    </div>
  )
}

function Swatch({ token }: { token: string }) {
  return (
    <div className="flex w-40 flex-col gap-(--spacing-xs)">
      <div
        className="h-12 rounded-sm border border-border-default"
        style={{ background: `var(--${token})` }}
      />
      <code className="ds-meta break-all text-foreground-secondary-default">--{token}</code>
    </div>
  )
}

/* ─────────────────────────── Страница ─────────────────────────── */

export default function Showcase() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [range, setRange] = React.useState<DateRange | undefined>()
  const [pickDate, setPickDate] = React.useState<Date | undefined>()
  const [showStatus, setShowStatus] = React.useState(true)

  return (
    <TooltipProvider>
      <main className="mx-auto flex max-w-7xl flex-col gap-(--spacing-4xl) p-(--padding-xl) text-foreground-default">
        <header className="flex flex-col gap-(--spacing-sm)">
          <h1 className="ds-h1">M&A CRM — Design System</h1>
          <p className="ds-lead text-foreground-muted">
            Зеркало ДС из <code>ds/</code>: shadcn-ui kit + токены foundation.md + кастомные компоненты M&A.
          </p>
        </header>

        {/* ═══════════ Токены ═══════════ */}
        <Section title="Палитра — Semantic">
          {Object.entries(SEMANTIC).map(([group, tokens]) => (
            <Demo key={group} name={group}>
              {tokens.map((t) => <Swatch key={t} token={t} />)}
            </Demo>
          ))}
        </Section>

        <Section title="Палитра — Primitives">
          <Demo name="Zinc">
            {ZINC.map((s) => <Swatch key={s} token={`zinc-${s}`} />)}
          </Demo>
          <Demo name="Функциональные, стадии, Primary, Charts">
            {FUNCTIONAL.map((t) => <Swatch key={t} token={t} />)}
          </Demo>
        </Section>

        <Section title="Radius · Spacing · Padding · Shadow">
          <Demo name="Radius">
            {RADII.map((r) => (
              <div key={r} className="flex flex-col items-center gap-(--spacing-xs)">
                <div
                  className="size-16 border border-border-primary-default bg-background-muted"
                  style={{ borderRadius: `var(--radius-${r})` }}
                />
                <code className="ds-meta text-foreground-muted">radius-{r}</code>
              </div>
            ))}
          </Demo>
          <Demo name="Spacing (gap)">
            <div className="flex flex-col gap-(--spacing-xs)">
              {SPACING.map((s) => (
                <div key={s} className="flex items-center gap-(--spacing-md)">
                  <code className="ds-meta w-24 text-foreground-muted">spacing-{s}</code>
                  <div className="h-3 bg-background-primary-default" style={{ width: `var(--spacing-${s})` }} />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-(--spacing-xs)">
              {PADDING.map((s) => (
                <div key={s} className="flex items-center gap-(--spacing-md)">
                  <code className="ds-meta w-24 text-foreground-muted">padding-{s}</code>
                  <div className="h-3 bg-background-success-default" style={{ width: `var(--padding-${s})` }} />
                </div>
              ))}
            </div>
          </Demo>
          <Demo name="Shadow">
            {SHADOWS.map((s) => (
              <div
                key={s}
                className="flex size-28 items-center justify-center rounded-md bg-background-card"
                style={{ boxShadow: `var(--shadow-${s})` }}
              >
                <code className="ds-meta text-foreground-muted">shadow-{s}</code>
              </div>
            ))}
          </Demo>
        </Section>

        <Section title="Типографика">
          <div className="flex flex-col gap-(--spacing-lg) rounded-md border border-border-default bg-background-card p-(--padding-lg)">
            {TEXT_STYLES.map(([cls, sample]) => (
              <div key={cls} className="flex items-baseline gap-(--spacing-xl)">
                <code className="ds-meta w-32 shrink-0 text-foreground-muted">.{cls}</code>
                <span className={cls}>{sample}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══════════ Действия ═══════════ */}
        <Section title="Действия">
          <Demo name="Button · variant">
            <Button>Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </Demo>
          <Demo name="Button · size / state">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Почта"><MailIcon /></Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </Demo>
          <Demo name="Toggle · variant / size / state">
            <Toggle aria-label="Bold"><BoldIcon /></Toggle>
            <Toggle variant="outline" aria-label="Italic"><ItalicIcon /></Toggle>
            <Toggle size="sm" aria-label="Underline"><UnderlineIcon /></Toggle>
            <Toggle size="lg" defaultPressed aria-label="Bold active"><BoldIcon /></Toggle>
            <Toggle disabled aria-label="Disabled"><BoldIcon /></Toggle>
          </Demo>
          <Demo name="Toggle Group · single / multiple">
            <ToggleGroup type="single" defaultValue="kanban">
              <ToggleGroupItem value="kanban" aria-label="Kanban"><KanbanIcon /></ToggleGroupItem>
              <ToggleGroupItem value="table" aria-label="Таблица"><LayoutListIcon /></ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="multiple" variant="outline" defaultValue={["b"]}>
              <ToggleGroupItem value="b" aria-label="Bold"><BoldIcon /></ToggleGroupItem>
              <ToggleGroupItem value="i" aria-label="Italic"><ItalicIcon /></ToggleGroupItem>
              <ToggleGroupItem value="u" aria-label="Underline"><UnderlineIcon /></ToggleGroupItem>
            </ToggleGroup>
          </Demo>
        </Section>

        {/* ═══════════ Ввод ═══════════ */}
        <Section title="Ввод">
          <Demo name="Input · state">
            <div className="flex w-64 flex-col gap-(--spacing-xs)">
              <Label htmlFor="i1">Default</Label>
              <Input id="i1" placeholder="Название сделки" />
            </div>
            <div className="flex w-64 flex-col gap-(--spacing-xs)">
              <Label htmlFor="i2">Focus</Label>
              <Input id="i2" autoFocus defaultValue="Проект «Альфа»" />
            </div>
            <div className="flex w-64 flex-col gap-(--spacing-xs)">
              <Label htmlFor="i3">Error</Label>
              <Input id="i3" aria-invalid defaultValue="abc" />
            </div>
            <div className="flex w-64 flex-col gap-(--spacing-xs)">
              <Label htmlFor="i4">Disabled</Label>
              <Input id="i4" disabled placeholder="Недоступно" />
            </div>
          </Demo>
          <Demo name="Textarea · state">
            <Textarea className="w-64" placeholder="Заметка по сделке" />
            <Textarea className="w-64" aria-invalid defaultValue="Ошибка" />
            <Textarea className="w-64" disabled placeholder="Disabled" />
          </Demo>
          <Demo name="Select · size / state">
            <Select>
              <SelectTrigger className="w-48"><SelectValue placeholder="Стадия" /></SelectTrigger>
              <SelectContent>
                {STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger size="sm" className="w-48"><SelectValue placeholder="Small" /></SelectTrigger>
              <SelectContent>
                {STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select disabled>
              <SelectTrigger className="w-48"><SelectValue placeholder="Disabled" /></SelectTrigger>
              <SelectContent><SelectItem value="x">—</SelectItem></SelectContent>
            </Select>
          </Demo>
          <Demo name="Combobox · default / disabled">
            <Combobox items={COMBO_ITEMS}>
              <ComboboxInput placeholder="Компания…" className="w-64" />
              <ComboboxContent>
                <ComboboxEmpty>Ничего не найдено</ComboboxEmpty>
                <ComboboxList>
                  {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <Combobox items={COMBO_ITEMS} disabled>
              <ComboboxInput placeholder="Disabled" className="w-64" disabled />
            </Combobox>
          </Demo>
          <Demo name="Checkbox · state">
            <Label className="gap-(--spacing-sm)"><Checkbox /> Unchecked</Label>
            <Label className="gap-(--spacing-sm)"><Checkbox defaultChecked /> Checked</Label>
            <Label className="gap-(--spacing-sm)"><Checkbox checked="indeterminate" /> Indeterminate</Label>
            <Label className="gap-(--spacing-sm)"><Checkbox disabled /> Disabled</Label>
          </Demo>
          <Demo name="Radio Group · vertical / horizontal / disabled">
            <RadioGroup defaultValue="buy">
              <Label className="gap-(--spacing-sm)"><RadioGroupItem value="buy" /> Buy-side</Label>
              <Label className="gap-(--spacing-sm)"><RadioGroupItem value="sell" /> Sell-side</Label>
            </RadioGroup>
            <RadioGroup defaultValue="a" className="flex">
              <Label className="gap-(--spacing-sm)"><RadioGroupItem value="a" /> A</Label>
              <Label className="gap-(--spacing-sm)"><RadioGroupItem value="b" /> B</Label>
            </RadioGroup>
            <RadioGroup disabled defaultValue="x">
              <Label className="gap-(--spacing-sm)"><RadioGroupItem value="x" /> Disabled</Label>
            </RadioGroup>
          </Demo>
          <Demo name="Switch · state">
            <Label className="gap-(--spacing-sm)"><Switch /> Unchecked</Label>
            <Label className="gap-(--spacing-sm)"><Switch defaultChecked /> Checked</Label>
            <Label className="gap-(--spacing-sm)"><Switch disabled /> Disabled</Label>
          </Demo>
          <Demo name="Slider · horizontal / vertical / disabled">
            <Slider className="w-64" defaultValue={[40]} max={100} />
            <Slider className="h-32" orientation="vertical" defaultValue={[60]} max={100} />
            <Slider className="w-64" defaultValue={[30]} disabled />
          </Demo>
          <Demo name="Input OTP · length 4 / 6 · error">
            <InputOTP maxLength={4}>
              <InputOTPGroup>
                {[0, 1, 2, 3].map((i) => <InputOTPSlot key={i} index={i} />)}
              </InputOTPGroup>
            </InputOTP>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                {[0, 1, 2].map((i) => <InputOTPSlot key={i} index={i} />)}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {[3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}
              </InputOTPGroup>
            </InputOTP>
            <InputOTP maxLength={4} aria-invalid>
              <InputOTPGroup>
                {[0, 1, 2, 3].map((i) => <InputOTPSlot key={i} index={i} aria-invalid />)}
              </InputOTPGroup>
            </InputOTP>
          </Demo>
          <Demo name="Calendar · single / range">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            <Calendar mode="range" selected={range} onSelect={setRange} className="rounded-md border" />
          </Demo>
          <Demo name="Data Picker · default / disabled">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-56 justify-start">
                  <CalendarIcon />
                  {pickDate ? pickDate.toLocaleDateString("ru-RU") : "Выберите дату"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={pickDate} onSelect={setPickDate} />
              </PopoverContent>
            </Popover>
            <Button variant="outline" className="w-56 justify-start" disabled>
              <CalendarIcon />
              Disabled
            </Button>
          </Demo>
          <Demo name="Form (Field: Label + Input + Description + Error)">
            <FieldGroup className="w-80">
              <Field>
                <FieldLabel htmlFor="f1">Название сделки</FieldLabel>
                <Input id="f1" placeholder="Проект «Альфа»" />
                <FieldDescription>Видно только участникам зоны</FieldDescription>
              </Field>
              <Field data-invalid>
                <FieldLabel htmlFor="f2">Сумма, $M</FieldLabel>
                <Input id="f2" aria-invalid defaultValue="-5" />
                <FieldError>Сумма должна быть больше нуля</FieldError>
              </Field>
            </FieldGroup>
          </Demo>
        </Section>

        {/* ═══════════ Отображение данных ═══════════ */}
        <Section title="Отображение данных">
          <Demo name="Badge · variant">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </Demo>
          <Demo name="Table">
            <Table className="max-w-2xl">
              <TableHeader>
                <TableRow>
                  <TableHead>Сделка</TableHead>
                  <TableHead>Стадия</TableHead>
                  <TableHead className="text-right">EV, $M</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>Проект «Альфа»</TableCell><TableCell><StageBadge stage="NDA Signed" /></TableCell><TableCell className="text-right">120</TableCell></TableRow>
                <TableRow><TableCell>Проект «Бета»</TableCell><TableCell><StageBadge stage="Due Diligence" /></TableCell><TableCell className="text-right">85</TableCell></TableRow>
                <TableRow><TableCell>Проект «Гамма»</TableCell><TableCell><StageBadge stage="Closing" /></TableCell><TableCell className="text-right">310</TableCell></TableRow>
              </TableBody>
            </Table>
          </Demo>
          <Demo name="Data Table (паттерн: фильтр + сортировка + пагинация)">
            <div className="flex w-full max-w-2xl flex-col gap-(--spacing-md)">
              <Input placeholder="Фильтр по названию…" className="max-w-xs" />
              <div className="rounded-md border border-border-default">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead><Checkbox aria-label="Выбрать все" /></TableHead>
                      <TableHead>
                        <Button variant="ghost" size="sm">Сделка <ArrowUpDownIcon /></Button>
                      </TableHead>
                      <TableHead>Стадия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {STAGES.slice(0, 3).map((s, i) => (
                      <TableRow key={s}>
                        <TableCell><Checkbox aria-label="Выбрать" /></TableCell>
                        <TableCell>Сделка #{i + 1}</TableCell>
                        <TableCell><StageBadge stage={s} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between">
                <span className="ds-caption text-foreground-muted">0 из 3 выбрано</span>
                <div className="flex gap-(--spacing-sm)">
                  <Button variant="outline" size="sm" disabled>Назад</Button>
                  <Button variant="outline" size="sm">Далее</Button>
                </div>
              </div>
            </div>
          </Demo>
          <Demo name="Pagination · default / active / disabled">
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" aria-disabled className="pointer-events-none opacity-50" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </Demo>
          <Demo name="Progress · Skeleton">
            <Progress value={62} className="w-64" />
            <div className="flex items-center gap-(--spacing-md)">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-(--spacing-sm)">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </Demo>
          <Demo name="Chart · Bar">
            <ChartContainer config={chartConfig} className="h-56 w-full max-w-lg">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="deals" fill="var(--color-deals)" radius={4} />
                <Bar dataKey="closed" fill="var(--color-closed)" radius={4} />
              </BarChart>
            </ChartContainer>
          </Demo>
          <Demo name="Carousel · horizontal">
            <Carousel className="mx-(--spacing-4xl) w-64">
              <CarouselContent>
                {[1, 2, 3].map((n) => (
                  <CarouselItem key={n}>
                    <Card><CardContent className="flex h-32 items-center justify-center ds-h3">{n}</CardContent></Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </Demo>
        </Section>

        {/* ═══════════ Контейнеры ═══════════ */}
        <Section title="Контейнеры">
          <Demo name="Card">
            <Card className="w-80">
              <CardHeader>
                <CardTitle>Проект «Альфа»</CardTitle>
                <CardDescription>Buy-side · Команда А</CardDescription>
              </CardHeader>
              <CardContent className="ds-body">EV $120M, стадия NDA Signed.</CardContent>
              <CardFooter className="gap-(--spacing-sm)">
                <Button size="sm">Открыть</Button>
                <Button size="sm" variant="outline">В архив</Button>
              </CardFooter>
            </Card>
          </Demo>
          <Demo name="Accordion · single">
            <Accordion type="single" collapsible defaultValue="a" className="w-96">
              <AccordionItem value="a">
                <AccordionTrigger>Что такое Chinese Wall?</AccordionTrigger>
                <AccordionContent>Изоляция участников сделок для предотвращения конфликта интересов.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>Что такое NDA Hard-block?</AccordionTrigger>
                <AccordionContent>Доступ к материалам закрыт до подписания NDA.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </Demo>
          <Demo name="Collapsible · collapsed / expanded">
            <Collapsible className="flex w-72 flex-col gap-(--spacing-sm)" defaultOpen>
              <div className="flex items-center justify-between">
                <span className="ds-small">3 вложения</span>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon-sm" aria-label="Переключить"><ChevronsUpDownIcon /></Button>
                </CollapsibleTrigger>
              </div>
              <div className="ds-caption rounded-sm border px-(--padding-sm) py-(--padding-xxs)">teaser.pdf</div>
              <CollapsibleContent className="flex flex-col gap-(--spacing-sm)">
                <div className="ds-caption rounded-sm border px-(--padding-sm) py-(--padding-xxs)">cim.pdf</div>
                <div className="ds-caption rounded-sm border px-(--padding-sm) py-(--padding-xxs)">nda.docx</div>
              </CollapsibleContent>
            </Collapsible>
          </Demo>
          <Demo name="Separator · horizontal / vertical">
            <div className="flex w-64 flex-col gap-(--spacing-sm)">
              <span className="ds-small">Pipeline</span>
              <Separator />
              <div className="ds-caption flex h-5 items-center gap-(--spacing-sm)">
                <span>Сделки</span><Separator orientation="vertical" /><span>Контакты</span><Separator orientation="vertical" /><span>Аудит</span>
              </div>
            </div>
          </Demo>
          <Demo name="Scroll-area">
            <ScrollArea className="h-36 w-56 rounded-md border">
              <div className="flex flex-col gap-(--spacing-sm) p-(--padding-sm)">
                {Array.from({ length: 20 }, (_, i) => (
                  <span key={i} className="ds-caption">Запись аудита #{i + 1}</span>
                ))}
              </div>
            </ScrollArea>
          </Demo>
        </Section>

        {/* ═══════════ Навигация ═══════════ */}
        <Section title="Навигация">
          <Demo name="Sidebar · collapsible=none">
            <SidebarProvider className="min-h-0 w-auto">
              <Sidebar collapsible="none" className="h-72 rounded-md border">
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>M&A CRM</SidebarGroupLabel>
                    <SidebarMenu>
                      <SidebarMenuItem><SidebarMenuButton isActive><KanbanIcon /> Pipeline</SidebarMenuButton></SidebarMenuItem>
                      <SidebarMenuItem><SidebarMenuButton><UsersIcon /> Контакты</SidebarMenuButton></SidebarMenuItem>
                      <SidebarMenuItem><SidebarMenuButton><ShieldIcon /> Chinese Walls</SidebarMenuButton></SidebarMenuItem>
                      <SidebarMenuItem><SidebarMenuButton><LayoutListIcon /> Audit Log</SidebarMenuButton></SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
            </SidebarProvider>
          </Demo>
          <Demo name="Navigation Menu">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Сделки</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="flex w-64 flex-col gap-(--spacing-xs) p-(--padding-xxs)">
                      <NavigationMenuLink href="#">Pipeline</NavigationMenuLink>
                      <NavigationMenuLink href="#">Архив</NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Контакты</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </Demo>
          <Demo name="Breadcrumb">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Pipeline</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Due Diligence</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Проект «Бета»</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </Demo>
          <Demo name="Tabs · default / underline · active / inactive / disabled">
            <Tabs defaultValue="activity" className="w-96">
              <TabsList>
                <TabsTrigger value="activity">Активность</TabsTrigger>
                <TabsTrigger value="docs">Документы</TabsTrigger>
                <TabsTrigger value="audit" disabled>Аудит</TabsTrigger>
              </TabsList>
              <TabsContent value="activity" className="ds-caption text-foreground-muted">Лента событий сделки</TabsContent>
              <TabsContent value="docs" className="ds-caption text-foreground-muted">Data room</TabsContent>
            </Tabs>
            <Tabs defaultValue="activity" className="w-96">
              <TabsList variant="underline">
                <TabsTrigger value="activity">Активность</TabsTrigger>
                <TabsTrigger value="docs">Документы</TabsTrigger>
                <TabsTrigger value="audit" disabled>Аудит</TabsTrigger>
              </TabsList>
            </Tabs>
          </Demo>
          <Demo name="Menubar">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Файл</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Новая сделка</MenubarItem>
                  <MenubarItem>Импорт из Excel</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Экспорт</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Вид</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Kanban</MenubarItem>
                  <MenubarItem>Таблица</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </Demo>
        </Section>

        {/* ═══════════ Оверлеи ═══════════ */}
        <Section title="Всплывающие окна и оверлеи">
          <Demo name="Dialog · Alert Dialog · Sheet · Drawer">
            <Dialog>
              <DialogTrigger asChild><Button variant="outline">Dialog</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Smart Paste</DialogTitle>
                  <DialogDescription>Вставьте строки из Excel (Ctrl+V) — CRM распознает колонки.</DialogDescription>
                </DialogHeader>
                <Textarea placeholder="Ctrl+V" />
                <DialogFooter>
                  <DialogClose asChild><Button variant="outline">Отмена</Button></DialogClose>
                  <Button>Импортировать</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild><Button variant="destructive">Alert Dialog</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>NDA не подписан</AlertDialogTitle>
                  <AlertDialogDescription>Доступ к материалам сделки заблокирован до подписания NDA.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction>Запросить NDA</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <Sheet key={side}>
                <SheetTrigger asChild><Button variant="outline">Sheet · {side}</Button></SheetTrigger>
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle>Карточка сделки</SheetTitle>
                    <SheetDescription>Панель с края экрана: {side}</SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            ))}
            <Drawer>
              <DrawerTrigger asChild><Button variant="outline">Drawer</Button></DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Быстрые действия</DrawerTitle>
                  <DrawerDescription>Нижняя панель (mobile-first)</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Добавить сделку</Button>
                  <DrawerClose asChild><Button variant="outline">Закрыть</Button></DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Demo>
          <Demo name="Popover · Hover Card · Tooltip (top / right / bottom / left)">
            <Popover>
              <PopoverTrigger asChild><Button variant="outline">Popover</Button></PopoverTrigger>
              <PopoverContent className="ds-caption">Быстрый фильтр по стадии</PopoverContent>
            </Popover>
            <HoverCard>
              <HoverCardTrigger asChild><Button variant="link">@maria.volkova</Button></HoverCardTrigger>
              <HoverCardContent>
                <MemberRow initials="МВ" name="Мария Волкова" role="VP · Команда А" />
              </HoverCardContent>
            </HoverCard>
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <Tooltip key={side}>
                <TooltipTrigger asChild><Button variant="outline">Tooltip · {side}</Button></TooltipTrigger>
                <TooltipContent side={side}>Подсказка</TooltipContent>
              </Tooltip>
            ))}
          </Demo>
          <Demo name="Command (Cmd+K)">
            <Command className="w-80 rounded-md border">
              <CommandInput placeholder="Поиск команды…" />
              <CommandList>
                <CommandEmpty>Ничего не найдено</CommandEmpty>
                <CommandGroup heading="Сделки">
                  <CommandItem>Новая сделка</CommandItem>
                  <CommandItem>Открыть Pipeline</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Compliance">
                  <CommandItem>Audit Log</CommandItem>
                  <CommandItem>Chinese Walls</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </Demo>
        </Section>

        {/* ═══════════ Меню ═══════════ */}
        <Section title="Контекстные меню">
          <Demo name="Dropdown Menu · Context Menu">
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">Dropdown Menu</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Сделка</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Редактировать</DropdownMenuItem>
                <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
                  Показывать статус
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Удалить</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ContextMenu>
              <ContextMenuTrigger className="ds-caption flex h-24 w-64 items-center justify-center rounded-md border border-dashed text-foreground-muted">
                Правый клик здесь
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Открыть</ContextMenuItem>
                <ContextMenuItem>Переместить в стадию…</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem variant="destructive">Удалить</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </Demo>
        </Section>

        {/* ═══════════ Фидбэк ═══════════ */}
        <Section title="Фидбэк">
          <Demo name="Alert · variant">
            <div className="grid w-full gap-(--spacing-md) md:grid-cols-2">
              <Alert><InfoIcon /><AlertTitle>Default</AlertTitle><AlertDescription>Письмо привязано к сделке автоматически.</AlertDescription></Alert>
              <Alert variant="destructive"><TriangleAlertIcon /><AlertTitle>Destructive</AlertTitle><AlertDescription>Доступ заблокирован: NDA не подписан.</AlertDescription></Alert>
              <Alert variant="success"><InfoIcon /><AlertTitle>Success</AlertTitle><AlertDescription>NDA подписан, доступ открыт.</AlertDescription></Alert>
              <Alert variant="warning"><TriangleAlertIcon /><AlertTitle>Warning</AlertTitle><AlertDescription>Аномалия в журнале аудита.</AlertDescription></Alert>
            </div>
          </Demo>
          <Demo name="Toast / Sonner · type">
            <Button variant="outline" onClick={() => toast("Сделка сохранена")}>Default</Button>
            <Button variant="outline" onClick={() => toast.success("NDA подписан")}>Success</Button>
            <Button variant="outline" onClick={() => toast.error("Не удалось импортировать")}>Error</Button>
            <Button variant="outline" onClick={() => toast.warning("Доступ ограничен")}>Warning</Button>
            <Button variant="outline" onClick={() => toast.info("3 новых письма")}>Info</Button>
            <Button variant="outline" onClick={() => toast.loading("Синхронизация Outlook…")}>Loading</Button>
          </Demo>
        </Section>

        {/* ═══════════ Профиль ═══════════ */}
        <Section title="Профиль / Идентификация">
          <Demo name="Avatar · size (initials fallback)">
            {(["sm", "md", "lg", "xl"] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-(--spacing-xs)">
                <Avatar size={size}><AvatarFallback>МВ</AvatarFallback></Avatar>
                <code className="ds-meta text-foreground-muted">{size}</code>
              </div>
            ))}
          </Demo>
        </Section>

        {/* ═══════════ M&A ═══════════ */}
        <Section title="Кастомные компоненты M&A CRM">
          <Demo name="StageBadge · stage">
            {STAGES.map((s) => <StageBadge key={s} stage={s} />)}
          </Demo>
          <Demo name="KanbanCard · stage">
            {STAGES.map((s) => (
              <KanbanCard key={s} stage={s} dealName="Название сделки" dealType="Buy-side" team="Команда А" date="14 июня 2026" />
            ))}
          </Demo>
          <Demo name="KanbanColumn · stage">
            {STAGES.slice(0, 3).map((s, i) => (
              <KanbanColumn key={s} stage={s}>
                {Array.from({ length: i + 1 }, (_, n) => (
                  <KanbanCard key={n} stage={s} dealName={`Проект #${n + 1}`} dealType="Sell-side" team="Команда Б" date="2 июля 2026" />
                ))}
              </KanbanColumn>
            ))}
          </Demo>
          <Demo name="ActivityFeedItem · type">
            <div className="w-full max-w-3xl overflow-hidden rounded-md border border-border-default">
              {ACTIVITY_TYPES.map((t) => (
                <ActivityFeedItem
                  key={t}
                  type={t}
                  subject={`${t} — Тема письма или описание`}
                  meta="Мария Волкова · 14 июня 2026, 14:22"
                  preview="Добрый день! Направляем обновлённый тизер по проекту…"
                />
              ))}
            </div>
          </Demo>
          <Demo name="StatsMetric · variant">
            <StatsMetric value="1 247" label="Всего записей" />
            <StatsMetric value="3" label="Аномалии" variant="highlighted" />
          </Demo>
          <Demo name="MemberRow · state">
            <div className="flex w-96 flex-col">
              <MemberRow initials="МВ" name="Мария Волкова" role="VP · Команда А" />
              <MemberRow initials="ИП" name="Иван Петров" role="Analyst · Команда А" zone="Зона А" />
            </div>
          </Demo>
        </Section>
      </main>
    </TooltipProvider>
  )
}
