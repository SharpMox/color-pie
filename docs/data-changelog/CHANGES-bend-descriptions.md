# CHANGES — Bend/Break per-card descriptions

Authored a one-line color-pie note for every card in the mono Bend/Break cells (142 cells, 155 card-notes), written to the `(Bends/Breaks Description)` TEXT columns as JSON `{"Card":"note"}`. The pipeline (PR #48) now emits `c.bend`/`c.breaks` as `{i:{name,desc}}` so the site renders each card with its note. Notes accurately distinguish true off-pie breaks from minor secondary bends.

| Effect | Column | Card | Note |
|---|---|---|---|
| Card draw — Pure | ⚪ White (Breaks) | Inspiring Commander | White pure card draw is limited — a bend; all colors draw, but blue and black own it |
| Card draw — Pure | ⚫ Black (Breaks) | Doctor Doom, Unrivaled | Black drawing cards is on-pie — pure card draw is a black secondary strength, only a mild bend |
| Card draw — Pure | 🔴 Red (Breaks) | Faithless Looting | Red draws via loot/impulse, not pure card advantage — on-pie style, a minor bend |
| Card draw — Pure | 🟢 Green (Breaks) | Guardian Project | Green card draw is on-pie (creature-tied) — a mild bend, shared with all colors here |
| Enchantment destruction — Destroy an enchantment | 🔴 Red (Breaks) | Active Volcano | Destroying enchantments is a break for red; that removal is white/green/black |
| Haste — Has, permanent | ⚪ White (Breaks) | Akroma, Angel of Wrath | White having haste is a break — haste belongs to red, black, and green |
| Haste — Has, permanent | 🔵 Blue (Bends) | Bonded Fetch | Blue haste is off-pie — a bend; haste belongs to black, red, and green |
| Hexproof — Has, permanent | ⚪ White (Bends) | Nine Lives | White hexproof is on-pie (secondary protection) — a mild bend at most |
| Hexproof — Has, permanent | 🔵 Blue (Breaks) | True-Name Nemesis | Blue can have hexproof secondarily — a mild bend; it's shared with white/green |
| Hexproof — Has, permanent | ⚫ Black (Bends) | Eradicator Valkyrie | Hexproof is white/blue/green's turf, so black having it is a bend |
| Flying — Has, permanent | 🔴 Red (Bends) | Bird Maiden | Red flyers exist but are secondary — a mild bend; flying is primary in white/blue |
| Flying — Has, permanent | 🔴 Red (Breaks) | Aether Membrane | Flying is on-pie for red as a secondary color — a minor bend, not a true break |
| Flying — Has, permanent | 🟢 Green (Bends) | Scryb Sprites | Green flying is a legitimate tertiary bend — limited to birds/insects/dragons, not a break |
| Flying — Has, permanent | 🟢 Green (Breaks) | Hornet Queen | Green flying is off-pie; it's white/blue/black/red's domain — a break, though insect swarms are a rare green exception |
| Flash — Has, permanent | ⚪ White (Bends) | Defender of Law | White gets flash as a shared, on-pie ability — a very mild bend at most |
| Flash — Has, permanent | ⚫ Black (Bends) | Feebleness | Flash is on-pie in every color, so black's use here is a very mild bend |
| Flash — Has, permanent | 🔴 Red (Bends) | Defender of Chaos | Flash is on-pie in every color; red having it is a mild bend, not a break |
| Gaseous Form — Negate a creature's combat | 🔴 Red (Breaks) | Glacial Crevasses | Red negating combat via fog is a break — combat prevention belongs to white and blue |
| First strike — Has, permanent | 🔵 Blue (Breaks) | Narwhal | Blue combat abilities are off-pie — first strike is a break, owned by white/black/red |
| First strike — Has, permanent | ⚫ Black (Breaks) | Ghost Hounds | Black gets first strike as a secondary color — a minor bend; it's owned by white/black/red |
| Creature pumping — -N/-0 (spells) | 🟢 Green (Breaks) | Shrink | Power-shrinking pumps (-N/-0) are blue/black; green weakening a creature this way is a break |
| Counterspell — Hard counter | ⚪ White (Breaks) | Dawn Charm | White hard counters are off-pie — a break; countering spells is blue's domain, shared with white |
| Counterspell — Hard counter | 🔵 Blue (Breaks) | Dismal Failure | Blue hard counterspells are core on-pie — this is home turf, only a mild bend |
| Counterspell — Hard counter | ⚫ Black (Breaks) | Dash Hopes | Black hard countering is off-pie — a break; countermagic is blue's, secondarily white's |
| Counterspell — Hard counter | 🔴 Red (Breaks) | Artifact Blast | Red hard-countering spells is off-pie — a break; countering is blue, secondarily white |
| Counterspell — Hard counter | 🔴 Red (Breaks) | Mages' Contest | Red counter magic is a break — permission belongs to blue and secondarily white |
| Counterspell — Hard counter | 🟢 Green (Breaks) | Avoid Fate | Hard countering belongs to blue (and white); green countering a spell is a genuine break |
| Double strike — Has, permanent | 🔵 Blue (Breaks) | Jodah's Avenger | Blue almost never gets double strike — a break; double strike is white and red |
| Can't lose / opponent can't win — Can't lose the game | 🔴 Red (Breaks) | Ali from Cairo | Red can't-lose-the-game is off-pie — a break; that safety net is white's |
| Can't lose / opponent can't win — Can't lose the game | 🔴 Red (Breaks) | Fortune Thief | Red preventing loss is a break — can't-lose effects belong to white |
| Damage redirection — Redirect damage elsewhere | 🔵 Blue (Breaks) | Silhouette | Redirecting damage is a white trick, so blue doing it is an off-pie break |
| Copying permanents, permanently — Lasting permanent copy | 🔵 Blue (Breaks) | Phyrexian Metamorph | Permanent copying is squarely on-pie for blue — no real break here |
| Mass removal — Destroy all creatures | ⚪ White (Breaks) | Abu Ja'far | Mass creature destruction is on-pie for white — not a break; it's white/black |
| Mass removal — Destroy all creatures | 🔴 Red (Breaks) | Descent of the Dragons | Red mass creature destruction is a break — board wipes belong to white and black |
| Discard as effect — Targeted | 🔵 Blue (Breaks) | Piracy Charm | Blue targeted discard is a break — hand disruption belongs to black |
| Discard as effect — Targeted | 🔵 Blue (Breaks) | Amnesia | Blue forcing discard is a break — mass and targeted discard belong to black |
| Creature destruction — Destroy target creature | ⚪ White (Breaks) | Swords to Plowshares | White exiling a creature is on-pie removal — but unconditional destruction leans black; a mild bend |
| Creature destruction — Destroy target creature | ⚪ White (Breaks) | Porphyry Nodes | White creature destruction is on-pie (conditional) — a mild bend; black owns unconditional kill |
| Creature destruction — Destroy target creature | ⚪ White (Breaks) | Saltblast | White destroying any nonwhite permanent is on-pie removal but broad — a mild bend toward black |
| Creature destruction — Destroy target creature | 🔵 Blue (Breaks) | Acid Rain | Blue destroying creatures is a break; creature destruction is white and black |
| Creature destruction — Destroy target creature | 🔴 Red (Breaks) | Reign of Chaos | Red destroying target creatures outright is off-pie — a break; creature destruction is white/black |
| Creature destruction — Destroy target creature | 🟢 Green (Breaks) | Beast Within | Green destroying any permanent outright is off-pie — a break; targeted kill is white/black |
| Creature destruction — Destroy target creature | ◇ Colorless (Breaks) | Dismember | Colorless destroy-target-creature is a break — hard creature removal is white and black |
| Card filtering — Sift through your draws | 🔴 Red (Breaks) | Orcish Librarian | Card filtering to sift your draws is blue/green; red doing it cleanly is a break |
| Card filtering — Sift through your draws | 🟢 Green (Breaks) | Stunted Growth | Card filtering is a green secondary skill, so this is a bend, not a hard break |
| Deathtouch — Has, permanent | 🟢 Green (Breaks) | Ambush Viper | Green shares deathtouch with black as a secondary color — a minor bend, not a true break |
| Defender — Has, permanent | ⚫ Black (Bends) | Monoist Sentry | Defender is on-pie in all colors; black getting it is a minor bend at most |
| Defender — Has, permanent | 🔴 Red (Bends) | Ogre Sentry | Red can have defenders but rarely wants them — a mild bend; walls are more white/blue |
| Direct damage, single target — Any target | ⚪ White (Breaks) | Icatian Javelineers | White dealing direct damage to any target is a break — damage is black/red (white hits fliers/attackers only) |
| Direct damage, single target — Any target | 🔵 Blue (Breaks) | Apprentice Sorcerer | Blue direct damage to any target is a break; burn is red, white, and black |
| Direct damage, single target — Any target | 🔵 Blue (Breaks) | Erratic Mutation | Blue dealing damage to any target is off-pie — a break; direct damage is red, white, black |
| Direct damage, single target — Any target | ⚫ Black (Breaks) | Midnight Charm | Black direct damage to any target is secondary — a mild bend; burn is primarily red/white |
| Direct damage, single target — Any target | 🔴 Red (Breaks) | Collapsing Borders | Red direct damage to any target is squarely on-pie — a minor bend at most |
| Direct damage, single target — Any target | 🟢 Green (Breaks) | Barbed Foliage | Green direct damage to any target is a break — burn is white/black/red |
| Artifact destruction — Destroy an artifact | ⚫ Black (Breaks) | Gate to Phyrexia | Black artifact destruction is off-pie — a break; that belongs to white/red/green |
| Menace — Has, permanent | 🔵 Blue (Bends) | Wind Spirit | Blue menace is off-pie — a genuine bend; menace belongs to black and red |
| Menace — Has, permanent | 🟢 Green (Bends) | Vine Kami | Menace belongs to black/red, so a green creature having it is a bend |
| Mana production, permanent — Repeatable mana source | 🔵 Blue (Breaks) | High Tide | Repeatable mana ramp is green/black (and blue rituals), but this permanent-style blue mana source stretches the pie — a break |
| Mana production, permanent — Repeatable mana source | ⚫ Black (Breaks) | Dark Ritual | Ritual mana is on-pie black burst mana — a bend, not a break |
| Mana production, permanent — Repeatable mana source | ⚫ Black (Breaks) | Priest of Yawgmoth | Black does mana as a secondary color, so this repeatable source is a mild bend |
| Looking at opponent's hand — Reveal opponent's hand | 🟢 Green (Breaks) | Revelation | Green revealing an opponent's hand is off-pie — a break; hand info is blue/black |
| Life gain — One-shot | ⚪ White (Breaks) | Inquisitor Exarch | White one-shot lifegain is fully on-pie — barely a bend; it's shared with black/green |
| Life gain — One-shot | 🔵 Blue (Breaks) | Sugar Coat | Lifegain is white/black/green's province — blue gaining life outright is a break |
| Life gain — One-shot | 🔴 Red (Breaks) | Game of Chaos | Red rarely gains life outright — a break; life gain is white/black/green |
| Indestructible — Has, permanent | 🔵 Blue (Bends) | Kefnet the Mindful | Blue indestructible is on-pie as a shared secondary — a minor bend, not a break |
| Indestructible — Has, permanent | ⚫ Black (Bends) | Phylactery Lich | Black gets indestructible as a shared secondary trait — a minor bend, not a break |
| Indestructible — Has, permanent | 🔴 Red (Bends) | Brash Taunter | Red indestructibility (via damage-defiance) is on-pie — a minor bend, not a break |
| Land destruction — Single target | 🔴 Red (Breaks) | Omen of Fire | Red land destruction is on-pie (primary) — a minor bend, not a break |
| Impulsive draw — Exile then play | 🔵 Blue (Breaks) | Three Wishes | Blue impulsive exile-then-play draw is a break; impulsive draw is uniquely red |
| Lobotomy — Exile all copies | 🔵 Blue (Breaks) | Extract | Blue exiling all copies from a deck is off-pie — a break; lobotomy effects belong to black |
| Lockdown — Keep a permanent locked | 🔵 Blue (Breaks) | Numbing Dose | Blue lockdown of a permanent is on-pie (primary) — a minor bend, not a break |
| Reach — Has, permanent | ⚪ White (Bends) | Alaborn Musketeer | Reach is a white secondary trait, so this is a minor bend, not a break |
| Reach — Has, permanent | 🔵 Blue (Bends) | Mister Fantastic, Reed Richards | Reach is off-pie for blue — a bend; reach belongs to green/white/red |
| Reach — Has, permanent | ⚫ Black (Bends) | Drider | Black reach is off-pie — a bend; reach belongs to white, red, and green |
| Reach — Has, permanent | 🔴 Red (Bends) | Roc Hunter | Red reach is a secondary ability — a minor bend; reach is mainly green, also white |
| Return to Hand — Bounce to hand | ⚪ White (Breaks) | Sun Clasp | White bounce to hand is on-pie secondarily — a mild bend, shared with blue/green |
| Return to Hand — Bounce to hand | 🔵 Blue (Breaks) | Vapor Snag | Bounce is squarely on-pie blue — this is core, not a break at all |
| Return to Hand — Bounce to hand | 🔴 Red (Breaks) | Stingscourger | Bounce to hand is blue/white/green — red doing it is an off-pie break |
| Punisher effects — Opponent picks the downside | 🟢 Green (Breaks) | Decomposition | Green punisher effects are off-pie — a break; punisher choices belong to black/red |
| Playing cards off top of your library, paying mana cost — Cast from library top | ⚫ Black (Bends) | Bolas's Citadel | Black casting off the library top is a bend; that impulsive access is white, blue, red, green |
| Preventing actions — Stop certain actions | 🔴 Red (Breaks) | Caverns of Despair | Red preventing attacks is off-pie — a break; restricting actions this way is a white ability |
| Prowess — Has, permanent | ⚪ White (Bends) | Agent of Atlas | White has prowess as a secondary spells-matter payoff — a mild bend; it's primary in blue/red |
| Treasure creation — Make Treasure tokens | ⚪ White (Breaks) | Smothering Tithe | Treasure-making is blue/black/red/green — white generating Treasure is a break |
| Treasure creation — Make Treasure tokens | 🔵 Blue (Breaks) | Ravenform | Treasure-making is on-pie for blue — not a break; Treasure spans blue/black/red/green |
| Treasure creation — Make Treasure tokens | 🔴 Red (Breaks) | Experimental Synthesizer | Red Treasure is actually on-pie (secondary) — this is a minor bend, not a break |
| Ward (for mana) — Has, permanent | ⚪ White (Bends) | Captain America, Wings of Freedom | Ward is on-pie for white as a protective color — a minor bend at most |
| Ward (for mana) — Has, permanent | ⚫ Black (Bends) | Maha, Its Feathers Night | Ward is off black's primary lanes; owned by white/blue/green, so a modest bend |
| Ward (for mana) — Has, permanent | 🔴 Red (Bends) | Hexing Squelcher | Mana-ward is off-pie for red — a bend; ward defense is white/blue/green |
| Vigilance — Has, permanent | ⚫ Black (Breaks) | Ghost Hounds | Black vigilance is a break — vigilance belongs to white, blue, and green |
| Vigilance — Has, permanent | 🔴 Red (Breaks) | Windseeker Centaur | Red rarely gets vigilance — a break; vigilance is white, blue, and green |
| Twiddle — Tap or untap | ⚫ Black (Breaks) | Rathi Trapper | Black tapping down creatures is off-pie — a break; twiddle/tap effects are blue's |
| Ward (for life) — Has, permanent | 🔵 Blue (Bends) | Lord of Change | Blue ward is a natural fit for its self-protection — a mild bend; ward skews black/red |
| Ward (for life) — Has, permanent | ⚫ Black (Bends) | Maha, Its Feathers Night | Black ward paid in life fits its life-as-resource theme — on-pie, a mild bend |
| Ward (for life) — Has, permanent | 🔴 Red (Bends) | Hexing Squelcher | Red ward is a secondary bend — ward for life sits in black and red |
| Trample — Has, permanent | ⚪ White (Bends) | Moorish Cavalry | White trample is on-pie but low — a minor bend; all colors get some trample |
| Trample — Has, permanent | 🔵 Blue (Bends) | Silver Erne | Trample is shared across all colors but rare in blue — a slight bend only |
| Taxing — Make spells cost more | 🔵 Blue (Breaks) | Aether Barrier | Blue taxing spells with upkeep costs is on-pie — a mild bend; taxing is white/blue |
| Taxing — Make spells cost more | 🔵 Blue (Breaks) | Aether Storm | Blue mass cost-taxing to stall the board is on-pie — a mild bend; taxing is white/blue |
| Taxing — Make spells cost more | 🔵 Blue (Breaks) | Energy Flux | Blue taxing artifacts is on-pie control — a mild bend; making things cost more is white/blue |
| Taxing — Make spells cost more | 🔵 Blue (Breaks) | Disruption Aura | Blue taxing an artifact's activation is on-pie — a mild bend; taxing lives in white/blue |
| Taxing — Make spells cost more | 🔵 Blue (Breaks) | Fade Away | Blue taxing permanents to punish wide boards is on-pie — a mild bend; taxing is white/blue |
| Taxing — Make spells cost more | 🔵 Blue (Breaks) | Musician | Blue taxing attackers to gate combat is on-pie — a mild bend; cost-taxing is white/blue |
| Taxing — Make spells cost more | 🔵 Blue (Breaks) | Essence Leak | Blue taxing a spell's recast is on-pie — a mild bend; making spells cost more is white/blue |
| Taxing — Make spells cost more | 🟢 Green (Breaks) | Ritual of Subdual | Green taxing spells to cost more is off-pie — a break; taxing is white/blue |
| Spell Redirection — Redirect a spell | ⚫ Black (Breaks) | Imp's Mischief | Redirecting a spell is a break for black; spell redirection is blue/red |
| Tutor for any card — Search for any card | 🔵 Blue (Breaks) | Dreamscape Artist | Blue tutoring for any card is a break; open-ended tutoring belongs to black |
| Tutor for any card — Search for any card | 🟢 Green (Breaks) | Birthing Pod | Green tutoring for any creature by cost is a bend; open-ended any-card tutoring is black's |
| Time Walk — Take an extra turn | ⚫ Black (Breaks) | Temporal Extortion | Black taking an extra turn is off-pie — a break; extra turns are blue then red |
| Time Walk — Take an extra turn | 🟢 Green (Breaks) | Seedtime | Extra turns are blue/red; green taking one is a genuine off-pie break |
| Stealing Permanents, Permanently — Take permanent control | ⚪ White (Breaks) | Debt of Loyalty | White permanently stealing a creature is a break — control theft belongs to blue and black |
| Stealing Permanents, Permanently — Take permanent control | 🔴 Red (Breaks) | Act of Aggression | Red permanent theft is a break; taking lasting control is blue and black (red only steals temporarily) |
| Haste — Grant, temporary | 🔵 Blue (Bends) | Overtaker | Granting haste is off-pie for blue — a bend; haste is red/black/green |
| Indestructible — Grant, permanent | 🔵 Blue (Bends) | Myojin of Seeing Winds | Granting indestructibility is on-pie across colors, so blue here is a slight bend |
| Indestructible — Grant, permanent | ⚫ Black (Bends) | Fated Return | Granting indestructible sits in all colors' range; black doing it is a minor bend |
| Flying — Grant, temporary | 🔴 Red (Bends) | Goblin Balloon Brigade | Red grants temporary flight as a secondary color — a minor bend, all colors share flying |
| Vigilance — Grant, permanent | 🔵 Blue (Bends) | Auramancer's Guise | Vigilance is on-pie for blue as a secondary color — a slight bend |
| Vigilance — Grant, permanent | 🔴 Red (Bends) | Eternal Warrior | Granting vigilance is off-pie for red — a bend; vigilance is white/blue/green |
| Reach — Grant, permanent | ⚪ White (Bends) | Web-Shooters | White reach is on-pie as a secondary anti-flyer tool — a mild bend |
| Reach — Grant, permanent | 🔴 Red (Bends) | Fiendlash | Red granting reach is a secondary bend — reach is owned by white/red/green |
| Trample — Grant, temporary | 🔵 Blue (Bends) | Giant Shark | Blue granting trample is on-pie (secondary/tertiary) — a minor bend, not a break |
| Reach — Grant, temporary | 🔴 Red (Bends) | Academic Dispute | Reach is on-pie for red as a secondary color — a mild bend, not a break |
| Flying — Remove, permanent | ⚪ White (Bends) | Sky Tether | Removing flying suits white's earthbound/grounding theme — an on-pie effect, barely a bend |
| Hexproof — Grant, permanent | ◇ Colorless (Breaks) | Apostle's Blessing | Colorless artifacts granting hexproof is off-pie flexibility — a break; hexproof is white/blue/green |
| Trample — Grant, permanent | ⚫ Black (Bends) | Oni Possession | Black granting trample is secondary combat — a minor bend; trample is primary in red/green |
| First strike — Grant, permanent | 🔵 Blue (Bends) | Snow Devil | Blue almost never grants first strike — a bend; first strike is white/black/red combat territory |
| Indestructible — Grant, temporary | ⚫ Black (Bends) | Syndicate Trafficker | Black granting temporary indestructibility is on-pie (secondary) — a minor bend, not a break |
| Flying — Grant, permanent | 🔴 Red (Bends) | Daggersail Aeronaut | Red grants temporary flight but permanent flying is off-color — a mild bend; flight is white/blue |
| Protection from Red — Has, permanent | ⚫ Black (Bends) | Phyrexian Crusader | Black protection is on-pie as a secondary — a minor bend; white owns protection most |
| Protection from Red — Has, permanent | 🔴 Red (Bends) | Vulshok Refugee | Protection is on-pie for all colors including red — a minor bend at most |
| Protection from Black — Has, permanent | 🔵 Blue (Bends) | Cephalid Snitch | Protection appears in all colors, so blue's protection from black is a mild bend |
| Protection from Black — Has, permanent | ⚫ Black (Bends) | Cemetery Gate | Protection is on-pie broadly; black self-protection from black is only a mild bend |
| Direct damage, single target — Creature-only | 🟢 Green (Bends) | Leaf Arrow | Direct damage lives in red/white/black; green's fight-style burn here is a bend toward that |
| Milling — Self | ⚪ White (Bends) | Airlift Chaplain | White self-mill is off-pie — a bend; milling belongs to blue and black |
| Milling — Self | 🔴 Red (Bends) | Song of Blood | Red self-mill is off-pie — a bend; milling is blue and black |
| Damage prevention — All combat | ⚫ Black (Bends) | Darkness | Blanket combat damage prevention is white's fog effect — off-pie for black, a real break |
| Damage prevention — All combat | 🔴 Red (Breaks) | Glacial Crevasses | Preventing all combat damage is a break for red; prevention is white's domain |
| Reanimation — Any graveyard | ⚪ White (Bends) | Breath of Life | Reanimation is on-pie for white (its own dead) but any-graveyard reach leans black — a mild bend |
| Discard as effect — Each player | ⚪ White (Bends) | Balancing Act | Symmetrical discard is black's domain, so white forcing discard here is a genuine bend |
| Discard as effect — Each player | 🔵 Blue (Bends) | Flux | Symmetric discard is off-pie for blue — a bend; hand disruption is black's |
| Color changing — Temporary | 🔴 Red (Bends) | Caldera Kavu | Color-changing sits in white/blue/black/green, so a red source doing it is a bend |
| Color changing — Temporary | 🟢 Green (Bends) | Wild Mongrel | Green does temporary color-changing as a secondary color — only a minor bend |
| Card draw — Off creatures/board | 🔴 Red (Bends) | Pyretic Charge | Red card draw is secondary and impulsive — a mild bend; steady draw is blue/black/green |
| Land destruction — Mass | ⚪ White (Bends) | Armageddon | White mass land destruction is a bend; land destruction belongs to red, black, and green |
| Land destruction — Mass | ⚫ Black (Bends) | Desolation Angel | Black mass land destruction is on-pie — a minor bend; it's shared with red/green |
| Pacifism-like effect — Can't attack only | ⚫ Black (Bends) | Demonic Torment | Black can't-attack effects are off-pie — a bend; pacifism-style restriction is primarily white |
| Pacifism-like effect — Can't attack only | 🔴 Red (Bends) | Vow of Lightning | Red can't-attack pacifism leans white — off-pie; Pacifism-style effects are white's |
| Pacifism-like effect — Can't attack only | 🟢 Green (Bends) | Vow of Wildness | Green can't-attack pacifism is off-pie — a bend; Pacifism effects are white's |
| Tapping creatures — Ongoing tap-down | ⚫ Black (Breaks) | Rathi Trapper | Repeated tap-down belongs to white/blue, so black's ongoing tapper is a break |
| Tapping creatures — Ongoing tap-down | 🔴 Red (Bends) | Magus of the Arena | Ongoing tap-down is off-pie for red — a bend; tapping is white/blue |
| Tapping creatures — Ongoing tap-down | 🟢 Green (Bends) | Storm Front | Green ongoing tap-down is off-pie — a bend; tapping creatures belongs to white and blue |
| Life gain — Ongoing/engine | 🔵 Blue (Bends) | Lifetap | Ongoing lifegain is off-pie for blue — a bend; lifegain is white/black/green |
| Counterspell — Counter a specific type | ⚫ Black (Bends) | Withering Boon | Countering spells is off-pie for black — a bend; counters are white/blue |
| Counterspell — Counter a specific type | 🟢 Green (Breaks) | Avoid Fate | Green countering spells is a break — counterspells belong to blue, with white as splittable |
| Token generation — Ongoing | 🔵 Blue (Bends) | Followed Footsteps | Blue ongoing token copies are on-pie as a secondary — a minor bend, tokens span all colors |
| Token generation — Ongoing | 🔴 Red (Bends) | Dragonmaster Outcast | Red makes tokens on-pie, especially Dragons — a minor bend; ongoing generation is shared across colors |
