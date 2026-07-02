# Effects Rankings — abstracted to color-distribution rows (2026-07-01)

## What changed

The **Effects Rankings** Notion table used to hold **one row per effect** (192 rows),
each *named after its effect* but carrying nothing effect-specific — only a
Primary / Secondary / Tertiary → Colors distribution. A "ranking" is really just a
color P/S/T distribution, so many rows were identical distributions under different
effect names.

The table is now **one row per unique P/S/T distribution** (192 → **88 rows**), each
**titled by an abstract color-distribution shorthand** rather than an effect name.
Every effect links (via its `Ranking` relation) to the one row for its distribution.

## Naming — the shorthand (a bijection distribution ↔ string)

- Colors as letters **W U B R G** (+ **C** = Colorless).
- Within a tier: WUBRG-ordered, concatenated (co-primary Black+Red → `BR`).
- Between tiers: ` > ` (Primary > Secondary > Tertiary).
- Trailing empty tiers dropped (`W`); an interior empty tier shown as `–`.

Examples: `W`, `U > B`, `WU > BR > G` (Flying), `W > – > UBRG` (Protection), `U > – > W`.

## Migration mechanics

- Grouped the 192 live rows by `(P, S, T)` → 88 distributions with ≥1 effect
  (Fog's `G > – > W` had 0 effects → dropped, not kept as an empty row).
- Survivor per group = the row already linked to the most effects; renamed to the
  shorthand.
- Re-pointed **107 effects** off duplicate rows onto their survivor (each effect's
  `Ranking` relation set to the survivor; the dual relation syncs both sides).
- Moved the **104 leftover rows** to a Notion holding page,
  *🗑 Old duplicate rankings (safe to delete)* — the MCP can't trash database rows,
  so they're deleted manually in the UI.

Result: **88 rows, 0 empty, all 328 effects covered.** Verified lossless — every
effect's per-color tiers are byte-identical before/after (only ranking-row *names*
changed).

## Site impact (this PR)

`build-data.js` previously used the ranking relation name for **two** roles: the
per-effect tier-lookup key *and* the site's effect-group label (`e.base`, which
`index.html` uses to collapse variants under a family). With abstract ranking names
those had to be split:

- **`base` (group label)** = the effect **family** = title before `" — "`.
- **tier lookup** still keys off the `Ranking` relation (its target row title is the
  shorthand, matching `rankByEffect`).

So keyword variants still group together (`Flying — Grant/Has/Remove` → **Flying**),
decomposed variants consolidate into their family (the `Creature pumping — …` rows →
one **Creature pumping** group), and Protection splits into 11 `Protection from X`
groups. Distinct site groups: 189 → 164. Per-effect tiers unchanged.
