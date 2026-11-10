# Study 002 — airship-terminal-split-flap: distillation for The Horizon act

Source: https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/002-airship-terminal-split-flap.html
("Aerodrome Lisbeth — Airship Departures", single-file HTML, 54 KB, zero webfonts, zero frameworks.)
Frame reference: `~/.agents/skills/rea-miaai-hub/references/design-language.md`.
All quotes below are verbatim from the study's CSS/JS.

## Staging

**Concept:** a fictional airship aerodrome's Solari departures board — "Aerodrome Lisbeth · Mast Field East" — hanging in a dark station hall, read straight-on: enamel-framed board, brass operating console below it, a second smaller framed panel for field conditions, and a fine-print colophon ("Aerodrome Lisbeth keeps your own local time · Ships, schedules and weather are invented").

**Archetype:** *one instrument in a dark hall* (per the design-language frame) — but executed as a **framed artifact**, not a full-bleed scene: the board is an `.frame` enamel box inside a centered `.hall{max-width:1500px}` container, and the "hall" is suggested only by light: `radial-gradient(120% 70% at 50% -12%,rgba(245,196,0,.075),…)` above and `radial-gradient(90% 60% at 50% 108%,rgba(242,239,228,.035),…)` below over `#060605`. Everything is invented lore (16 destinations, 14 ships, 9 announcements — "THE BAROMETER IN THE BAR IS DECORATIVE", "EXPECT GEESE. THEY HAVE RIGHT OF WAY"), data computed deterministically from a hash so the board feels alive but is pure fiction.

## Palette

`:root` (verbatim):

```css
--board:#0F0F0E; --flap:#1A1A18; --ink:#F2EFE4; --yel:#F5C400; --red:#D4401F;
--dim:#8f8c80; --f1:#272724; --f2:#1A1A18; --f3:#0b0b0a;
--brass:linear-gradient(158deg,#e6cd82 0%,#b8963a 28%,#8a6a1f 58%,#c9aa52 82%,#7a5c18 100%);
```

Page base: `html{background:#060605}` with body as *light*, not color:

```css
body{background:
  radial-gradient(120% 70% at 50% -12%,rgba(245,196,0,.075),transparent 60%),
  radial-gradient(90% 60% at 50% 108%,rgba(242,239,228,.035),transparent 70%),
  #060605}
```

Roles: `--board #0F0F0E` board face · `--flap/--f1/--f2/--f3` the 3-stop flap-shell ramp (`#272724 → #1A1A18 → #0b0b0a`) · `--ink #F2EFE4` cream text on flaps · `--yel #F5C400` THE single accent (rule, lamps, colon dots, status words, chip LEDs, focus ring) · `--red #D4401F` emergency-only (STORM HOLD / CANCELLED tones, lamp `data-s=bad`) · `--dim #8f8c80` warm grey for micro-labels · dimmed departed tone `#77746a` (canvas `TONES d:`).

**How the dark register is achieved (explicit):** the base is **warm-tinted near-black** (`#060605`, `#0F0F0E`, `#090908` detail strip — all hue-warm, never blue/plum), the ink is **pale warm cream** `#F2EFE4` (this is the frame's canonical dark-pair), and there is **exactly one neon accent** `#F5C400` signal yellow, with `#D4401F` red reserved purely as a semantic alarm. Depth comes from light, not color: yellow/cream radial washes at top/bottom of the viewport, glow shadows (`box-shadow:0 0 18px rgba(245,196,0,.28)` on the rule, `0 0 10px rgba(245,196,0,.85)` on go-lamps), and an SVG `feTurbulence fractalNoise` overlay at `opacity:.07; mix-blend-mode:overlay` (180×180 tile data-URI) for grain. Warm black + cream + one yellow = instrument-at-night, not "dark mode UI".

## Typography

Zero webfonts; three stacks through vars:

```css
--cond:"Arial Narrow","Helvetica Neue Condensed","HelveticaNeue-CondensedBold","Roboto Condensed","Liberation Sans Narrow","Nimbus Sans Narrow","DejaVu Sans Condensed",Impact,Haettenschweiler,"Franklin Gothic Medium",sans-serif;
--sans:"Helvetica Neue",Helvetica,Arial,"Liberation Sans",sans-serif;
```

Plus `Menlo,Consolas,"DejaVu Sans Mono","Courier New",monospace` (announcement fallback) and `Georgia,"Times New Roman",serif` (maker's plate only).

Treatments:

- **Station title** (the flap-board voice): `font:700 clamp(25px,3.6vw,52px)/.92 var(--cond); font-stretch:condensed; letter-spacing:.012em; text-transform:uppercase; white-space:nowrap`, with an inline kicker `small{font:600 clamp(8px,.78vw,11px)/1 var(--sans); letter-spacing:.34em; color:var(--dim); vertical-align:.5em}`.
- **Trilingual kicker**: `.dep{font:600 clamp(8.5px,.98vw,13.5px)/1 …; letter-spacing:.46em; text-transform:uppercase}` reading `Departures <b>·</b> Abflug <b>·</b> Partenze` — the interpuncts colored `--yel`.
- **Micro-labels** everywhere: 8.5–11px, weight 600–700, uppercase, tracking `.24em–.46em`, `--dim` color. Column headers: `clamp(7.5px,.72vw,10px)`, `.3em`.
- **The character-cell letterforms are canvas, not DOM**: `getAtlas` paints glyphs at a 100px master (`x.font='700 100px '+FONT`), measures `actualBoundingBoxAscent` of `H`, rescales `px=(digits?.63:.64)*H*100/asc`, then per-cell horizontal squeeze `sx=Math.min(1,(digits?.74:.92)*W/wide)` — measured-fit plus squeeze so every glyph fills its flap identically. Cells are `aria-hidden`.
- **Announcement fallback** (reduced-motion path): `font:700 13px/1.5 Menlo,…; letter-spacing:.08em; text-transform:uppercase; color:var(--yel)` — mono as the "announcer over the tannoy" voice.
- **Maker's plate**: engraved brass-serif — `b{font:700 12.5px/1.1 Georgia,…; letter-spacing:.22em; text-transform:uppercase; text-shadow:0 1px 0 rgba(255,244,196,.55)}` + `span{font:italic 400 10px/1.1 Georgia,…; letter-spacing:.14em}`.

## Chrome idioms

- **Maker's plate** (`.plate`): brass bar between the console switches, screwed at both ends, reading verbatim `Lisbeth Signalwerk` / `Type 4 · No. 0417 · Mast Field East`. Its `aria-label` tells the joke: "Lisbeth Signalwerk, Type 4. Press to run the flap self-test". Pressing it runs a **self-test**: "every flap makes one full revolution" — `setCell(c,fl.drum[c.tgt],i*40+(fl.col+j)*14,true)` spins each drum fully (`rev=f.len`), staggered 40ms/row + 14ms/character.
- **Lever console** (`.lever`): brass plate (58×34) with slot + dark knob; "Next announcement — Pull to advance" with a keyboard chip `<span class="key">R</span>`. The pull is one keyframed move with *per-segment easings*: `@keyframes pull{0%{…cubic-bezier(.5,0,.9,.5)}30%{transform:translateX(23px);animation-timing-function:cubic-bezier(.3,1.7,.5,1)}100%{transform:translateX(0)}}` (0.7s both).
- **Toggle switch** (`.sw`, "Clatter On/Off"): brass plate + `.bush` hub + `.bat` paddle `rotate(-34deg)` ⇄ `rotate(34deg)` on `transition:transform .42s var(--spring)`; state mirrored in `aria-pressed` and the `<span id="soundState">On/Off</span>` label.
- **Signal-yellow status words**: `ON TIME / BOARDING / BALLASTING / GAS CHECK / MOORED / DELAYED / STORM HOLD / CANCELLED / DEPARTED`, each row's status field re-toned by state — `tone=(st==='STORM HOLD'||st==='CANCELLED')?'r':st==='DEPARTED'?'d':'y'` — and a per-row lamp: `.lamp[data-s=go]` blinking (`@keyframes blink{0%,46%{opacity:1}54%,92%{opacity:.16}…}`), `wait` steady dim glow, `bad` red glow. Filters are brass-ish chips with count badges: `<button class="chip" data-f="boarding">Boarding<i id="nBoard">0</i></button>`, pressed state = inset shadow + lit LED (`chip[aria-pressed=true]::before{background:var(--yel);box-shadow:0 0 8px rgba(245,196,0,.8)}`).
- Header **rule**: `height:3px;background:var(--yel)` that draws itself in: `animation:rule 1.4s var(--glide) both; @keyframes rule{from{transform:scaleX(0)}}` plus glow.
- **Pictogram**: yellow rounded-square SVG badge with a black airship glyph.
- **Colophon**: `.fine` — "Aerodrome Lisbeth keeps your own local time · Ships, schedules and weather are invented".

## Layout grammar

- Centered container `.hall{max-width:1500px;margin:0 auto;padding:clamp(4px,1.5vw,22px) clamp(4px,1.6vw,26px) 34px}`.
- **Board grid construction**: defaults `.grid{--w:22px;--h:36px;--g:2px;--fg:18px;--lamp:18px;--rg:6px}` — cell width/height, cell gap, field-group gap, status-lamp gutter, row gap. Each `.row{display:flex;gap:var(--fg);padding-left:var(--lamp);margin-bottom:var(--rg)}` = lamp + N canvas fields; hairline separators via `.row::after{…height:1px;background:rgba(242,239,228,.05)}`.
- **JS layout()** picks a column mode from container width: `full` (W≥980: Time 5 / Destination 19 / Ship 13 / Mast 1 / Status 10 cells), `mid` (W≥540, drops Ship), `phone` (To 11 / Status 8, shorter words via `SHORT={'CANCELLED':'CANCELED',…}`). Cell width solved to fit: `w=Math.min(30,Math.floor((W-lamp-fg*(nf-1))/N)-g)`; height from aspect: `h=2*Math.round(w*.83+.2)` (0.83 ratio, forced even for the fold); leftover width redistributed into field gaps.
- **Detail strip** = the accordion: `display:grid;grid-template-rows:0fr` ⇄ `1fr` on `.open`, `transition:grid-template-rows .6s var(--glide)`; a `.snap` class kills the transition during re-parenting (`slot.el.after(detail)` then `void detail.offsetHeight`). Body: `#090908`, `border-left:3px solid var(--yel)`, yellow pointer triangle `::before`.
- **Breakpoints**: 900px (weather → 2-col, barograph full-width), 600px (frame radius 8, rivets `--rv:none`, header stacks, chips tightened, plate goes `order:3;flex-basis:100%`, `.lever .key{display:none}`), plus `prefers-reduced-motion`. Resize handling is JS (mode rebuild) with a 160ms debounce and an innerWidth-unchanged guard.
- Rows dim when filtered: `.row.dimmed{opacity:.36}` (hover restores to `.7`).

## Motion grammar

Ease vars (both): `--spring:cubic-bezier(.3,1.55,.45,1); --glide:cubic-bezier(.22,1,.3,1)`.

**Flap-flip mechanics (canvas sprite technique)**

- **Sprite atlas, not per-frame painting**: `getAtlas(W,H,tone,drum,dpr)` pre-paints one sheet — every drum face painted once per cell size/tone/drum — keyed `W+'|'+H+'|'+tone+'|'+drum.length`, cached with an LRU-ish reset (`if(nAtlas++>40){atlases={}}`). Each face: top-half ramp `#2b2b28→#252522→#1A1A18`, bottom-half ramp `#0a0a09→#171715→#1c1c1a`, 1px `#040403` hinge line at mid-cell, two hinge pins (`2×5·dpr` nubs), a top light line `rgba(255,252,235,.07)`, and a hinge shadow `rgba(0,0,0,.55)→0` over 34% of the lower half.
- **The fold** (`drawFlip(c,p)`): the old top half stays; a swinging half is drawn with height `hh*cos(a)` (foreshortening) and width bulge `wd=W*.08*sin(a)`; angle `a=PI*pow(p,1.7)` — slow start, fast clatter. Past 90°, the incoming bottom half lands with a light flash `rgba(255,250,228,.17*s)`; the outgoing half darkens `rgba(0,0,0,.62*s)`. **The last flap wobbles**: `else{q=(p-.34)/.66; a=PI-.42*Math.sin(PI*q)*(1-.4*q)}` — a mechanical bounce-back.
- **Timings**: `STEP=55` ms per intermediate flap, `LAST=215` ms for the final settle; steps chain inside one rAF pass (`while p>=1 → beginStep`) so a laggy tab catches up without a backlog (`settleAll()` also snaps everything after tab-hidden).
- **Stagger = the clatter wave**: `setField(f,str,d0,per)` gives cell *i* delay `d0 + i*per`; per-character `COLD=9` ms, per-row `ROWD=58` ms — text appears sweeping left→right, row by row.
- **Load choreography ("blank flaps → clatter roll")**: every cell boots at the drum's blank face (`start=d===DIGITS?10:0`); 380 ms after load, `setTimeout(function(){render(true,0)},380)` fills the board, each cell rolling through the drum to its target with the row/char stagger. Opening a manifest re-rolls detail cells from blank (`resetCell`).
- **Ambient life**: live clock (digits flip only when they change; `role="img"` label updated each minute), flights expire and re-status on a 120 s cadence (`Math.floor(now/120000)`), yellow-LED dot-matrix announcement strip scrolls at 34 columns/s (pre-rendered 5×7 font table + cached dot sprite with radial glow `#FFE27A→#F5C400→transparent`), windsock flaps by summed sines keyed to computed wind, barograph redraws every 20 s, lever/R advances the board and rotates the announcement.

## Texture & materials

- **Brass gradient** (5 stops, quoted above) + the full brass edge treatment: `box-shadow:0 0 0 1px #2a1f05,0 2px 0 #000,0 3px 8px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,246,200,.6),inset 0 -1px 0 rgba(60,40,0,.6)` — dark keyline, drop, top highlight, underside shade. Screws: `radial-gradient(circle at 35% 30%,#f5e3a4,#8a6a1f 60%,#3d2c06)` with a rotated slot line (`transform:rotate(var(--r,28deg))`, each screw a different angle).
- **Enamel frame** (`.frame`) — layered light on a 4-stop enamel ramp:
  ```css
  background:
    linear-gradient(104deg,transparent 28%,rgba(255,255,255,.045) 44%,transparent 58%),            /* specular sheen */
    repeating-linear-gradient(90deg,rgba(255,255,255,.024) 0 1px,transparent 1px 3px,rgba(0,0,0,.07) 3px 4px,transparent 4px 7px), /* micro-ribbing */
    linear-gradient(180deg,#2c2c28,#1e1e1b 26%,#181816 72%,#242421);                               /* enamel */
  box-shadow:0 1px 0 rgba(255,255,255,.13) inset,0 -2px 0 rgba(0,0,0,.6) inset,0 0 0 1px #000,0 40px 90px -30px #000,0 18px 40px -18px rgba(0,0,0,.9)}
  ```
  Rivets: one `--rv` radial-gradient repeated along all four inner edges (`148px 9px repeat-x` top/bottom, `9px 132px repeat-y` sides).
- **Board well** (`.face`): `inset 0 3px 14px #000, inset 0 0 60px rgba(0,0,0,.6)` recess + a top light wash `.face::after{background:linear-gradient(180deg,rgba(255,250,225,.05),transparent 22%)}` — the flap surface catching hall light.
- **Hairline split** = the 1px `#040403` hinge line baked into every atlas face + pins; page-wide hairlines are `rgba(242,239,228,.05–.08)`; grain = the feTurbulence overlay at `.07`.

## Sound

Fully **opt-in and lazy**: the "Clatter" switch is `aria-pressed=false` until clicked; `initAudio()` runs only on first toggle, `ac.resume()` if suspended, master gain `.55`.

- **One 35 ms noise buffer**, percussively pre-shaped once: `n=Math.floor(ac.sampleRate*.035); d[i]=(Math.random()*2-1)*Math.pow(1-i/n,3.2)` — a crack with a steep decay.
- **Flap tick** (batched per frame): `tick(n)` → `burst(1500+Math.random()*2800, 1.3, Math.min(.85,.14+n*.03), .75+Math.random()*0.7)` — bandpass filter, Q 1.3, gain scaled by how many flaps landed this frame, playbackRate randomized. N flaps = N crack events → the Solari clatter, no samples.
- **Mechanical clack** (lever, manifest open/close, filter): `clack(v)` → `burst(520,1.1,.9*v,.5)` low body + `burst(2400,2,.3*v,1)` high snap.
- `burst(freq,q,gain,rate)` = bufferSource → biquad bandpass → gain → master.

## Accessibility & perf

- **Keyboard/Aria**: rows are `role="button"` + `tabIndex=0` + `aria-expanded`, with composed `aria-label` ("14:32 to Cape Verrat, LZ Albatross, mast 3, BOARDING. Show manifest"); Enter/Space handled via keydown → `.click()`. Filter chips are an `aria-pressed` `role="group"`; sound/lever mirror state; the detail strip gets `aria-hidden` + a full manifest label when opened. Canvas fields are `aria-hidden`; the clock is `role="img"` with a minutes-level label; the date is `aria-hidden` (redundant). Global `:focus-visible{outline:2px solid var(--yel);outline-offset:3px}`; `R` shortcut guards modifiers and `preventDefault`s. A `.vh` visually-hidden utility is defined.
- **Reduced motion (CSS + JS, both)**: CSS block kills the rule draw, lamp blink, lever pull and sets `transition-duration:.01s` on interactive bits. In JS, a live `mqReduce` listener toggles `reduced`: flaps become a 320 ms **cross-fade** (`phase:3` → `drawFade`, `globalAlpha=1-p`), the announcement canvas is replaced by the static mono `.ann-txt` (`.ann.static`), the windsock draws one frozen frame, and `applyReduced()` settles everything mid-flight.
- **Perf**: single rAF loop drives flaps + ticker + sock; `visibilitychange` stops it and `settleAll()` prevents a flip backlog on return; the 1 s timer is phase-locked (`setTimeout(second,1000-Date.now()%1000+4)`); DPR clamped `Math.min(2,Math.max(1,devicePixelRatio))`; atlas cache shared across cells of identical size/tone/drum; ticker redraws only on integer column steps; `IntersectionObserver` gates the sock when offscreen; debounced resize with no-op guard.

## Borrow / Leave for The Horizon act

*The Horizon act* = the portfolio's finale: AI Code Review Assistant (featured), skills, contact, "next departures" framing of the future, departures-announcer voice — and the page's **only dark section**, so it must land as a finale. Study 002 donates almost its whole visual language; a few subsystems are noise.

### Borrow (concrete)

1. **The dark-register recipe, verbatim** — it *is* the finale look. Body: `#060605` + `radial-gradient(120% 70% at 50% -12%,rgba(245,196,0,.075),transparent 60%)` (hall light above) + `radial-gradient(90% 60% at 50% 108%,rgba(242,239,228,.035),transparent 70%)` (floor bounce); vars `--board:#0F0F0E --ink:#F2EFE4 --yel:#F5C400 --red:#D4401F --dim:#8f8c80`; the `feTurbulence` grain overlay at `opacity:.07 mix-blend-mode:overlay`. Warm black + cream + one yellow only.
2. **Contact rows as departure rows** — reuse `.row` construction exactly: per-row status lamp (`data-s=go/wait/bad`, the `blink` keyframes), hairline `::after` `rgba(242,239,228,.05)`, hover `brightness(1.32)` on the row canvas (or filter on text), `aria-expanded` disclosure. Map columns like MODES: `TIME→"AVAIL"`, `DESTINATION→GitHub / Email / LinkedIn`, `STATUS→BOARDING / ON TIME / DEPARTED` with the tone map (`y`/`d`/`r`). Curate 4–6 rows statically — no flight-simulation engine.
3. **Skills as the brass console** — the `.chip` filters with lit-LED pressed state (`chip[aria-pressed=true]::before{background:var(--yel);box-shadow:0 0 8px rgba(245,196,0,.8)}`) as skill categories; the `.ctl` labels (`700 10px/.26em uppercase, text-shadow:0 -1px 0 #000`) as console captions. Optional: a real toggle switch (`.sw/.bat` ±34° spring) gating anything noisy.
4. **The AI Code Review Assistant as the featured departure**: first row, blinking go-lamp, status `BOARDING`; clicking opens the **manifest detail** — the `grid-template-rows:0fr→1fr` accordion, `#090908` body, `border-left:3px solid var(--yel)`, pointer triangle, labeled fields (`.dl` micro-labels) reading Captain→role / "Purser's note"→one-liner. This is the act's single hero interaction.
5. **The flap engine itself** for headline text — the atlas cache + `drawFlip` fold (STEP 55 / LAST 215 / `pow(p,1.7)` / last-flap wobble `PI-.42*sin(PI*q)*(1-.4*q)`), COLD=9 ROWD=58 stagger, and the **blank→roll load choreography** (cells boot blank, content rolls in 380 ms after mount). The self-test easter egg (maker's plate click = full drum revolution) is a one-liner (`setCell(...,spin)`) and worth keeping.
6. **Chrome idioms**: maker's plate (`--brass` gradient + screws + Georgia `.22em` engraving) recut as a signature plate — e.g. "Signalwerk · Type 4 · No. 0417" style lore for the portfolio owner; the self-drawing `--yel` 3px rule under the act title; the trilingual kicker pattern (`Departures · Abflug · Partenze`) recut as `Next departures · En route · Boarding`-style announcer voice; the `.key` R-chip for a keyboard shortcut; the `.fine` colophon line ("keeps your own local time … are invented") as the act's honesty footer.
7. **Announcer voice, cheap version**: skip the 5×7 dot-matrix engine; reuse its **fallback** as the primary — the `.ann-txt` mono style (`700 13px/1.5 Menlo, letter-spacing:.08em, uppercase, --yel` on `#070706` inset window) rotating 2–3 written lines. That *is* the departures-announcer register at 1% of the cost.
8. **The a11y/perf discipline**: reduced-motion cross-fade (phase-3 320 ms), `visibilitychange` settleAll, DPR clamp 1–2, debounced resize, aria-pressed/expanded/labeled rows, Enter/Space, yellow `:focus-visible`. Borrow the patterns wholesale.

### Leave

- **Weather panel** (windsock, compass dial, barograph SVG, sine-summed meteorology) — pure scene texture; ~150 lines of world-sim that would dilute a portfolio finale. Drop entirely.
- **The dot-matrix ticker engine** (80-row F5 font table, cached strips, column-stepped scroll) — the mono fallback carries the voice; keep the engine only if the finale needs the marquee.
- **The hash-seeded flight universe** (`hash()` mix, `flight()`, 120 s status cadence, dismissal state) — replace with static curated data; a portfolio's "future departures" should be authored, not simulated.
- **The live clock with flip-on-change digits** — charming but competes with headline flaps; if kept, keep only the "keeps your own local time" caption. Optional.
- **Row count of 11 / five-column full mode** — a finale wants 4–6 rows, 3–4 columns; the `phone` mode's short-word `SHORT` mapping is the useful part.

---

*Distilled by research-subagent-002, 2026-11-10. Findings feed the Horizon act (final, dark) of the journeyman-folio portfolio.*
