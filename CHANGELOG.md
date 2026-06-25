# Changelog

History of the Color Pie project. Detailed per-area notes from the data build are
preserved under [`docs/data-changelog/`](docs/data-changelog/) (rescued from the old
`color-pie-work/` scratch folder before it was deleted — the one-off build scripts and
intermediate JSON there were disposable; the final data lives in `data/colorpie.js` and
Notion).

## v2 — Review system

A per-effect feedback + moderation system on the static GitHub Pages site, backed by
Firebase Firestore (no server, no reviewer auth). Firestore project
`color-pie-review-20904`; rules in `firestore.rules`, data layer in `assets/feedback.js`.

- **`review.html?id=<effectId>`** — one effect's full data with the 6 colors on a single
  scrollable row; a sticky-footer feedback form with four free-text fields (color tiers,
  card examples, too-broad/duplicate, other metadata; ≥1 required) + optional name
  (remembered via localStorage); a right-side drawer listing submitted feedback grouped
  Accepted → To review → Rejected, with colored edges and ✓/✕/● status pills. Hover a card
  for a floating large preview.
- **`index.html`** — a Review column in the effect list and a Review button in the detail
  modal, each showing `Review (N)` and turning green when the effect has ≥1 accepted
  feedback (group pill green only if every variant does). Collapsed groups show a greyed
  summed-count pill that expands on click. Detail modal has zebra-striped color rows and a
  hover preview.
- **`admin.html`** — Google sign-in (owner-email-locked) moderation queue, pending-first,
  with Accept/Reject + reply; colored status signaling and disabled already-applied action.
- **`scripts/build-data.js`** emits each effect's Notion `Index` as a stable `id`.

## Data build (2026-06-22 → 2026-06-23)

Filling and structuring the Effects data in Notion, then generating `data/colorpie.js`.
Full notes in [`docs/data-changelog/`](docs/data-changelog/):

- **Metadata** — Card Types, Category, Rationale, Base Keyword / Duration / Interaction,
  select-vocabulary expansion. See `CHANGES-metadata.md`, `CHANGES-meta.md`, `CHANGES-meta-v2.md`.
- **Color columns** — On-Rate / Cheapest / Iconic example cards per color, plus Bend/Break.
  See `CHANGES-colors.md`, `CHANGES-bend.md`, `bend-progress.md`.
- **Originals & coverage** — card-check fills and "Not printed" / "Not in Pie" markers on
  leftover originals. See `CHANGES-originals.md`, `CHANGES-notprinted.md`.
- **Example-card optimization** — picking the best example per effect×color (Purity → Type →
  CMC). See `CHANGES.md`.
- **Archetypes** — Cheapest / Iconic column picks. See `CHANGES-archetypes.md`,
  `CHANGES-archetypes.final.md`.
- **Rankings** — linking effects to their ranking rows. See `CHANGES-rankings.md`,
  `rankings-pilot.md`.
- **Effect splitting** — Stage A (creature-keyword variants) and Stage B (decomposing
  non-keyword effects). See `SPLIT-PROPOSAL.md`, `STAGE-B-AUDIT.md`, `STAGE-B-DECOMP.md`.
- **Research & cleanup** — variant example cards, orphaned example pages. See
  `CHANGES-research.md`, `ORPHANS.md`.

## v1

Initial Color Pie Explorer (`index.html`) — effects-by-color table with filtering.
