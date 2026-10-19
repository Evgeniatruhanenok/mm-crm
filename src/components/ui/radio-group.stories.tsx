import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './label'
import { RadioGroup, RadioGroupItem } from './radio-group'

const ACCESS = [
  { value: 'team', label: 'Team A only' },
  { value: 'deal', label: 'Deal members' },
  { value: 'all', label: 'Whole firm' },
] as const

/**
 * Radio group — pick exactly one option. state default / disabled × orientation vertical / horizontal.
 */
const meta = {
  title: 'Components/Radio Group',
  component: RadioGroup,
  tags: ['autodocs'],
  args: { defaultValue: 'team', orientation: 'vertical', disabled: false },
  argTypes: {
    defaultValue: { control: 'inline-radio', options: ACCESS.map((a) => a.value), description: 'Initial value (uncontrolled)' },
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'], description: 'Keyboard navigation axis (layout via className)' },
    disabled: { control: 'boolean', description: 'state=disabled — whole group' },
    required: { control: 'boolean', description: 'Mark as required for forms' },
    name: { control: 'text', description: 'Form field name' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <RadioGroup {...args} className={args.orientation === 'horizontal' ? 'flex gap-(--spacing-lg)' : undefined}>
      {ACCESS.map((a) => (
        <div key={a.value} className="flex items-center gap-(--spacing-sm)">
          <RadioGroupItem value={a.value} id={`access-${a.value}`} />
          <Label htmlFor={`access-${a.value}`}>{a.label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Horizontal: Story = { args: { orientation: 'horizontal' } }
export const Disabled: Story = { args: { disabled: true } }
/** Single disabled option inside an enabled group. */
export const DisabledItem: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      {ACCESS.map((a) => (
        <div key={a.value} className="flex items-center gap-(--spacing-sm)">
          <RadioGroupItem value={a.value} id={`di-${a.value}`} disabled={a.value === 'all'} />
          <Label htmlFor={`di-${a.value}`}>{a.label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
}

/** State × orientation matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(2,auto)] items-start justify-start gap-(--spacing-lg)">
      <span />
      {['Default', 'Disabled'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {(['vertical', 'horizontal'] as const).map((o) => (
        <div key={o} className="contents">
          <code className="ds-meta text-foreground-muted">{o}</code>
          {[false, true].map((dis) => (
            <RadioGroup key={String(dis)} defaultValue="deal" orientation={o} disabled={dis} className={o === 'horizontal' ? 'flex gap-(--spacing-lg)' : undefined}>
              {ACCESS.map((a) => (
                <div key={a.value} className="flex items-center gap-(--spacing-sm)">
                  <RadioGroupItem value={a.value} id={`m-${o}-${dis}-${a.value}`} />
                  <Label htmlFor={`m-${o}-${dis}-${a.value}`}>{a.label}</Label>
                </div>
              ))}
            </RadioGroup>
          ))}
        </div>
      ))}
    </div>
  ),
}
