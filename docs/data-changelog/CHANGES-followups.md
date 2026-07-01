# CHANGES — post-fill follow-ups (2026-07-01)

Five clean-up passes after the Outdated / flag / 🟡 / bend-description work.

## 1. Bend/Break re-curation
The original bend/break fill counted only PRIMARY as on-pie, so many secondary/tertiary
(genuinely on-pie) cards were mis-flagged. Cleared **69 of 142** mono bend/break cells whose
color is actually on-pie (P/S/T) for the effect — 16 primary, 27 secondary, 26 tertiary —
plus their descriptions. **73 genuine off-pie bends/breaks remain.**

## 2. 🟡 gold Bend notes
Added the `🟡 MultiColor (Bends Description)` column and authored **46** notes for the gold
Bends (each a gold card whose colors are all off-pie for the effect). `fetch-notion.js` now
pulls it; `build-data.js` already emits it.

## 3. Curation-replacement refinement
Upgraded **7** flag-pass curation replacements that were correct-in-pool but obscure, to
recognizable in-pool staples: Taxing 🟡 → **Grand Arbiter Augustin IV**, Torment 🟡 → **Mogis,
God of Slaughter**, Taxing ⚪ → **Aven Interrupter** (the prior *Launch the Fleet* was
extraneous — a strive cost, not taxing), GY-exile 🟡 → **Deathrite Shaman**, Discard-cost
🔴/🟡 → **Jaxis / Chainer, Nightmare Adept**, Animate-artifact 🔵 → **Cyberdrive Awakener**.

## 4. Duplicate Example Cards — manual-delete checklist
The Example Cards DB has duplicate rows by Card name (MCP can't trash rows → delete in the UI).
The build dedups by first-occurrence, so this is cosmetic. Names with >1 row:

**3 copies:** Wall of Omens, Snapcaster Mage, Serra Angel, Pacifism, Glorious Anthem, Fog, Faithless Looting, Bolas's Citadel
**2 copies:** Windfall, Vampiric Tutor, Tome Scour, Time Ebb, The Balrog Durin's Bane, Tarmogoyf, Take into Custody, Sun Titan, Stone Rain, Spreading Seas, Soul Warden, Sonorous Howlbonder, Snakeskin Veil, Simic Charm, Sevinne's Reclamation, Serra Zealot, Rule of Law, Rhino's Rampage, Reprisal, Reanimate, Ravenous Squirrel, Psychic Drain, Prey Upon, Platinum Angel, Phantasmal Image, Nemesis Mask, Mystical Tutor, Mystic Retrieval, Mother of Runes, Monastery Swiftspear, Mind Rot, Midnight Reaper, Lure, Lightning Bolt, Light Up the Stage, Krenko Mob Boss, Invisible Stalker, Imperial Seal, Icatian Javelineers, Green Ward, Gray Merchant of Asphodel, Goblin War Drums, Goblin Bushwhacker, Gladecover Scout, Gelectrode, Fortified Rampart, Expressive Iteration, Ethereal Armor, Enlightened Tutor, Dragon Fodder, Disenchant, Diabolic Edict, Dark Ritual, Curse of the Nightly Hunt, Counterspell, Charging Badger, Chaplain's Blessing, Carapace, Burning Inquiry, Blustersquall, Banisher Priest, Baneslayer Angel, Balmor Battlemage Captain, Aven Skirmisher, Avacyn Angel of Hope, Auramancer, Argivian Find, Abyssal Persecutor

## 5. Doc hygiene
Correction notes appended to CHANGES-outdated.md and CHANGES-originals.md.
