# Style: "The Journeyman's File" — a four-unit Fable fusion

One self-contained portfolio page told through four fused style-units (donor study + narrative voice, one act each), staged as: *"A journeyman engineer's workbench-folio: four artifacts from four chapters of one career, hung along one continuous journey line, lit from a workbench day into a departure-board night."* Built on the Claude Fable 5.2 doctrine ([rea-miaai-hub](https://github.com/) skill · [collection](https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/)). Decisions D1–D7 locked in `docs/wayfinder/journeyman-folio/t/p1-fusion-prototype.md`; donor distillations in `docs/wayfinder/journeyman-folio/findings/`; facts come only from `docs/wayfinder/journeyman-folio/fact-sheet.md`.

## Global rules (the fusion contract)

- **Single file, zero dependencies, zero webfonts** — inline CSS + JS, system stacks only, works offline. `main` is live: nothing untested merges.
- **Light warm-paper base throughout; the page darkens exactly once** — the Horizon finale arrives through a dusk-gradient bridge, so nightfall reads as choreography, never rupture (D7).
- **One saturated accent per act, each with a job**; shared easings: settle `cubic-bezier(.62,.04,.18,1)`, glide `(.2,.8,.2,1)`, spring `cubic-bezier(.3,1.5,.45,1)`.
- **The journey spine** — a continuous vertical line through all acts; each act's colophon stamps the next act's kicker (the handoff idiom). Sheets numbered 0–4.
- **Editorial chrome everywhere**: sheet labels, kickers (10.5px / .14–.18em / 700 / uppercase / Gill Sans), Georgia display with negative tracking, Menlo tabular numerals, colophons, maker lore ("The Journeyman's File · QVN-2026 · est. 2014").
- **Motion doctrine**: 2-step entrance choreography staggered 80ms; one hero interaction per act max; idle ambient life slow and rare. `prefers-reduced-motion` handled in BOTH CSS (entrances off, transitions .01ms) and JS (`matchMedia` + live change listener, precomputed end states) — animated meaning is replaced by static equivalents, never deleted (e.g. flow dashes → static arrowheads).
- **Accessibility**: full keyboard operability, ARIA state mirroring (`aria-pressed`, `aria-current`), `:focus-visible` rings in the act's accent, DPR ≤ 2, rAF stops when idle, `visibilitychange` pause.
- **Mobile**: one ~660px breakpoint; insets `max(15px, env(safe-area-inset-*))`; the spine moves to the left margin and stays.

## Sheet 0 · Overture — the folio cover (owns no act style)

- Chrome of the Papers act (cyanotype-light) used as cover framing only: bordered title block, zone grid, kicker.
- Name in Georgia 700 display, tracking −.03em; role line **settles once on load** (letter-spacing settle entrance) — no role cycler (D6).
- Job: stamp the folio, hand the spine to Sheet 1.

## Sheet 1 · The Papers — education (donor: 036 kestrel-frameworks-bicycles, inverted to light per D1)

- **Voice**: technical-drawing annotations — measured, third-person spec language. Education as "foundations drawn to scale".
- **Palette**: draft paper `#F4F1E8` (bg), drafting ink `#1B4F9C` (lines/text), shade `#0E2F66` (depth/rules), draughtsman's pencil `#FFD23F` (the single highlight — GPA callout, stamps).
- **Type**: Arial Narrow caps labels, Roboto Mono / Menlo tabular numerals, Georgia-italic hand asides.
- **Chrome**: transcript sheet in a double border, dimension-line callouts (yellow double rule around `GPA 8.3/10`), revisions ledger as the scholarship record, "Received" stamp slamming in (scale 2.2 → settle) on scroll.
- **Motion**: SVG `pathLength=1` draw-on for rules and ledger borders; sheet kickers settle in.
- **Content**: Bachelor of Science, HCMUS–VNU, Jul 2014 – Oct 2018; GPA 8.3/10; yearly Study Promotion Scholarships; CS focus.

## Sheet 2 · The Workshop — the apprenticeship years (donor: 058 the-drawloom)

- **Voice**: apprentice's craft journal — first-person, weaving/threading metaphor, one italic colophon closing each entry.
- **Palette**: linen `#EFE7D6` (bg, with 3-gradient weave + grain at multiply), iron ink `#2A2A2A`, madder `#A8452C` (years, active marks — the thread being worked), weld `#D9A441` (hover/active states only).
- **Type**: Garamond/Georgia body; Gill Sans kickers with live tabular counts (years, project counts).
- **Chrome**: double-rule masthead, dotted-madder glossary underlines (term tooltips via `attr(data-def)`), three "bench entries" — VNG (mobile bench), KMS (web bench), Codelink (enterprise bench) — each with its projects and closing italic colophon.
- **Motion**: damped-cosine beat recoil `exp(-bt·13)·cos(bt·40)` ≤ 2.4px as the single hero motion; 80ms `.rise` stagger for entries.
- **Content**: VNG Oct 2017 – Jul 2018 (Company Media, TalkTV); KMS Oct 2018 – Aug 2019 (ticket e-commerce, ERTPM); Codelink Aug 2019 – Aug 2022 (media management, medical 90%+, stock exchange Socket.io/Next.js).

## Dusk bridge — the one transition

- A 200–260px vertical gradient from grid paper through dusk tones to board black; kicker line: "the bench dims · the board lights up". No other light→dark boundary exists anywhere.

## Sheet 3 · The Platform — NAB, the senior years (donor: 072 lumen-town-grid)

- **Voice**: municipal engineer's annual report — institutional, systems-scale, third person; the engineer's own shopping-centre analogy powers the copy (miniapps = shops, shells = centres, Core Platform = the grid).
- **Palette**: grid paper `#F6F1EA` (bg), report card `#FDFBF7`, navy ink `#2B2D42`, energy accent `#FFD166` (offset shadows, live meters only).
- **Type**: Georgia headlines; Gill Sans kickers; Menlo for all numerals and the ticker.
- **Chrome**: annual-report board card with `6px 6px 0` energy offset shadow, stats wall (150+ miniapps · 90% bundle · 7d→30min generator · 3× loads · 95% migration coverage · 60% deploys), ink ticker of meters/switches/valves (AppDynamics · Splunk · LaunchDarkly · Snyk · SonarQube), corner screws, dry colophon.
- **Optional hero**: small SVG isometric town (≤ 12 buildings, matrix projection) where dash-flow speed ∝ load; reduced-motion swaps to static arrowheads. Skip if it threatens the 110KB budget.
- **Skills live elsewhere** (D3) — this act keeps only system facts.

## Sheet 4 · The Horizon — AI project, skills, contact; the finale (donor: 002 airship-terminal-split-flap)

- **Voice**: departures announcer — terse, uppercase telegraphese in the board; the future framed as next departures.
- **Palette**: board black `#060605` (bg), cream ink `#F2EFE4`, signal yellow `#F5C400` (status words, lamps, focus — the only accent), alarm red `#D4401F` (reserved, ideally unused), radial hall-light wash `rgba(245,196,0,.075)` above + floor bounce below.
- **Type**: Menlo/Bold mono for all board text; cream with hairline-flap shading.
- **Chrome**: flap cells (inset top-light gradient + hairline split), maker's plate ("The Journeyman's File · QVN-2026"), per-row lamps (`data-s=go/wait`), yellow-edged featured row.
- **Rows**: **BOARDING** — AI Code Review Assistant (VS Code extension, provider-agnostic, link); departures desk — email · GitHub · LinkedIn · Ho Chi Minh City; **OPEN** — collaboration & interesting problems.
- **Skills console** (D4): brass-chip idiom — dark chips, signal-yellow for the hot ones (TypeScript, React).
- **Motion**: flap title ("WHERE NEXT") clatters once on load — 55ms steps, `pow(p,1.7)` fold, 9ms/char · 58ms/row — then rests; no loops (D6). Sound: opt-in synthesized clatter only (lazy AudioContext, `aria-pressed` toggle, default off).
- **Colophon**: "End of file · QVN-2026 · four sheets, one journey line · sound opt-in".

## Performance & size governor

30–110 KB single file. TypedArray buffers if any canvas work appears; offscreen-baked static layers; EMA frame-time quality scaling for the flap engine; pause everything on `visibilitychange`.

## Provenance

- **Donor studies** (Claude Fable 5.2): 036 kestrel-frameworks-bicycles → Sheet 1; 058 the-drawloom → Sheet 2; 072 lumen-town-grid → Sheet 3; 002 airship-terminal-split-flap → Sheet 4 + dusk. Full distillations with verbatim CSS: `docs/wayfinder/journeyman-folio/findings/`.
- **Doctrine**: rea-miaai-hub skill (`references/design-language.md`, QA checklist) — concept-first staging, material palettes, zero webfonts, motion + reduced-motion discipline.
- **Superseded**: the earlier "tangram menagerie" notes (study 031 — warm paper `#F7F3E8`, ink `#2E282A`, retro primaries vermilion/turquoise/sun/leaf, geometric sans + handwritten captions, neo-brutalist pressable buttons, springy `cubic-bezier(.34,1.56,.64,1)` micro-animations) were the site's first Fable study and seeded this effort; its playful spring survives only in the stamp-slam and flap-settle easings. Retired as the page's style.
