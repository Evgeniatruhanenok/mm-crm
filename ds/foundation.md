# Foundation (scan)

**Источник:** shadcn-ui — The Ultimate UI Kit for Figma (Community, дублированный)
**Figma-файл:** IZ9VWVLPFWbKoBbxU8hjgH
**Дата сканирования:** 2026-06-09
**Локаль:** ru+en

## Структура коллекций

Две коллекции Variables:
- **Tokens** — семантический слой, 2 режима: `Light` / `Dark` (default mode: Light)
- **Primitives** — примитивные цвета Tailwind (Slate, Gray, Zinc, Neutral, Stone, Red, Orange, Yellow, Green, Emerald, Teal, Cyan, Blue, Indigo, Violet, Purple, Fuchsia, Pink, Rose) + White, Black

Привязки: Semantic → Primitive **сделаны** (Tokens ссылаются на Primitives через VARIABLE_ALIAS).

---

## Слой 1 — Примитивные токены

### Палитра (основной нейтральный — Zinc)
| Токен | Hex (прибл.) |
|---|---|
| Zinc/50 | #FAFAFA |
| Zinc/100 | #F4F4F5 |
| Zinc/200 | #E4E4E7 |
| Zinc/300 | #D4D4D8 |
| Zinc/400 | #A1A1AA |
| Zinc/500 | #71717A |
| Zinc/600 | #52525B |
| Zinc/700 | #3F3F46 |
| Zinc/800 | #27272A |
| Zinc/900 | #18181B |
| Zinc/950 | #09090B |

### Семантические цвета (Tailwind primitives)
| Группа | 500 (base) | Hex |
|---|---|---|
| Red | Red/500 | #EF4444 |
| Red | Red/600 | #DC2626 |
| Emerald | Emerald/600 | #059669 |
| Emerald | Emerald/700 | #047857 |
| Yellow | Yellow/500 | #EAB308 |
| Yellow | Yellow/600 | #CA8A04 |
| Yellow | Yellow/700 | #A16207 |
| White | — | #FFFFFF |
| Black | — | #000000 |

### Primary (настраиваемый акцент)
В shadcn-ui Primary — отдельно настраиваемый цвет. По умолчанию соответствует Zinc/900 (тёмный). Проверь в Figma: Primitives → Primary.
- Foreground/Primary/default → Primary/50
- Background/Primary/default → Primary/900

### Цвета для графиков (Charts)
| Токен | Hex (прибл.) | Opacity-варианты |
|---|---|---|
| chart-1 | #2A9D8F (teal) | 10%, 50%, 80%, 100% |
| chart-2 | #E76E50 (coral) | 10%, 50%, 80%, 100% |
| chart-3 | #274555 (dark blue) | 10%, 50%, 80%, 100% |
| chart-4 | #E8C468 (golden) | 10%, 50%, 80%, 100% |
| chart-5 | #F4A361 (orange) | 10%, 50%, 80%, 100% |

---

## Слой 2 — Семантические токены (Tokens collection)

### Foreground (TEXT_FILL)
| Токен | Значение | Hex (прибл.) |
|---|---|---|
| Foreground/default | → Zinc/950 | #09090B |
| Foreground/accent | → Zinc/900 | #18181B |
| Foreground/Secondary/default | → Zinc/700 | #3F3F46 |
| Foreground/muted | → Zinc/500 | #71717A |
| Foreground/Disabled/default | → Zinc/400 | #A1A1AA |
| Foreground/Primary/default | → Primary/50 | (светлый на тёмной кнопке) |
| Foreground/Destructive/default | → Red/500 | #EF4444 |
| Foreground/Success/default | → Emerald/700 | #047857 |
| Foreground/Warning/default | → Yellow/700 | #A16207 |

### Background (FRAME_FILL)
| Токен | Значение | Hex (прибл.) |
|---|---|---|
| Background/default | → White | #FFFFFF |
| Background/card | → White | #FFFFFF |
| Background/popover | → White | #FFFFFF |
| Background/Secondary/default | → Zinc/100 | #F4F4F5 |
| Background/muted | → Zinc/100 | #F4F4F5 |
| Background/accent | → Zinc/100 | #F4F4F5 |
| Background/input | → Zinc/200 | #E4E4E7 |
| Background/Primary/default | → Primary/900 | (тёмная кнопка) |
| Background/Primary/light | → Primary/50 | (светлый вариант) |
| Background/Destructive/default | → Red/600 | #DC2626 |
| Background/Success/default | → Emerald/600 | #059669 |
| Background/Warning/default | → Yellow/500 | #EAB308 |
| Background/Disabled/default | → Neutral/400 | #A3A3A3 |
| Background/Success/light | → Emerald/600 @ 10% | (дозаписано 2026-10-17 по Figma) |
| Background/Warning/light | → Yellow/500 @ 10% | (дозаписано 2026-10-17 по Figma) |
| Background/Destructive/light | → Red/600 @ 10% | (дозаписано 2026-10-17 по Figma) |

### Border (STROKE_COLOR)
| Токен | Значение | Hex (прибл.) |
|---|---|---|
| Border/default | → Zinc/200 | #E4E4E7 |
| Border/Primary/default | → Zinc/400 | #A1A1AA |
| Border/Destructive/default | → Red/500 | #EF4444 |
| Border/Success/default | → Emerald/700 | #047857 |
| Border/Warning/default | → Yellow/600 | #CA8A04 |

### Icon (SHAPE_FILL)
| Токен | Значение |
|---|---|
| Icon/default | → Zinc/950 |
| Icon/accent | → Zinc/900 |
| Icon/Secondary/default | → Zinc/700 |
| Icon/muted | → Zinc/500 |
| Icon/Disabled/default | → Zinc/400 |
| Icon/Primary/default | → Primary/50 |
| Icon/Destructive/default | → Red/500 |
| Icon/Success/default | → Emerald/700 |
| Icon/Warning/default | → Yellow/700 |

### Утилиты
| Токен | Значение |
|---|---|
| white | → White (#FFFFFF) |
| black | → Black (#000000) |

---

## Слой 1 — Spacing (GAP)
| Токен | Значение |
|---|---|
| spacing-none | 0px |
| spacing-xxs | 2px |
| spacing-xs | 4px |
| spacing-sm | 8px |
| spacing-md | 12px |
| spacing-lg | 16px |
| spacing-xl | 24px |
| spacing-xxl | 32px |
| spacing-3xl | 40px |
| spacing-4xl | 64px |

## Слой 1 — Padding (GAP)
| Токен | Значение |
|---|---|
| padding-none | 0px |
| padding-xxs | 8px |
| padding-xs | 12px |
| padding-sm | 16px |
| padding-md | 20px |
| padding-lg | 24px |
| padding-xl | 32px |
| padding-xxl | 40px |
| padding-3xl | 48px |
| padding-4xl | 64px |

## Слой 1 — Radius (CORNER_RADIUS)
| Токен | Значение |
|---|---|
| radius-none | 0px |
| radius-xs | 2px |
| radius-sm | 4px |
| radius-md | 8px |
| radius-lg | 12px |
| radius-xl | 16px |
| radius-xxl | 24px |
| radius-full | 400px (pill) |

---

## Типографика

shadcn-ui Figma kit использует **Geist** (display) и **Inter** (body) в большинстве конфигураций. Кириллица в Inter поддерживается полностью. Geist имеет ограниченную кириллическую поддержку — рекомендуется проверить наличие Щ/Ъ/Ь.

Текстовых Variables нет — типографика управляется через Text Styles (не переменные).

---

## Тени (Effects)

| Токен | Тип | offset y | blur | spread | Alpha |
|---|---|---|---|---|---|
| `shadow-sm` | DROP_SHADOW | 1 | 3 | 0 | 6% |
| `shadow-md` | DROP_SHADOW | 4 | 6 | -1 | 10% |
| `shadow-lg` | DROP_SHADOW | 10 | 15 | -3 | 15% |

Применение: `shadow-sm` — карточки / сайдбар; `shadow-md` — dropdown / select; `shadow-lg` — модалки.
Effect Styles в DS-файле не созданы — применяются inline через `node.effects` в Plugin API.

---

## Замечания после сканирования

- [x] Привязки Semantic → Primitive: **сделаны** (полноценная двухслойная система)
- [x] Light/Dark modes: **оба присутствуют** в коллекции Tokens
- [⚠] Primary-коллекция: **значения не считаны** (данные обрезаны на больших Primitives — проверь Primary в Figma вручную)
- [⚠] Кириллица: Inter — **поддерживается**; Geist — **проверь Щ/Ъ/Ь/Ы**
- [ℹ] Typography Variables: **отсутствуют** — типографика через Text Styles, не Variables
- [ℹ] Слой 3 (компонентные токены): **отсутствует** (shadcn не использует component-level tokens)
- [ℹ] Dark mode: полный набор значений есть, для M&A CRM достаточно Light
