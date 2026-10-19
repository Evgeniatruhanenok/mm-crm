import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider } from './slider'

/**
 * Range slider for numeric values (e.g. deal probability, EV range in $M).
 * state default / disabled × orientation horizontal / vertical. Pass two values for a range.
 */
const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: { defaultValue: [60], min: 0, max: 100, step: 5, orientation: 'horizontal', disabled: false },
  argTypes: {
    defaultValue: { control: 'object', description: 'Initial value(s) — one item per thumb' },
    min: { control: 'number', description: 'Minimum value' },
    max: { control: 'number', description: 'Maximum value' },
    step: { control: 'number', description: 'Step increment' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'], description: 'Orientation' },
    disabled: { control: 'boolean', description: 'state=disabled' },
    inverted: { control: 'boolean', description: 'Invert direction' },
  },
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="flex h-48 w-64 items-center justify-center"><Story /></div>],
} satisfies Meta<typeof Slider>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
/** Two thumbs — EV range. */
export const Range: Story = { args: { defaultValue: [20, 80] } }
export const Disabled: Story = { args: { disabled: true } }
export const Vertical: Story = { args: { orientation: 'vertical' } }
/** Controlled value with live readout — deal close probability. */
export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = React.useState([65])
    return (
      <div className="flex w-full flex-col gap-(--spacing-sm)">
        <div className="flex justify-between">
          <span className="ds-label-sm">Close probability</span>
          <span className="ds-meta text-foreground-muted">{value[0]}%</span>
        </div>
        <Slider {...args} defaultValue={undefined} value={value} onValueChange={setValue} />
      </div>
    )
  },
}

/** State × orientation matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(3,12rem)] items-center justify-start gap-(--spacing-lg)">
      <span />
      {['Default', 'Range', 'Disabled'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      <code className="ds-meta text-foreground-muted">horizontal</code>
      <Slider defaultValue={[60]} />
      <Slider defaultValue={[20, 80]} />
      <Slider defaultValue={[60]} disabled />
      <code className="ds-meta text-foreground-muted">vertical</code>
      <div className="flex h-40 justify-center"><Slider orientation="vertical" defaultValue={[60]} /></div>
      <div className="flex h-40 justify-center"><Slider orientation="vertical" defaultValue={[20, 80]} /></div>
      <div className="flex h-40 justify-center"><Slider orientation="vertical" defaultValue={[60]} disabled /></div>
    </div>
  ),
}
