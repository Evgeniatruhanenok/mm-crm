import type { Meta, StoryObj } from '@storybook/react-vite'
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from './combobox'

const DEALS = [
  'LogistikPro sale',
  'TechnoPark IPO prep',
  'RosMedia acquisition',
  'AgroHolding carve-out',
  'NordSteel merger',
  'FinServ minority stake',
]

function DealCombobox({ disabled = false, showClear = false, invalid = false }: { disabled?: boolean; showClear?: boolean; invalid?: boolean }) {
  return (
    <>
      <ComboboxInput placeholder="Search deals…" disabled={disabled} showClear={showClear} aria-invalid={invalid} className="w-64" />
      <ComboboxContent>
        <ComboboxEmpty>No deals found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </>
  )
}

/**
 * Searchable input with autocomplete dropdown (Base UI). state default / open / disabled.
 * Type to filter; `ComboboxEmpty` shows when nothing matches.
 */
const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  args: { items: DEALS },
  argTypes: {
    items: { control: 'object', description: 'Items to filter and render in the list' },
    defaultValue: { control: 'select', options: DEALS, description: 'Initial selected value (uncontrolled)' },
    defaultOpen: { control: 'boolean', description: 'Open on mount — state=open' },
    disabled: { control: 'boolean', description: 'state=disabled' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Combobox {...args}>
      <DealCombobox disabled={args.disabled} />
    </Combobox>
  ),
} satisfies Meta<typeof Combobox>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithValue: Story = { args: { defaultValue: 'RosMedia acquisition' } }
/** state=open — list rendered on mount. */
export const Open: Story = { args: { defaultOpen: true }, parameters: { layout: 'padded' } }
export const Disabled: Story = { args: { disabled: true, defaultValue: 'LogistikPro sale' } }
/** Clear button shown next to the trigger. */
export const WithClear: Story = {
  args: { defaultValue: 'TechnoPark IPO prep' },
  render: (args) => <Combobox {...args}><DealCombobox showClear /></Combobox>,
}

/** State matrix (open state: see the `Open` story). */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[repeat(4,auto)] justify-start gap-(--spacing-lg)">
      {[
        { h: 'default', el: <Combobox items={DEALS}><DealCombobox /></Combobox> },
        { h: 'with value', el: <Combobox items={DEALS} defaultValue="NordSteel merger"><DealCombobox /></Combobox> },
        { h: 'with clear', el: <Combobox items={DEALS} defaultValue="LogistikPro sale"><DealCombobox showClear /></Combobox> },
        { h: 'disabled', el: <Combobox items={DEALS} defaultValue="LogistikPro sale" disabled><DealCombobox disabled /></Combobox> },
      ].map(({ h, el }) => (
        <div key={h} className="flex flex-col gap-(--spacing-sm)">
          <code className="ds-meta text-foreground-muted">{h}</code>
          {el}
        </div>
      ))}
    </div>
  ),
}
