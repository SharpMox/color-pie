# PRD — Effect Review Page

## Problem Statement

I (the site owner) want people to give structured feedback on each effect in the
color-pie Effects table — is it in the right color, at the right strength? Today
the Explorer site only *displays* the pie; there's nowhere to capture a reviewer's
judgement. I don't want to build or run a database/server, it must be free, no API
secret can leak from the browser, anyone should be able to comment without signing
in, and the feedback must be easy to fetch back out.

## Solution

A `review.html?id=<effectId>` page on the existing static GitHub Pages site. It
shows one effect's full data and a feedback form underneath, with Prev/Next to walk
the effects in canonical order. Feedback is stored in **Firebase Firestore**,
accessed directly from the browser via the Firebase web SDK — no server, no proxy.
Firestore **Security Rules** are the safety floor: anyone may create a validated
feedback document and read all feedback, but nothing else. The Firebase web config
sits in the page source but is a public identifier, not a secret; the rules (not
key secrecy) restrict what it can do, and the free tier caps rather than bills.

Reviewers reach the page from a **Review** button added to each effect row and to
the detail modal on the existing `index.html`; that button carries a badge with the
count of feedback already submitted for the effect.

## User Stories

1. As a reviewer, I want to open a dedicated review page for one effect, so that I can focus on judging it without the noise of the whole table.
2. As a reviewer, I want to see that effect's full data (title, type, category, rationale, interaction, duration, per-color tiers and example cards), so that I can judge it with full context.
3. As a reviewer, I want to record a verdict on the effect's placement (correct / wrong color / wrong strength / borderline), so that my judgement is structured, not just prose.
4. As a reviewer, I want to suggest which color(s) the effect should be in, so that disagreement is actionable.
5. As a reviewer, I want to suggest the strength/tier it should sit at (primary / secondary / tertiary / bend / break), so that I can flag mis-ranked effects.
6. As a reviewer, I want to leave a free-text note, so that I can explain my reasoning.
7. As a reviewer, I want to optionally put my name, so that my comment isn't anonymous — without being forced to sign in.
8. As a reviewer, I want to submit without any login or account, so that there's zero friction.
9. As a reviewer, I want to see feedback others have already left on this effect, so that I can see the existing discussion before adding mine.
10. As a reviewer, I want my submission to appear in the list immediately, so that I get confirmation it landed.
11. As a reviewer, I want Next/Previous buttons, so that I can review effects one after another in a steady pass.
12. As a reviewer, I want Prev/Next to follow a stable, predictable (canonical) order, so that I don't lose my place.
13. As a site visitor, I want a Review button on each effect row in the main table, so that I can jump straight into reviewing that effect.
14. As a site visitor, I want the same Review button inside the detail modal, so that I can review an effect I've opened for a closer look.
15. As a site visitor, I want the Review button to show how many comments an effect already has, so that I can spot which effects are being discussed.
16. As the site owner, I want all feedback stored durably and for free, so that I don't run a server or pay hosting.
17. As the site owner, I want feedback keyed to a stable effect id that survives renames, so that comments never orphan when I re-sync from Notion.
18. As the site owner, I want to read/export all feedback easily, so that I can act on it (and optionally import to Notion later).
19. As the site owner, I want no secret credential exposed in the page, so that nobody can run up cost or reach data they shouldn't.
20. As the site owner, I want malformed/oversized submissions rejected at the data layer, so that the store stays clean even though writes are open.
21. As the site owner, I want to delete junk feedback from the Firebase console, so that I can moderate after the fact without building a moderation UI.
22. As a reviewer on mobile, I want the review page to be usable on a small screen, so that I can review from my phone (matches the site's mobile-first convention).
23. As a reviewer, I want a direct link to an effect's review page, so that I can share "look at this one" with someone.

## Implementation Decisions

- **Storage:** Firebase Firestore, single top-level `feedback` collection. Accessed
  from the browser with the Firebase web SDK (loaded from the gstatic CDN — no build
  step, consistent with the zero-dependency site).
- **Feedback document shape:**
  - `effectId` (string, required) — the effect's Notion `Index`, see below.
  - `verdict` (string, required) — one of `correct` | `wrong_color` | `wrong_strength` | `borderline`.
  - `suggestedColors` (array of strings, optional) — subset of `["W","U","B","R","G","C"]`.
  - `suggestedStrength` (string, optional) — one of `primary` | `secondary` | `tertiary` | `bend` | `break`.
  - `note` (string, optional, ≤ 1000 chars).
  - `reviewerName` (string, optional, ≤ 80 chars).
  - `createdAt` (timestamp) — set to `request.time` server-side.
- **Stable effect id:** the Notion `Index` property (unique, 315/315, never reused).
  `scripts/build-data.js` emits it as `id` on each effect object in
  `data/colorpie.js`. (The Notion page UUID is *not* present in CSV exports; `Index`
  gives the same stability without a Notion API call.)
- **Security Rules** (the safety floor; "strict rules, moderate later"):
  - `create`: allowed for anyone, but the document must validate — `effectId` a
    non-empty string, `verdict` in the enum, optional fields well-typed and within
    length caps, `createdAt == request.time`, and no unexpected fields.
  - `read`: open (public comment wall).
  - `update` / `delete`: denied for everyone. Moderation is done from the Firebase
    console. App Check is deferred — added only if abuse actually appears.
- **`assets/feedback.js` (deep module, shared):** wraps all Firestore access behind
  a small interface — initialise with the Firebase config, `addFeedback(effectId, payload)`,
  `listFeedback(effectId)` (newest first), `allCounts()` (map of effectId → count for
  badges). The only place Firestore is touched.
- **`review.html`:** reads `id` from the query string, finds the effect in `COLORPIE`,
  renders its full detail (reusing the same per-color/example-card layout as the modal),
  renders the feedback form (verdict, suggested colors, suggested strength, note, name),
  lists existing feedback via `feedback.listFeedback`, and submits via
  `feedback.addFeedback`. Prev/Next rewrite `?id=` to the canonical-order neighbor.
  Client-side validation mirrors the security rules before submit.
- **`index.html` changes:** add a Review button (anchor to `review.html?id=<id>`) to
  `rowHTML` and to the detail modal, each with a count badge. On load, the page calls
  `feedback.allCounts()` and fills the badges asynchronously (rows render immediately
  from `COLORPIE`; badges populate when counts resolve).
- **Routing:** no router. `review.html` is a real sibling file addressed by query
  param — native to GitHub Pages, refresh- and direct-link-safe.
- **No Notion write-back** in this PRD; feedback lives in Firestore. A one-off export
  script can come later.

## Testing Decisions

- Per explicit owner decision, **no automated tests** are written for this feature;
  it is verified by running the page. (This overrides the default test-first loop.)
- A good test here would have covered only external behavior — e.g. `prevNext` returns
  the right neighbors at the list edges, and `validateFeedback` accepts/rejects the
  same documents the security rules do. These remain easy to add later (pure functions,
  Node's built-in `node:test`, no harness needed) if regressions appear.
- The Firestore Security Rules are the real correctness boundary for write validation
  and are verified manually (submit valid + malformed payloads against the deployed
  rules).

## Out of Scope

- User authentication / accounts of any kind.
- Syncing feedback back into Notion (deferred; one-off export later).
- A moderation UI (use the Firebase console).
- App Check / captcha / rate limiting (deferred until abuse appears).
- Editing or deleting one's own feedback from the page.
- Aggregated analytics/dashboards beyond the per-effect count badge.
- Matching Prev/Next to the table's current filter/sort (canonical order only).

## Further Notes

- The Firebase project, web config, and rules deployment are owner actions in the
  Firebase console; the build ships a config placeholder and a `firestore.rules` file
  to paste/deploy.
- Free-tier reads are generous; `allCounts()` reads the `feedback` collection once on
  load and tallies client-side. If volume ever grows large, switch to a denormalized
  per-effect counter. This cap is intentional and noted rather than silently assumed.
- All work lands via a PR off `main` (never a direct push to `main`), per repo policy.
