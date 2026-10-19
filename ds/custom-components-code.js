/**
 * M&A CRM Custom Components — Figma Plugin API
 * Target file: IZ9VWVLPFWbKoBbxU8hjgH (shadcn-ui copy)
 * Target page: ↳ M&A Custom Components (will be created)
 *
 * Запуск: вставить в use_figma с fileKey=IZ9VWVLPFWbKoBbxU8hjgH
 * После выполнения: записать Node IDs из return в ds/components.md
 *
 * Компоненты:
 *   StageBadge     — 5 вариантов (stage)
 *   KanbanCard     — 5 вариантов (stage)
 *   ActivityFeedItem — 5 вариантов (type)
 *   StatsMetric    — 2 варианта (variant)
 *   MemberRow      — 2 варианта (state)
 */

await figma.loadFontAsync({family:'Inter',style:'Regular'});
await figma.loadFontAsync({family:'Inter',style:'Medium'});
await figma.loadFontAsync({family:'Inter',style:'Bold'});

// ── Primitive helpers ───────────────────────────────────────────────────────
const W  = {r:1,g:1,b:1};
const DARK = {r:.102,g:.102,b:.102};   // Zinc/950 ≈ #09090B  → Foreground/default
const MID  = {r:.443,g:.443,b:.478};   // Zinc/500 ≈ #71717A  → Foreground/muted
const DIM  = {r:.557,g:.557,b:.592};   // lighter muted
const BD   = {r:.894,g:.894,b:.906};   // Zinc/200 ≈ #E4E4E7  → Border/default
const BGS  = {r:.957,g:.957,b:.961};   // Zinc/100 ≈ #F4F4F5  → Background/Secondary

const solid = c => [{type:'SOLID', color:c}];

const mkT = (s, st, sz, c) => {
  const n = figma.createText();
  n.fontName = {family:'Inter', style: st||'Regular'};
  n.fontSize = sz||14;
  n.fills = solid(c||DARK);
  n.characters = s;
  return n;
};

const mkFR = (gap) => {
  const f = figma.createFrame();
  f.layoutMode = 'HORIZONTAL'; f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO';
  f.itemSpacing = gap||4; f.fills = [];
  return f;
};

const mkFV = (gap) => {
  const f = figma.createFrame();
  f.layoutMode = 'VERTICAL'; f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO';
  f.itemSpacing = gap||4; f.fills = [];
  return f;
};

// Stage colors (bg/text for each pipeline stage)
const STAGES = [
  {nm:'Prospecting',     bg:{r:.957,g:.957,b:.961}, tc:{r:.322,g:.322,b:.357}},  // Zinc
  {nm:'NDA Signed',      bg:{r:.820,g:.980,b:.898}, tc:{r:.016,g:.471,b:.341}},  // Emerald
  {nm:'Due Diligence',   bg:{r:.859,g:.918,b:.996}, tc:{r:.114,g:.306,b:.847}},  // Blue
  {nm:'LOI / Term Sheet',bg:{r:.929,g:.914,b:.996}, tc:{r:.427,g:.157,b:.851}},  // Violet
  {nm:'Closing',         bg:{r:.996,g:.953,b:.780}, tc:{r:.706,g:.325,b:.035}},  // Amber
];

// Activity type icons & colors
const ACT_TYPES = [
  {nm:'Email In',  icon:'↓', bg:{r:.859,g:.918,b:.996}, tc:{r:.114,g:.306,b:.847}},  // Blue
  {nm:'Email Out', icon:'↑', bg:{r:.957,g:.957,b:.961}, tc:{r:.322,g:.322,b:.357}},  // Zinc
  {nm:'Meeting',   icon:'◉', bg:{r:.820,g:.980,b:.898}, tc:{r:.016,g:.471,b:.341}},  // Emerald
  {nm:'NDA',       icon:'✓', bg:{r:.820,g:.980,b:.898}, tc:{r:.016,g:.471,b:.341}},  // Emerald
  {nm:'Note',      icon:'✎', bg:{r:.996,g:.985,b:.761}, tc:{r:.706,g:.325,b:.035}},  // Amber
];

// ── Create page ─────────────────────────────────────────────────────────────
const pg = figma.createPage();
pg.name = '↳ M&A Custom Components';
await figma.setCurrentPageAsync(pg);

// ════════════════════════════════════════════════════════════════════════════
// 1. StageBadge — 5 variants
// ════════════════════════════════════════════════════════════════════════════
const bvars = [];
STAGES.forEach((s, i) => {
  const v = figma.createComponent();
  v.name = `stage=${s.nm}`;
  v.layoutMode = 'HORIZONTAL'; v.primaryAxisSizingMode = 'AUTO'; v.counterAxisSizingMode = 'AUTO';
  v.paddingLeft = 8; v.paddingRight = 8; v.paddingTop = 3; v.paddingBottom = 3;
  v.cornerRadius = 4; v.fills = solid(s.bg);
  v.x = i * 180; v.y = 0;
  v.appendChild(mkT(s.nm, 'Medium', 12, s.tc));
  bvars.push(v);
});
const bSet = figma.combineAsVariants(bvars, pg);
bSet.name = 'StageBadge';
bSet.description = 'Бейдж стадии сделки. Варианты: Prospecting | NDA Signed | Due Diligence | LOI / Term Sheet | Closing.';
bSet.x = 40; bSet.y = 40;

// ════════════════════════════════════════════════════════════════════════════
// 2. KanbanCard — 5 variants (one per stage)
// ════════════════════════════════════════════════════════════════════════════
const cvars = [];
STAGES.forEach((s, i) => {
  const v = figma.createComponent();
  v.name = `stage=${s.nm}`;
  v.layoutMode = 'VERTICAL';
  v.resize(196, 100);
  v.primaryAxisSizingMode = 'AUTO';
  v.counterAxisSizingMode = 'FIXED';
  v.paddingLeft = 12; v.paddingRight = 12; v.paddingTop = 12; v.paddingBottom = 12;
  v.itemSpacing = 4; v.cornerRadius = 8; v.fills = solid(W);
  v.strokes = solid(BD); v.strokeAlign = 'INSIDE'; v.strokeWeight = 1;
  v.x = i * 220; v.y = 0;

  // Deal name
  const nt = mkT('Название сделки', 'Medium', 13, DARK);
  nt.textAutoResize = 'HEIGHT'; nt.resize(172, 16);
  v.appendChild(nt);

  // Type · Team row
  const tr = mkFR(4);
  tr.appendChild(mkT('Buy-side', 'Regular', 11, MID));
  tr.appendChild(mkT('·', 'Regular', 11, MID));
  tr.appendChild(mkT('Команда А', 'Regular', 11, MID));
  v.appendChild(tr);

  // Date
  v.appendChild(mkT('14 июня 2026', 'Regular', 11, DIM));

  // Stage badge (inline frame — avoids instance recursion)
  const sf = figma.createFrame();
  sf.layoutMode = 'HORIZONTAL'; sf.primaryAxisSizingMode = 'AUTO'; sf.counterAxisSizingMode = 'AUTO';
  sf.paddingLeft = 6; sf.paddingRight = 6; sf.paddingTop = 2; sf.paddingBottom = 2;
  sf.cornerRadius = 4; sf.fills = solid(s.bg);
  sf.appendChild(mkT(s.nm, 'Medium', 10, s.tc));
  v.appendChild(sf);

  cvars.push(v);
});
const cSet = figma.combineAsVariants(cvars, pg);
cSet.name = 'KanbanCard';
cSet.description = 'Карточка сделки Kanban Pipeline. stage задаёт цвет бейджа. dealName / dealType / team / date — редактируются в инстансе. Ширина фиксирована 196px.';
cSet.x = 40; cSet.y = 250;

// ════════════════════════════════════════════════════════════════════════════
// 3. ActivityFeedItem — 5 variants (type)
// ════════════════════════════════════════════════════════════════════════════
const avars = [];
ACT_TYPES.forEach((t, i) => {
  const v = figma.createComponent();
  v.name = `type=${t.nm}`;
  v.layoutMode = 'HORIZONTAL';
  v.resize(760, 72);
  v.primaryAxisSizingMode = 'FIXED';
  v.counterAxisSizingMode = 'AUTO';
  v.paddingLeft = 24; v.paddingRight = 24; v.paddingTop = 16; v.paddingBottom = 16;
  v.itemSpacing = 12; v.fills = solid(W);
  v.strokeBottomWeight = 1; v.strokeTopWeight = 0; v.strokeLeftWeight = 0; v.strokeRightWeight = 0;
  v.strokes = solid(BD); v.strokeAlign = 'INSIDE';
  v.x = 0; v.y = i * 80;

  // Type badge (circle 32×32)
  const badge = figma.createFrame();
  badge.resize(32, 32); badge.cornerRadius = 400; badge.fills = solid(t.bg);
  badge.layoutMode = 'HORIZONTAL'; badge.primaryAxisSizingMode = 'FIXED'; badge.counterAxisSizingMode = 'FIXED';
  badge.primaryAxisAlignItems = 'CENTER'; badge.counterAxisAlignItems = 'CENTER';
  badge.appendChild(mkT(t.icon, 'Medium', 13, t.tc));
  v.appendChild(badge);

  // Content column
  const col = mkFV(2);
  col.counterAxisSizingMode = 'FIXED';

  const subjectT = mkT(`${t.nm} — Тема письма или описание`, 'Medium', 13, DARK);
  subjectT.textAutoResize = 'HEIGHT'; subjectT.resize(650, 16);
  col.appendChild(subjectT);

  const metaT = mkT('Мария Волкова · 14 июня 2026, 14:22', 'Regular', 11, MID);
  metaT.textAutoResize = 'HEIGHT'; metaT.resize(650, 14);
  col.appendChild(metaT);

  v.appendChild(col);
  avars.push(v);
});
const aSet = figma.combineAsVariants(avars, pg);
aSet.name = 'ActivityFeedItem';
aSet.description = 'Строка ленты активности на карточке сделки. Варианты по типу события: Email In | Email Out | Meeting | NDA | Note. Текстовые поля редактируются в инстансе.';
aSet.x = 40; aSet.y = 700;

// ════════════════════════════════════════════════════════════════════════════
// 4. StatsMetric — 2 variants
// ════════════════════════════════════════════════════════════════════════════
const METRIC_VARIANTS = [
  {nm:'default',     bg:BGS, vc:DARK, lc:MID},
  {nm:'highlighted', bg:{r:.996,g:.953,b:.780}, vc:{r:.706,g:.325,b:.035}, lc:{r:.706,g:.325,b:.035}},
];
const mvars = [];
METRIC_VARIANTS.forEach((m, i) => {
  const v = figma.createComponent();
  v.name = `variant=${m.nm}`;
  v.layoutMode = 'VERTICAL';
  v.resize(220, 64);
  v.primaryAxisSizingMode = 'FIXED';
  v.counterAxisSizingMode = 'FIXED';
  v.primaryAxisAlignItems = 'CENTER';
  v.paddingLeft = 16; v.paddingRight = 16; v.paddingTop = 12; v.paddingBottom = 12;
  v.itemSpacing = 2; v.cornerRadius = 8; v.fills = solid(m.bg);
  v.x = i * 260; v.y = 0;

  v.appendChild(mkT('1 247', 'Bold', 18, m.vc));
  v.appendChild(mkT('Всего записей', 'Regular', 11, m.lc));
  mvars.push(v);
});
const mSet = figma.combineAsVariants(mvars, pg);
mSet.name = 'StatsMetric';
mSet.description = 'Метрика в StatsBar (AuditLog, Dashboard). variant=default — серый фон; variant=highlighted — жёлтый (для аномалий). value и label редактируются в инстансе.';
mSet.x = 40; mSet.y = 1230;

// ════════════════════════════════════════════════════════════════════════════
// 5. MemberRow — 2 variants
// ════════════════════════════════════════════════════════════════════════════
const MEMBER_VARIANTS = [
  {nm:'default', showZone:false},
  {nm:'in-zone', showZone:true},
];
const rvars = [];
MEMBER_VARIANTS.forEach((m, i) => {
  const v = figma.createComponent();
  v.name = `state=${m.nm}`;
  v.layoutMode = 'HORIZONTAL';
  v.resize(400, 48);
  v.primaryAxisSizingMode = 'FIXED';
  v.counterAxisSizingMode = 'AUTO';
  v.paddingLeft = 0; v.paddingRight = 0; v.paddingTop = 8; v.paddingBottom = 8;
  v.itemSpacing = 12; v.fills = [];
  v.x = i * 440; v.y = 0;

  // Avatar (32×32 circle)
  const av = figma.createFrame();
  av.resize(32, 32); av.cornerRadius = 400;
  av.fills = solid({r:.859,g:.918,b:.996});
  av.layoutMode = 'HORIZONTAL'; av.primaryAxisSizingMode = 'FIXED'; av.counterAxisSizingMode = 'FIXED';
  av.primaryAxisAlignItems = 'CENTER'; av.counterAxisAlignItems = 'CENTER';
  av.appendChild(mkT('МВ', 'Medium', 11, {r:.114,g:.306,b:.847}));
  v.appendChild(av);

  // Name + Role column
  const col = mkFV(2);
  col.appendChild(mkT('Мария Волкова', 'Medium', 13, DARK));
  col.appendChild(mkT('VP · Команда А', 'Regular', 11, MID));
  v.appendChild(col);

  // Zone chip (only for in-zone variant)
  if (m.showZone) {
    const zf = figma.createFrame();
    zf.layoutMode = 'HORIZONTAL'; zf.primaryAxisSizingMode = 'AUTO'; zf.counterAxisSizingMode = 'AUTO';
    zf.paddingLeft = 8; zf.paddingRight = 8; zf.paddingTop = 3; zf.paddingBottom = 3;
    zf.cornerRadius = 400; zf.fills = solid({r:.820,g:.980,b:.898});
    zf.appendChild(mkT('Зона А', 'Medium', 11, {r:.016,g:.471,b:.341}));
    v.appendChild(zf);
  }

  rvars.push(v);
});
const rSet = figma.combineAsVariants(rvars, pg);
rSet.name = 'MemberRow';
rSet.description = 'Строка участника в зоне Chinese Wall. state=default — просто участник; state=in-zone — показывает чип с названием зоны. initials / name / role / zone редактируются в инстансе.';
rSet.x = 40; rSet.y = 1370;

// ── Screenshots & return ────────────────────────────────────────────────────
const imgB = await bSet.screenshot();
const imgC = await cSet.screenshot();
const imgA = await aSet.screenshot();
const imgM = await mSet.screenshot();
const imgR = await rSet.screenshot();

return {
  pageId:   pg.id,
  components: {
    StageBadge:       {id: bSet.id, variants: 5},
    KanbanCard:       {id: cSet.id, variants: 5},
    ActivityFeedItem: {id: aSet.id, variants: 5},
    StatsMetric:      {id: mSet.id, variants: 2},
    MemberRow:        {id: rSet.id, variants: 2},
  },
  screenshots: {badge: imgB, card: imgC, activity: imgA, metric: imgM, member: imgR},
};
