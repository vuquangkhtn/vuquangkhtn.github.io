# Distillation: 036 kestrel-frameworks-bicycles — cyanotype drawing-office sheets

Source: https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/036-kestrel-frameworks-bicycles.html
(HTTP 200, 74,968 bytes; single self-contained HTML, ~13.8 KB CSS + ~17 KB JS, zero external fonts, zero frameworks.)
Distilled by research-subagent-036 · 2026-11-10 · frame of reference: `~/.agents/skills/rea-miaai-hub/references/design-language.md`

---

## Staging

**Concept (one sentence, from the meta description):** "Kestrel Frameworks of Marrowdale, Yorkshire. Steel bicycle frames drawn and brazed to measure by Wren Achterberg." The page *is* a set of four numbered drawing-office sheets — each `<section class="sheet" data-no="1" data-title="Side elevation — frame, fork & rider" data-scale="1:5">` is one sheet of a blueprint pack.

**Framing archetype:** *Editorial artifact* (per the design-language frame) — the page is a printed thing: a cyanotype drafting pack with title blocks, zone grids, revision tables, a received stamp, and a colophon. Not "a website about bikes" but "the actual drawings, stacked on the light table."

The four-sheet structure is the whole IA: **Sheet 1** side elevation + schedule of dimensions · **Sheet 2** interactive measure rig (sliders re-draft the drawing live) · **Sheet 3** joinery details A/B/C in magnifier circles · **Sheet 4** programme (gantt), prices, request form.

## Palette

White-lines-on-blue — the light-piece grammar *inverted*: the paper is the saturated color and the ink is the pale line. This inversion is what instantly reads as "cyanotype."

```css
:root{
  --blue:#1B4F9C; --shade:#0E2F66; --line:#F2F6FA; --mark:#FFD23F;
}
```

| Var | Hex | Role |
|---|---|---|
| `--blue` | `#1B4F9C` | The cyanotype paper itself — body background AND the "knock-out" fill: inner tube strokes (`.t-i`), filled solids (`.fb`), detail-circle interiors are all painted blue over pale lines |
| `--shade` | `#0E2F66` | One step deeper: ghost strokes (previous revision outline), selection text color, sheet-stack shadows, CTA text on yellow |
| `--line` | `#F2F6FA` | The ink. Every drawing stroke, all text, borders. Not pure white — slightly cool |
| `--mark` | `#FFD23F` | The single accent — the draughtsman's yellow pencil. Carries: focus outline, `::selection`, live-value highlights, "hot" dimension lines, CTA, the Received stamp |

Tint discipline (all alpha tints of just these two colors):
- Sheet wash: `background:linear-gradient(rgba(242,246,250,.085),rgba(242,246,250,.085)),var(--blue)` — each sheet 8.5% paler than the gap
- Sheet-stack shadow: `linear-gradient(rgba(14,47,102,.55),rgba(14,47,102,0) 30px),…` at the top of each following sheet
- Hairline rules: `rgba(242,246,250,.35–.6)`; header rule `.55`; zone borders `.5`; placeholders `.45`
- Stamp ground: `rgba(27,79,156,.86)` (blue, 86% opaque, under the yellow stamp)

`::selection{background:var(--mark);color:var(--shade)}` — accent selects.

## Typography

Three system stacks, each a voice (zero webfonts):

```css
--eng:"Arial Narrow","DIN Alternate","Roboto Condensed","Roboto Mono",Menlo,Consolas,monospace; /* engineering label voice */
--num:"Roboto Mono",Menlo,Consolas,"DejaVu Sans Mono","Liberation Mono",monospace;              /* measurement voice */
--pen:Georgia,"Times New Roman",serif;                                                          /* the builder's hand */
```

- **Body = the engineering voice:** `font:15px/1.5 var(--eng); letter-spacing:.09em; text-transform:uppercase` on `<body>` itself — the entire site speaks in drafting caps by default.
- **`.num`:** `font-variant-numeric:tabular-nums; letter-spacing:.02em` — every dimension, date, price, drawing number.
- **`.pen`:** `font-style:italic; text-transform:none; letter-spacing:.01em; font-size:1.06em; line-height:1.45; opacity:.9` — Georgia italic escapes the uppercase regime for the maker's narrative asides ("Every Kestrel starts as this sheet: your height, your inseam… and a pencil. The steel comes later."). This two-voice contrast (caps labels vs italic hand) is the study's personality engine.
- **Display h2:** `clamp(32px,6.4vw,92px); letter-spacing:.26em; line-height:1.02; font-weight:400` — huge, very wide-tracked, *not* bold.
- **H1 = SVG lettering fitted to width:** `<text textLength="1000" lengthAdjust="spacing" font-size="58">BICYCLES DRAWN TO MEASURE</text>` in a `viewBox="0 0 1000 62"` — the "measured fit" scale system, using native SVG stretch instead of `measureText`. A second narrow variant (`viewBox="0 0 1000 232"`, two lines, font-size 112) swaps in at 620px.
- **Micro-labels:** 8–11.5px, uppercase, tracking `.12–.34em`, weight 400. E.g. `.brand b{font-size:17px;letter-spacing:.34em}` + `.brand small{font-size:10px;letter-spacing:.3em}`; `.sched caption{font-size:10px;letter-spacing:.3em}`; title-block cell labels `.tb b{font-size:8px;letter-spacing:.26em;opacity:.72}`.
- **Form fields in the hand voice:** `font:italic 18px/1.4 var(--pen)` with placeholders in that voice too (`placeholder="as you'd sign it"`), on transparent inputs with only a 1px bottom border.

## Chrome idioms

The drafting-office chrome is the study's signature — quote-grade examples from source:

- **Title block** (injected per sheet by JS from `data-*` attrs): a 4-column CSS-grid table with `gap:1px; background:rgba(242,246,250,.8)` and blue cells — the 1px gap over the pale background *is* the ruled grid. Cells: `Title` / `Drawn by: Wren Achterberg` / `Scale: 1:5` / `Sheet: 1 OF 4` / `Date: 10 NOV 2026` (runtime-computed) / `Drg No.: KF-25-017-A` (runtime-computed `KF-` + year + revision letter).
- **Zone grid** around every sheet frame: `.zones` strips outside the border — top/bottom `87654321`, sides `FEDCBA`, `font:8px/1 var(--num); opacity:.6` with 1px separators. Pure drawing-sheet convention.
- **Sheet kicker + mega-h2:** `<small>Sheet 2 of 4</small><h2>Measure</h2>` with a right-aligned explanatory paragraph, over `border-bottom:1px solid rgba(242,246,250,.55)`.
- **Sheet nav:** `<nav aria-label="Sheets"><span>Sheet</span><a href="#s1" aria-label="Sheet 1, elevation">1</a>…` — numbered box links that invert on hover.
- **General notes** (`.gnotes`, auto-numbered `counter(n)` in mono): "1. All dimensions in millimetres unless stated. 2. Do not scale. If in doubt, ask Wren. 3. Drawn for one rider. It will not fit your brother." — institutional voice with dry character.
- **Received stamp** (`.stamp`): "Received — W.A." + date, `border:2.5px solid var(--mark); color:var(--mark); transform:rotate(-8deg)`, double inset ring, hidden until form submit, then slams in.
- **Revisions table** (`aria-live="polite"`): `Rev | Description | By` — rows auto-appended as `A/B/C…` (`LET='ABCDEFGHJKLMNPRSTUVWXYZ'` — no I,O,Q,S, real drawing-office rev letters), "By" always "W.A.", capped at 6 rows.
- **Margin note:** `.pen` paragraph rotated `rotate(-2.2deg)` at the drawing's top-right with a hand-drawn arrow SVG: "This is you, roughly. Change the figures on Sheet 2 and the frame follows. — W."
- **Colophon:** `<p class="colophon">Third angle projection · All frames numbered and signed inside the bottom bracket shell</p>` — `9.5px; letter-spacing:.26em; opacity:.7; text-align:center`.
- **Double-ring stamp buttons** (`.stampbtn`): `box-shadow:inset 0 0 0 3px var(--blue),inset 0 0 0 4px currentColor` — a rubber-stamp double border; hover inverts bg/fg; `:active{transform:translate(1px,2px)}`.
- **Mascot crest:** an inline-SVG kestrel (template-cloned into brand + title block), body bobs, wings flick only when the reader is idle.

## Layout grammar

- **Sheet stack, not sections:** `.sheet{max-width:1560px;margin:0 auto;padding:clamp(15px,2.3vw,34px)}` + `.sheet + .sheet` gets the shade-gradient shadow — sheets visibly *stack* down the page. Inside each, `.frame{border:1.5px solid var(--line);padding:clamp(12px,2.2vw,34px)}` — the drawing border. Zones sit *outside* the frame (`bottom:100%` etc.).
- **Fold creases** (see Texture) run through every sheet at `left:50%` and `top:54%` — the sheet reads as a physical folded print.
- **Height-aware artboard sizing:** `.dwrap{width:clamp(300px,min(57vw,calc(100vh - 248px)),900px)}` — the drawing is sized to the *viewport height*, not just width.
- **Sticky sheet-2 drawing:** `position:sticky; top:14px` with graph-paper background — controls scroll past a pinned live drawing; at ≤980px it un-sticks and gains `box-shadow:0 14px 18px -10px rgba(14,47,102,.75)`.
- **Magnifier circles (Sheet 3):** each detail is `<clipPath><circle r="139">` content + a `r=140` ring drawn on top, in a `repeat(3,minmax(0,1fr))` grid — "Detail A — Head lug" / "B — Bottom bracket" / "C — Rear dropout".
- **Gantt as CSS grid:** `.g-track{grid-template-columns:repeat(14,1fr)}` with `background:linear-gradient(90deg,rgba(242,246,250,.3) 1px,transparent 1px) 0 0/calc(100%/14) 100%` for week ticks; bars placed by `grid-column:start/end`, hatched fill.
- **Breakpoints:** 980px (hero collapses, drawing reorders first `order:-1`, details 1-col, gantt note column removed) and 620px (narrow H1 variant, side zones hidden, title block reflows to 2 columns, form 1-col). The frame's usual single ~620px breakpoint, plus one mid tier.
- **Vector unit system, not rem ladder:** the drawing sets `--u` (viewBox units per px) and `--fs` (clamped 8.4–12.5px label size) on resize; all stroke widths are `calc(var(--u)*Npx)` so line weights scale with the drawing like a real print.

## Motion grammar

Easings — exactly two, per the frame's settle+spring law:

```css
--ease:cubic-bezier(.62,.04,.18,1);   /* the settle */
--spring:cubic-bezier(.2,1.5,.36,1);  /* the overshoot */
```

- **H1 draw-on:** SVG lettering starts `stroke-dasharray:420;stroke-dashoffset:420;fill-opacity:0`, then `@keyframes letter{55%{fill-opacity:0}to{stroke-dashoffset:0;fill-opacity:1}}` over `1.5s var(--ease) .1s` — the outline is *drawn*, then inked.
- **Draft choreography** (the hero move): every drawing path gets `pathLength="1"`, so `.drafting .dr{stroke-dasharray:1;stroke-dashoffset:1;animation:draft var(--t,.5s) var(--ease) var(--d,0s) forwards}` draws each line to order. Per-path `--d` delays sequence ground (0.05s) → centre-lines (0.1/0.28) → wheels (1.25–1.65) → tubes → rider (2.15) → dimensions (2.1 + i×.07); fills fade with `--d` too. Sheet 1's full draft window: `3250ms`. Sheet 2 re-drafts on first scroll-in (IntersectionObserver).
- **Asymmetric highlight decay — the yellow-pencil trick:** schedule cells and slider outputs sit at `transition:color .9s` (slow fade back to white) but switch to `transition-duration:.08s` the instant they go `hot`/`.live` (snap to yellow). Value changes flash yellow fast, cool down slowly.
- **Construction-arc sweep** via Web Animations API: `el.animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration:520,easing:'cubic-bezier(.62,.04,.18,1)'})`.
- **Stamp slam:** `@keyframes slam{from{transform:rotate(-13deg) scale(2.2);opacity:0}35%{opacity:.95}to{transform:rotate(-8deg) scale(1);opacity:.95}}` at `.5s var(--spring)` — arrives big and overshoot-settles.
- **Revision wipe:** new rev row is yellow (`transition-duration:0s`) then its description wipes in `@keyframes wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}` `.6s var(--ease)`.
- **Gantt bars:** `transform-origin:0 50%;transition:transform .8s var(--ease) var(--d)` from `scaleX(0)`, staggered `i×.09s`; caption asides fade at `--d:.5+i×.09s`. Detail circles: stroke draw `1.25s var(--ease) var(--d)`, fills `.7s ease-out`, revealed at IO threshold `.22`.
- **Ambient life, gated on stillness:** the kestrel bobs `3.4s ease-in-out infinite alternate` always; wings flick `.09s linear infinite alternate` **only** under an `.idle` class applied after **1800ms** without input — "the kestrel only hovers when you are still."
- **Physics loop:** one rAF, frame-rate-independent exponential smoothing `k=1-Math.exp(-dt/135)`, per-key epsilon thresholds stop the loop when settled (`settle()` clears `.live`/`hot` after 650ms; 1100ms under reduced motion). `visibilitychange` cancels rAF when hidden, `kick()` restarts.

## Texture & materials

The cyanotype surface is four stacked SVG `feTurbulence` layers on a fixed full-viewport `<svg class="tex" aria-hidden="true">` (z-index 50, pointer-events none):

```html
<filter id="blotch"><feTurbulence type="fractalNoise" baseFrequency=".0032 .0045" numOctaves="3" seed="11"/>
  <feColorMatrix values="0 0 0 0 .055  0 0 0 0 .184  0 0 0 0 .4  1.9 0 0 0 -.78"/></filter>  <!-- opacity .5 -->
<filter id="bloom" baseFrequency=".006 .004" octaves 2 …>                                   <!-- pale blooms, .16 -->
<filter id="fibre" baseFrequency=".4 .07"  octaves 2 …>                                     <!-- horizontal paper fibres, .1 -->
<filter id="grain" baseFrequency=".9" octaves 1 …>                                          <!-- fine grain, .34 -->
```

Each `feColorMatrix` tints noise toward the blue/white of the palette; blotch is the big exposure mottling, fibre is anisotropic (x .4 / y .07) for paper grain direction.

- **Fold creases** — signature material trick, pure gradients:
```css
.sheet::before{top:0;bottom:0;left:50%;width:70px;margin-left:-35px;
  background:linear-gradient(90deg,rgba(14,47,102,0),rgba(14,47,102,.16) 48%,rgba(14,47,102,.6) 49.4%,
    rgba(242,246,250,.2) 50.6%,rgba(242,246,250,.05) 54%,rgba(242,246,250,0))}
```
(a matching 180° one at `top:54%`) — dark trough, one-pixel pale ridge, feathered out: reads as a folded sheet at zero cost.
- **Graph paper:** `linear-gradient(rgba(242,246,250,.07) 1px,transparent 1px) 0 0/100% 5.05%, linear-gradient(90deg,…)` — 1px grid every 5.05%.
- **Hatching:** gantt bars `repeating-linear-gradient(-45deg,rgba(242,246,250,.6) 0 1px,transparent 1px 6px)`.
- **Ruled writing paper:** textarea `background:repeating-linear-gradient(transparent 0 1.38em,rgba(242,246,250,.35) 1.38em calc(1.38em + 1px)) 0 5px` with `line-height:1.4em` — you write on the lines.
- **Engineering line conventions, done properly:** centre-lines use the real dash chain `[16u,3.5u,2u,3.5u]`; the rider is dotted (`0 4.6u`); the previous revision is a dashed ghost (`6u 4u`) labelled "REV A" in-scene; hidden edges `5 3.5`, pitch-centre `15 3 2 3`.

## Accessibility & perf

- **Described drawings:** every SVG carries `role="img"` + a full-sentence `aria-label` — the gantt's describes all 14 weeks ("Fourteen-week programme: measure week 1, draw weeks 1 to 2, mitre 3 to 4…"). Tube hit-areas get `aria-label` with spec text; sheet-1 hits are `tabindex="0" role="img"`.
- **Sliders are real sliders:** `role="slider" tabindex="0" aria-valuemin/max/now/text aria-labelledby`, keyboard map Arrow(±step) / PageUp·Down(×5) / Home / End; drag vs tap handled with pointer capture.
- **Live regions:** revisions table `aria-live="polite"`; form errors in `<em aria-live="polite">` + `aria-invalid`; success reply `role="status"`. `.sr` utility class for visually-hidden text.
- **Focus:** `:focus-visible{outline:2px dashed var(--mark);outline-offset:4px}` — the yellow dashed "pencil" outline, echoed on inputs (offset 3px) and sliders (offset 5px). `:focus{outline:none}` only strips the mouse ring.
- **Reduced motion — CSS and JS both:** CSS block kills letter draw (jumps to final state), wing/bob (`animation:none!important`), all transitions, stamp slam, wipes; `html{scroll-behavior:auto}`. JS: `reduce` short-circuits `draft()`, `kick()` snaps values without rAF, `.detail/.gantt` get `.in` immediately, settle window 650→1100ms.
- **Perf:** IO-gated updates (`d.vis`/`d.dirty` — offscreen drawings skip re-render), reveal observers `unobserve` after firing; single rAF that *stops itself* when values settle and cancels on `visibilitychange`; 60ms-debounced resize recomputing `--u/--fs`. Resolution independence is the DPR story — pure vector, stroke widths in `--u` units, no canvas, no bitmap scaling anywhere. `touch-action:pan-y` on interactive SVG/rulers so vertical scroll survives.

## Borrow / Leave for The Papers act

The Papers act = education, BSc, HCMUS 2014–2018, GPA 8.3/10, yearly scholarships. Cyanotype *is* the right metaphor for "academic foundations drawn to scale" — a blueprint is literally the drawing that precedes the build. What maps, what's noise:

### BORROW

1. **The sheet-frame chrome, wholesale.** Four "transcript sheets," each with: zone strips (`87654321` / `FEDCBA`) outside a `1.5px solid var(--line)` frame; the injected title block remapped to `Institution: HCMUS — VNU-HCM` · `Degree: BSc` · `Scale: 1:10` · `Sheet: 1 OF 4` · `Date` · `Drg No.: HCMUS-14-018-REV A`; kicker `Sheet 1 of 4` + wide-tracked mega-h2 (`FOUNDATIONS`, `PROGRAMME`, `HONOURS`, `CONTINUED`); numbered general notes in dry institutional voice ("1. All grades in tenths unless stated. 2. Do not scale. Verify against the transcript. 3. Drawn to the 10.0 scale of the Vietnam university system."); and a colophon line ("Third angle projection · Verified against the original transcript").
2. **The palette verbatim:** `--blue:#1B4F9C` paper · `--line:#F2F6FA` ink · `--shade:#0E2F66` ghosts/shadows · `--mark:#FFD23F` the single highlighter. Keep the *inversion* (blue paper, pale ink) — it is what makes it read as blueprint rather than "blue website." `::selection{background:#FFD23F;color:#0E2F66}`.
3. **The dimension-line idiom for the numbers that matter.** GPA 8.3/10 as a real annotated dimension — extension lines, arrowheads, letter `D`-style callout ("GPA 8.3 / 10.0" in `--num` tabular, rotated along the line) — plus the yellow hot-state trick (`transition:color .9s` decay, `.08s` attack) on whatever number is currently hovered. Coursework as the `Schedule of dimensions — mm` table: row letter (A, B…) + course name + tabular grade, rows hover-highlighting the same dimension on a foundational-diagram drawing.
4. **The four-year programme as the hatched gantt** — 2014→2018 (8 semester columns instead of 14 weeks), `repeating-linear-gradient(-45deg,…)` bars, `scaleX` draw-in staggered `.09s`, Georgia-italic asides per row ("algebra, analysis, and the first all-nighter"). Scholarships as the **Revisions table**: `Rev | Award | By` with proper skip-I/O/Q/S rev letters, `aria-live="polite"`, yellow-on-insert + `clip-path` wipe — e.g. `A · Yearly scholarship for top cohort results · HCMUS`.
5. **Motion kit:** the SVG-H1 `textLength` full-width fit + stroke-draw-then-fill entrance (`1.5s var(--ease) .1s`); `pathLength="1"` dash-draw choreography with `--d`/`--t` per-path staging for any foundational diagram; the "Received/Awarded" stamp slam (`scale(2.2)→1`, `cubic-bezier(.2,1.5,.36,1)`, `rotate(-8deg)`) as the act's one set-piece (e.g. "Verified — HCMUS" when the visitor reaches the sheet's end); easings `cubic-bezier(.62,.04,.18,1)` + `cubic-bezier(.2,1.5,.36,1)` as the act's only two.
6. **Texture stack, near-verbatim:** the four-filter `feTurbulence` cyanotype surface (blotch .5 / bloom .16 / fibre .1 / grain .34), the fold-crease gradients between sheets (perfect for "sheet 2 of the transcript"), the graph-paper grid behind any diagram, and the ruled-line textarea if there's a contact/notes field downstream.
7. **A11y/perf patterns, mandatory:** dashed `:focus-visible` yellow outline; `role="img"` + full-sentence `aria-label` on every SVG; IO-gated reveal + `unobserve`; self-stopping rAF if any loop exists; the full reduced-motion CSS block + `reduce` JS short-circuits.
8. **The margin note voice:** one Georgia-italic aside rotated `-2.2deg` with the drawn arrow — e.g. "This is roughly where it started: calculus at eight a.m., four years of scholarships stapled to the wall. — Q."

### LEAVE

- **The live parametric engine** — IK rider solver, `solve()` geometry, exponential-smoothing rAF re-draft, four scale-rule sliders, auto-logging revisions. The education act has no live parameters; a *static* SVG with the draw-on choreography preserves 90% of the effect at 5% of the JS. Drop the whole measure rig.
- **The kestrel mascot + idle-flick** — lore-specific. If The Papers act needs a crest, reuse only the *pattern* (bob always; extra motion only after 1800ms idle); otherwise cut.
- **Bicycle lore everywhere** — prices table, "audax/touring/gravel," "Kettle always on." The Papers act's equivalent charm should come from transcript facts (course names, scholarship citations), not inherited copy.
- **Uppercase `.09em` as the body default** — works at 74KB scale because every paragraph is short. For a portfolio act mixing with other acts, reserve caps-tracking for labels/kickers; keep body prose in a normal voice.
- **Double title-block density on mobile** — the 4-column `.tb` reflows but stays busy; a 2-cell version (Institution / Drg No.) is enough below 620px.

**Bottom line:** take the frame chrome (title block, zones, sheet kickers, gnotes, colophon, stamp), the four-color cyanotype palette with the yellow-pencil highlight behavior, the draw-on choreography (`pathLength=1` + `--d` staggers, letter `1.5s` entrance), the texture stack (turbulence quartet + crease gradients + graph paper), and the full a11y/reduced-motion discipline. Leave the interactive solving engine and all bike lore. Net: education becomes "the drawing from which everything later was built," rendered as four blueprint sheets.
