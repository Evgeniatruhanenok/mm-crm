import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

type CalendarProps = React.ComponentProps<typeof Calendar>

type DatePickerProps = {
  initial?: Date
  defaultOpen?: boolean
  disabled?: boolean
  captionLayout?: CalendarProps['captionLayout']
  showOutsideDays?: boolean
}

/** Date picker pattern: outline Button trigger + Popover + single-mode Calendar. */
function DatePicker({ initial, defaultOpen, disabled, captionLayout, showOutsideDays }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(initial)
  const [open, setOpen] = React.useState(!!defaultOpen)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          data-empty={!date}
          className="w-60 justify-start font-normal data-[empty=true]:text-foreground-muted"
        >
          <CalendarIcon />
          {date ? format(date, 'MMM d, yyyy') : 'Pick closing date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date ?? new Date(2026, 5, 1)}
          captionLayout={captionLayout}
          showOutsideDays={showOutsideDays}
          onSelect={(d) => {
            setDate(d)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

/**
 * Data Picker — pattern, no own component: Popover + Button + Calendar.
 * state: default | open | disabled.
 */
const meta = {
  title: 'Components/Data Picker',
  component: Calendar,
  tags: ['autodocs'],
  args: { captionLayout: 'label', showOutsideDays: true },
  argTypes: {
    captionLayout: { control: 'select', options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'], description: 'Calendar caption: label or month/year dropdowns' },
    showOutsideDays: { control: 'boolean', description: 'Show days of adjacent months' },
    mode: { control: false, description: 'Always `single` in the date picker' },
  },
  parameters: { layout: 'centered' },
  render: (args) => <DatePicker captionLayout={args.captionLayout} showOutsideDays={args.showOutsideDays} />,
} satisfies Meta<typeof Calendar>
export default meta
type Story = StoryObj<typeof meta>

/** state=default — empty, shows placeholder. */
export const Default: Story = {}

/** Value selected. */
export const WithValue: Story = {
  render: (args) => <DatePicker initial={new Date(2026, 5, 14)} captionLayout={args.captionLayout} showOutsideDays={args.showOutsideDays} />,
}

/** state=open — popover with the calendar is open. */
export const Open: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <div className="h-96">
      <DatePicker defaultOpen initial={new Date(2026, 5, 14)} captionLayout={args.captionLayout} showOutsideDays={args.showOutsideDays} />
    </div>
  ),
}

/** state=disabled — e.g. deal is under NDA hard-block. */
export const Disabled: Story = {
  render: () => <DatePicker disabled initial={new Date(2026, 5, 14)} />,
}

/** State matrix. The `open` column renders the popover content inline (static) so all states fit side by side. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-start gap-(--spacing-xl)">
      <div className="flex flex-col gap-(--spacing-sm)">
        <code className="ds-meta text-foreground-muted">default</code>
        <DatePicker />
      </div>
      <div className="flex flex-col gap-(--spacing-sm)">
        <code className="ds-meta text-foreground-muted">default (with value)</code>
        <DatePicker initial={new Date(2026, 5, 14)} />
      </div>
      <div className="flex flex-col gap-(--spacing-sm)">
        <code className="ds-meta text-foreground-muted">disabled</code>
        <DatePicker disabled initial={new Date(2026, 5, 14)} />
      </div>
      <div className="flex flex-col gap-(--spacing-sm)">
        <code className="ds-meta text-foreground-muted">open</code>
        <Button variant="outline" className="w-60 justify-start font-normal">
          <CalendarIcon /> Jun 14, 2026
        </Button>
        <div className="w-fit rounded-md border border-border-default shadow-md">
          <Calendar mode="single" selected={new Date(2026, 5, 14)} defaultMonth={new Date(2026, 5, 1)} />
        </div>
      </div>
    </div>
  ),
}
