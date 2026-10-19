import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { byPrefix, primitiveColors, primitives, semanticGroups, semantics, textStyles } from './tokens'

/**
 * Foundation — all DS variables, read from `src/tokens/*.css` (source of truth: `ds/foundation.md`).
 * Primitive = global values; Semantic = meaning, aliased to a primitive via `var()`.
 */
const meta = {
  title: 'Foundation',
  parameters: { layout: 'padded' },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="flex flex-col gap-(--spacing-md)">
    <h2 className="ds-h4 text-foreground-default">{title}</h2>
    {children}
  </section>
)

const Swatch = ({ name, value, note }: { name: string; value: string; note?: string }) => (
  <div className="flex w-44 flex-col gap-(--spacing-xs)">
    <div className="h-12 rounded-sm border border-border-default" style={{ background: `var(${name})` }} />
    <code className="ds-meta text-foreground-default">{name}</code>
    <code className="ds-meta text-foreground-muted">{note ?? value}</code>
  </div>
)

const Row = ({ name, value, children }: { name: string; value: string; children?: ReactNode }) => (
  <div className="flex items-center gap-(--spacing-lg) border-b border-border-default py-(--spacing-sm)">
    <code className="ds-meta w-44 shrink-0 text-foreground-default">{name}</code>
    <code className="ds-meta w-40 shrink-0 text-foreground-muted">{value}</code>
    <div className="flex-1">{children}</div>
  </div>
)

const Page = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-(--spacing-3xl) text-foreground-default">{children}</div>
)

/** Global (primitive) variables: palette, type scale, radius, spacing, padding, shadows. */
export const Primitives: Story = {
  render: () => (
    <Page>
      <Section title="Color — Zinc">
        <div className="flex flex-wrap gap-(--spacing-lg)">
          {byPrefix(primitiveColors, '--zinc-').map((t) => <Swatch key={t.name} {...t} />)}
        </div>
      </Section>
      <Section title="Color — functional, stages, primary, charts">
        <div className="flex flex-wrap gap-(--spacing-lg)">
          {primitiveColors.filter((t) => !t.name.startsWith('--zinc-')).map((t) => <Swatch key={t.name} {...t} />)}
        </div>
      </Section>
      <Section title="Font size">
        <div>
          {byPrefix(primitives, '--size-').map((t) => (
            <Row key={t.name} {...t}><span style={{ fontSize: `var(${t.name})` }}>Deal pipeline</span></Row>
          ))}
        </div>
      </Section>
      <Section title="Font weight · line-height · tracking">
        <div>
          {byPrefix(primitives, '--weight-').map((t) => (
            <Row key={t.name} {...t}><span className="ds-body" style={{ fontWeight: `var(${t.name})` }}>LogistikPro sale</span></Row>
          ))}
          {byPrefix(primitives, '--leading-', '--tracking-').map((t) => <Row key={t.name} {...t} />)}
        </div>
      </Section>
      <Section title="Radius">
        <div className="flex flex-wrap gap-(--spacing-lg)">
          {byPrefix(primitives, '--radius-').map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-(--spacing-xs)">
              <div className="size-16 border border-border-primary-default bg-background-muted" style={{ borderRadius: `var(${t.name})` }} />
              <code className="ds-meta">{t.name}</code>
              <code className="ds-meta text-foreground-muted">{t.value}</code>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Spacing (gap) · Padding">
        <div>
          {byPrefix(primitives, '--spacing-', '--padding-').map((t) => (
            <Row key={t.name} {...t}><div className="h-3 bg-background-primary-default" style={{ width: `var(${t.name})` }} /></Row>
          ))}
        </div>
      </Section>
      <Section title="Shadow">
        <div className="flex flex-wrap gap-(--spacing-xl)">
          {byPrefix(primitives, '--shadow-').map((t) => (
            <div key={t.name} className="flex size-36 flex-col items-center justify-center gap-(--spacing-xs) rounded-md bg-background-card p-(--padding-xs) text-center" style={{ boxShadow: `var(${t.name})` }}>
              <code className="ds-meta">{t.name}</code>
              <code className="ds-meta text-foreground-muted">{t.value}</code>
            </div>
          ))}
        </div>
      </Section>
    </Page>
  ),
}

/** Semantic variables (Tokens collection, Light mode) — each one is an alias of a primitive. */
export const Semantic: Story = {
  render: () => (
    <Page>
      {semanticGroups.map((g) => (
        <Section key={g} title={g[0].toUpperCase() + g.slice(1)}>
          <div className="flex flex-wrap gap-(--spacing-lg)">
            {byPrefix(semantics, `--${g}-`).map((t) => (
              <Swatch key={t.name} name={t.name} value={t.value} note={t.ref ? `→ ${t.ref}` : t.value} />
            ))}
          </div>
        </Section>
      ))}
    </Page>
  ),
}

/** Text styles — one line per `.ds-*` class. Text styles carry no color (as in Figma). */
export const Typography: Story = {
  render: () => (
    <Page>
      <div className="flex flex-col">
        {textStyles.map((s) => (
          <div key={s.className} className="flex items-baseline gap-(--spacing-xl) border-b border-border-default py-(--spacing-md)">
            <code className="ds-meta w-36 shrink-0 text-foreground-muted">.{s.className}</code>
            <span className={`${s.className} flex-1`}>LogistikPro sale — Due Diligence</span>
            <code className="ds-meta w-96 shrink-0 text-foreground-muted">{s.declarations}</code>
          </div>
        ))}
      </div>
    </Page>
  ),
}
