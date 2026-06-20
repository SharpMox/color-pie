---
name: update-example-cards
description: Sync rows of the "Example Cards" Notion database from row comments to Scryfall. Use when the user says "Update Example Cards", or asks to process/apply the comments on the Color Pie MTG Example Cards table. Each comment names the card a row should become; this finds them, rewrites the rows from Scryfall, and replies to each comment.
---

# Update Example Cards

Each open **comment** on a row of the "Example Cards" Notion database names the MTG
card that row should become. This skill finds every such comment, rewrites the whole
row from Scryfall, verifies it, and replies to the comment (comments can't be deleted
via the API — the user deletes them).

Run **fully autonomously**: no demo-first, no per-row approval. End with a report.

## Execution model

- **Orchestrator** (this session): does enumeration (the browser step) and dispatches subagents.
- **One Sonnet subagent per commented row**, run in parallel — dispatch them in a single
  message with multiple `Agent` calls, each `subagent_type: general-purpose`, `model: sonnet`.
  Per-row work is **MCP + curl only (no browser)**, so parallel is safe.

## Fixed facts (this workspace)

- View URL: `https://app.notion.com/p/14cca5e066404fe6bcfe84fe7fb2ff7a?v=4316c74446d642a1bc60939508b12d2f`
- Example Cards data source: `collection://293e799c-2d2f-43f5-8be5-7ab4f5916c06`
- Effects data source: `collection://1eea3791-e75a-46d1-9303-00e18e044579`
- `spaceId`: `2146ddf2-a1b0-445b-8e24-1ecb8c68d91d`
- Colors → page URL map (for the `Colors` relation, from Scryfall `color_identity` W/U/B/R/G):
  - White `https://app.notion.com/p/385f1559c99b814186a1e434ab788b13`
  - Blue  `https://app.notion.com/p/385f1559c99b81ad8f01d3f8ad7be42e`
  - Black `https://app.notion.com/p/385f1559c99b81159969d6f2ba866779`
  - Red   `https://app.notion.com/p/385f1559c99b81ad809afb2dead490e9`
  - Green `https://app.notion.com/p/385f1559c99b81ad8180d89fdd7dc9cf`

## Hard constraints (learned the hard way)

- **Bulk-query MCP tools are plan-gated** (`query_data_sources`, `query_database_view`) — they error. Don't use them.
- **Comments can't be deleted or resolved** via MCP. Reply with `notion-create-comment`; the user deletes manually.
- **All writes go through MCP** (`notion-update-page`). The browser is only for read/enumeration and can stay logged-out/public.
- **Headless browser won't lazy-load rows** on scroll/wheel/`scrollTop` — none of them trigger Notion's pagination. The fix: set a very tall viewport so Notion renders the whole table at once (see step 1).
- **Row comments don't appear in the global Comments/Discussions panel** (it reports "no open discussions" even when rows have comments). Comments live on the row *pages* — find them per-row, not via the page-level panel.
- **`notion-search` caps at ~25 results** and is semantic, so it can't enumerate the full table. Use it only for targeted lookups (e.g. matching an Effect).
- **Match is EXACT only** (`cards/named?exact=`, case-insensitive). No fuzzy.
- **Scryfall is public** — use `curl` for raw JSON (not WebFetch, which summarizes and can't read the authed Notion page anyway).

## Step 1 — Enumerate commented rows (orchestrator)

```bash
which agent-browser || npm install -g agent-browser && agent-browser install   # once
agent-browser set viewport 1400 9000
agent-browser open "https://app.notion.com/p/14cca5e066404fe6bcfe84fe7fb2ff7a?v=4316c74446d642a1bc60939508b12d2f"
agent-browser wait --load networkidle && agent-browser wait 3000
agent-browser eval '(() => {
  const rows=[...document.querySelectorAll(".notion-collection-item")];
  const commented=rows.filter(i=>i.querySelector(`[aria-label="Open comments"]`))
    .map(i=>({id:i.getAttribute("data-block-id"), text:(i.textContent||"").trim().slice(0,50)}));
  return JSON.stringify({totalRows:rows.length, commented});
})()'
```

The tall viewport must render ~all rows (`totalRows` should be the full table, ~190+, not ~24).
If it only shows ~24, the viewport didn't take — re-`set viewport` and reload.

**Fallback enumeration (if the browser trick ever fails):** `notion-fetch` each of the 5
Colors pages (URLs in Fixed facts), union their `Example Cards` relation arrays → the full
set of ~190 row page IDs, then `notion-get-comments` on each. Deterministic and complete,
but ~190 calls. (Colorless cards won't be in any color's list — rare here.)

For **each** commented row id, get authoritative data via MCP:
`notion-get-comments(page_id=<id>, include_all_blocks=true)` → take each **unresolved**
discussion's comment **text** (= target card) and **discussion_id** (needed to reply).
Note: a row's comment badge can flicker/drop right after that row is edited — that's why
enumeration runs before any edits, and MCP `get-comments` is the source of truth.

Build the work list: `{page_id, currentCard, targetCard, discussion_id}`.
If there are zero commented rows, report "nothing to do" and stop.

## Step 2 — Process each row (one Sonnet subagent per work item, in parallel)

Give each subagent the work item + the fixed facts above and these instructions:

1. **Scryfall exact lookup** (subagent may need to find Notion MCP tools via tool search; curl is plain Bash):
   `curl -s "https://api.scryfall.com/cards/named?exact=<URL-encoded targetCard>"`
   - If the response `object` != `"card"` (not found): reply on the comment via
     `notion-create-comment(page_id, discussion_id, markdown="⚠️ Couldn't resolve **<targetCard>** to a Scryfall card — please clarify.")` and return `status: "unresolved"`. Do not touch the row.
   - Else capture `name`, `type_line`, `mana_cost`, `oracle_text`, `color_identity`, `image_uris.normal`.
2. **Fetch the row** (`notion-fetch(page_id)`) to read current `Colors`/`Effects`.
3. **Build the `Image` file value** — `file://` + JS-`encodeURIComponent` of compact JSON
   `{"source":"<normal image url>","permissionRecord":{"table":"block","id":"<page_id>","spaceId":"2146ddf2-a1b0-445b-8e24-1ecb8c68d91d"}}`.
   In Python: `'file://'+urllib.parse.quote(json.dumps(obj,separators=(',',':')), safe="-_.!~*'()")`.
4. **Update** with `notion-update-page(page_id, command="update_properties", properties={...})`:
   - `Card` = Scryfall `name`
   - `Image URL` = `image_uris.normal`  (property name is "Image URL" — NOT the special "url" case, so no prefix)
   - `Image` = the `file://...` string from step 3
   - `Notes` = one concise line in the existing style: `"<Color> <type>; <plain-English effect> (<effect tag>)."`
   - `Colors` = JSON-array string of color page URLs from `color_identity` (colorless → omit + flag)
   - `Effects` = JSON-array string of existing Effect page URL(s). Find by `notion-search(data_source_url="collection://1eea3791-e75a-46d1-9303-00e18e044579", query=<mechanic>)`. **Link existing taxonomy only**; if nothing fits, leave `Effects` unchanged/empty and flag it. Never create new Effect pages. (Often the row's current Effect still fits — keep it.)
5. **Verify**: `notion-fetch(page_id)` again; confirm `Card`, `Image URL`, and `Colors` match Scryfall. Retry once on mismatch, else flag.
6. **Reply**: `notion-create-comment(page_id, discussion_id, markdown="✅ Updated this row to **<name>** (from Scryfall): name, image, Image URL, Notes. Please delete/resolve this comment.")`
7. **Return** structured result: `{page_id, from: currentCard, to: name, effectsFlag?, status: "updated"|"unresolved"|"flagged"}`.

## Step 3 — Report (orchestrator)

Collect subagent results and output:
- ✅ rows updated (`<old>` → `<new>`)
- ⚠️ low-confidence or empty **Effects** flags, and any colorless `Colors` flags
- ❓ unresolved comments (replied asking for clarification)
- 🗑️ **deletion checklist**: the list of comments the user must delete (auto-deletion isn't possible)

## Notes-style examples (match these)
- `Red sorcery; gains control of a creature until end of turn (temporary theft).`
- `Red sorcery; untaps attackers and grants an additional combat phase (extra attack).`
- `Green instant; puts a +1/+1 counter on a creature and grants hexproof until end of turn (hexproof).`
