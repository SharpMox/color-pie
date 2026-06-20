# color-pie

<!-- TODO: one-paragraph description of what color-pie is and what lives in this repo. -->

> ## ⚠️ Always ship changes via a pull request — never push to `main`
> **Every change goes on a branch off `main` and lands through a PR.** No direct
> commits or pushes to `main` — not for one-line fixes, content edits, follow-ups,
> or "tiny" tweaks. The flow is always: branch → commit → push the branch →
> `gh pr create`. Do not run `git push origin main` or fast-forward `main` locally.
> If the user explicitly asks to push to `main`, confirm that's what they want first.

---

## Working method

- **Grill before building — almost always.** For any new feature, refactor, design
  change, or non-trivial decision, start with `grill-with-docs` (or `grill-me` for
  non-code planning). Skip only for mechanical work (renames, formatting, applying an
  already-grilled plan) or when the user says "just do it" / "skip the grilling".
- **Always cite sources.** Every factual claim or design decision names where it came
  from: a file + line, a skill, a doc URL, a commit, an issue, or a direct user
  instruction. No "I think" / "usually" without a pointer — say "no source — assumption"
  so it can be challenged.
- **Prioritise trusted sources**, highest first:
  1. Explicit user instructions in this conversation.
  2. This `CLAUDE.md`, project docs, ADRs, skills.
  3. The codebase itself (`git log`, current file contents).
  4. Official upstream docs from canonical domains.
  5. General training-data knowledge / blogs / Stack Overflow — lowest; a hypothesis to verify.
  Never let a lower tier override a higher one without flagging the conflict.
- **Match the surrounding code.** Keep edits in the same idiom and density as the file
  you're touching.
- **Verify before claiming done.** Run the relevant checks (build/tests/linters or a
  real run) and confirm the output before saying something works.

## Commits

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`. One commit per logical
change.
