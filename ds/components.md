# Components (scan)

**Источник:** shadcn-ui — The Ultimate UI Kit for Figma (Community, дублированный)
**Figma-файл:** IZ9VWVLPFWbKoBbxU8hjgH
**Дата сканирования:** 2026-06-09
**Структура:** каждый компонент — отдельная страница в файле (не единая страница Components)
**Node ID формат:** `page:PAGE_NODE_ID` — переходи на эту страницу в Figma, COMPONENT_SET находится на ней

**Кол-во компонентных страниц:** 45 (из них 2 помечены excl. — без Figma-компонентов, только документация)

---

## Действия

### Button
- **Назначение:** основная кнопка действий; поддерживает 6 визуальных вариантов и 3 размера
- **Варианты:** variant: default | destructive | outline | secondary | ghost | link; size: default | sm | lg | icon; state: default | hover | disabled | loading
- **Node ID:** `page:139:288`

### Toggle
- **Назначение:** кнопка-переключатель (вкл/выкл), используется для тулбаров и переключения режимов
- **Варианты:** variant: default | outline; size: default | sm | lg; state: default | hover | active | disabled
- **Node ID:** `page:210:6059`

### Toggle Group
- **Назначение:** группа Toggle — переключатель между несколькими вариантами (например, Kanban/Table)
- **Варианты:** type: single | multiple; variant: default | outline
- **Node ID:** `page:210:6060`

---

## Ввод

### Input
- **Назначение:** однострочное поле ввода с лейблом и вспомогательным текстом
- **Варианты:** state: default | focus | error | disabled; size: default | sm
- **Node ID:** `page:172:990`

### Textarea
- **Назначение:** многострочное поле ввода
- **Варианты:** state: default | focus | error | disabled
- **Node ID:** `page:210:6057`

### Select
- **Назначение:** выпадающий список с одиночным выбором; состоит из Trigger + Content + Item
- **Варианты:** size: default | sm; state: default | open | disabled
- **Node ID:** `page:210:6048`

### Combobox
- **Назначение:** поле поиска с выпадающим списком и автодополнением
- **Варианты:** state: default | open | disabled
- **Node ID:** `page:210:6027`

### Checkbox
- **Назначение:** флажок для выбора одного или нескольких значений
- **Варианты:** state: unchecked | checked | indeterminate | disabled
- **Node ID:** `page:210:6025`

### Radio Group
- **Назначение:** группа радиокнопок — выбор одного из нескольких
- **Варианты:** state: default | disabled; orientation: vertical | horizontal
- **Node ID:** `page:210:6045`

### Switch
- **Назначение:** переключатель вкл/выкл, альтернатива Checkbox для бинарных настроек
- **Варианты:** state: unchecked | checked | disabled
- **Node ID:** `page:210:6054`

### Slider
- **Назначение:** ползунок для выбора числового значения в диапазоне
- **Варианты:** state: default | disabled; orientation: horizontal | vertical
- **Node ID:** `page:210:6052`

### Input OTP
- **Назначение:** поле ввода одноразового кода (OTP) — ячейки для каждой цифры
- **Варианты:** length: 4 | 6; state: default | focus | error
- **Node ID:** `page:210:6041`

### Calendar
- **Назначение:** календарь для выбора даты
- **Варианты:** mode: single | range | multiple
- **Node ID:** `page:210:6007`

### Data Picker
- **Назначение:** поле выбора даты с календарём во всплывающем окне
- **Варианты:** state: default | open | disabled
- **Node ID:** `page:939:10169`

### Form
- **Назначение:** контейнер формы с валидацией — объединяет Label + Input + Error Message
- **Варианты:** нет (паттерн-страница)
- **Node ID:** `page:210:6038`

---

## Отображение данных

### Badge
- **Назначение:** небольшой ярлык для статусов, меток, счётчиков
- **Варианты:** variant: default | secondary | destructive | outline
- **Node ID:** `page:96:527`

### Table
- **Назначение:** базовая таблица: Table, TableHeader, TableBody, TableRow, TableCell, TableHead
- **Варианты:** нет вариантов (компоненты-атомы строки/ячейки)
- **Node ID:** `page:210:6055`

### Data Table
- **Назначение:** расширенная таблица с сортировкой, фильтрацией и пагинацией
- **Варианты:** нет (паттерн-страница)
- **Node ID:** `page:210:6034`

### Pagination
- **Назначение:** компонент постраничной навигации: Previous, Page, Next, Ellipsis
- **Варианты:** state: default | active | disabled
- **Node ID:** `page:210:6032`

### Progress
- **Назначение:** горизонтальный индикатор прогресса
- **Варианты:** нет вариантов
- **Node ID:** `page:210:6044`

### Skeleton
- **Назначение:** плейсхолдер загрузки (shimmer-анимация)
- **Варианты:** нет (гибкие размеры через resize)
- **Node ID:** `page:210:6051`

### Chart
- **Назначение:** набор готовых графиков (Bar, Line, Area, Pie, Radar, Radial)
- **Варианты:** type: Bar | Line | Area | Pie | Radar | Radial Bar
- **Node ID:** `page:210:6024`

### Carousel
- **Назначение:** горизонтальная карусель для слайдов контента
- **Варианты:** orientation: horizontal | vertical
- **Node ID:** `page:210:6023`

---

## Контейнеры

### Card
- **Назначение:** универсальный контейнер с Header, Content, Footer, Title, Description
- **Варианты:** нет вариантов (собирается из субкомпонентов)
- **Node ID:** `page:210:6022`

### Accordion
- **Назначение:** раскрывающийся список — показывает один или несколько разделов
- **Варианты:** type: single | multiple; state: collapsed | expanded
- **Node ID:** `page:99:249`

### Collapsible
- **Назначение:** базовый toggle для показа/скрытия контента
- **Варианты:** state: collapsed | expanded
- **Node ID:** `page:210:6026`

### Separator
- **Назначение:** горизонтальный или вертикальный разделитель
- **Варианты:** orientation: horizontal | vertical
- **Node ID:** `page:210:6049`

### Scroll-area
- **Назначение:** контейнер с кастомным скроллбаром
- **Варианты:** нет (обёртка)
- **Node ID:** `page:210:6047`

---

## Навигация

### Sidebar
- **Назначение:** вертикальная навигационная боковая панель с иерархией разделов
- **Варианты:** collapsible: offcanvas | icon | none; side: left | right
- **Node ID:** `page:1460:2161`

### Navigation Menu
- **Назначение:** горизонтальное меню верхнего уровня с подменю
- **Варианты:** нет (собирается из субкомпонентов)
- **Node ID:** `page:210:6031`

### Breadcrumb
- **Назначение:** хлебные крошки — цепочка навигации с разделителями
- **Варианты:** нет
- **Node ID:** `page:201:2745`

### Tabs
- **Назначение:** вкладки для переключения между разделами контента
- **Варианты:** variant: default | underline; state: active | inactive | disabled
- **Node ID:** `page:210:6056`

### Menubar
- **Назначение:** горизонтальная строка меню в стиле десктоп-приложений
- **Варианты:** нет (собирается из пунктов)
- **Node ID:** `page:210:6030`

### Pagination
*(см. раздел Отображение данных)*

---

## Всплывающие окна и оверлеи

### Dialog
- **Назначение:** модальное диалоговое окно с блокировкой фона
- **Варианты:** нет (собирается из DialogContent, DialogHeader, DialogFooter, DialogTitle)
- **Node ID:** `page:210:6035`

### Alert Dialog
- **Назначение:** диалог подтверждения действия (деструктивного) — требует явного Cancel/Continue
- **Варианты:** нет
- **Node ID:** `page:353:6655`

### Sheet
- **Назначение:** выезжающая панель (drawer) с краёв экрана
- **Варианты:** side: top | right | bottom | left
- **Node ID:** `page:210:6050`

### Drawer
- **Назначение:** нижняя панель (mobile-first), аналог Sheet для мобильных
- **Варианты:** нет
- **Node ID:** `page:210:6036`

### Popover
- **Назначение:** небольшое всплывающее окно привязанное к триггеру
- **Варианты:** нет
- **Node ID:** `page:210:6033`

### Hover Card
- **Назначение:** карточка, появляющаяся при наведении на ссылку/элемент
- **Варианты:** нет
- **Node ID:** `page:210:6039`

### Tooltip
- **Назначение:** подсказка при наведении
- **Варианты:** side: top | right | bottom | left
- **Node ID:** `page:210:6061`

### Command
- **Назначение:** палитра команд (cmd+K) с поиском и группами пунктов
- **Варианты:** нет
- **Node ID:** `page:210:6028`

---

## Контекстные меню

### Dropdown Menu
- **Назначение:** выпадающее меню с пунктами, группами и разделителями
- **Варианты:** нет (пункты: Item, CheckboxItem, RadioItem, SubTrigger, Separator)
- **Node ID:** `page:210:6037`

### Context Menu
- **Назначение:** контекстное меню по правой кнопке мыши
- **Варианты:** нет
- **Node ID:** `page:210:6029`

---

## Фидбэк

### Alert
- **Назначение:** информационный блок для сообщений разного типа внутри страницы
- **Варианты:** variant: default | destructive | success | warning
- **Node ID:** `page:91:261`

### Toast
- **Назначение:** временное уведомление (нотификация), появляется в углу экрана
- **Варианты:** variant: default | destructive | success
- **Node ID:** `page:210:6058`

### Sonner
- **Назначение:** улучшенный Toast с очередью и progress-баром
- **Варианты:** type: default | success | error | warning | info | loading
- **Node ID:** `page:210:6053`

---

## Профиль / Идентификация

### Avatar
- **Назначение:** аватар пользователя — изображение или fallback с инициалами
- **Варианты:** size: sm | md | lg | xl; fallback: image | initials
- **Node ID:** `page:201:1002`

---

---

## Кастомные компоненты M&A CRM

**Статус:** созданы 2026-06-09; 2026-10-16 — английские имена слоёв, TEXT-свойства, слот preview в ActivityFeedItem (требует publish библиотеки)
**Страница:** `↳ M&A Custom Components` (page id: `5018:1391`)
**Файл:** IZ9VWVLPFWbKoBbxU8hjgH

### StageBadge
- **Назначение:** цветной бейдж стадии сделки для Kanban, таблицы, заголовка карточки
- **Варианты:** stage: Prospecting | NDA Signed | Due Diligence | LOI / Term Sheet | Closing
- **Слои:** `label`
- **Цвета:** Prospecting→Zinc, NDA Signed→Emerald, Due Diligence→Blue, LOI→Violet, Closing→Amber
- **Node ID:** `5018:1402`

### KanbanCard
- **Назначение:** карточка сделки в Kanban-колонке; ширина 196px, высота авто
- **Варианты:** stage: Prospecting | NDA Signed | Due Diligence | LOI / Term Sheet | Closing
- **Свойства (TEXT):** `dealName`, `dealType`, `team`, `date`
- **Свойства (BOOLEAN):** `locked` (default false) — сделка за Chinese Wall, в которую пользователь не входит: иконка `lock` перед названием (Icon/muted), название Foreground/muted. Код: `<KanbanCard locked />`, `data-locked`
- **Слои:** titleRow > lockIcon, dealName; meta (dealType · dot · team), date, stageBadge > label
- **Node ID:** `5018:1448`

### ActivityFeedItem
- **Назначение:** строка ленты активности на карточке сделки; полная ширина
- **Варианты:** type: Email In | Email Out | Meeting | NDA | Note
- **Свойства:** `subject`, `meta`, `preview` (TEXT), `showPreview` (BOOLEAN, default false)
- **Слои:** typeIcon > icon, content > subject, meta, preview
- **Node ID:** `5018:1479`

### StatsMetric
- **Назначение:** метрика-карточка в StatsBar (AuditLog, Dashboard); горизонтальный ряд
- **Варианты:** variant: default | highlighted
- **Свойства (TEXT):** `value`, `label`
- **Node ID:** `5018:1486`

### MemberRow
- **Назначение:** строка участника зоны Chinese Wall; аватар + имя + роль + опционально зона
- **Варианты:** state: default | in-zone
- **Свойства (TEXT):** `initials`, `name`, `role`, `zone` (только in-zone)
- **Слои:** avatar > initials, info > name, role, zoneChip > zone
- **Node ID:** `5018:1501`

### KanbanColumn
- **Назначение:** колонка канбан-доски; содержит заголовок с названием стадии + счётчик, список KanbanCard-инстансов из библиотеки, кнопку "+ Добавить"
- **Варианты:** stage: Prospecting | NDA Signed | Due Diligence | LOI / Term Sheet | Closing
- **Ширина:** 216px FIXED; высота AUTO (HUG)
- **Статус:** local component (создан как Frame в Screen/PipelineKanban); кандидат на вынос в DS
- **used-in:** Screen/PipelineKanban (`46:272`, страница layouts, файл ZlEXHBoxr00P0qfxmVlToO)

---

## Замечания после self-check

- [⚠] **Node ID формат:** из-за лимита MCP-вызовов не удалось получить COMPONENT_SET node IDs внутри страниц — указаны page IDs с префиксом `page:`. Для использования в `use_figma`: переключись на страницу через `figma.setCurrentPageAsync()`, затем находи COMPONENT_SET через `page.findAllWithCriteria({types:['COMPONENT_SET']})`.
- [⚠] **Компоненты без описаний в Figma:** shadcn-ui kit имеет минимальные description. Назначения в этом файле написаны по смыслу компонентов — не из Figma description.
- [ℹ] **Исключённые страницы (excl.):** Aspect Radio, Label, Resizable, Scroll-area, Collapsible — помечены в kit как "excluded", могут быть без полноценных компонентов.
- [ℹ] **Дубликаты:** не обнаружены.
- [ℹ] **Устаревшие имена:** не обнаружены (нет Button old / v1 и т.п.).
- [ℹ] **Иконки:** отдельная страница `↳ Icons` (id: 2:2) — содержит набор Lucide Icons. Node ID: `page:2:2`.
- [ℹ] **Блоки:** страница `↳ Blocks 🚧` (id: 2131:215) — готовые UI-паттерны (в разработке).
- [ℹ] **Темы:** страницы `↳ Examples`, `↳ Mail`, `↳ Dashboard` и др. — демо-экраны, не компоненты.
