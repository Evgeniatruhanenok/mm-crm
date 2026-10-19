import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from './button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'

function DealDocs() {
  return (
    <>
      <div className="flex items-center justify-between gap-(--spacing-md)">
        <span className="ds-label-sm">LogistikPro sale — 3 documents</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle documents"><ChevronsUpDownIcon /></Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border p-(--padding-sm) ds-meta">Teaser_v3.pdf</div>
      <CollapsibleContent className="flex flex-col gap-(--spacing-sm)">
        <div className="rounded-md border p-(--padding-sm) ds-meta">NDA_Maria_Volkova.pdf</div>
        <div className="rounded-md border p-(--padding-sm) ds-meta">CIM_draft.docx</div>
      </CollapsibleContent>
    </>
  )
}

const BOX = 'flex w-80 flex-col gap-(--spacing-sm)'

/**
 * Base show / hide toggle. States: collapsed | expanded (`defaultOpen` / `open`).
 */
const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  args: { defaultOpen: false, disabled: false, className: BOX },
  argTypes: {
    defaultOpen: { control: 'boolean', description: 'Initial state (uncontrolled): expanded when true' },
    open: { control: 'boolean', description: 'Controlled state' },
    disabled: { control: 'boolean', description: 'Disable the trigger' },
    className: { control: 'text', description: 'Extra classes' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Collapsible {...args}>
      <DealDocs />
    </Collapsible>
  ),
} satisfies Meta<typeof Collapsible>
export default meta
type Story = StoryObj<typeof meta>

/** state=collapsed — only the first document visible. */
export const Collapsed: Story = {}
/** state=expanded. */
export const Expanded: Story = { args: { defaultOpen: true } }
/** Trigger disabled. */
export const Disabled: Story = { args: { disabled: true } }

/** State matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(3,auto)] items-start gap-(--spacing-lg)">
      <span />
      {['Collapsed', 'Expanded', 'Disabled'].map((h) => <span key={h} className="ds-label-sm text-foreground-muted">{h}</span>)}
      <code className="ds-meta text-foreground-muted">default</code>
      <Collapsible className={BOX}><DealDocs /></Collapsible>
      <Collapsible defaultOpen className={BOX}><DealDocs /></Collapsible>
      <Collapsible disabled className={BOX}><DealDocs /></Collapsible>
    </div>
  ),
}
