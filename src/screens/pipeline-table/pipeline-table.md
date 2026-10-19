# Pipeline — Table

- **Figma:** Screen/PipelineTable `63:970`
- **Route:** `/pipeline/table`
- **Base components:** Tabs, Select ×3, Button, Alert (warning — Smart Paste), Table (+Header/Body/Footer), Checkbox, StageBadge, Badge (NDA ✓ Signed on `background-success-light`), Pagination
- **Shared shell:** `_shared/AppShell`
- **Local blocks:** none
- **Live (wire):** same URL filters; column sort; row selection + bulk Archive (Undo) / Restore in Closed; pagination (10/page); row click → deal; Smart Paste: Ctrl+V parses TSV from Excel → preview with per-row errors (duplicate, unknown type/team, too short) → import; “Try a sample”; empty / nothing-found / loading states.
