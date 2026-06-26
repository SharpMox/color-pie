# Cover-empty-cells + "Not printed" marker — APPLIED 2026-06-22

Goal: every non-Bend color cell (On-Rate ⚪🔵⚫🔴🟢◇🟡, Cheapest+Iconic ⚪🔵⚫🔴🟢◇) is either a card or a "Not printed" marker. (Bend cols left blank for the later bend pass.)

## Phase A — double-checked 73 ○ rows via Scryfall (retry-paced)
- **12 false-○ rows had real cards** (throttle had hidden them) → FILLED On-Rate/Cheapest/Iconic (51 cells, 19 new Example Card pages):
  First strike—Remove,temp 🔴 · Trample—Remove,temp 🟢 · Defender—Grant,temp ⚪ · Prowess—Grant,perm 🔵 ·
  Protection from White—Grant,perm (W,B,◇) · Protection from Blue—Grant,perm (W,◇) · Protection from Black—Remove perm/temp 🔵 ·
  Protection from Green—Grant,perm (W,◇) · Protection from Multicolored—Grant,perm ⚪ · Protection from (choose a color)—Grant,perm ⚪ · Color changing—Permanent (U,◇)
- 61 ○ rows confirmed genuinely cardless.

## Phase C — "Not printed" marker
- Sentinel Example Card page "Not printed" = 387f1559c99b814f95e0c8ee8c4fde8e.
- Applied to **1,870 cardless cells across 144 rows** (every non-Bend empty cell; ◇ all 3 slots, 🟡 On-Rate only). Real cards + 🚫 Not-in-Pie cells left untouched.

## Result — still-empty cells
Outside the (Bend) columns: **0 still-empty** — every On-Rate/Cheapest/Iconic cell is now a card or "Not printed".

## Caveats / not done
- 61 ○ rows trusted as cardless via the retry-fetch (525-card page cap + any residual throttle could in theory hide a card — low risk).
- The 12 newly-filled false-○ cells were NOT off-pie-tagged (🚫 Not-in-Pie) — out of scope here; revisit if wanted.
- Design Rationale "Largely unprinted…" left as-is per user.
