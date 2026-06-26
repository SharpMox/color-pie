# Research Pass — Variant example cards + Rankings (CHANGES, for single review)

Filling empty `Grant` / `Remove` variant rows + Protection rows with On-Rate example cards (**Purity → Type(Sorcery>Instant>noncreature-perm>creature) → lowest CMC, strictly mono**) and assigning per-variant color Rankings. Source: Scryfall (main-agent searched). **NOTHING APPLIED YET.**

Legend: `(cmc)` · **bare** = does only the effect · *(rider)* = best available, not bare · ⚠ = flagged for your call.

---
## BATCH 1 — Keyword GRANT variants

| Keyword | Variant | ⚪ | 🔵 | ⚫ | 🔴 | 🟢 | ◇ |
|---|---|---|---|---|---|---|---|
| Flying | Grant, perm | Angelic Gift (2)*+draw* | **Flight (1)** | — | — | — | — |
| Flying | Grant, temp | Acrobatic Leap (1)*rider* | **Jump (1)** | — | — | — | — |
| First strike | Grant, perm | **Lance (1)** | — | — | **Reflexes (1)** | — | — |
| First strike | Grant, temp | Hope Charm (1)*modal* | — | — | Coming In Hot (1)*+scry* | — | — |
| Double strike | Grant, perm | **Battle Mastery (3)** | — | — | — | — | — |
| Double strike | Grant, temp | Dual-Sun Technique (2) | — | — | **Assault Strobe (1)** | — | — |
| Deathtouch | Grant, perm | — | — | Aspect of Gorgon (3)*+1/3* | — | — | — |
| Deathtouch | Grant, temp | — | — | Coat with Venom (1)*+1/2* | — | ⚠creature only | — |
| Lifelink | Grant, perm | **Lifelink (1)** | — | Eternal Thirst (2)*rider* | — | — | — |
| Lifelink | Grant, temp | Mortal's Ardor (1)*+1/1* | — | Vampire's Bite (1)*kick* | — | — | — |
| Trample | Grant, perm | — | — | — | Mob Mentality (1) | **Primal Frenzy (1)** | — |
| Trample | Grant, temp | — | — | — | Rush of Adrenaline (1)*+2/1* | Charge Through (1)*+draw* | — |
| Vigilance | Grant, perm | **Vigilance (1)** | — | — | — | Stamina (3)*+regen* | — |
| Vigilance | Grant, temp | Homestead Courage (1)*+ctr* | — | — | — | — | — |
| Menace | Grant, perm | — | — | Alien Symbiosis (2)*+1/1* | **Imposing Visage (1)** | — | — |
| Menace | Grant, temp | — | — | — | ⚠creature only | — | — |
| Reach | Grant, perm | — | — | — | — | **Whip Silk (1)** | — |
| Reach | Grant, temp | — | — | — | — | High Stride (1)*+1/3* | — |
| Haste | Grant, perm | — | — | — | Mark of Fury (1)*rider* | Instill Energy (1)*as-though* | — |
| Haste | Grant, temp | — | — | — | Expedite (1)*+draw* | — | — |
| Hexproof | Grant, perm | Brilliant Wings (2)*+fly* | Fae Flight (2)*flash* | — | — | Alpha Authority (2)*rider* | — |
| Hexproof | Grant, temp | — | Dive Down (1)*+0/3* | — | — | Ranger's Guile (1)*+1/1* | — |
| Indestructible | Grant, perm | Shielded by Faith (3) | — | — | — | — | — |
| Indestructible | Grant, temp | Built to Last (1)*+2/2* | — | — | — | **Withstand Death (1)** | — |
| Defender | Grant, perm | **Guard Duty (1)** | Stasis Field (2)*0/2* | — | — | — | — |

**Empty/○ (no clean non-creature card):** Prowess Grant (all), Flash Grant (all — granted only by non-aura effects like Leyline of Anticipation, gold/colorless), Ward(mana/life) Grant (only stat-auras w/ ward{N}), Menace/Deathtouch Grant-temp green.

---
## BATCH 2 — Keyword REMOVE variants

| Keyword | Variant | ⚪ | 🔵 | ⚫ | 🔴 | 🟢 | ◇ |
|---|---|---|---|---|---|---|---|
| Flying | Remove, perm | Sky Tether (1)*+def* | Tightening Coils (2)*-6/0* | — | Earthbind (1)*cond* | **Grounded (2)** | — |
| Flying | Remove, temp | — | — | — | Vertigo (1)*+2dmg* | **Canopy Claws (1)** | — |
| Hexproof | Remove, perm | — | — | — | — | — | — *(none mono-permanent)* |
| Hexproof | Remove, temp | — | — | — | — | Bonds of Mortality (2) | **Arcane Lighthouse (0)** |
| Indestructible | Remove, perm | — | — | — | — | — | — |
| Indestructible | Remove, temp | Spectacular Pileup (5) | — | — | **Smite the Deathless (2)** | — | — |
| Defender | Remove, perm | **Animate Wall (1)** | — | — | — | Assault Formation (2) | — |
| Defender | Remove, temp | ⚠self-only | — | — | — | ⚠self-only | — |

Note: Defender-Remove "can attack as though it didn't have defender" — the cleanest *external* granters are Animate Wall (W aura) + Assault Formation (G); most other hits are creatures self-enabling (filed ⚠self-only, recommend leave empty).

---
## BATCH 3 — PROTECTION (Has, permanent — best card OF each color WITH protection from X)

| Protection From | ⚪ | 🔵 | ⚫ | 🔴 | 🟢 |
|---|---|---|---|---|---|
| White | Voice of Truth (4)*+fly* | — | **Knight of Infamy (2)** | **Unchained Berserker (2)** | — |
| Blue | Voice of Reason (4)*+fly* | — | — | Guma (3) | **Karoo Meerkat (2)** |
| Black | **Death Speakers (1)** | — | Cemetery Gate (3)*+def* | — | Whirling Dervish (2)*rider* |
| Red | Repentant Blacksmith (2) | Oraxid (4) | Phyrexian Crusader (3)*+w,inf* | Vulshok Refugee (3) | — |
| Green | Spectral Lynx (2)*+regen* | Coast Watcher (2)*+fly* | **Blightbeetle (2)** | — | — |
| Everything | — | — | — | — | **Hexdrinker (1)** |
| Artifacts | Angelic Curator (2)*+fly* | — | — | — | **Nacatl Savage (2)** |
| **Choose a color** (NEW from-value) | Gods Willing (1) *[Grant,temp]* | — | — | — | — | Sejiri Steppe (0) *[Grant,temp]* |
| Multicolored / Monocolored / Colorless | — | — | — | — | — *(no mono cards; ○)* |

**Protection — Grant/Remove rows:** mostly sparse. Cleanest finds: `Protection from Artifacts — Grant, temp` 🟢 **Tel-Jilad Defiance (2, bare instant)**.
**RESOLVED — choose-a-color spells:** add a new `Protection From` option **"Choose a color"** with the standard 5-variant rows; fill `Grant, temporary` ⚪ **Gods Willing (1)** + ◇ **Sejiri Steppe (0)**; Grant-perm / Has / Remove stay ○ (no bare mono cards). This adds 5 rows → Protection becomes 55, grand total **140 variant rows**.
**Protection-Remove rows:** essentially none mono → leave ○.
**RESOLVED — rider cells:** accept the best available card even with a small rider (per your choice).
**Defender-Remove, temporary:** defaulting to empty (○) — only self-enabling creatures exist, no clean external granter. (Say the word to fill with self-enablers instead.)

---
## BATCH 4 — Per-variant Rankings (Primary / Secondary / Tertiary colors)

| Variant group | Primary | Secondary | Tertiary |
|---|---|---|---|
| Flying — Grant | 🔵 | ⚪ | ⚫ |
| Flying — Remove | 🟢 | 🔴 | 🔵 |
| First strike — Grant | 🔴 | ⚪ | 🟢 |
| Double strike — Grant | 🔴 | ⚪ | — |
| Deathtouch — Grant | ⚫ | 🟢 | — |
| Lifelink — Grant | ⚪ | ⚫ | 🟢 |
| Trample — Grant | 🟢 | 🔴 | ⚪ |
| Vigilance — Grant | ⚪ | 🟢 | — |
| Menace — Grant | 🔴 | ⚫ | 🟢 |
| Reach — Grant | 🟢 | — | — |
| Haste — Grant | 🔴 | 🟢 | ⚫ |
| Hexproof — Grant | 🟢 | 🔵 | ⚪ |
| Hexproof — Remove | ◇ | 🟢 | — |
| Indestructible — Grant | ⚪ | 🟢 | 🔴 |
| Indestructible — Remove | 🔴 | ⚪ | — |
| Defender — Grant | ⚪ | 🔵 | ⚫ |
| Defender — Remove | 🟢 | ⚪ | — |
| Protection from White (Has) | ⚫ | 🔴 | — |
| Protection from Blue (Has) | 🟢 | 🔴 | — |
| Protection from Black (Has) | ⚪ | 🟢 | — |
| Protection from Red (Has) | ⚪ | 🔵 | — |
| Protection from Green (Has) | ⚫ | ⚪ | 🔵 |

(Has-permanent rows for the 17 keywords keep the original Rankings already migrated; only the new variants need rankings above.)

---
## Summary
- **~30 Grant cells**, **~10 Remove cells**, **~16 Protection Has cells**, **22 variant Rankings** proposed.
- **Deliberately empty (○):** Prowess/Flash/Ward grants, most Remove-perm, Protection Multi/Mono/Colorless, Protection-Remove.
- ⚠ items needing your call: Defender-Remove self-only cells, Protection "choose-a-color" grant spells, several *(rider)*-only cells (accept rider vs leave bare-empty).
