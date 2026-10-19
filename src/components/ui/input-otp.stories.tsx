import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp'

/** input-otp passes both value and defaultValue to its <input>; keep stories controlled to avoid that. */
function ControlledOTP({ defaultValue = '', ...props }: React.ComponentProps<typeof InputOTP>) {
  const [value, setValue] = React.useState(String(defaultValue))
  return <InputOTP {...props} value={value} onChange={setValue} />
}

function Slots({ length, invalid = false }: { length: 4 | 6; invalid?: boolean }) {
  if (length === 4) {
    return (
      <InputOTPGroup>
        {[0, 1, 2, 3].map((i) => <InputOTPSlot key={i} index={i} aria-invalid={invalid || undefined} />)}
      </InputOTPGroup>
    )
  }
  return (
    <>
      <InputOTPGroup>
        {[0, 1, 2].map((i) => <InputOTPSlot key={i} index={i} aria-invalid={invalid || undefined} />)}
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        {[3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} aria-invalid={invalid || undefined} />)}
      </InputOTPGroup>
    </>
  )
}

/**
 * One-time code input (e.g. 2FA before opening an NDA-locked deal room). length 4 | 6 × state default / focus / error.
 */
const meta = {
  title: 'Components/Input OTP',
  component: InputOTP,
  tags: ['autodocs'],
  args: { maxLength: 6, disabled: false, children: <Slots length={6} /> },
  argTypes: {
    maxLength: { control: 'inline-radio', options: [4, 6], description: 'Code length (must match number of slots)' },
    defaultValue: { control: 'text', description: 'Initial value (uncontrolled)' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    autoFocus: { control: 'boolean', description: 'Focus on mount — state=focus (active slot ring)' },
    pattern: { control: 'text', description: 'Allowed characters regex, e.g. ^\\d+$' },
    children: { control: false, description: 'Slot groups' },
  },
  parameters: { layout: 'centered' },
  render: (args) => <ControlledOTP key={String(args.defaultValue)} {...args} />,
} satisfies Meta<typeof InputOTP>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Filled: Story = { args: { defaultValue: '482913' } }
/** state=focus — active slot shows the ring and fake caret. */
export const Focus: Story = { args: { autoFocus: true, defaultValue: '48' } }
/** state=error — `aria-invalid` on slots. */
export const Error: Story = { args: { defaultValue: '000000', children: <Slots length={6} invalid /> } }
export const Disabled: Story = { args: { disabled: true, defaultValue: '482913' } }
/** length=4. */
export const FourDigits: Story = { args: { maxLength: 4, children: <Slots length={4} /> } }

/** Length × State matrix (focus: see the `Focus` story). */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(4,auto)] items-center justify-start gap-(--spacing-lg)">
      <span />
      {['Default', 'Filled', 'Error', 'Disabled'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      {([4, 6] as const).map((len) => {
        const code = len === 4 ? '4829' : '482913'
        return (
          <div key={len} className="contents">
            <code className="ds-meta text-foreground-muted">length={len}</code>
            <ControlledOTP maxLength={len}><Slots length={len} /></ControlledOTP>
            <ControlledOTP maxLength={len} defaultValue={code}><Slots length={len} /></ControlledOTP>
            <ControlledOTP maxLength={len} defaultValue={code}><Slots length={len} invalid /></ControlledOTP>
            <ControlledOTP maxLength={len} defaultValue={code} disabled><Slots length={len} /></ControlledOTP>
          </div>
        )
      })}
    </div>
  ),
}
