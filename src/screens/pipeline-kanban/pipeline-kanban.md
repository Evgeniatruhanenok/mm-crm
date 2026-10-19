# Pipeline — Kanban

- **Figma:** Screen/PipelineKanban `63:552` (file ZlEXHBoxr00P0qfxmVlToO)
- **Route:** `/pipeline`
- **Base components:** Tabs (view switcher), Select ×2, Button, KanbanColumn ×5, KanbanCard ×9, StageBadge (inside card), Badge (column count)
- **Shared shell:** `_shared/AppShell` — Header (Input, Avatar) + Sidebar (Sidebar*, Separator)
- **Local blocks:** none
- **Live (wire):** deals from `src/data`; filters + search in URL (shared with Table, Back/Forward restore them); drag-and-drop between stages with the NDA rule (no NDA → stays in Prospecting, toast); “+ Add deal” per column and New deal dialog (validation, duplicate name); card click → `/deals/:id`; loading skeleton, “Nothing found”, empty columns; sidebar My deals / Team deals / Closed views.
