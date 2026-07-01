# flags-outdated-triage — diagnosis + fixes for the Outdated-pass Scryfall flags

Every flagged effect/cell from `flags-outdated.md` (102 On-Rate-missing + 65 too-few) diagnosed and classified:

- **Q — query too narrow** (3): the On-Rate genuinely does the effect; query widened + Scryfall-verified → **written to Notion**.
- **C — curation bug** (87): the On-Rate does a *different* effect (mis-filed by the original auto-fill). Fix = replace with a correct card from the effect’s strict pool, or clear where no in-color card exists.
- **S — sparse/correct** (40): query is right; the color genuinely has 0–1 cards (near-unprinted variant). No change.
- **H — heterogeneous** (12): the effect lumps multiple mechanics; no single strict query captures the On-Rate without extraneous. Left as-is.

## Q — query fixes (verified, written to Notion)

| Effect | On-Rate (now matched) | Corrected query |
|---|---|---|
| [11] Forced block — Forces creatures to block | Fear of Being Hunted | `(otag:lure or o:"must be blocked if able") -o:"this turn do so" -st:funny -is:digital` |
| [17] Freeze creature — Tap, doesn't untap | Take into Custody | `o:"doesn't untap" (o:"tap target creature" or (type:creature o:tap)) -t:token -st:funny -is:digital` |
| [162] Specter Ability — Discard on combat damage | Hypnotic Specter | `o:/deals (combat )?damage to (a player\|an opponent)[,.) ][^.]*discard/ -t:token -t:emblem -st:funny -is:digital` |

## C — curation fixes

| Effect | Color | Mis-filed On-Rate | → Fix | Why mis-filed |
|---|---|---|---|---|
| [5] Gain control of target player's turn — Control their whole turn | ◇ | Arcum's Sleigh | → Mindslaver | does a different effect |
| [5] Gain control of target player's turn — Control their whole turn | 🟡 | O-Kagachi, Vengeful Kami | clear (no in-color card) | does a different effect |
| [6] Forced attack — Forces creatures to attack | 🟡 | Tattermunge Maniac | → Chemister's Trick | does a different effect |
| [16] Exiling cards from graveyard — Exile cards from graveyard | 🟡 | Treasured Find | → Beckon Apparition | does a different effect |
| [25] Drain life — Damage and gain life | 🟡 | Debt to the Deathless | → Brightflame | does a different effect |
| [25] Drain life — Damage and gain life | ⚪ | Soul's Grace | clear (no in-color card) | does a different effect |
| [31] Creature pumping — -N/-N (spells) | 🟡 | Agony Warp | → Witherbloom Command | does a different effect |
| [36] Changing lands — Change a land's type | 🟡 | Enchanted Evening | clear (no in-color card) | does a different effect |
| [37] Creature pumping — -N/-0 (Auras) | ⚫ | Weakness | → Animate Dead | does a different effect |
| [39] Team pump, ongoing — +N/+N your team | 🔵 | Soulblade Djinn | → Master of the Pearl Trident | does a different effect |
| [40] Can't block — Stops a creature blocking | ⚫ | Craven Knight | → Grixis Battlemage | does a different effect |
| [40] Can't block — Stops a creature blocking | 🔴 | Frenetic Raptor | → Renegade Tactics | does a different effect |
| [40] Can't block — Stops a creature blocking | 🟡 | Ashenmoor Gouger | → Gruul Charm | does a different effect |
| [47] Discard as a cost — Discard to pay | 🔴 | Seismic Assault | → Prophetic Ravings | does a different effect |
| [47] Discard as a cost — Discard to pay | 🟡 | Stormbind | → Nature's Blessing | does a different effect |
| [48] Creature pumping — -N/-N (creatures) | 🟡 | Merrow Grimeblotter | → Rakdos Guildmage | does a different effect |
| [49] Team pump, one-shot — +N/+N your team | ⚪ | Steadfastness | → Charge | does a different effect |
| [54] Animating artifacts — Artifact becomes a creature | 🔵 | True Polymorph | → Behind the Mask | does a different effect |
| [55] Team debuff, ongoing — -N/-N their team | 🟡 | Haunter of Nightveil | → The Flesh Is Weak | does a different effect |
| [60] Direct damage, multiple targets — Damage split across targets | 🟡 | Savage Twister | → Aurelia's Fury | does a different effect |
| [61] Mass removal — Destroy all creatures one player controls | ⚫ | Arms of Hadar | → Rain of Daggers | does a different effect |
| [61] Mass removal — Destroy all creatures one player controls | 🟡 | Biomantic Mastery | → Angrath, Minotaur Pirate | does a different effect |
| [62] Devil's Deal permanents — Opponent chooses an outcome | ⚫ | Demonic Pact | → Deliver Unto Evil | does a different effect |
| [62] Devil's Deal permanents — Opponent chooses an outcome | 🟡 | Kwain, Itinerant Meddler | → Guided Passage | does a different effect |
| [66] Team debuff, one-shot — -N/-0 their team | 🟡 | Unnerving Assault | clear (no in-color card) | does a different effect |
| [67] Creature destruction — Destroy target creature, controller compensated | ⚪ | Secure the Wastes | → Harsh Annotation | does a different effect |
| [67] Creature destruction — Destroy target creature, controller compensated | 🟡 | Call of the Conclave | clear (no in-color card) | does a different effect |
| [69] Creature destruction — Destroy target creature | 🟡 | Wrecking Ball | → Terminate | does a different effect |
| [74] Creature pumping — -N/+N (creatures) | 🟡 | Korozda Gorgon | → Leering Gargoyle | does a different effect |
| [75] Banisher Priest–like effect — Temporarily exile a creature | 🟡 | Reflection Net | clear (no in-color card) | does a different effect |
| [77] Creature pumping — -N/-N (Auras) | 🟡 | Torpor Dust | clear (no in-color card) | does a different effect |
| [78] Bring back creatures that died this turn — Reanimate this turn's dead | 🟡 | Diregraf Rebirth | → Othelm, Sigardian Outcast | does a different effect |
| [85] Deal damage when blocked — Hits back when blocked | 🔵 | Slith Strider | clear (no in-color card) | does a different effect |
| [90] Creature destruction — Destroy creature with power 3+ | 🟡 | Aryel, Knight of Windgrace | → General Kudro of Drannith | does a different effect |
| [92] Cast spells from opponent's graveyard/exile — Cast from their graveyard | 🔵 | Mindbreak Trap | → Arcane Heist | does a different effect |
| [93] Bite — Your creature damages target | 🔴 | Flame Elemental | → Fall of the Hammer | does a different effect |
| [93] Bite — Your creature damages target | 🟡 | Cinder Shade | → Double Jump // Flying Kick | does a different effect |
| [94] Curiosity — Draw on combat damage | 🟡 | Locke Cole | → Unnatural Moonrise | does a different effect |
| [96] Creature sacrifice, forced, repeatable — Repeated forced sacrifice | 🟡 | Grave Studies | → The Ruinous Wrecking Crew | does a different effect |
| [101] Lure, limited — Forces creatures to block | 🟡 | Ochran Assassin | → Armed // Dangerous | does a different effect |
| [110] Meddling — Stop a named card | 🟡 | Circu, Dimir Lobotomist | → Conjurer's Ban | does a different effect |
| [112] Maro ability — Size scales with hand | 🔵 | Laquatus's Creativity | → Body of Knowledge | does a different effect |
| [112] Maro ability — Size scales with hand | 🟡 | Master the Way | → Duggan, Private Detective | does a different effect |
| [113] Moving enchantments/counters — Move auras/counters around | 🟡 | Fate Transfer | → Combine Guildmage | does a different effect |
| [114] Manipulate time — Take an extra turn | 🔵 | Time Stop | → Time Walk | does a different effect |
| [119] Lobotomy — Exile all copies | 🟡 | Lobotomy | → Unmoored Ego | does a different effect |
| [120] Lhurgoyf — Size scales with graveyard | 🟡 | Dragon Man, Reformed Robot | → Old Stickfingers | does a different effect |
| [121] Life loss as a cost — Pay life cost | ⚫ | Phyrexian Arena | → Phyrexian Reclamation | does a different effect |
| [122] Lockdown — Keep a permanent locked | 🔵 | Back to Basics | → Watery Grasp | does a different effect |
| [122] Lockdown — Keep a permanent locked | 🟡 | Spire Patrol | → Shield of the Righteous | does a different effect |
| [135] Rules Setting — Static rules change | 🟡 | Stoic Angel | → Moderation | does a different effect |
| [141] Return to Hand — Bounce to hand | ⚪ | Reprieve | → Light the Way | does a different effect |
| [141] Return to Hand — Bounce to hand | 🟢 | Pulse of Murasa | → Seedling Charm | does a different effect |
| [143] Playing cards off top of your library, paying mana cost — Cast from library top | 🟡 | Suspend Aggression | → The Belligerent | does a different effect |
| [145] Rummaging — Discard then draw | 🟡 | Unfulfilled Desires | → Thrilling Discovery | does a different effect |
| [146] Preventing actions — Stop certain actions | 🟡 | Thundersong Trumpeter | → Render Silent | does a different effect |
| [150] Restocking — Bulk graveyard recursion | 🟢 | Dwell on the Past | → Life from the Loam | does a different effect |
| [155] Sengir Ability — Grows when creatures die | ⚫ | Sengir Bats | → Sadistic Glee | does a different effect |
| [157] Untaps itself — Untaps on its own | 🟡 | Karona, False God | → Spider Manifestation | does a different effect |
| [160] Untapping creatures — Untap your creatures | 🟡 | Gerrard's Command | → Molten Note | does a different effect |
| [161] Variable Creature — Variable power and toughness | ⚫ | Gurgling Anointer | → Maga, Traitor to Mortals | does a different effect |
| [161] Variable Creature — Variable power and toughness | 🔴 | Molten-Core Maestro | → Shivan Devastator | does a different effect |
| [161] Variable Creature — Variable power and toughness | 🟡 | Attendant of Vraska | → Hydroid Krasis | does a different effect |
| [164] Ward (for life) — Has, permanent | ⚫ | Maha, Its Feathers Night | → Zul Ashur, Lich Lord | does a different effect |
| [164] Ward (for life) — Has, permanent | 🟡 | Punk Frogs | → Amalia Benavides Aguirre | does a different effect |
| [169] Taxing — Make spells cost more | ⚪ | Ghostly Prison | → Launch the Fleet | does a different effect |
| [169] Taxing — Make spells cost more | 🟡 | Phyrexian Purge | → Dovin, Hand of Control | does a different effect |
| [172] Tapping creatures — One-shot | 🔵 | Refocus | → Blustersquall | does a different effect |
| [172] Tapping creatures — One-shot | 🟡 | Gerrard's Command | → Delirium | does a different effect |
| [173] Transformation — Become another creature | 🔵 | Gift of Tusks | → Fleeting Reflection | does a different effect |
| [179] Stalking — Conditionally can't be blocked | 🟡 | The Eleventh Doctor | → Akawalli, the Seething Tower | does a different effect |
| [180] Warlord — Team pump by count | ⚪ | Glorious Anthem | → Crusader of Odric | does a different effect |
| [180] Warlord — Team pump by count | 🟢 | Gaea's Anthem | → Scion of the Wild | does a different effect |
| [180] Warlord — Team pump by count | 🟡 | Anthem of Champions | → Burrowguard Mentor | does a different effect |
| [182] Torment ability — Recurring punishment effect | 🟡 | A-Krydle of Baldur's Gate | → Sorin, Solemn Visitor | does a different effect |
| [185] Tutor for a land — Search for a land | 🟡 | Deathsprout | → Gert and Old Lace, Runaways | does a different effect |
| [187] Super Trample — All damage to player | 🟡 | Lim-Dûl's Paladin | → Proud Wildbonder | does a different effect |
| [209] Menace — Grant, permanent | 🟡 | Spinnerette, Arachnobat | → Rogue Class | does a different effect |
| [260] Flash — Grant, permanent | 🔴 | Return the Past | clear (no in-color card) | does a different effect |
| [260] Flash — Grant, permanent | 🟡 | Iroh, Grand Lotus | clear (no in-color card) | does a different effect |
| [298] Protection from Colorless — Has, permanent | ⚪ | Giver of Runes | clear (no in-color card) | does a different effect |
| [299] Protection from Black — Remove, permanent | 🔵 | Cephalid Snitch | clear (no in-color card) | does a different effect |
| [308] Protection from Black — Grant, temporary | 🔵 | Cephalid Snitch | clear (no in-color card) | does a different effect |
| [320] Damage prevention — All combat | 🟡 | Lady Evangela | → Batwing Brume | does a different effect |
| [321] Reanimation — Any graveyard | ⚫ | Zombify | → Reanimate | does a different effect |
| [322] Discard as effect — Random | 🟡 | Drastic Revelation | → Sanity Gnawers | does a different effect |
| [326] Card draw — Off creatures/board | 🟡 | Golden Ratio | → Camaraderie | does a different effect |

## H — heterogeneous (left as-is)

- [14] Friendly to other qualities — Rewards a chosen quality (⚪, onRate Mentor of the Meek)
- [14] Friendly to other qualities — Rewards a chosen quality (🟡, onRate Volo, Guide to Monsters)
- [20] Friendly to a card type — Rewards a card type (⚪, onRate Glorious Anthem)
- [20] Friendly to a card type — Rewards a card type (🔵, onRate Chill)
- [20] Friendly to a card type — Rewards a card type (⚫, onRate Irini Sengir)
- [20] Friendly to a card type — Rewards a card type (🔴, onRate Goblin Warchief)
- [20] Friendly to a card type — Rewards a card type (🟢, onRate Khalni Hydra)
- [20] Friendly to a card type — Rewards a card type (🟡, onRate Temur Battlecrier)
- [65] Cast spells from your graveyard — Cast from your graveyard (🔵, onRate Snapcaster Mage)
- [131] Playing cards off top of opponent's library — Play opponent's cards (⚫, onRate Painful Memories)
- [131] Playing cards off top of opponent's library — Play opponent's cards (🟡, onRate Sealed Fate)
- [131] Playing cards off top of opponent's library — Play opponent's cards (🔵, onRate Tasha's Hideous Laughter)

## S — sparse/correct (no change), 40 cells

Near-unprinted variants (mostly protection/keyword-grant) where the color genuinely has 0–1 cards; the query is correct.

---

## Refinement pass (follow-up)

**Quality pass on the weakest curation replacements (8):** swapped extraneous/weak picks for cleaner representatives — [37] ⚫ Animate Dead → **Torment**; [110] 🟡 → **Meddling Mage** (iconic gold); [157] 🟡 → **Gelectrode**; [160] 🟡 Molten Note → **War Flare** (Molten Note doesn't untap creatures); [161] 🟡 Hydroid Krasis → **Nimbus Swimmer** (no +1/+1 counters); [179] 🟡 → **Deathcult Rogue**; cleared [122] 🟡 (Shield of the Righteous doesn't lock) and [185] 🟡 (no gold land-tutor). Cleared [157]'s Outdated (collided with the new On-Rate).

**Heterogeneous (H) effects resolved:**
- **[65] Cast from your graveyard** — query widened to `(o:/cast … from your graveyard/ or o:"gains flashback")`, Scryfall-verified (Snapcaster now matched) → written to Notion.
- **[20] Friendly to a card type** — was mis-filed (anti-type *hate* + a generic anthem), reclassified as curation → replaced all 6 with correct type-lords (Wizened Cenn, Battleground Geist, Mad Auntie, Kobold Taskmaster, Meng Huo, Chief of the Edge).
- **[131] Play opponent's cards** — library-manipulation that doesn't *play* the cards → replaced ⚫/🟡 with Nashi / Nathan Drake, cleared 🔵.
- **[14] Rewards a chosen quality** — replaced ⚪ with Crown of Awe (share-a-color), cleared 🟡. Genuinely vague effect; query left as-is.
