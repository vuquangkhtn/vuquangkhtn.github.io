# vuquangkhtn.github.io

Personal portfolio site (static HTML/JS/CSS). `main` IS the live site — deploys run automatically.

## Commands

| Do | Run |
|---|---|
| Build | `npm run build` (build.js → `dist/`) |
| Watch build | `npm run dev` |
| Serve locally | `npm run serve` (node server.js) |
| Both | `npm start` |

## Where things live

- `index.html` — the whole page (source of truth)
- `build.js` — build script → `dist/`
- `assets/`, `resumes/`, `icon.svg`, `background-icon.svg` — static content
- `.github/workflows/deploy.yml` — deploys `main`

## Boundaries

- ALWAYS remember: every merge to `main` goes live immediately. NEVER merge untested work.
- NEVER commit secrets or personal data beyond what is already public.

<!-- super-board:begin v3.2.0 (managed; edits inside are overwritten on upgrade) -->
## Super Board

Board: Backlog · Ready · Building · QA · Review · Blocked · Done. Labels route: `qa` skips Building · `bug`, `feature`, none → built first.

| When | Use | NEVER |
|---|---|---|
| Set up / repair the board | `/super-board onboard` | DON'T hand-edit config mid-run |
| Check tickets before a run | `/super-board lint` | NEVER run with AC-less tickets |
| Drain the board | `/super-board run` | NEVER build, test or merge from the orchestrator |
| Board state / halt | `/super-board status` · `/super-board stop` | |
| Build one ticket | `/super-build` | NEVER build outside the card's worktree |
| QA a branch, or a live URL alone | `/super-qa` · `/super-qa <url>` | NEVER mark QA pass without evidence |
| Review a PR, merge | `/super-review` | NEVER `gh pr merge` direct — merge gate only |
| File bugs from Sentry, PostHog, PRs | `/super-collect` | DON'T file without a verifier pass |
| UI polish | `/ui-refine-loop` (human runs it) | board NEVER runs it |
| Diagram / explainer page | `/visual` | |
| Commit, pull, push this branch | `/git-sync` | NEVER force push or rebase shared history |

| Rule | Value |
|---|---|
| Config | `.claude/super-board/configs/<slug>.json` |
| Isolation | 1 card · 1 worktree · 1 branch |
| Merge | auto for normal changes · money, auth, destructive schema (DROP/TRUNCATE/RENAME) → human · PR > 400 changed lines → human |
| Migrations | additive → robot migrates allowed DBs only · live DB ALWAYS → 🙋 needs you |
| Blocked card | block-template comment · last line `blocked-by:` · 🙋 = needs you |
| Secrets | NEVER read `.env`; key names via `.claude/bin/super-board-env-check.sh` |

## Writing (super-board)

| Thing | Format → `.claude/skills/super-board/references/writing-standard.md` |
|---|---|
| Commit, PR title | `<emoji> [type] scope: subject` + short bullets · ✨ feat 🐛 fix 🔧 chore ♻️ refactor 🧪 test 📝 docs |
| PR body | blocks: status · Problem · Solution · AC + proof · history · Before\|After · Risk — `super-board-pr-body.sh` |
| Ticket | Problem · Context · Fix · AC · Risk · Blocked by → `docs/agents/issue-tracker.md` |
| Comment | `[role] [label] status` · Did · ✅ Done · ❌ Not done · Next · ≤ 8 lines |
| PR author notes | file + critical inline review comments: Purpose · What changed · Why it matters → `pr-author-notes.md` |

- NEVER chain steps with arrows. One step per line, lettered under Where.
- NEVER link screenshots. Embed a raw URL pinned to a sha.
- DON'T repeat file lists in status comments. DON'T write "Not verified" or "Next" in a PR body.
<!-- super-board:end -->

<!-- super-board:skill-map begin (managed) -->
## Skill sets & lifecycle map

Which vendored skill set serves each lifecycle step, and how each agent reaches a skill.

Skill set: **pstack** — pstack (Claude port) (source: https://github.com/michael-denyer/pstack-claude, pinned: 190fc9a009491cbcfc04e25ef5b3c2d1fcf5ca8a).

Machine-readable map: `.claude/super-board/skill-map.json` · install record: `.agents/skill-sets.json`.

| Step | Set | Skills |
|---|---|---|
| Plan | pstack | how, why, teach, figure-it-out, show-me-your-work |
| Design | pstack | architect, arena, interrogate |
| Build | pstack | tdd, typescript-best-practices, deslop, no-comments |
| Test | pstack | create-verification-skill, swarm, blast-radius, benchmark-checklist, interrogate, thermo-nuclear-code-quality-review |
| Deploy | pstack | make-pr-easy-to-review, babysit, fix-merge-conflicts, get-pr-comments, fix-ci |
| Maintain | pstack | — |

pstack has no Maintain skills; super-board's own loop (super-collect, calibration) covers it.

pstack anytime skills: poteto-mode, setup-pstack, poteto-help, recall, ketchup, ketchup-video, bro, what-did-i-get-done, in-your-own-words, technical-writing, unslop, sharpen, statechart, thermos, thermo-nuclear-review, reflect, correct, automate-me, maintain-verification-skill, create-formal-verification-skill, maintain-formal-verification-skill, principle-attack-the-premise, principle-boundary-discipline, principle-build-the-lever, principle-encode-lessons-in-structure, principle-exhaust-the-design-space, principle-experience-first, principle-explain-the-number, principle-fix-root-causes, principle-foundational-thinking, principle-guard-the-context-window, principle-laziness-protocol, principle-make-operations-idempotent, principle-migrate-callers-then-delete-legacy-apis, principle-minimize-reader-load, principle-model-the-domain, principle-never-block-on-the-human, principle-outcome-oriented-execution, principle-prove-it-works, principle-redesign-from-first-principles, principle-separate-before-serializing-shared-state, principle-sequence-verifiable-units, principle-subtract-before-you-add, principle-test-behavior-not-implementation, principle-type-system-discipline

Agents: slash commands (`/tdd`) and the Skill tool, from .claude/skills; reads .agents/skills natively.
<!-- super-board:skill-map end -->
