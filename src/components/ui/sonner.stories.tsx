import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'
import { Button } from './button'
import { Toaster } from './sonner'

const POSITIONS = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const

const TOASTS = {
  default: () => toast('Deal updated', { description: 'LogistikPro sale · Maria Volkova' }),
  success: () => toast.success('NDA signed', { description: 'LogistikPro sale moved to NDA Signed' }),
  error: () => toast.error('NDA send blocked', { description: 'TechnoPark IPO prep has no signed NDA' }),
  warning: () => toast.warning('Chinese Wall conflict', { description: 'RosMedia acquisition overlaps Zone A' }),
  info: () => toast.info('Outlook sync', { description: '1,247 Total records captured' }),
  loading: () => toast.loading('Syncing Outlook…'),
} as const

type ToastType = keyof typeof TOASTS

/**
 * Transient notifications in a screen corner (Sonner). Types: default | success | error | warning | info | loading.
 * Render `<Toaster />` once and call `toast()` / `toast.success()` / … from 'sonner'.
 */
const meta = {
  title: 'Components/Toast (Sonner)',
  component: Toaster,
  tags: ['autodocs'],
  args: { theme: 'light', position: 'bottom-right', richColors: false, closeButton: false, expand: false },
  argTypes: {
    theme: { control: 'inline-radio', options: ['light', 'dark', 'system'], description: 'Color theme' },
    position: { control: 'select', options: POSITIONS, description: 'Screen corner / edge for the stack' },
    richColors: { control: 'boolean', description: 'Colored backgrounds per toast type' },
    closeButton: { control: 'boolean', description: 'Show an X button on each toast' },
    expand: { control: 'boolean', description: 'Expand the stack instead of collapsing it' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button variant="outline" onClick={TOASTS.default}>Show toast</Button>
    </>
  ),
} satisfies Meta<typeof Toaster>
export default meta
type Story = StoryObj<typeof meta>

function typeStory(type: ToastType, label: string): Story {
  return {
    render: (args) => (
      <>
        <Toaster {...args} />
        <Button variant="outline" onClick={TOASTS[type]}>{label}</Button>
      </>
    ),
  }
}

export const Default: Story = {}
export const Success: Story = typeStory('success', 'Show success')
export const ErrorToast: Story = { ...typeStory('error', 'Show error'), name: 'Error' }
export const Warning: Story = typeStory('warning', 'Show warning')
export const Info: Story = typeStory('info', 'Show info')
export const Loading: Story = typeStory('loading', 'Show loading')

/** All types — click each button; toasts stack in the chosen corner. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: (args) => (
    <div className="grid grid-cols-[auto_auto] items-center gap-(--spacing-lg)">
      <Toaster {...args} />
      {(Object.keys(TOASTS) as ToastType[]).map((type) => (
        <div key={type} className="contents">
          <code className="ds-meta text-foreground-muted">{type === 'default' ? 'toast()' : `toast.${type}()`}</code>
          <Button variant="outline" onClick={TOASTS[type]}>Show {type}</Button>
        </div>
      ))}
    </div>
  ),
}
