# DS Contract — правила работы с дизайн-системой в этом проекте

**Источник ДС:** ds_scan (дублированная Community-библиотека — shadcn-ui)
**Figma-файл:** https://www.figma.com/design/IZ9VWVLPFWbKoBbxU8hjgH/shadcn-ui--The-Ultimate-UI-Kit-for-Figma--Community---Copy-
**Дата сканирования:** 2026-06-09

---

## Главное правило

При любом задании, которое касается интерфейса (новый экран, новая форма, новая карточка, доработка существующего), агент работает строго через эту ДС. Сборка идёт композицией существующих компонентов из `ds/components.md` и Variables из `ds/foundation.md`. Прибитые цвета, размеры, радиусы и шрифты в обход Variables запрещены.

---

## Что значит «через ДС»

1. **Компоненты — только из каталога.** При сборке экрана агент читает `ds/components.md`, выбирает подходящие компоненты по описанию и матрице вариантов. Для вставки в Figma: переключается на страницу компонента через `setCurrentPageAsync`, находит COMPONENT_SET через `findAllWithCriteria({types:['COMPONENT_SET']})`, импортирует главный компонент, создаёт инстанс. Не рисует похожие с нуля.

2. **Цвета — только через Tokens (Semantic Variables)** из `ds/foundation.md`. Никаких прибитых hex. Пример: вместо `{r:0.09, g:0.09, b:0.11}` — привязка к переменной `Foreground/default` из коллекции Tokens.

3. **Типографика, радиусы, отступы — через Variables.** Коллекция Tokens, группы Radius/Spacing/Padding.

4. **Auto Layout везде.** Любая секция экрана — Auto Layout.

5. **Dark mode.** Коллекция Tokens имеет оба режима (Light/Dark). По умолчанию — Light. При необходимости переключить режим — через `setExplicitVariableModeForCollection`.

---

## Справочник ключевых переменных для M&A CRM

### Цвета (частота использования в проекте)

| Роль | Token | Применение |
|---|---|---|
| Основной текст | `Foreground/default` | Заголовки, имена сделок, ячейки таблиц |
| Второстепенный текст | `Foreground/Secondary/default` | Метки, даты |
| Серый текст | `Foreground/muted` | Плейсхолдеры, подсказки |
| Фон страницы | `Background/default` | Белый фон |
| Фон карточки | `Background/card` | Канбан-карточки, зоны |
| Второстепенный фон | `Background/Secondary/default` | Sidebar bg, панели |
| Серый фон | `Background/muted` | Таблица чётные строки, StatsBar |
| Поле ввода | `Background/input` | Input, Select |
| Граница | `Border/default` | Карточки, строки таблиц, разделители |
| Кнопка (primary) | `Background/Primary/default` | Основные CTA |
| Текст на primary | `Foreground/Primary/default` | Текст на тёмной кнопке |
| Деструктивный | `Background/Destructive/default` | Кнопки удаления, NDA-блок |
| Деструктивный текст | `Foreground/Destructive/default` | Ошибки, ЗАБЛОКИРОВАНО |
| Успех | `Background/Success/default` | NDA Signed бейдж |
| Успех текст | `Foreground/Success/default` | Зелёный текст статусов |
| Предупреждение | `Background/Warning/default` | Предупреждения, желтые бейджи |

### Радиусы (частые паттерны)

| Паттерн | Token | Значение |
|---|---|---|
| Карточки, модалки | `radius-md` | 8px |
| Кнопки, input | `radius-sm` | 4px |
| Бейджи | `radius-xs` или `radius-full` | 2px / pill |
| Аватары | `radius-full` | 400px (круг) |

### Отступы (частые паттерны)

| Паттерн | Token | Значение |
|---|---|---|
| Внутри карточки | `padding-sm` | 16px |
| Внутри модалки | `padding-lg` | 24px |
| Между элементами в строке | `spacing-sm` | 8px |
| Между карточками | `spacing-lg` | 16px |
| Между секциями | `spacing-xl` | 24px |

---

## Что делать, если нужного компонента нет

Источник — дублированная Community-библиотека → можно добавить компоненты в свою копию.

**Нет компонента под задачу (например, KanbanCard, ChineseWallZone, ActivityFeedItem):**
1. Добавь компонент в Figma-файл shadcn (в существующий файл), оформи как COMPONENT_SET с `componentPropertyDefinitions` и description.
2. Перезапусти `ds_scan` или дорисуй строку в `ds/components.md` руками: имя, назначение, варианты, Node ID.
3. Только после этого используй на экране.

**Нет смыслового токена (например, `Background/chinese-wall-zone`, `Foreground/blocked-action`):**
1. Добавь Variable в коллекцию Tokens в Figma с привязкой к примитиву (Emerald, Red, Zinc и т.д.).
2. Добавь обновлённую строку в `ds/foundation.md`.
3. Используй на экране.

---

## Специфика M&A CRM

Проект использует shadcn как базовую систему и добавляет специфические компоненты поверх неё. Карта компонентов:

| UI-паттерн M&A CRM | Базируется на shadcn |
|---|---|
| KanbanCard (сделка) | Card + Badge |
| KanbanColumn | —  (кастомный, добавить в ДС) |
| ActivityFeedItem | — (кастомный, добавить в ДС) |
| DealHeader | — (кастомный, добавить в ДС) |
| ChineseWallZone | Card + Badge + Avatar |
| AuditLogRow | Table + Badge |
| NDABlockModal | Alert Dialog |
| SmartPasteModal | Dialog + Table |
| StatsBar метрика | Card (упрощённый) |

---

## Библиотека иконок

**Icon library: Lucide** (страница `↳ Icons`, `page:2:2` в DS-файле)
Рендер через `figma.createNodeFromSvg(svgString)`. Placeholder Rectangle только для логотипа бренда и реальных изображений.

---

## Тени (Effect Styles)

| Токен | offset y | blur | spread | alpha | Применение |
|---|---|---|---|---|---|
| `shadow-sm` | 1 | 3 | 0 | 6% | Карточки, сайдбар |
| `shadow-md` | 4 | 6 | -1 | 10% | Dropdown, Select-панели |
| `shadow-lg` | 10 | 15 | -3 | 15% | Модальные окна |

---

## Что запрещено

- Прибитые цвета, размеры, радиусы, отступы — везде, где есть подходящий Variable.
- Создание нового компонента «на лету» в составе экрана без его добавления в ДС (для дублированной библиотеки добавление разрешено).
- Правки в оригинальном Community-файле — работаем только в своей копии.

## Когда правила можно нарушить

Только при явной команде «здесь без ДС, ad-hoc». Тогда — отдельный фрейм вне основных Section, с именем `[ad-hoc]`.

---

## Синхронизация

- `ds/foundation.md` и `ds/components.md` — индекс. Расхождение с Figma ломает следующие сборки.
- При обновлении shadcn-kit (новые компоненты, переименования) — перезапусти `ds_scan`, перезапиши файлы, сравни diff.
- Не редактируй индекс руками без сверки с Figma. Если правил руками — пометь дату и причину.
