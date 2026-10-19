# Deal Card

- **Figma:** Screen/DealCard `65:706`
- **Route:** `/deals/logistikpro`
- **Base components:** Breadcrumb, StageBadge, Button (outline ×3, ghost), Tabs, Select ×3, ActivityFeedItem ×5 (with preview)
- **Shared shell:** `_shared/AppShell`
- **Local blocks:** `parts/MetaItem` (Label: value pair)
- **Route pattern:** `/deals/:dealId` (tile links to logistikpro); unknown id → “Deal not found”.
- **Live (wire):** Edit (form dialog), Share → NDA hard-block dialog + BLOCKED in Audit Log (Request NDA) or link copied; Archive (confirm → Closed, Undo) / Restore; “NDA not signed” alert with Request NDA / Mark as signed; activity filters (type, participant, period), Load more, Outlook sync (every 2nd attempt fails → Retry); Documents / Buyer List empty states.
