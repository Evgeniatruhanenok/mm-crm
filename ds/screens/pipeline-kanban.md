# Screen: PipelineKanban

**Wireframe Node ID:** `25:226`
**Final Screen Node ID:** `46:272`

---

## Composition

### Header (FILL × 64px · HORIZONTAL · padding 24 · space-between · border-bottom: Border/default · bg: Background/default)
- Logo frame 120×32, radius-sm, bg: Background/Secondary — `[placeholder, заменить руками]`
- Search frame 480×36, radius-sm, bg: Background/Secondary, stroke: Border/default
  - Text "Найти сделку, контакт, файл..." · Regular 13 · Foreground/muted
- UserRow: Avatar 32px "АС" (Emerald circle) · "Алексей Смирнов" Medium 14 · ▾ muted

### Body (FILL × 960px · HORIZONTAL)

#### Sidebar (240px · VERTICAL · padding 16 · gap 2 · bg: Background/Secondary · border-right: Border/default)
- NavItem "Pipeline" — active (bg: Zinc/200, Medium 14, Foreground/default)
- NavItem "Contacts" — muted
- NavItem "Compliance" — muted
- NavItem "Settings" — muted
- Divider 1px Border/default
- NavItem "Мои сделки" — muted
- NavItem "Все сделки команды" — muted
- NavItem "Закрытые" — muted
- Spacer FILL
- UserRow: Avatar 28px "АС" + "А. Смирнов" Regular 13 muted

#### Main (FILL × 960px · VERTICAL)

##### Toolbar (FILL × 48px · HORIZONTAL · padding 0/24 · gap 12 · border-bottom · bg: Background/default)
- "Pipeline" Bold 20 Foreground/default
- Spacer FILL
- ToggleGroup [**Kanban** (active, shadow-sm, white bg) | Table (ghost)]
- Button "+ Новая сделка" bg: Foreground/default, text: white, radius-sm
- Select "Все банкиры ▾" border radius-sm
- Select "Все стадии ▾"

##### KanbanBoard (FILL × 912px · HORIZONTAL · padding 24 · gap 16 · bg: Background/muted · counterAxisAlignItems: MIN)

| Колонка | Кол-во | Карточки |
|---|---|---|
| Prospecting | 3 | Поглощение РосМедиа · Продажа АгроХолдинг Юг · Слияние ФинТех Групп |
| NDA Signed | 2 | Продажа ЛогистикПро (HC) · Поглощение СтройКапитал |
| Due Diligence | 2 | IPO Подготовка ТехноПарк (HC) · Реструктуризация МеталлСбыт |
| LOI / Term Sheet | 1 | Поглощение ДигиталТрейд (HC) |
| Closing | 1 | Слияние КапиталЭнерго |

Каждая KanbanColumn (220px FIXED × HUG):
- ColHeader: stage name Medium 13 + count pill (Zinc/100 bg, radius-full)
- CardList: KanbanCard **instance** из библиотеки (stage= соответствующий вариант)
- AddBtn: ghost "+" строка внизу

## Phase 2.5 — KanbanColumn (новый компонент, 5 копий)
Создаётся как локальный ComponentSet в странице `layouts`. Варианты: stage × 5.
После сборки — добавить в `ds/components.md`.

## Edge cases
- **EmptyColumn** (visible:false): CardList заменяется на Text "Нет сделок" center muted + AddBtn

## Tokens used
- Colors: Background/default, Background/Secondary, Background/muted, Foreground/default, Foreground/muted, Border/default
- Radius: radius-sm (4px), radius-md (8px), radius-full
- Spacing: spacing-sm (8), spacing-lg (16), padding-lg (24)
- Shadows: shadow-sm на active toggle
