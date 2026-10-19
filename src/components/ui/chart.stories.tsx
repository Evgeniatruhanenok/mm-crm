import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  XAxis,
} from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from './chart'

/** Deals per month, H1 2026: newly opened vs closed. */
const MONTHLY = [
  { month: 'Jan', opened: 6, closed: 2 },
  { month: 'Feb', opened: 8, closed: 3 },
  { month: 'Mar', opened: 5, closed: 4 },
  { month: 'Apr', opened: 9, closed: 3 },
  { month: 'May', opened: 7, closed: 5 },
  { month: 'Jun', opened: 11, closed: 6 },
]

const monthlyConfig = {
  opened: { label: 'Opened', color: 'var(--chart-1)' },
  closed: { label: 'Closed', color: 'var(--chart-2)' },
} satisfies ChartConfig

/** Active deals by pipeline stage. */
const BY_STAGE = [
  { stage: 'prospecting', deals: 14, fill: 'var(--color-prospecting)' },
  { stage: 'nda', deals: 9, fill: 'var(--color-nda)' },
  { stage: 'dd', deals: 7, fill: 'var(--color-dd)' },
  { stage: 'loi', deals: 4, fill: 'var(--color-loi)' },
  { stage: 'closing', deals: 2, fill: 'var(--color-closing)' },
]

const stageConfig = {
  deals: { label: 'Deals' },
  prospecting: { label: 'Prospecting', color: 'var(--chart-1)' },
  nda: { label: 'NDA Signed', color: 'var(--chart-2)' },
  dd: { label: 'Due Diligence', color: 'var(--chart-3)' },
  loi: { label: 'LOI / Term Sheet', color: 'var(--chart-4)' },
  closing: { label: 'Closing', color: 'var(--chart-5)' },
} satisfies ChartConfig

/** Deals per stage for two teams (radar). */
const TEAM_STAGE = [
  { stage: 'Prospecting', teamA: 6, teamB: 8 },
  { stage: 'NDA Signed', teamA: 5, teamB: 4 },
  { stage: 'Due Diligence', teamA: 4, teamB: 3 },
  { stage: 'LOI / Term Sheet', teamA: 2, teamB: 2 },
  { stage: 'Closing', teamA: 1, teamB: 1 },
]

const teamConfig = {
  teamA: { label: 'Team A', color: 'var(--chart-1)' },
  teamB: { label: 'Team B', color: 'var(--chart-2)' },
} satisfies ChartConfig

const TYPES = ['Bar', 'Line', 'Area', 'Pie', 'Radar', 'Radial Bar'] as const

function BarDemo() {
  return (
    <BarChart data={MONTHLY}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
      <ChartTooltip content={<ChartTooltipContent />} />
      <ChartLegend content={<ChartLegendContent />} />
      <Bar dataKey="opened" fill="var(--color-opened)" radius={4} />
      <Bar dataKey="closed" fill="var(--color-closed)" radius={4} />
    </BarChart>
  )
}

function LineDemo() {
  return (
    <LineChart data={MONTHLY} margin={{ left: 12, right: 12 }}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      <ChartLegend content={<ChartLegendContent />} />
      <Line dataKey="opened" type="monotone" stroke="var(--color-opened)" strokeWidth={2} dot={false} />
      <Line dataKey="closed" type="monotone" stroke="var(--color-closed)" strokeWidth={2} dot={false} />
    </LineChart>
  )
}

function AreaDemo() {
  return (
    <AreaChart data={MONTHLY} margin={{ left: 12, right: 12 }}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
      <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
      <ChartLegend content={<ChartLegendContent />} />
      <Area dataKey="closed" type="natural" fill="var(--color-closed)" fillOpacity={0.4} stroke="var(--color-closed)" stackId="a" />
      <Area dataKey="opened" type="natural" fill="var(--color-opened)" fillOpacity={0.4} stroke="var(--color-opened)" stackId="a" />
    </AreaChart>
  )
}

function PieDemo() {
  return (
    <PieChart>
      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
      <Pie data={BY_STAGE} dataKey="deals" nameKey="stage" innerRadius={50} strokeWidth={2} />
      <ChartLegend content={<ChartLegendContent nameKey="stage" />} />
    </PieChart>
  )
}

function RadarDemo() {
  return (
    <RadarChart data={TEAM_STAGE}>
      <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
      <PolarAngleAxis dataKey="stage" />
      <PolarGrid />
      <Radar dataKey="teamA" fill="var(--color-teamA)" fillOpacity={0.5} stroke="var(--color-teamA)" />
      <Radar dataKey="teamB" fill="var(--color-teamB)" fillOpacity={0.3} stroke="var(--color-teamB)" />
      <ChartLegend content={<ChartLegendContent />} />
    </RadarChart>
  )
}

function RadialDemo() {
  return (
    <RadialBarChart data={BY_STAGE} innerRadius={30} outerRadius={110}>
      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="stage" />} />
      <RadialBar dataKey="deals" background />
      <ChartLegend content={<ChartLegendContent nameKey="stage" />} />
    </RadialBarChart>
  )
}

/**
 * Chart wrapper over recharts: `ChartContainer` + `ChartConfig` (labels + colors) + Tooltip/Legend content.
 * Types: Bar | Line | Area | Pie | Radar | Radial Bar. Colors come only from `var(--chart-1…5)`.
 */
const meta = {
  title: 'Components/Chart',
  component: ChartContainer,
  tags: ['autodocs'],
  args: { config: monthlyConfig, className: 'h-64 w-[520px]', children: BarDemo() },
  argTypes: {
    config: { control: 'object', description: 'ChartConfig — label and color (`var(--chart-N)`) per data key' },
    className: { control: 'text', description: 'Size classes (container defaults to aspect-video)' },
    children: { control: false, description: 'A single recharts chart element (BarChart, LineChart, …)' },
    initialDimension: { control: 'object', description: 'Initial width/height before ResponsiveContainer measures' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ChartContainer>
export default meta
type Story = StoryObj<typeof meta>

/** type=Bar — deals opened vs closed per month. */
export const BarType: Story = { name: 'Bar' }

/** type=Line — monthly trend. */
export const LineType: Story = {
  name: 'Line',
  render: (args) => <ChartContainer {...args} config={monthlyConfig}>{LineDemo()}</ChartContainer>,
}

/** type=Area — stacked monthly volume. */
export const AreaType: Story = {
  name: 'Area',
  render: (args) => <ChartContainer {...args} config={monthlyConfig}>{AreaDemo()}</ChartContainer>,
}

/** type=Pie — active deals by stage (donut). */
export const PieType: Story = {
  name: 'Pie',
  render: (args) => <ChartContainer {...args} config={stageConfig} className="aspect-square h-72">{PieDemo()}</ChartContainer>,
}

/** type=Radar — deals per stage, Team A vs Team B. */
export const RadarType: Story = {
  name: 'Radar',
  render: (args) => <ChartContainer {...args} config={teamConfig} className="aspect-square h-72">{RadarDemo()}</ChartContainer>,
}

/** type=Radial Bar — active deals by stage. */
export const RadialBarType: Story = {
  name: 'Radial Bar',
  render: (args) => <ChartContainer {...args} config={stageConfig} className="aspect-square h-72">{RadialDemo()}</ChartContainer>,
}

/** All six chart types side by side. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const charts: Record<(typeof TYPES)[number], { config: ChartConfig; el: React.ReactElement }> = {
      Bar: { config: monthlyConfig, el: BarDemo() },
      Line: { config: monthlyConfig, el: LineDemo() },
      Area: { config: monthlyConfig, el: AreaDemo() },
      Pie: { config: stageConfig, el: PieDemo() },
      Radar: { config: teamConfig, el: RadarDemo() },
      'Radial Bar': { config: stageConfig, el: RadialDemo() },
    }
    return (
      <div className="grid grid-cols-3 gap-(--spacing-xl)">
        {TYPES.map((t) => (
          <div key={t} className="flex flex-col gap-(--spacing-sm) rounded-md border border-border-default p-(--padding-md)">
            <code className="ds-meta text-foreground-muted">type={t}</code>
            <ChartContainer config={charts[t].config} className="h-56 w-full">{charts[t].el}</ChartContainer>
          </div>
        ))}
      </div>
    )
  },
}
