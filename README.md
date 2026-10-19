# M&A CRM — prototype & design system

Vertical CRM for M&A boutiques: Kanban pipeline, deal card with Outlook activity, Chinese Walls (isolation zones) and an immutable Audit Log with NDA hard-block.

This repository contains a **clickable prototype on mock data** and the **design system** it is built from. There is no backend yet: all data lives in an in-memory mock layer persisted to `localStorage`.

## Quick start

Requires Node.js 18+.

```bash
npm install
npm run dev          # app → http://localhost:5173
npm run storybook    # component catalog → http://localhost:6006
npm run build        # type-check + production build
```

> Windows: Storybook 10 needs a current *Microsoft Visual C++ Redistributable (x64)*.

## What's inside

| Path | What |
|---|---|
| `src/screens/` | 5 screens + index page at `/` (registry: `src/screens/registry.ts`) |
| `src/data/` | Mock data layer: seed, store (React context + actions with simulated latency), validation |
| `src/components/ui/` | shadcn/ui components (Radix), themed with the DS tokens |
| `src/components/<Name>/` | Custom M&A components: StageBadge, KanbanCard, KanbanColumn, ActivityFeedItem, StatsMetric, MemberRow |
| `src/tokens/` | Design tokens: `primitives.css` → `semantics.css` (aliases via `var()`) → `typography.css` |
| `*.stories.tsx`, `src/foundation/`, `src/sandboxes/` | Storybook catalog: Foundation (all tokens), every component with all variants, sandboxes |
| `ds/` | Design-system index: `CONTRACT.md` (rules), `foundation.md` (tokens), `components.md` (catalog), screen notes |

**Stack:** Vite 8 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · React Router · Storybook 10.

## Screens

| Route | Screen |
|---|---|
| `/pipeline` | Pipeline — Kanban (drag-and-drop between stages, NDA rule) |
| `/pipeline/table` | Pipeline — Table (sort, bulk archive, Smart Paste from Excel) |
| `/deals/:dealId` | Deal Card (edit, share with NDA hard-block, archive, Outlook activity) |
| `/compliance/chinese-walls` | Chinese Walls (zones, drag employees in, conflict-of-interest check) |
| `/compliance/audit-log` | Audit Log (filters, CSV export, integrity check) |

Business rules implemented in the mock layer (`src/data/store.tsx`):

- **NDA hard-block** — sharing a deal without a signed NDA is blocked and logged as `BLOCKED`; a deal without NDA can't move past *Prospecting*.
- **Chinese Wall conflict** — an employee already isolated in another active zone can't be added; the attempt is logged as `DENIED`.
- Unique deal names, field validation, Outlook sync failure (every 2nd sync, to demo the error state).
- *Reset demo data* in the user menu restores the seed dataset.

## Design system rules

UI is composed **only** from existing components and **semantic tokens** — no hard-coded colors, radii or spacing (see `ds/CONTRACT.md`).

- Figma — design system (shadcn kit + M&A components): `IZ9VWVLPFWbKoBbxU8hjgH`
- Figma — screens (page *layouts*): `ZlEXHBoxr00P0qfxmVlToO`

## Next steps for development

Replace `src/data/store.tsx` actions with API calls (the screens only talk to `useStore()`), add auth, and connect Outlook / document storage.
