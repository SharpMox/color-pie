# Rankings linking — PILOT DONE (2026-06-22)

Proven end-to-end on 1 row:
1. Added relation column on Effects DS: `ADD COLUMN "Ranking" RELATION('86f921a5-202e-45c8-a4c2-fb8554cf0297', DUAL 'Effects' 'effects')` — DONE (back-relation "Effects" now on Rankings DB).
2. Enumeration method (CHEAPER than color-backlink crawl): `notion-search` with data_source_url=collection://86f921a5-... + the effect title → returns the ranking row URL. Works.
3. Linked Effects "Treasure creation" (385f1559c99b8113a589e08a2b08618b) -> Ranking [385f1559c99b817e8410c42113d7ab8d]. DONE.

## Next session — full run
- For each unique base article title needed (192 article effects, or just the bases the Effects rows map to), notion-search the Rankings DS → build article-title -> ranking-url map (cache to article-rank-url.json). ~190 searches (or batch via subagents).
- Populate Effects.Ranking for all ~295 rows: original->title; keyword/stageB variant->prefix before " — "; Protection variant->"Protection" (Base Keyword). Subagent apply, relation = JSON-array-of-URL string, fill-only.
- Reduce to article-only: still need to remove the 55 variant ranking rows (no MCP per-row delete) -> hand user a delete checklist OR rebuild.

## BATCH 2 DONE (2026-06-22, after reset)
- article-rank-url.json: 18 keyword/Protection bases → ranking URLs (searched, saved). Trample + Ward(mana) recovered after rate-limit/timeout.
- Linked 125 LIVE keyword+Protection variant rows → base ranking (rankup-0..3.json). 15 failed = archived/deleted Protection rows (expected, skip).
- Running total linked: 125 variants + 1 pilot (Treasure creation) = 126 Effects rows.

## REMAINING
1. Originals (~156): each → its own-title ranking. Need URLs: notion-search each original title in Rankings DS (rate-limit: keep ≤~10 searches/batch, pace). Build into article-rank-url.json, then apply.
2. Stage-B variants (~24): base = title prefix before " — " (Counterspell, Card draw, Milling, Land destruction, Direct damage single target, Reanimation, Discard as effect, Life loss as an effect, Pacifism-like, Damage prevention, Counter…). Search bases, link.
3. Reduce-to-article: remove the 55 variant ranking rows (no MCP per-row delete) → user deletes via UI checklist, or rebuild.
NOTE: notion-search rate-limits ~after 5-6 rapid calls → pace/batch search calls.
