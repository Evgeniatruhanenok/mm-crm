/*
 * Reads DS tokens straight from src/tokens/*.css (source: ds/foundation.md),
 * so the Foundation catalog never hardcodes values.
 */
import primitivesCss from '../tokens/primitives.css?raw'
import semanticsCss from '../tokens/semantics.css?raw'
import typographyCss from '../tokens/typography.css?raw'

export type Token = { name: string; value: string; comment?: string }

const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '')

/** All `--name: value;` declarations inside a block that starts with `selector`. */
function readBlock(css: string, selector: RegExp): Token[] {
  const src = stripComments(css)
  const out: Token[] = []
  const re = new RegExp(selector.source + '\\s*\\{([\\s\\S]*?)\\n\\}', 'g')
  for (const m of src.matchAll(re)) {
    for (const d of m[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      out.push({ name: d[1], value: d[2].trim() })
    }
  }
  return out
}

export const primitives = [
  ...readBlock(primitivesCss, /:root/),
  ...readBlock(primitivesCss, /@theme static/),
]

/** Semantic tokens (Light) — value is `var(--primitive)`. */
export const semantics = readBlock(semanticsCss, /:root/).map((t) => ({
  ...t,
  ref: t.value.match(/var\((--[\w-]+)\)/)?.[1],
}))

export const byPrefix = <T extends Token>(tokens: T[], ...prefixes: string[]) =>
  tokens.filter((t) => prefixes.some((p) => t.name.startsWith(p)))

/** Primitive color names, e.g. --zinc-500, --red-600, --white, --chart-1. */
export const primitiveColors = primitives.filter((t) => /^#|^rgb/i.test(t.value))

export type TextStyle = { className: string; declarations: string }

/** `.ds-*` utility classes from typography.css. */
export const textStyles: TextStyle[] = [
  ...stripComments(typographyCss).matchAll(/\.(ds-[\w-]+)\s*\{([^}]*)\}/g),
].map((m) => ({ className: m[1], declarations: m[2].trim().replace(/\s+/g, ' ') }))

export const semanticGroups = ['foreground', 'background', 'border', 'icon'] as const
