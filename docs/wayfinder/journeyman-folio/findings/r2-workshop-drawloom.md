# Findings — 058 the-drawloom (classical weaving draft as workshop page)

Study source: https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/058-the-drawloom.html
(local copy read for this distillation: `/tmp/drawloom-research/058-the-drawloom.html`, 65,201 bytes — the collection's 64 KB average)
Frame: `/Users/gauwan/.agents/skills/rea-miaai-hub/references/design-language.md`
All line references below are to the local HTML copy.

---

## Staging

**One-sentence concept** (the study's own intro, line 205): *"A weaver's draft is a program in three small grids. … The cloth is their product."* The page is a weaver's studio bench: a left rail of controls and glossary, a center loom that literally weaves the draft you draw, a right "pattern book" of eight finished swatches.

**Framing archetype:** hybrid — an **editorial artifact staged as a workbench**. It keeps the collection's editorial chrome (double-rule masthead, kickers, colophon, caption tiles) but lays it out as a scrolling three-column studio (`main.studio`, lines 27–31) instead of a locked viewport scene. `html` allows vertical scroll (only `overflow-x` is clipped, line 16); the draft and pattern book panes are `position:sticky; top:18px` (lines 126, 152) so the bench stays under your hands while the copy column scrolls. This is the study that proves an act *can* scroll and still feel like a place.

The metaphor alignment for The Workshop act is exact: draft = program, threading/tie-up/treadling = the three small grids you combine, cloth = the shipped product. Study 058 is already saying "patterns threaded into codebases" for us.

---

## Palette

All material/dye-named vars (`:root`, lines 9–10) — never `--primary`. Every accent has a job:

| Var | Hex | Role |
|---|---|---|
| `--linen` | `#EFE7D6` | page ground (warm, not white) |
| `--paper` | `#F6F0E3` | inset panels: the draft "papers" under the grids (line 589), stage exports (line 888) |
| `--iron` | `#2A2A2A` | the ink — text, hairline-strong rules, borders, grid cells |
| `--madder` | `#A8452C` | THE single saturated accent: h1's "The" (line 40), focus outlines (line 66), selected markers (lines 102, 162–163), warnings `dd.warn` (line 117), term underlines (line 119), keyboard cursor (line 657), float warnings in the lens (line 675) |
| `--indigo` | `#1E3A5F` | a yarn; also the color of inline defined terms (line 119) |
| `--weld` | `#D9A441` | the "lift" highlight: raised shafts/treadles/current pick painted `rgba(217,164,65,.42–.75)` over the grids (lines 592–594); tooltip left border (line 122); brass accents |
| `--rule` | `rgba(42,42,42,.22)` | hairline rules (controls sections, colophon) |
| `--rule2` | `rgba(42,42,42,.55)` | stronger rules (masthead double-rule second stroke, seg borders) |

JS-side material ramps (lines 288, 294–295, 564, 76, 138): `SHADE #17100A`, `LIGHT #FFF8E8`, `UNDER[]` = every yarn mixed 44% toward SHADE for threads passing *under*; wood/brass ramps `#E9C277→#C08A3A→#774722` (shuttle), `#C99243→#8A5426` (slider thumb), and an 8-stop conic brass ring `#8C6420,#F3D58C,#B98A2E,#6E4B14,#D9A441,#FBE7B0,#A5761F,#8C6420` (the magnifier, line 138).

Light-piece grammar per the frame: warm paper ground, near-black ink, exactly one saturated accent (madder) — with weld as a *state* highlight (only appears when something is lifted/active), indigo reserved for vocabulary. Shadows are warm, never black: `rgba(60,40,15,.16)` cloth drop-shadow (line 130), `rgba(40,25,8,.24)` shuttle shadow (line 563).

---

## Typography

Zero webfonts; two stacks as vars (lines 11–12):

```css
--serif:"Adobe Garamond Pro","EB Garamond",Garamond,"Cormorant Garamond",Georgia,"Times New Roman",serif;
--sans:"Gill Sans","Gill Sans MT","Avenir Next","Trebuchet MS",system-ui,sans-serif;
```

Treatments (all verbatim):

- **Display h1** (line 39–40): weight **400** (not bold), `line-height:.86`, `letter-spacing:-.012em`, 53px. The word "The" is a separate block: italic, `.4em`, madder, sitting above "Drawloom" — the editorial overline device.
- **Subtitle kicker** (line 41–42): `font-variant:small-caps; letter-spacing:.24em; font-size:14.5px; text-transform:lowercase`, preceded by a 7px madder square `rotate(45deg)` (diamond). "◆ cloth from a diagram".
- **Micro-label kickers `.lab`** (line 47): sans 9.5px, uppercase, `letter-spacing:.2em`, weight 600, flex row so a live value rides on the right: `<p class="lab">Loom <span id="status">pick 0 / 0</span></p>` (line 209) — value styled `font-variant-numeric:tabular-nums`, weight 400, opacity .8.
- **Buttons** (line 53): sans 10px, uppercase, `.14em`, 600. **Everything button-like is `border-radius:0`** — workshop squareness is enforced everywhere (`.btn`, `.chip`, `.seg`, line 54/96/104).
- **Stats table `dl`** (lines 114–117): sans 10.5px; `dt` uppercase 9px `.14em` opacity .75; `dd` right-aligned, tabular-nums, 600; warning state `dd.warn{color:var(--madder)}`.
- **Narration `.say`** (line 113): serif italic 15.5px/1.3 — the cloth's auto-written caption: *"This is goose-eye: a 2/2 point twill, treadled as it is threaded."*
- **Keyboard hint `.keys`** (line 51): sans 10.5px, `.05em`, opacity .78 — *"Draw in any grid · arrows and space too · hold the glass over the cloth"*.
- **Canvas figure labels** (line 604): `600 {fs}px "Gill Sans","Gill Sans MT","Trebuchet MS",sans-serif` at `rgba(42,42,42,.78)` — the sans voice continues into the drawing.
- **Export caption** (lines 892–896): italic 30px Garamond "The Drawloom" over a letterspaced-by-spacing line built as `(W + ' ENDS  ·  ' + P + ' PICKS  ·  LONGEST FLOAT ' + maxFloat).split('').join(' ')` in `600 13px Gill Sans` — a swatch label rendered into the saved PNG.

---

## Chrome idioms

- **Double-rule masthead** (lines 37–38) — the broadsheet move:
  ```css
  .masthead{padding-bottom:12px;border-bottom:1px solid var(--iron);position:relative}
  .masthead::after{content:"";position:absolute;left:0;right:0;bottom:-4px;border-bottom:1px solid var(--rule2)}
  ```
- **Maker lore, in the colophon** (line 278): *"Every swatch here is the same loom, re-threaded. Nothing is drawn; all of it is lifted."* — the study's thesis line, italic serif under a hairline. The preset captions are lore too: *"plain weave, or tabby: over one, under one, the oldest cloth there is, here checked four and four"*, *"the diagonal of denim and tweed"*, *"herringbone, the diagonal snapped and reversed"*, *"small diamonds with a seed at the heart"*, *"each line trailed by its ghost"*, and for unknown drafts: *"a weave without a name on N shafts: yours to christen"* (lines 355–362, 756).
- **Plate numbering, transposed**: no "Plate 57" — instead grid numerals drawn on the canvas (shaft/treadle indices 1–8, end/pick counts every 8, lines 603–610) and the export label "72 ENDS · 72 PICKS · LONGEST FLOAT 4". The workshop measures instead of cataloguing.
- **Caption tiles**: pattern-book cards (lines 155–164, 907) = canvas thumbnail (1px iron border, `image-rendering:pixelated`) + `em` name ("Plain weave") + `small` sub-caption ("tabby", sans 8.5px uppercase `.14em` opacity .72).
- **Kickers carrying state**: `Loom — pick 12 / 72`, `Pattern book — eight drafts`, `Yarn — tap a swatch to change it` (lines 209, 276, 233).
- **Inline glossary** (lines 119–123, 256): dotted-madder terms in the running copy, `tabindex="0"`, tooltip via `content:attr(data-def)` — iron plate, linen text, **weld left border 3px**, sans 11px. Definitions are voice-written: *"WARP — the lengthwise threads, stretched taut on the loom before weaving begins."*
- **Colophon** (line 165): `font-size:12.5px; font-style:italic; border-top:1px solid var(--rule); opacity:.85`.

---

## Layout grammar

- **Three-column studio** (lines 27–31): `grid-template-columns:256px minmax(0,1fr) 184px; max-width:1720px; margin:0 auto; padding:20px 26px 24px; gap:0 26px`. Note `minmax(0,1fr)` to let the canvas pane shrink.
- **Sticky benches** (lines 126, 152): the tool pane and the book pane both pin with `position:sticky; top:18px` while the copy scrolls.
- **Breakpoints — three, not one** (lines 167–187):
  - `max-width:1279px` — book drops below; `.side{grid-row:1 / span 2}`; cards go 8-across; sticky off.
  - `max-width:1040px` — cards 4-across.
  - `max-width:899px` — flex column **with `.side{display:contents}`** and explicit `order:` to interleave masthead → draft → controls → book (lines 176–183). This `display:contents` reordering is an elegant, reusable responsive trick. Touch targets grow: buttons pad to 10px, chips 26px (line 184).
- **Content-responsive canvas**: the draft re-grids itself — ends `W` steps 28/48/72/96 by container width, cell size `c = clamp(Math.floor((aw - lm - rm - 5)/(W + 10)), 6, 12)` and a viewport-height budget `ah = Math.max(520, vh - 42)` (lines 474–486); resize handled with a 120ms debounce (line 925). No aspect-ratio box — the artboard is computed, because the artifact must be loom-true.
- `html{overflow-x:hidden;overflow-x:clip}` (line 16); body scrolls freely.

---

## Motion grammar

**Vars** (line 13): `--ease:cubic-bezier(.2,.8,.2,1)` (settle) and `--spring:cubic-bezier(.3,1.5,.5,1)` (overshoot). JS twins (lines 297–298): `ease` = easeInOutCubic (`t<.5?4t³:1-(-2t+2)³/2`), `backOut` with `k=1.9`.

- **Entrance choreography** (lines 33–34): staggered rise, 80ms per section:
  ```css
  .rise{animation:rise 1s var(--ease) both;animation-delay:calc(var(--i,0)*80ms)}
  @keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  ```
  Index via inline `style="--i:N"`; masthead 0, controls sections 1–6, panes 1–2 (order interleaved so the center pane rises early).
- **The hero motion — weaving**: each pick is a three-phase shuttle cycle, `FLY=.6, BEAT=.8` (line 288): fly across (easeInOutCubic), beat down `k*k` (ease-in), return `(1-(1-k)*(1-k))` (ease-out) (lines 622–628). After each beat the cloth *recoils* with a damped cosine (line 721):
  ```js
  clothC.style.transform = 'translateY(' + (-Math.min(2.4, c*.22) * beatAmp * Math.exp(-bt*13) * Math.cos(bt*40)).toFixed(2) + 'px)';
  ```
  ~6.4 Hz ringdown, amplitude scaled by weaving speed (`beatAmp = Math.min(1, 9/rate)`), amplitude capped at ~2.4px.
- **Edit ripple** (lines 372–378, 550–554): when a draft changes, cells pop in as a spatial wave — `thrB[e] = now + e*(420/W)` left-to-right across the grid, each cell scaling `backOut` over 300ms. The whole window is bounded by `animUntil = now + 900`.
- **Selection marker** (lines 163–164): the active card grows a 3px madder bar, `animation:mark .5s var(--spring) both; transform-origin:50% 0` with `@keyframes mark{from{transform:scaleY(0)}}`.
- **Button fill** (lines 58–61): hover floods the label from the bottom via `::before` `scaleY(0→1)` `.38s ease`, color crossfades to linen `.35s`; `:active{transform:translateY(1px) scale(.985)}` with `.2s` spring.
- **Micro-springs everywhere**: chips `translateY(-2px)` `.25s` spring on hover (line 99); cards `-3px` `.4s` spring + warm shadow (lines 157–158); slider thumb `scale(1.18)` (line 84); tooltip `opacity .3s ease, transform .4s spring` (line 122); lens ring `scale(.6→1)` `.45s` spring (lines 137–140, 144–145).
- **Speed is exponential** (line 882): `pps = 2 * Math.pow(75, value/100)` → 2 to 150 picks/second, labeled "2 a second … a blur".
- **Ambient life**: none when idle — the loom only moves while weaving, then parks the shuttle (lines 617, 642). Ambient life is the sound (opt-in filtered-noise clack/thump, lines 692–700) and the running pick counter. This matches "one hero interaction; the rest is texture."

---

## Texture & materials

- **Linen ground, drawn in CSS** (lines 17–24) — the study's signature move, two crossed thread-grids plus a skylight:
  ```css
  background-color:var(--linen);
  background-image:
    repeating-linear-gradient(0deg,rgba(42,42,42,.030) 0 1px,transparent 1px 3px),
    repeating-linear-gradient(90deg,rgba(255,255,255,.30) 0 1px,transparent 1px 3px),
    radial-gradient(120% 90% at 50% 0%,rgba(255,252,244,.55),transparent 60%);
  ```
- **Paper grain overlay** (lines 26, 911–916): fixed full-screen canvas, 160×160 ImageData noise warmed toward sepia (`r=v; g=v-6; b=v-22; a=random*46`), applied at `opacity:.5; mix-blend-mode:multiply`, `pointer-events:none; z-index:0`.
- **Yarn as sprites** (lines 392–420): each thread is a cached offscreen canvas — 5-stop linear gradient mixing the yarn toward `SHADE`/`LIGHT` (`.46/.1/.2/.12/.52`), diagonal fiber strokes `rgba(23,16,10,.17)` and `rgba(255,248,232,.13)`, rounded caps (`rr()` arcTo capsule), and per-cell shading where it passes *under* a neighbor (`UNDER[]`, darkened 44%). Variant jitter via `hash3()` (line 299) so no two threads render identically.
- **Thread chips in pure CSS** (line 97) — a reusable "twisted yarn swatch" for any element:
  ```css
  background-image:repeating-linear-gradient(115deg,rgba(0,0,0,.14) 0 1px,transparent 1px 4px),
                   linear-gradient(90deg,rgba(0,0,0,.2),rgba(255,255,255,.14) 50%,rgba(0,0,0,.22));
  ```
- **Brass via conic-gradient** (line 138): the magnifier ring is an 8-stop conic sweep of brass hexes + `inset 0 0 0 1px` inner line + dashed inner ring (line 141) — instant "instrument" without an image.
- **Selvedge loops** (lines 437–449): weft turns drawn as ellipse arcs with 3-pass strokes (shade `.55` → base → light `.3` highlight). The edge of the cloth is *finished*, not clipped.
- **Warm shadows only**: `filter:drop-shadow(0 5px 7px rgba(60,40,15,.16))` on the cloth (line 130); export shadow `rgba(60,40,15,.3)` blur 18 offsetY 8 (line 890); export adds faint 3px horizontal scanlines `rgba(42,42,42,.035)` (lines 889–890) so even the PNG carries paper texture.
- **Draft "papers"** (line 589): the grids sit on `--paper #F6F0E3` rectangles — graph paper laid on the linen bench.

---

## Accessibility & perf

- **Every drawing surface has a keyboard twin** (lines 265–269): invisible `.hit` overlays with `tabindex="0"`, `role="application"`, and aria-labels that *teach the keys*: "Threading grid, eight shafts. Arrow keys move, space sets the shaft." A visible keyboard cursor (paper 4px + madder 2px double ring, lines 652–658) is drawn only when focus is real (`kbd` flag set on keydown, cleared on pointerdown).
- **State mirrors**: `aria-pressed` on every seg button, chip, checkbox, sound toggle, and card (lines 70–71, 90, 101, 107, 162, 858–864); text-only live status ("pick 12 / 72") diffed before writing (lines 729–730).
- **Keyboard-reachable definitions**: `.term` elements carry `tabindex="0"` and open on `:hover,.focus` (line 123) — tooltips that work without a mouse.
- **Focus style**: `outline:2px solid var(--madder); outline-offset:2px` (line 66).
- **Reduced motion, twice over** (lines 188–192, 289, 506, 529):
  ```css
  @media (prefers-reduced-motion:reduce){
    .rise,.card[aria-pressed=true]::before{animation:none}
    .transport{display:none}
    *{transition-duration:.01s!important}
  }
  ```
  JS: `const still = matchMedia('(prefers-reduced-motion: reduce)').matches` → the cloth renders *finished* (`woven = P`), no shuttle, no beat, no sound path. Not just "slower" — the artifact is presented complete.
- **Perf patterns**: `dpr = Math.min(2, window.devicePixelRatio || 1)` (line 477); hairlines go sub-pixel when dpr>1 (`dpr > 1 ? .5 : 1`, lines 546, 586); render loop is dirty-flagged — redraw only when `active || dirty` (line 724); `visibilitychange` cancels rAF (line 726); sprite cache Map with a 900-entry hard clear (line 400); resize debounced 120ms; text nodes diffed before writes (status, lens tag, lines 680–681, 730).
- Sound is opt-in, default off, `aria-pressed` reflected (lines 213–214, 884).

---

## Borrow / Leave for The Workshop act

Target: apprenticeship years VNG → KMS → Codelink, 2017–2022, first-person craft-journal voice, weaving/threading as the metaphor for learning the craft and threading patterns into codebases.

### Borrow (concrete)

1. **The dye palette verbatim** — `--linen #EFE7D6` ground, `--iron #2A2A2A` ink, `--madder #A8452C` as the single accent (links' hover, warnings, selection markers, focus), `--weld #D9A441` as the *active-state* highlight only, `--paper #F6F0E3` for inset panels, `--rule rgba(42,42,42,.22)` hairlines. Indigo `#1E3A5F` can carry defined terms. This is a ready-made craft-journal grammar; per act only one accent should exist, and madder is it.
2. **The linen ground + grain** — the exact three-gradient body background (§ Texture) is thematically literal for a weaving act and costs ~5 CSS lines; pair with the 160² warm-noise multiply overlay. If the whole portfolio adopts one ground treatment, this is the strongest candidate: it reads "woven paper" at any zoom.
3. **The masthead + kicker kit** — double-rule masthead (`border-bottom` iron + `::after` hairline at `-4px`), h1 at weight 400 / `line-height:.86` / `-.012em` with an italic madder "The"-style overline, small-caps `.24em` subtitle with the rotated madder diamond, and Gill Sans 9.5px uppercase `.2em` kickers that carry live tabular values ("pick 12 / 72" → e.g. "apprenticeship — 2017–2022 · 3 shops"). For a journal voice, the kicker values can count artifacts: "commits 1,204 · patterns threaded 9".
4. **The glossary device** — dotted-madder terms with `attr(data-def)` tooltips (iron plate, linen text, weld 3px left border, `tabindex="0"`). The Workshop act's copy can define its shop words in exactly this voice: *"The warp waits; the weft travels"* maps directly to codebase-line metaphors (the standing code waits; the change travels).
5. **`.say` + colophon narration** — italic Garamond 15.5px auto-caption and the italic 12.5px colophon under a hairline. The colophon slot per shop entry is where first-person craft-journal reflection lands; study 058's own colophon ("Nothing is drawn; all of it is lifted.") is the register to write in.
6. **Stats `dl`** — the uppercase-9px-label / tabular-right-600-value grid for per-shop facts (years, team size, what shipped); use `dd.warn` in madder for the one honest failure metric per shop.
7. **Pattern-book cards** — canvas/SVG thumbnails (1px iron border, pixelated) + `em` serif name + `small` sans uppercase sub-caption; hover `-3px` spring + warm shadow; selection = the madder bar growing via `mark` scaleY spring. Ideal for "patterns learned" tiles (one per pattern/practice acquired at each shop).
8. **Motion kit** — `--ease cubic-bezier(.2,.8,.2,1)` + `--spring cubic-bezier(.3,1.5,.5,1)`; the `.rise` stagger (`calc(var(--i)*80ms)`, 1s, translateY 14px); the button bottom-fill `::before` hover; JS `backOut` k=1.9 for pop-ins. One hero motion per act: the **beat recoil** — a damped-cosine `translateY` (`exp(-bt*13) * cos(bt*40)`, ≤2.4px) fired once when the shop's "cloth" (its artifact) finishes weaving in, echoes the loom without shipping the loom.
9. **Accessibility posture** wholesale — the CSS+JS double reduced-motion kill (with `still`-mode "render the finished artifact"), aria-pressed mirroring, `outline:2px solid var(--madder)` focus, tabular-nums counters, dirty-flagged rAF, dpr≤2 with sub-pixel hairlines, 120ms resize debounce.

### Leave (would be noise)

- **The loom simulation itself** — Uint8Array draft model, sprite system, ripple re-weave, shuttle physics. A folio act narrates; it doesn't need an editable instrument. Render static swatch thumbnails instead (the pattern-book card renderer, lines 901–909, is the reusable 15-line version).
- **Audio** (noise-buffer clacks) and the **magnifier lens** (conic brass ring + zoom canvas + float warnings). Gorgeous, but both are instrument chrome; in a portfolio they'd read as gimmick. Borrow the brass conic-gradient as a *static* ornament only if a small instrument motif is ever needed.
- **`role="application"` + invisible keyboard grids** — no editing surface in an act; plain links/summary elements suffice.
- **Exponential speed slider / transport row** — no playback UI in a journal.
- **Global `user-select:none`** — the study only applies it to `#stage` (line 127); a journal's prose must stay selectable/copyable. Keep it confined to any canvas/ornament.
- **96-end canvas density and 1720px three-column width** — an act lives inside a page; keep the 899px `display:contents` reorder trick and the sticky pattern-book, but drop the third column and let the copy column own more measure.

### Net

058 is the closest template the collection has for The Workshop act: a scrolling editorial artifact, dye-named warm palette, one accent, kickers with live counts, a glossary in the margins, and a colophon that speaks in the exact first-person craft register the act wants. Take its skin (palette, type kit, textures, motion pair, a11y posture) and one echo of its motion (the beat), leave its engine.
