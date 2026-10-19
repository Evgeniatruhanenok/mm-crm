import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DateRange } from 'react-day-picker'
import { Calendar } from './calendar'

type CalendarProps = React.ComponentProps<typeof Calendar>
type Mode = 'single' | 'range' | 'multiple'

const MONTH = new Date(2026, 5, 1)

type DemoProps = {
  mode?: Mode
  numberOfMonths?: number
  captionLayout?: CalendarProps['captionLayout']
  showOutsideDays?: boolean
  showWeekNumber?: boolean
  buttonVariant?: CalendarProps['buttonVariant']
  disableWeekends?: boolean
}

/** Controlled calendar for any selection mode (June 2026, M&A milestone dates preselected). */
function CalendarDemo({ mode = 'single', disableWeekends, ...common }: DemoProps) {
  const [single, setSingle] = React.useState<Date | undefined>(new Date(2026, 5, 14))
  const [multiple, setMultiple] = React.useState<Date[] | undefined>([
    new Date(2026, 5, 3),
    new Date(2026, 5, 10),
    new Date(2026, 5, 14),
  ])
  const [range, setRange] = React.useState<DateRange | undefined>({ from: new Date(2026, 5, 8), to: new Date(2026, 5, 19) })
  const shared = {
    ...common,
    defaultMonth: MONTH,
    disabled: disableWeekends ? { dayOfWeek: [0, 6] } : undefined,
    className: 'rounded-md border border-border-default',
  }
  if (mode === 'range') return <Calendar {...shared} mode="range" selected={range} onSelect={setRange} />
  if (mode === 'multiple') return <Calendar {...shared} mode="multiple" selected={multiple} onSelect={setMultiple} />
  return <Calendar {...shared} mode="single" selected={single} onSelect={setSingle} />
}

/**
 * Date calendar (react-day-picker). mode: single | range | multiple.
 * Used for LOI deadlines, DD windows and closing dates.
 */
const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  args: {
    mode: 'single',
    numberOfMonths: 1,
    captionLayout: 'label',
    showOutsideDays: true,
    showWeekNumber: false,
    buttonVariant: 'ghost',
  },
  argTypes: {
    mode: { control: 'inline-radio', options: ['single', 'range', 'multiple'], description: 'Selection mode' },
    numberOfMonths: { control: { type: 'number', min: 1, max: 3 }, description: 'Months shown side by side' },
    captionLayout: { control: 'select', options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'], description: 'Month caption: label or dropdowns' },
    showOutsideDays: { control: 'boolean', description: 'Show days of adjacent months' },
    showWeekNumber: { control: 'boolean', description: 'Show ISO week numbers column' },
    buttonVariant: { control: 'select', options: ['ghost', 'outline', 'secondary', 'default'], description: 'Button variant of the nav arrows' },
    disabled: { control: false, description: 'Matcher(s) for disabled days, e.g. `{ dayOfWeek: [0, 6] }`' },
    selected: { control: false, description: 'Selected date(s) — controlled together with `onSelect`' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <CalendarDemo
      mode={args.mode}
      numberOfMonths={args.numberOfMonths}
      captionLayout={args.captionLayout}
      showOutsideDays={args.showOutsideDays}
      showWeekNumber={args.showWeekNumber}
      buttonVariant={args.buttonVariant}
    />
  ),
} satisfies Meta<typeof Calendar>
export default meta
type Story = StoryObj<typeof meta>

/** mode=single — closing date. */
export const Single: Story = {}

/** mode=range — due diligence window. */
export const Range: Story = { args: { mode: 'range', numberOfMonths: 2 } }

/** mode=multiple — management meeting dates. */
export const Multiple: Story = { args: { mode: 'multiple' } }

/** Month/year dropdowns in the caption. */
export const Dropdowns: Story = { args: { captionLayout: 'dropdown' } }

/** Weekends disabled (no signing on weekends). */
export const DisabledDays: Story = {
  render: (args) => <CalendarDemo mode={args.mode} disableWeekends />,
}

/** Mode matrix: single / range / multiple, plus disabled days. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-start gap-(--spacing-xl)">
      {(['single', 'range', 'multiple'] as const).map((m) => (
        <div key={m} className="flex flex-col gap-(--spacing-sm)">
          <code className="ds-meta text-foreground-muted">mode={m}</code>
          <CalendarDemo mode={m} />
        </div>
      ))}
      <div className="flex flex-col gap-(--spacing-sm)">
        <code className="ds-meta text-foreground-muted">disabled weekends</code>
        <CalendarDemo mode="single" disableWeekends />
      </div>
    </div>
  ),
}
