# Bend/Break fill — progress (2026-06-23)
## DONE
- Stage 0: renamed 6 (Bend) cols -> (Bend/Break).
- Stage 1: copied 115 existing off-pie cards (offpie-cells.json) into Bend/Break -> ~41 live rows updated (17 archived skipped). bend-copy-updates.json / bendcopy-*.json.
- Stage 2: fetched sources -> break-scryfall.json (153), break-wiki-clean.json (81; 68 overlap, 13 wiki-only).
- Report A: reportA-copied-not-in-sources.json (107 copied cards not on canonical break lists — mostly minor bends).
## TODO (Stage 3/4 — source placement)
- Classify 153 Scryfall + 13 wiki-only break cards -> effect family + color (card.colors). bend-matched-wiki.json started; need Scryfall oracle classify (reuse build-meta-v2 FAM).
- Map family -> representative Effects row(s); color = the break color -> set <color> (Bend/Break) = card (append, fill-only). Create Example Card pages for new cards.
- Report B: reportB-unmatched.json (source cards whose effect doesn't map to our effects).
