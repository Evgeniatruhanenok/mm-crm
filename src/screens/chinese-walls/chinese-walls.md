# Chinese Walls

- **Figma:** Screen/ChineseWalls `65:1134`
- **Route:** `/compliance/chinese-walls`
- **Base components:** Badge (count / zone active on `background-success-light` / deals outline), Button, Card (sm), Avatar, Separator, MemberRow ×8
- **Shared shell:** `_shared/AppShell` (Compliance expanded, Chinese Walls active)
- **Local blocks:** `parts/ZoneCard`, `parts/MemberChip` — **candidates for the base** (ZoneCard = Card+Badge+Avatar per CONTRACT map)
- **Live (wire):** Create / Edit zone (unique name, ≥1 deal); add member via dialog or drag from the Employees panel; conflict of interest (already in another zone) → denied + DENIED in Audit Log; remove member; Deactivate (confirm, members released) / Activate; counters and “Last change” update; empty state.
