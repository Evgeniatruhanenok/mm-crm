import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './label'
import { Textarea } from './textarea'

/**
 * Multi-line text field, auto-grows with content (`field-sizing-content`).
 * States default / focus / error (`aria-invalid`) / disabled.
 */
const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { placeholder: 'Add a note about the deal…', disabled: false, 'aria-invalid': false },
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder text' },
    defaultValue: { control: 'text', description: 'Initial value (uncontrolled)' },
    rows: { control: 'number', description: 'Minimum visible rows' },
    disabled: { control: 'boolean', description: 'state=disabled' },
    'aria-invalid': { control: 'boolean', description: 'state=error — destructive border + ring' },
    autoFocus: { control: 'boolean', description: 'Focus on mount (state=focus)' },
  },
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof Textarea>
export default meta
type Story = StoryObj<typeof meta>

const NOTE = 'Call with Dmitry Kuznetsov: buyer wants LOI by Friday, data room access for Team A.'

export const Default: Story = {}
export const Filled: Story = { args: { defaultValue: NOTE } }
/** state=focus — focused on mount. */
export const Focus: Story = { args: { autoFocus: true, defaultValue: NOTE } }
/** state=error — set `aria-invalid`. */
export const Error: Story = { args: { 'aria-invalid': true, defaultValue: 'Too short' } }
export const Disabled: Story = { args: { disabled: true, defaultValue: NOTE } }
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-col gap-(--spacing-sm)">
      <Label htmlFor="deal-note">Note</Label>
      <Textarea id="deal-note" {...args} />
      <p className="ds-meta text-foreground-muted">Visible to Team A only.</p>
    </div>
  ),
}

/** State matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[repeat(4,16rem)] gap-(--spacing-lg)">
      {[
        { h: 'default', el: <Textarea placeholder="Add a note…" /> },
        { h: 'filled', el: <Textarea defaultValue={NOTE} /> },
        { h: 'error', el: <Textarea defaultValue="Too short" aria-invalid /> },
        { h: 'disabled', el: <Textarea defaultValue={NOTE} disabled /> },
      ].map(({ h, el }) => (
        <div key={h} className="flex flex-col gap-(--spacing-sm)">
          <code className="ds-meta text-foreground-muted">{h}</code>
          {el}
        </div>
      ))}
    </div>
  ),
}
