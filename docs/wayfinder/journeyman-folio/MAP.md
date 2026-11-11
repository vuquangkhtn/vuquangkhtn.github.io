# Map: The Journeyman's Folio — regenerate the portfolio as four fused storytelling styles

Label: `wayfinder:map` · Tracker: local-markdown (tickets in `t/`, findings in `findings/`, resolutions recorded in each ticket file)

## Destination

Decisions locked and the spec written for regenerating vuquangkhtn.github.io as one self-contained, Fable-grade page told through four fused style-units (**Set A: The Journeyman's File** — cyanotype papers → drawloom workshop → town-grid platform → split-flap horizon). The destination artifacts are: `style.md` rewritten as that fusion, `build-brief.md` in the rea-miaai-hub prompt-formula, and a reconciled content fact-sheet — everything a fresh build session needs.

**Destination redrawn 2026-11-10 by the user's goal:** the destination now extends to the **completed website** — prototype finished by the agent, build split via `/to-tickets`, executed through the `/super-board` run loop with autonomous merges after QA evidence, `/ui-refine-loop` review feeding back until no tickets remain.

**Re-charted 2026-11-11 (v2 — the slide deck):** the user kept the theme but restructured the site: **"From vintage to modern" — a nine-slide era deck** telling the portfolio as a story (Loom → Machine → Terminal → Home Machine → Web → Pocket → Platform → Horizon, plus cover). Eras are the base theme *describing the portfolio* — not history events: no years in the chrome, career facts stay. Full-viewport slides with era-appropriate transitions, one constant narrator plus period artifact text, timeline rail of era names, same deck on mobile. The v1 four-sheet one-scroll structure and board tickets #1–#5, #9, #10 are superseded (closed 🤷); #6/#7 retirement chores parked in Backlog until the new cutover exists; re-split via `/to-tickets` after the v2 prototype.

## Notes

- **Domain**: personal portfolio; `main` IS the live site — every merge deploys immediately, so nothing untested is ever merged. This map produces decisions and specs only.
- **Skills every session consults**: `rea-miaai-hub` (plus its `references/`), `grilling`, `domain-modeling`. Glossary: `GLOSSARY.md` at repo root (act, style-unit, donor study, narrative voice, overture).
- **Standing preferences (settled in charting grilling)**:
  - Four style-units, each = donor study + narrative voice, each owning one act (reading "c").
  - Light warm-paper base throughout; The Horizon act may drop to dark as the finale.
  - Content 1:1 with the fact-sheet; copy prose rewritten in the narrative voices.
  - Single self-contained `index.html` (inline CSS+JS, zero deps, no webfonts); build pipeline replaced and `deploy.yml` updated as part of the later build effort.
  - Phone number stays off the public page.
  - **HITL delegated 2026-11-10** by the user's explicit goal ("finish prototype yourself … merge without me"): the agent stands in for the human's decisions on this map's remaining tickets and merges after QA evidence; the AGENTS.md rule "never merge untested work" still binds — QA evidence precedes every merge.
- **Tracker conventions**: claim a ticket by setting `Assignee:` in its file before working it. Research findings are written as local files under `findings/` — the throwaway-branch mechanic is not used (nothing is pushed).

## Decisions so far

- [Reading of the ask: four fused style-units](../../GLOSSARY.md): each unit = donor study + narrative voice, one act each — settled in charting grilling round 1.
- [Destination shape: decisions locked, build handed off](#destination): the map never merges site code — settled round 1.
- [Content scope: copy rewritten, facts preserved](#destination): facts stay 1:1 via the fact-sheet — settled round 1.
- [Architecture: single self-contained index.html](#destination): Webflow/jQuery/esbuild pipeline retired; deploy.yml updated — settled round 1.
- [Style-unit set: The Journeyman's File (Set A)](t/r1-papers-cyanotype.md): 036→Papers, 058→Workshop, 072→Platform, 002→Horizon — settled round 2.
- [Register: light base, dark Horizon finale](t/g1-fusion-rules-grilling.md) — settled round 2.
- [Cleanup scope: full regeneration incl. deploy.yml](t/s1-style-md-and-brief.md) — settled round 2.
- [Platform act: distill town-grid study (072)](t/r3-platform-town-grid.md): civic-instrument register — SVG isometric town via matrix projection (buildings→miniapps, dash-flow wires whose speed ∝ load, substation→platform, interconnector→legacy deps), plinth-inscription lore + annual-report chrome (kickers, `5px 5px 0` offset shadows, ticker, colophon), palette paper `#F6F1EA`/navy `#2B2D42`/single accent `#FFD166`, one `mix-blend-mode:multiply` sky-retint rect; reduced-motion = static `getPointAtLength` arrowheads, never deletion.
- [Workshop act: distill drawloom study (058)](t/r2-workshop-drawloom.md): weaver's-bench editorial artifact — dye palette (`--linen #EFE7D6`, `--iron #2A2A2A`, accent `--madder #A8452C`, `--weld #D9A441` for active states only), Garamond body + Gill Sans 9.5px kickers with live tabular counts, linen-weave ground in 3 CSS gradients + multiply grain, double-rule masthead, dotted-madder glossary tooltips, settle/spring `(.2,.8,.2,1)`/`(.3,1.5,.5,1)` with 80ms `.rise` stagger; borrow palette+ground verbatim, the chrome kit (per-shop italic colophon = craft-journal reflection), and a damped-cosine beat recoil `exp(-bt·13)·cos(bt·40)` ≤2.4px as the one hero motion; leave the loom engine, audio, magnifier, and `role="application"` grids.
- [Horizon act: distill split-flap study (002)](t/r4-horizon-split-flap.md): warm-black instrument hall — base `#060605` + cream ink `#F2EFE4` + single signal-yellow `#F5C400` (red `#D4401F` alarm-only), all depth delivered by light (radial hall-light wash, inset shadows, brass gradients), canvas sprite-atlas flap engine (`pow(p,1.7)` fold, 55ms steps, 9ms/char · 58ms/row clatter roll), departures-row grammar with per-row go/wait/bad lamps; borrow the dark-register recipe verbatim for the finale, contact/skills as console rows with the AI project as the featured `BOARDING` row, and the cheap mono announcer + maker's-plate self-test easter egg; leave weather panel, flight-sim engine, live clock.
- [Papers act: distill cyanotype study (036)](t/r1-papers-cyanotype.md): inverted-light drafting pack — saturated blue paper `#1B4F9C`, pale ink `#F2F6FA`, shade `#0E2F66`, one yellow accent `#FFD23F` as the draughtsman's pencil; four stacked numbered blueprint sheets in full drafting chrome (title blocks with runtime drawing numbers, zone grids, general notes, revision ledger, Received stamp, colophon), Arial-Narrow caps labels + Roboto-Mono tabular numerals + Georgia-italic hand asides, two easings `(.62,.04,.18,1)`/`(.2,1.5,.36,1)`, `pathLength=1` draw-on choreography; borrow sheet chrome as "transcript sheets drawn to scale", dimension lines + yellow highlight for GPA/grades, revisions table as scholarship ledger; ⚠ 036 is itself dark — register resolution goes to the prototype ticket.
- [Content fact-sheet: reconcile every fact from all sources](t/t1-content-fact-sheet.md): everything reconciled into [fact-sheet.md](fact-sheet.md) — 7 contradictions arbitrated Detail-primary (Senior title, Codelink Aug 2019, bundle 90%, VNG Oct 2017, HCMC, coverage figures disentangled), phone excluded by policy, company garnish quarantined as marketing claims, the three questions.md analogies recorded as voice seeds with candidate-content status.
- [Fusion prototype: rough four-act stub to react to](t/p1-fusion-prototype.md): stub built, reaction delegated; decisions D1–D7 locked — Papers stays LIGHT (drafting inversion; dark cyanotype variant rejected), Workshop = weaver's bench with journal colophons, Platform = annual report without skills, Horizon owns finale + skills console, Overture = light cover sheet, role cycler dies (one-shot flap clatter instead), dusk bridge makes dark read as nightfall.
- [Fusion rules grilling: lock style.md content](t/g1-fusion-rules-grilling.md): global fusion contract locked (register, easings, chrome, motion, reduced-motion, handoffs, sound opt-in) + act-by-act content mapping; HITL delegated by goal.
- [Write style.md fusion + build brief](t/s1-style-md-and-brief.md): repo-root `style.md` rewritten as the four-unit fusion with provenance; `build-brief.md` written in the prompt-formula.
- [Copy drafting: every public line, act by act](t/c1-copy-drafting.md): [draft-copy.md](draft-copy.md) holds every public line + aria strings; Webpack→Vite and Release-Hub stories excluded from public copy, garnish dropped, analogy framed as the engineer's own.

### Re-chart 2026-11-11 (v2 decisions)

- [v2 round 1](MAP.md): inherited-tools arc (prologue eras short, career-owning eras from Web on) · nine-slide plan · full-viewport era-transition deck (wheel/keys/swipe, hash links, reduced-motion = cuts) · close-and-resplit board.
- [v2 round 2](MAP.md): dual-layer narration (constant narrator line + period artifact text) · timeline rail shows era names only, **no years — portfolio focus, eras as staging** (user correction) · same nine slides on mobile · v2 prototype = full rough deck + three choreographed transitions (card feed → Machine, CRT power-on → Terminal, flap flip → Horizon).
- [Terminal era: distill CRT study (039)](t/r5-terminal-crt.md): one instrument in a dark hall — four nested shells, 80×39 character grid (font back-solved from a probe span), near-black base + single phosphor accent, 4-layer fx stack (scanlines / 8.5s roll band / glare+vignette / 0.62s beam turn-on), phosphor bloom text-shadow with inverse-video chips, boot choreography (beam flash → ~150cps typed ROM banner → resting prompt with block cursor). Deck use: recolor green, demote amber to the alarm role as a deck-level rhyme.
- [Home Machine era: distill vector-CRT study (016)](t/r6-home-crt.md): strict mono-phosphor — mint `#B8FFD9` over glow `#5CFFB0` on `#020403`, hierarchy by a five-step beam-brightness ramp (no extra hues), 4×6 stroke font with trace-on entry (2.5s, beam order), 8s idle retrace sweep as the slide's only ambient motion, pincushion jitter + phosphor decay + bloom canvas; reduced-motion = flick/jitter off, fast decay.

## Not yet specified

- Per-era copy drafting (narrator lines + artifact text for all nine slides) — graduates after the v2 prototype reaction.
- Whether era transitions beyond the three choreographed ones get bespoke treatment or share one generic move — graduates at prototype reaction.
- QA bar carry-over for the deck (harness checks adapted to slide mechanics) — graduates at the v2 `/to-tickets` split.

## Out of scope

- ~~The build itself and any merge to main~~ — **revoked 2026-11-10**: the destination was redrawn by the user's goal; the build now runs through the super-board loop and is in scope.
- `resumes/` content: the resume files are sources, never edited by this effort.
- The `ai-code-review-assistant` sub-site: linked from The Horizon act, but its own pages are untouched.
