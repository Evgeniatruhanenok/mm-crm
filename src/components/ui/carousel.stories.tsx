import type { Meta, StoryObj } from '@storybook/react-vite'
import { StageBadge } from '../StageBadge'
import type { Stage } from '../tones'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel'

const DEALS: { name: string; stage: Stage; owner: string; updated: string }[] = [
  { name: 'LogistikPro sale', stage: 'Due Diligence', owner: 'M. Volkova', updated: 'Jun 14, 2026' },
  { name: 'TechnoPark IPO prep', stage: 'Prospecting', owner: 'D. Kuznetsov', updated: 'Jun 12, 2026' },
  { name: 'RosMedia acquisition', stage: 'NDA Signed', owner: 'M. Volkova', updated: 'Jun 10, 2026' },
  { name: 'MetallSbyt restructuring', stage: 'LOI / Term Sheet', owner: 'D. Kuznetsov', updated: 'Jun 8, 2026' },
  { name: 'KapitalEnergo merger', stage: 'Closing', owner: 'M. Volkova', updated: 'Jun 3, 2026' },
]

function Slides({ className }: { className?: string }) {
  return DEALS.map((d) => (
    <CarouselItem key={d.name} className={className}>
      <div className="flex h-32 flex-col justify-between rounded-md border border-border-default p-(--padding-md)">
        <div className="flex flex-col gap-(--spacing-xs)">
          <span className="ds-label-sm text-foreground">{d.name}</span>
          <span className="ds-meta text-foreground-muted">{d.owner} · {d.updated}</span>
        </div>
        <StageBadge stage={d.stage} />
      </div>
    </CarouselItem>
  ))
}

/**
 * Slide carousel (Embla): Carousel + CarouselContent + CarouselItem + Previous/Next.
 * orientation: horizontal | vertical. Arrow keys navigate when focused.
 */
const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  args: { orientation: 'horizontal', opts: { align: 'start', loop: false }, className: 'w-72' },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'], description: 'Scroll axis' },
    opts: { control: 'object', description: 'Embla options (align, loop, …)' },
    className: { control: 'text', description: 'Extra classes (width)' },
    plugins: { control: false, description: 'Embla plugins (e.g. autoplay)' },
    setApi: { control: false, description: 'Callback receiving the Embla API' },
  },
  parameters: { layout: 'centered' },
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent className={args.orientation === 'vertical' ? 'h-40' : undefined}>
        <Slides className={args.orientation === 'vertical' ? 'basis-auto' : undefined} />
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
} satisfies Meta<typeof Carousel>
export default meta
type Story = StoryObj<typeof meta>

/** orientation=horizontal — one recent deal per slide. */
export const Horizontal: Story = {}

/** orientation=vertical — arrows move to top/bottom. */
export const Vertical: Story = { args: { orientation: 'vertical' } }

/** Several slides visible at once (`basis-1/2`). */
export const MultipleVisible: Story = {
  args: { className: 'w-[560px]' },
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        <Slides className="basis-1/2" />
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

/** Loop mode — Previous/Next never disable. */
export const Loop: Story = { args: { opts: { loop: true } } }

/** Orientation matrix. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex items-start gap-(--spacing-4xl) p-(--padding-4xl)">
      <div className="flex flex-col gap-(--spacing-md)">
        <code className="ds-meta text-foreground-muted">horizontal</code>
        <Carousel className="w-72" opts={{ align: 'start' }}>
          <CarouselContent><Slides /></CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex flex-col gap-(--spacing-md)">
        <code className="ds-meta text-foreground-muted">vertical</code>
        <div className="pt-(--padding-4xl)">
          <Carousel className="w-72" orientation="vertical" opts={{ align: 'start' }}>
            <CarouselContent className="h-40"><Slides className="basis-auto" /></CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  ),
}
