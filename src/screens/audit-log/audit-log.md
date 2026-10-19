# Audit Log

- **Figma:** Screen/AuditLog `65:1411`
- **Route:** `/compliance/audit-log`
- **Base components:** Button (outline ×2, ghost), StatsMetric ×4 (last = highlighted), Input (date range), Select ×3, Table, Badge (blocked / confidentiality levels on `background-*-light`), Pagination
- **Shared shell:** `_shared/AppShell` (Compliance expanded, Audit Log active)
- **Local blocks:** `parts/LogCells` (ActionCell, FileCell)
- **Live (wire):** entries from `src/data` (new BLOCKED / DENIED / system events appear on top); stats computed; filters: date range (calendar), user, type, deal + Reset; pagination (9/page); Export for regulator → CSV download; Verify integrity → loading + toast; empty state.
