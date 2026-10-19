# Screens Index

**Figma-файл (wireframes + final layouts):** `ZlEXHBoxr00P0qfxmVlToO`
**Страница:** `layouts` (node `37:226`)
**DS-библиотека:** `IZ9VWVLPFWbKoBbxU8hjgH` (подключена как Team Library)
**Дата сборки:** 2026-06-15

---

| Экран | Node ID | Wireframe ref | Позиция на canvas |
|---|---|---|---|
| Screen/PipelineKanban | `63:552` | `25:226` | x=100, y=100 |
| Screen/PipelineTable | `63:970` | PipelineTable.md | x=1600, y=100 |
| Screen/DealCard | `65:706` | DealCard.md | x=3100, y=100 |
| Screen/ChineseWalls | `65:1134` | ChineseWalls.md | x=5100, y=100 |
| Screen/AuditLog | `65:1411` | AuditLog.md | x=7100, y=100 |

---

## Состав каждого экрана

### Screen/PipelineKanban
- Header (64px) · Sidebar (240px) · Main → Toolbar (48px) + KanbanBoard (912px)
- KanbanBoard: 5 колонок × KanbanCard (инстанс из библиотеки), стадии из 5 вариантов
- Данные: 9 сделок, все стадии Pipeline

### Screen/PipelineTable
- Header · Sidebar (Pipeline active) · Main → Toolbar + SmartPaste hint + DealsTable (9 строк) + Pagination
- Stage badges в колонке «Стадия», NDA badges в колонке «NDA»
- Toggle активен на «Table»

### Screen/DealCard
- Header · Sidebar (Pipeline active) · Main → DealHeader + TabBar + ActivityFeed (5 событий)
- Breadcrumbs, title + stage pill, meta row, action buttons
- Activity items: Email In/Out · Meeting · NDA signed

### Screen/ChineseWalls
- Header · Sidebar (Compliance > Chinese Walls active) · Main → ZonesArea (880px) + PeoplePanel (280px)
- 3 ZoneCard с drag-chip участниками и deal chips
- People Panel: Вне зон (2) + В зонах (6)

### Screen/AuditLog
- Header · Sidebar (Compliance > Audit Log active) · Main → Toolbar + StatsBar (4 метрики) + FiltersBar + LogTable (9 строк) + Pagination
- Строки ЗАБЛОКИРОВАНО (NDA) в red, ОТКАЗ (Chinese Wall) в red, выделенная строка в yellow
- Confidence badges: Highly Confidential (red), Confidential (yellow)

---

## Ревизия 2026-10-16

Все ручные элементы заменены инстансами библиотеки, имена слоёв — на английском:
- Sidebar → `.Sidebar Item` (State=Active для активного пункта) — все экраны
- View switcher Kanban/Table → `Tabs` (sm)
- DealsTable / AuditTable → `.Table Item` (Header/Body/Footer), стадии → `StageBadge`, статусы → `Badge` с токенами Success/Warning/Destructive (light bg + fg)
- Smart Paste hint → `Alert` (Warning); пагинация → `Pagination`
- StatsBar → `StatsMetric` ×4 (highlighted для блокировок NDA)
- DealCard: `Breadcrumbs`, `StageBadge`, табы из `.Tab Item` ×3, лента → `ActivityFeedItem`
- ChineseWalls: статусы зон / сделки → `Badge`, «+ Добавить» → `Button` Ghost, панель сотрудников → `MemberRow`; исправлены обрезанные кнопки в шапках зон

Остаются layout-фреймами (кит не содержит подходящего компонента): контейнеры зон, MemberChip, KanbanColumn, Logo-плейсхолдер.

## Токены и компоненты

Все экраны собраны из:
- shadcn DS (IZ9VWVLPFWbKoBbxU8hjgH) — KanbanCard instances (importComponentByKeyAsync)
- Inline frames (Auto Layout) с токенами из foundation.md
- Кастомные компоненты M&A: KanbanCard × 5 стадий, StageBadge, ActivityFeedItem, StatsMetric, MemberRow

Детали токенов → `ds/foundation.md`
Детали компонентов → `ds/components.md`
