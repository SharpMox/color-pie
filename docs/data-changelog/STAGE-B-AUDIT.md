# Stage B — Split/No-split audit of the 173 non-keyword effects + Scry

Light pass: which remaining effects are still **monolithic** and would benefit from splitting, and along what axis. NOT a full decomposition — candidates for you to pick which to deepen (à la Stage A). Most effects are already atomic or already split by the catalog author.

## A. Strong SPLIT candidates (monolithic, clear color-pie-relevant axis)

| Effect | Suggested axis | Why it matters (color pie differs) |
|---|---|---|
| **Counterspell** | hardness: Hard / "counter unless pay" / counter-a-type | Hard counter = mono-U; "unless pay" softer = U; counter-creature-only bleeds to other colors |
| **Card draw** | mechanism: Pure draw / Draw-with-life / Draw-off-creatures(engine) | U pure; B pays life; G draws off board — genuinely different colors |
| **Milling** | target: Self-mill / Opponent-mill | self-mill = U/B/G enabler; opponent-mill = U wincon — different pies |
| **Land destruction** | scope: Single-target / Mass (Armageddon) | single LD = R/G/B; mass LD = R/W historically — distinct |
| **Tapping creatures** | duration: One-shot tap / Ongoing tap-down (Icy) | tap-to-attack (R/W) vs lockdown (U/W) differ |
| **Direct damage, single target** | legality: Any target / Creature-only (pinger) | burn-to-face = R only; ping-creature bleeds to U/W/G |
| **Color changing** | duration: Temporary / Permanent | matches the perm/temp axis we used for keywords |
| **Life gain** | shape: Incidental one-shot / Lifegain payoff/engine | one-shot = W/G; engine/payoff = W/B |
| **Token generation** | cadence: One-shot / Ongoing (token engine) | one-shot spell vs repeatable maker land differently |
| **Life loss as an effect** | scope: Single target / Each opponent (group drain) | targeted = B; symmetric/group = B/R |
| **Discard as effect** | mode: Targeted (choose) / Random / Each player | chosen = B; random = B/R; symmetric = B |

## B. Weaker SPLIT candidates (defensible but optional)

| Effect | Axis |
|---|---|
| Reanimation | source zone: your GY / any GY |
| Pacifism-like effect | can't-attack-or-block / can't-attack only |
| Damage prevention | targeted / all-damage (vs Fog, which is already separate) |
| Token generation | by token kind (creature / Treasure / Food / Clue) — broad, maybe over-split |
| Fight | symmetric Fight / one-sided "bite" (note: "Bite" #153 already exists → maybe MERGE not split) |

## C. KEEP — already atomic or already split (the large majority, ~150)
Examples of already-handled families (do NOT re-split):
- **Creature pumping** — already split ±N/±M × {Auras, spells, creatures, single-use}
- **Return from Graveyard to Hand** — already split by card type (land/creature/artifact/sorcery/instant/enchantment/any)
- **"Tutor"** — already split by card type
- **Mass removal / Creature destruction** — already split by condition (all / power 3+ / one player / attacking / tapped / flying / compensated…)
- **Sacrifice (forced/effect)** — already split by permanent type
- **Mana production** — already split temp/perm
- **Stealing / Copying permanents** — already split temp/perm
- Atomic singletons: Polymorph, Counter target activated/triggered ability, Looking at opponent's hand, Extra attack, Fog, Treasure creation, Spell copying, Spell redirection, Card filtering vs Looting vs Rummaging (already distinct), Time Walk, Lobotomy, etc.

## D. Scry (deferred from Stage A)
**KEEP — no split.** Scry is atomic card-selection (look at top N, reorder/bottom). No meaningful interaction/duration sub-variants. (If anything, it relates to Surveil as a sibling effect, but that's a *new row*, not a split.)

---
**Recommendation:** take **Section A** (11 effects) into a Stage-A-style decomposition next (each → its axis variants + example-card research). Section B is optional; Section C and Scry stay as-is.
